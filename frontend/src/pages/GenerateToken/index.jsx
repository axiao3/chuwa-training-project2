/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/AuthForm";
import {
  signUpAction,
  signInAction,
  generateTokenAction,
} from "../../app/userSlice";

export default function GenerateToken() {
  // const {user} = useSelector((state) => state.user);
  const [tokenSent, setTokenSent] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e, email, emailWarning) => {
    e.preventDefault();
    if (!emailWarning) {
      dispatch(generateTokenAction({ email })).then(() => {
        setTokenSent(true);
      });
    }
  };

  return (
    <>
      {!tokenSent ? (
        <div>
          <p className="title">Sign up via Email</p>
          <AuthForm type="Generate Token" onSubmit={handleSubmit} />
        </div>
      ) : (
        <p className="title">Registration Link already sent to your Email!</p>
      )}
    </>
  );
}
