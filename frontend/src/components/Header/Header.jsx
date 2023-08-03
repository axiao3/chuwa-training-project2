/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCartAction } from "../../app/cartSlice";
import { logOutUser } from "../../app/userSlice";
import { getApplicationByIdAction } from "../../app/applicationSlice";

export default function Header(props) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { id } = user;
  const [NavOpen, setNavOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else {
      if (user.type === "employee") {
        dispatch(getApplicationByIdAction({ id }));
      }
    }
  }, [isAuthenticated]);

  const application = useSelector(
    (state) => state.applications.applications[0]
  );
  console.log("app in nav: ", application);
  const handleSignIn = () => {
    window.location.href = "/signin";
  };

  const handleLogOut = () => {
    dispatch(logOutUser());
    window.location.href = "/signin";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // navigate(`/items?name=${productName}`);
    // window.location.href = `/items?name=${productName}`;
  };

  const handlePersonalInfoClick = () => {
    if (
      user.type === "employee" &&
      application?.submittedStatus === "approved"
    ) {
      console.log("application is approved, can enter the personal info");
      navigate(`/employees/${id}`);
    } else {
      console.log(
        "application is not approved, cannot enter the personal info"
      );
      navigate(`/${id}/application`);
    }
  };

  return (
    <header>
      <nav>
        <p
          className="nav-item"
          style={{
            cursor: "pointer",
            margin: "0",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          M<span className="hidden">anagement</span>
          <span style={{ marginLeft: "0.2rem", fontSize: "0.8rem" }}>
            Chuwa
          </span>
        </p>

        <div className="nav-item">
          {isAuthenticated ? (
            <button onClick={handleLogOut}>
              <FontAwesomeIcon icon={faUser} />
              <p className="hidden" id="display">
                Log Out
              </p>
            </button>
          ) : (
            <button onClick={handleSignIn}>
              <FontAwesomeIcon icon={faUser} />
              <p className="hidden" id="display">
                Sign In
              </p>
            </button>
          )}

          {isAuthenticated ? (
            <div className="nav-menu">
              {user.type === "employee" ? (
                <>
                  <button onClick={handlePersonalInfoClick}>
                    Personal Information
                  </button>
                  <button onClick={() => navigate("/employees/visa")}>
                    Visa Status Management
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate("/home")}>Home</button>
                  <button onClick={() => navigate("/employees")}>
                    Employee Profiles
                  </button>
                  <button onClick={() => navigate("/employees/visa")}>
                    Visa Status Management
                  </button>
                  <button onClick={() => navigate("/employees/:id/hiring")}>
                    Hiring Management
                  </button>
                </>
              )}
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
