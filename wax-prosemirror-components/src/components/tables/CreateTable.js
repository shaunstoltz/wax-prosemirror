/* eslint react/prop-types: 0 */

import React, { useState, useContext, useMemo, useRef } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';

import MenuButton from '../../ui/buttons/MenuButton';
import InsertTableTool from '../../ui/tables/InsertTableTool';
import useOnClickOutside from '../../helpers/useOnClickOutside';

const Wrapper = styled.div`
  font-size: 0;
  position: relative;
  z-index: 2;
`;

const DropWrapper = styled.div`
  margin-top: ${grid(1)};
  position: absolute;
  background: white;
`;

const CreateTable = ({ view = {}, item }) => {
  const {
    view: { main },
    activeViewId,
  } = useContext(WaxContext);
  if (item.onlyOnMain) {
    view = main;
  }

  const { state } = view;
  const { icon, run, select, title } = item;
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const dropComponent = (
    <InsertTableTool
      onGridSelect={colRows => handleSelect(colRows, view.state, view.dispatch)}
    />
  );

  const handleSelect = (colRows, editorState, editorDispatch) => {
    run(colRows, editorState, editorDispatch);
    setIsOpen(!isOpen);
  };

  const isDisabled = !select(state, activeViewId);

  useOnClickOutside(ref, () => setIsOpen(false));

  const MemorizedDropdown = useMemo(
    () => (
      <Wrapper ref={ref}>
        <MenuButton
          active={isOpen}
          disabled={isDisabled}
          iconName={icon}
          onMouseDown={() => {
            setIsOpen(!isOpen);
          }}
          title={title}
        />

        {isOpen && <DropWrapper>{dropComponent}</DropWrapper>}
      </Wrapper>
    ),
    [isDisabled, isOpen],
  );

  return MemorizedDropdown;
};

export default CreateTable;
