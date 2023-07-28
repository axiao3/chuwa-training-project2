/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function Username(props) {
  return (
    <div className="username-input">
      <label htmlFor="username">Username</label>
      <input type="text" id="username" onChange={(e) => props.handleUsername(e)} onBlur={props.onBlur} required/>
      <p style={{color:"#FC5A44"}}>{props.warning}</p>
    </div>
  );
}
