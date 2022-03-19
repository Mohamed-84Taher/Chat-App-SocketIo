import React from "react";
import "./InfoBar.css";
import onlineIcon from "../../icons/onlineIcon.jpg";
import closeIcon from "../../icons/closeIcon.png";

function InfoBar({ room }) {
  return (
    <div className='infoBar'>
      <div className='leftInnerContainer'>
        <img
          className='onlineIcon'
          src={onlineIcon}
          alt='online icon'
          style={{
            width: "8px",
            heigth: "8px",
            borderRadius: "50%",
          }}
        />
        <h3>{room}</h3>
      </div>
      <div className='rightInnerContainer'>
        <a href='/'>
          <img src={closeIcon} alt='close icon' width='8px' heigth='8px' />
        </a>
      </div>
    </div>
  );
}

export default InfoBar;
