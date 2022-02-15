/* eslint-disable react/prop-types */

import React, { useState, useContext, useEffect } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import styled from 'styled-components';
import Switch from '../../components/Switch';

const StyledSwitch = styled(Switch)`
  display: flex;
  margin-left: auto;

  span:nth-child(1) {
    // bottom: 36px;
    // display: flex;
    // left: 4px;
    // position: relative;
    // width: 0px;
  }

  .ant-switch-checked {
    background-color: green;
  }
`;

const CustomSwitch = ({ node, getPos }) => {
  const context = useContext(WaxContext);
  const [checked, setChecked] = useState(false);
  const [checkedAnswerMode, setCheckedAnswerMode] = useState(false);

  const {
    view,
    view: { main },
  } = context;

  const isEditable = view.main.props.editable(editable => {
    return editable;
  });

  useEffect(() => {
    const allNodes = getNodes(main);
    allNodes.forEach(singNode => {
      if (singNode.node.attrs.id === node.attrs.id) {
        setChecked(singNode.node.attrs.correct);
      }
    });
  }, [getNodes(main)]);

  const handleChange = () => {
    setChecked(!checked);
    setCheckedAnswerMode(!checkedAnswerMode);
    const key = isEditable ? 'correct' : 'answer';
    const value = isEditable ? !checked : !checkedAnswerMode;
    const allNodes = getNodes(main);

    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        main.dispatch(
          main.state.tr.setNodeMarkup(getPos(), undefined, {
            ...singleNode.node.attrs,
            [key]: value,
          }),
        );
      }
    });
  };

  return (
    <StyledSwitch
      checked={isEditable ? checked : checkedAnswerMode}
      checkedChildren="True"
      label="True/false?"
      labelPosition="left"
      onChange={handleChange}
      unCheckedChildren="False"
    />
  );
};

const getNodes = view => {
  const allNodes = DocumentHelpers.findBlockNodes(view.state.doc);
  const multipleChoiceNodes = [];
  allNodes.forEach(node => {
    if (node.node.type.name === 'true_false') {
      multipleChoiceNodes.push(node);
    }
  });
  return multipleChoiceNodes;
};

export default CustomSwitch;
