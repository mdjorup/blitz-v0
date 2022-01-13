import React from 'react'
import "../css/HeaderOption.css";

function HeaderOption({title, onClick}) {
  return (
    <div className='headerOption' onClick={onClick}>
      <h2>{title}</h2>
    </div>
  )
}

export default HeaderOption
