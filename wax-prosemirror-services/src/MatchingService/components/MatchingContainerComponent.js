/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';
import FeedbackComponent from './FeedbackComponent';

const MatchingContainer = styled.div`
  border: 3px solid #f5f5f7;
  margin-bottom: 30px;
`;

const MatchingWrapper = styled.div`
  margin-bottom: ;
  margin: 0px 38px 15px 38px;

  margin-top: 10px;
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  const customProps = main.props.customValues;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;

  return (
    <MatchingWrapper>
      <span>Matching</span>
      <MatchingContainer className="matching">
        {!(readOnly && !customProps.showFeedBack) && (
          <FeedbackComponent
            getPos={getPos}
            node={node}
            readOnly={readOnly}
            view={view}
          />
        )}
      </MatchingContainer>
    </MatchingWrapper>
  );
};
