/* eslint-disable no-underscore-dangle */
import { injectable } from 'inversify';
import { TextHighlightingTool } from 'wax-prosemirror-components';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import Tools from '../lib/Tools';

@injectable()
class TextHighlightTool extends Tools {
  title = 'Text Highlighter';
  icon = 'highlight';
  name = 'TextHighlightTool';

  select = (state, activeViewId, activeView) => {
    //  return !activeView.state.selection.empty;
    return window.getSelection().toString().trim().length !== 0;
  };

  get run() {
    return (state, dispatch, color) => {
      const {
        selection: { $from, $to },
      } = state;
      const css = `background: linear-gradient(
                    to bottom,
                    transparent 0,
                    transparent 20%,
                    ${color} 21%,
                    ${color} 60%,
                    transparent 61%,
                    transparent 100%
                  )`;

      color === 'transparent'
        ? dispatch(
            state.tr.removeMark(
              $from.pos,
              $to.pos,
              state.schema.marks.highlight,
            ),
          )
        : dispatch(
            state.tr.addMark(
              $from.pos,
              $to.pos,
              state.schema.marks.highlight.create({ style: css }),
            ),
          );
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this._isDisplayed ? (
      <TextHighlightingTool item={this.toJSON()} key={uuidv4()} view={view} />
    ) : null;
  }
}

export default TextHighlightTool;
