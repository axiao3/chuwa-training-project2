/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import {
  signUpAction,
  signInAction,
  generateTokenAction,
} from "../../app/userSlice";
import style from "./style.module.css";

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
        <div className={style.container}>
          <p className={style.title}>Sign up via Email</p>
          <AuthForm type="Generate Token" onSubmit={handleSubmit} />
          <p>
            Already had an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      ) : (
        <div className={style.container}>
          
          <p className={style.title}>
          
            Registration Link already sent to your Email!
          </p>
        </div>
      )}
    </>
  );
}
