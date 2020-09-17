import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MenuButton from './MenuButton';
import { grid } from '@pubsweet/ui-toolkit';

// font size 0 reason: https://stackoverflow.com/a/19212391
const Wrapper = styled.div`
  font-size: 0;
  position: relative;
`;

const DropWrapper = styled.div`
  margin-top: ${grid(1)};
  position: absolute;
`;

const Dropdown = props => {
  const { className, disabled, dropComponent, iconName, label, title } = props;

  const [isOpen, setIsOpen] = useState(false);

  // const dropElementRef = useRef(null);

  return (
    <Wrapper className={className}>
      <MenuButton
        active={isOpen}
        disabled={disabled}
        iconName={iconName}
        label={label}
        onMouseDown={() => setIsOpen(!isOpen)}
        title={title}
      />

      {isOpen && <DropWrapper>{dropComponent}</DropWrapper>}
    </Wrapper>
  );
};

Dropdown.propTypes = {
  disabled: PropTypes.bool,
  dropComponent: PropTypes.node.isRequired,
  iconName: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
};

Dropdown.defaultProps = {
  disabled: false,
  iconName: null,
  label: null,
  title: null,
};

export default Dropdown;
