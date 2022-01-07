import React, {useState, useEffect, useRef} from 'react';
import '../css/StdDropdown.css';

import { CgChevronDown } from 'react-icons/cg';
import {IconContext} from 'react-icons';

function StdDropdown({season, options, isActive, onDropdownClick, onOptionClick}) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        onDropdownClick();
      }
    };
    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.removeEventListener('click', pageClickEvent);
    }

  }, [isActive])  

  const dropdownList = options.map(option => (
    <div className='menu__option' onClick={onOptionClick(option)}>
      <h5>{option}</h5>
    </div>
  ))


  return (
    <div className="stdDropdown">
      <div className="dropdown__menu__trigger" onClick={onDropdownClick}>
        <h5>{season}</h5>
        <IconContext.Provider value={{ color: "aqua"}}>
            <CgChevronDown/>
        </IconContext.Provider>
      </div>
      <div ref={dropdownRef} className="dropdown__menu__items">
        <div className={`dropdown__menu__${isActive ? 'active' : 'inactive'}`}>
          {dropdownList}
        </div>
      </div>
    </div>
  )
}

export default StdDropdown
