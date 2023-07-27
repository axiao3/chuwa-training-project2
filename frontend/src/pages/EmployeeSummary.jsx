import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeSummary = ({ employee }) => {
  const { name, ssn, workAuthorization, phoneNumber, email } = employee;
  const defaultImgUrl =
    "https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg";
  const navigate = useNavigate();

  const handleImageError = (e) => {
    e.target.src = defaultImgUrl;
  };

  const handleClick = () => {
    console.log("certain employee is clicked");
    navigate(`/employees/${employee._id}`);
  };

  return (
    <div className="employee-summary" onClick={() => handleClick()}>
      <div className="employee-picture">
        <img
          src={employee.profilePicture || defaultImgUrl}
          alt="Employee Avatar"
          onError={handleImageError}
        />
      </div>

      <div className="employee-info">
        <h3 className="title-row">
          {employee.firstName ?? "N/A"} {employee.lastName ?? "N/A"}
        </h3>
        <p>SSN: {employee.ssn ?? "N/A"}</p>
        <p>Work Authorization Title: {employee.workAuthorization ?? "N/A"}</p>
        <p>Phone Number: {employee.cellPhoneNumber ?? "N/A"}</p>
        <p>Email: {employee.email ?? "N/A"}</p>
      </div>
    </div>
  );
};

export default EmployeeSummary;
