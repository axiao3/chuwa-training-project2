/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from "react";
import AuthForm from "../../components/AuthForm";
import { useDispatch } from "react-redux";
import { signInAction } from "../../app/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../utils/Loading";
import waiting from "../../utils/waiting";

export default function SignIn() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleSubmit = (
    e,
    username,
    password,
    usernameWarning,
    passwordWarning
  ) => {
    e.preventDefault();
    if (!usernameWarning && !passwordWarning) {
      dispatch(signInAction({ username, password })).then((action) => {
        if (signInAction.fulfilled.match(action)) {
          waiting(1000).then(() => {
            // alert("Sign In Success!");
            window.location.href = "/home";
          });
        }
        // else if (signUpAction.rejected.match(action)) {
        //     alert("Sign Up Failed!");
        //     // Handle error logic here
        //   }
      });
    }
  };

  return (
    <div>
      <p className="title">Sign In to Your Account</p>
      <AuthForm type="Sign In" onSubmit={handleSubmit} />
    </div>
  );
}
