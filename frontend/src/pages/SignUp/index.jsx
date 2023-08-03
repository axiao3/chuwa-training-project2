/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { signUpAction } from "../../app/userSlice";
import { isTokenValid } from "../../services/auth";
import Loading from "../../utils/Loading";
import waiting from "../../utils/waiting";
import styles from "./styles.module.css"

export default function SignUp({ token }) {
  const navigate = useNavigate();

  const [tokenResponse, setTokenResponse] = useState(null);
  const [tokenError, setTokenError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTokenValidity = async () => {
      try {
        const response = await isTokenValid(token);
        setTokenResponse(response);
      } catch (err) {
        setTokenError(err.message);
      } finally {
        setIsLoading(false); // set loading to false regardless of success or error
      }
    };
    fetchTokenValidity();
  }, [token]); // Dependency array includes urlToken

  const dispatch = useDispatch();
  const handleSubmit = (
    e,
    email,
    username,
    password,
    emailWarning,
    usernameWarning,
    passwordWarning
  ) => {
    e.preventDefault();
    if (!emailWarning && !usernameWarning && !passwordWarning) {
      dispatch(signUpAction({ token, email, username, password })).then(
        (action) => {
          if (signUpAction.fulfilled.match(action)) {
            waiting(1000).then(() => {
              // alert("Sign Up Success!");
              window.location.href = "/signin";
            });
          }
          // else if (signUpAction.rejected.match(action)) {
          //     alert("Sign Up Failed!");
          //     // Handle error logic here
          //   }
        }
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : tokenResponse && tokenResponse.status ? (
        <div className={styles.container}>
          <p className={styles.title}>Sign up an account</p>
          <AuthForm type="Sign Up" onSubmit={handleSubmit} />
          <p>
            Already had an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      ) : (
        <div className={styles.container}>
          <p>{tokenError}</p>
        </div>
      )}
    </>
  );
}
