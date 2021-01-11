/* eslint react/prop-types: 0 */
import React, { useMemo, useContext } from 'react';
import styled from 'styled-components';
import * as tablesFn from 'prosemirror-tables';
import { WaxContext } from 'wax-prosemirror-core';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const DropdownStyled = styled(Dropdown)`
  display: inline-flex;
  opacity: ${props => (props.select ? 1 : 0.4)};
  pointer-events: ${props => (props.select ? 'default' : 'none')};

  .Dropdown-control {
    border: none;
  }

  .Dropdown-arrow {
    right: 25px;
    top: 14px;
  }

  .Dropdown-menu {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    width: 120%;

    .Dropdown-option {
      width: 100%;
    }
  }
`;

const dropDownOptions = [
  { label: 'add column before', value: 'addColumnBefore' },
  { label: 'add column after', value: 'addColumnAfter' },
  { label: 'Delete column', value: 'deleteColumn' },
  { label: 'Insert row before', value: 'addRowBefore' },
  { label: 'Insert row after', value: 'addRowAfter' },
  { label: 'Delete row', value: 'deleteRow' },
  { label: 'Delete table', value: 'deleteTable' },
  { label: 'Merge cells', value: 'mergeCells' },
  { label: 'Split cell', value: 'splitCell' },
  { label: 'Toggle header column', value: 'toggleHeaderColumn' },
  { label: 'Toggle header row', value: 'toggleHeaderRow' },
  { label: 'Toggle header cells', value: 'toggleHeaderCell' },
];

const TableDropDown = ({ view: { dispatch, state }, item }) => {
  const { activeView } = useContext(WaxContext);

  const isDisabled = item.select(activeView.state);
  const TableDropDownComponent = useMemo(
    () => (
      <DropdownStyled
        options={dropDownOptions}
        onChange={option => {
          item.run(state, dispatch, tablesFn[option.value]);
        }}
        placeholder="Table Options"
        select={isDisabled}
      />
    ),
    [isDisabled],
  );

  return TableDropDownComponent;
};

export default TableDropDown;
