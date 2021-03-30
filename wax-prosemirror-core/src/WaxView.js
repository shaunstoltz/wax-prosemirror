import React, {
  useRef,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from 'react';

import applyDevTools from 'prosemirror-dev-tools';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import 'prosemirror-view/style/prosemirror.css';

import { trackedTransaction } from 'wax-prosemirror-services';
import { WaxContext } from './WaxContext';
import transformPasted from './helpers/TransformPasted';
import { useReactNodeViewPortals } from './ReactNodeViewPortals';
import { createReactNodeView } from './ReactNodeView';
import BlockQuote from './BlockQuote';

let previousDoc;

export default props => {
  const { readonly, onBlur, options, debug, autoFocus, user } = props;
  const editorRef = useRef(null);
  let view;
  const context = useContext(WaxContext);
  const { createPortal } = useReactNodeViewPortals();

  const handleCreatePortal = useCallback(createPortal, []);

  const setEditorRef = useCallback(
    node => {
      if (editorRef.current) {
        // this is where you do cleanup if you have to. the editorRef.current will
        // still point to the old ref, the old node. so you have some time here to
        // clean up the unmount if you need to.
      }
      if (node) {
        view = new EditorView(
          { mount: node },
          {
            editable: () => !readonly,
            state: EditorState.create(options),
            dispatchTransaction,
            user,
            scrollMargin: 200,
            scrollThreshold: 200,
            nodeViews: {
              blockquote(node, view, getPos, decorations) {
                console.log('rerenders for ever');
                return createReactNodeView({
                  node,
                  view,
                  getPos,
                  decorations,
                  component: BlockQuote,
                  onCreatePortal: handleCreatePortal,
                });
              },
            },
            handleDOMEvents: {
              blur: onBlur
                ? view => {
                    onBlur(view.state.doc.content);
                  }
                : null,
            },
            transformPasted: slice => {
              return transformPasted(slice, view);
            },
            attributes: {
              spellcheck: 'false',
            },
          },
        );

        context.updateView(
          {
            main: view,
          },
          'main',
        );
        if (debug) applyDevTools(view);
        if (autoFocus)
          setTimeout(() => {
            view.focus();
          }, 1000);

        return () => view.destroy();
      }
      editorRef.current = node;
    },
    [readonly],
  );

  const dispatchTransaction = transaction => {
    const { TrackChange } = props;
    const tr =
      TrackChange && TrackChange.enabled
        ? trackedTransaction(transaction, view.state, user)
        : transaction;

    previousDoc = view.state.doc;
    const state = view.state.apply(tr);
    view.updateState(state);

    /* when a transaction comes from a view other than
      main don't keep updating the view ,as this is
      the central point of each transaction
      */
    if (!transaction.getMeta('outsideView')) {
      context.updateView(
        {
          main: view,
        },
        'main',
      );
    }
    if (view.state.doc !== previousDoc || tr.getMeta('forceUpdate'))
      props.onChange(state.doc.content);
  };

  useEffect(() => {
    const editorViewDOM = editorRef.current;
    if (editorViewDOM) {
      setEditorRef(editorViewDOM);
    }
  }, [setEditorRef]);

  const editor = <div ref={setEditorRef} />;

  return useMemo(
    () =>
      props.children({
        editor,
      }),
    [readonly],
  );
};
