/* eslint react/prop-types: 0 */

import React, { useContext, useMemo } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import MenuButton from '../ui/buttons/MenuButton';

const Button = ({ view = {}, item }) => {
  const { active, enable, icon, label, onlyOnMain, run, select, title } = item;

  const {
    view: { main },
    activeViewId,
  } = useContext(WaxContext);

  if (onlyOnMain) view = main;

  const { dispatch, state } = view;

  const handleMouseDown = e => {
    e.preventDefault();
    run(state, dispatch);
  };

  const isActive = active && active(state, activeViewId);

  const isDisabled =
    enable && !enable(state) && !(select && select(state, activeViewId));

  const MenuButtonComponent = useMemo(
    () => (
      <MenuButton
        active={isActive || false}
        disabled={isDisabled}
        iconName={icon}
        label={label}
        onMouseDown={handleMouseDown}
        title={title}
      />
    ),
    [],
  );

  return MenuButtonComponent;
};

export default Button;
