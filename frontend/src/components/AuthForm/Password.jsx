/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import style from "./style.module.css";

export default function Password(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);
  return (
    <div className="password-input">
      <label htmlFor="password">Password</label>
      <div className={style.passwordInput}>
        <input
          className={style.input}
          type={showPassword ? "text" : "password"}
          id="password"
          onChange={(e) => props.handlePassword(e)}
          onBlur={props.onBlur}
          required
        />
        <button type="button" onClick={handleTogglePassword}>
          <FontAwesomeIcon className={style.icon} icon={faEye} />
        </button>
      </div>
      <p style={{ color: "#FC5A44" }}>{props.warning}</p>
    </div>
  );
}
