import React from "react";

import onlineIcon from "../../icons/onlineIcon.jpg";

import "./TextContainer.css";

const TextContainer = ({ users }) => (
  <div className='textContainer'>
    <h1>People currently chatting</h1>
    <div className='activeContainer'>
      {users.map(({ name }) => (
        <div key={name} className='activeItem'>
          <h3> {name}</h3>
          <img
            alt='Online Icon'
            src={onlineIcon}
            style={{
              width: "20px",
              heigth: "20px",
              //   borderRadius: "50%",
              marginLeft: "30px",
            }}
          />
        </div>
      ))}
    </div>
  </div>
);

export default TextContainer;
