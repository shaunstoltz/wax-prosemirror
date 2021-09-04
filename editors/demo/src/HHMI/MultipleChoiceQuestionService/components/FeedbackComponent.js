/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { TextSelection } from 'prosemirror-state';
import { WaxContext } from 'wax-prosemirror-core';

const FeedBack = styled.div`
  color: black;
  margin-top: 10px;
`;

const FeedBackLabel = styled.span`
  font-weight: 700;
`;

const FeedBackInput = styled.input`
  border: none;
  display: flex;
  width: 100%;
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const [feedBack, setFeedBack] = useState(node.attrs.feedback);
  const feedBackRef = useRef(null);

  const handleKeyDown = e => {
    e.stopPropagation();
    if (e.key === 'Backspace') {
      context.view.main.dispatch(
        context.view.main.state.tr.setSelection(
          new TextSelection(context.view.main.state.tr.doc.resolve(0)),
        ),
      );
    }
  };

  const feedBackInput = () => {
    setFeedBack(feedBackRef.current.value);
  };

  const saveFeedBack = () => {
    context.view.main.dispatch(
      context.view.main.state.tr.setNodeMarkup(getPos(), undefined, {
        ...node.attrs,
        feedback: feedBack,
      }),
    );
  };

  const onFocus = () => {
    context.view.main.dispatch(
      context.view.main.state.tr.setSelection(
        new TextSelection(context.view.main.state.tr.doc.resolve(0)),
      ),
    );
  };

  return (
    <FeedBack>
      <FeedBackLabel>Feedback</FeedBackLabel>
      <FeedBackInput
        onKeyDown={handleKeyDown}
        onChange={feedBackInput}
        placeholder="Insert feedback"
        ref={feedBackRef}
        type="text"
        value={feedBack}
        onBlur={saveFeedBack}
        onFocus={onFocus}
      />
    </FeedBack>
  );
};
