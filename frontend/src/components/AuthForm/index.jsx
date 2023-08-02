/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Email from "./Email";
import Username from "./Username";
import Password from "./Password";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function AuthForm({ type, onSubmit }) {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [emailWarning, setEmailWarning] = useState();
  const [usernameWarning, setUsernameWarning] = useState();
  const [passwordWarning, setPasswordWarning] = useState();
  const [emailTouched, setEmailTouched] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [actionWarning, setActionWarning] = useState();

  const { status } = useSelector((state) => state.user);

  const handleEmail = (e) => setEmail(e.target.value);

  const handleUsername = (e) => setUsername(e.target.value);

  const handlePassword = (e) => setPassword(e.target.value);

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailWarning(
      !email || !emailRegex.test(email) ? "Invalid Email input!" : null
    );
    setEmailTouched(true);
  };

  const handleUsernameBlur = () => {
    const usernameRegex = /^[a-zA-Z0-9_]{5,16}$/;
    setUsernameWarning(
      !username || !usernameRegex.test(username)
        ? "Invalid Username input!"
        : null
    );
    setUsernameTouched(true);
  };

  const handlePasswordBlur = () => {
    const passwordRegex = /^(?!.*\s).{5,16}$/;
    setPasswordWarning(
      !password || !passwordRegex.test(password)
        ? "Invalid Password input!"
        : null
    );
    setPasswordTouched(true);
  };

  const handleSubmit = (e) => {
    if (type === "Generate Token") {
      if (!emailWarning) {
        onSubmit(e, email, emailWarning);
      }
    } else if (type === "Sign Up") {
      if (!usernameWarning && !emailWarning && !passwordWarning) {
        onSubmit(
          e,
          email,
          username,
          password,
          emailWarning,
          usernameWarning,
          passwordWarning
        );
      }
    } else {
      if (!usernameWarning && !passwordWarning) {
        onSubmit(e, username, password);
      }
    }
  };

  useEffect(() => {
    if (status !== "idle") setActionWarning(status);
  }, [status]);

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      {type !== "Sign In" ? (
        <Email
          handleEmail={handleEmail}
          warning={emailTouched ? emailWarning : null}
          onBlur={handleEmailBlur}
        />
      ) : null}

      {type !== "Generate Token" ? (
        <>
          <Username
            handleUsername={handleUsername}
            warning={usernameTouched ? usernameWarning : null}
            onBlur={handleUsernameBlur}
          />
          <Password
            handlePassword={handlePassword}
            warning={passwordTouched ? passwordWarning : null}
            onBlur={handlePasswordBlur}
          />
        </>
      ) : null}

      {actionWarning ? (
        <p style={{ color: "#FC5A44", textAlign: "center", margin: "0" }}>
          {actionWarning}
        </p>
      ) : null}

      <button type="submit">
        {type === "Generate Token"
          ? "Generate token and send email"
          : type === "Sign Up"
          ? "Sign Up"
          : "Sign In"}
      </button>
    </form>
  );
}
