/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeSummary = ({ application }) => {
  const { firstName, lastName, SSN, workAuthorization, phoneNumber, email } =
    application;
  const defaultImgUrl =
    "https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg";
  const navigate = useNavigate();
  console.log("employee summary", application);
  const handleImageError = (e) => {
    e.target.src = defaultImgUrl;
  };

  const handleClick = () => {
    console.log("certain employee is clicked");
    navigate(`/employees/${application.user}`);
  };

  return (
    <div className="employee-summary" onClick={() => handleClick()}>
      <div className="employee-picture">
        <img
          src={application.profilePicture || defaultImgUrl}
          alt="Employee Avatar"
          onError={handleImageError}
        />
      </div>

      <div className="employee-info">
        <h3 className="title-row">
          {application.firstName ?? "N/A"} {application.lastName ?? "N/A"}
        </h3>
        <p>SSN: {application.SSN ?? "N/A"}</p>
        <p>
          Work Authorization Title: {application.workAuthorization ?? "N/A"}
        </p>
        <p>Phone Number: {application.cellphone ?? "N/A"}</p>
        <p>Email: {application.email ?? "N/A"}</p>
      </div>
    </div>
  );
};

export default EmployeeSummary;
