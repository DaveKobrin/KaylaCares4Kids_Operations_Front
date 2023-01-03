import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import PropTypes from 'prop-types';

function FormDropdown({ direction, children, ...args }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <>
    {/*<div className="d-flex p-5">*/}
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
        <DropdownToggle caret color='primary'></DropdownToggle>
        <DropdownMenu {...args}>
          {children}
        </DropdownMenu>
      </Dropdown>
    {/* </div> */}
    </>
  );
}

FormDropdown.propTypes = {
  direction: PropTypes.string,
};

export default FormDropdown;