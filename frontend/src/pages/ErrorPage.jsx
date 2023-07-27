/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./style.css";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    // navigate to home page
    navigate("/");
  };

  return (
    <div className="error-page">
      <div className="error-container">
        <AiOutlineExclamationCircle
          className="error-item"
          style={{ fontSize: "1000%" }}
        />

        <h1 aria-label="Error">Ooops, something went wrong!</h1>

        <div>
          <button
            className="error-item"
            style={{
              color: "white",
              backgroundColor: "var(--var-button-color)",
            }}
            onClick={handleClick}
          >
            {" "}
            Go Home{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
