import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
//import { getOneEmployee, updateEmployee } from "../services/info";
import EditPersonalInfo from "./EditPersonalInfo";

import {
  getApplicationById,
  updateApplicationById,
} from "../services/application";

const PersonalInfoPage = () => {
  const { user } = useSelector((state) => state.user);
  console.log("user in the redux: ", user);

  const { id } = useParams();
  let isMatch = id === user.id;
  console.log("isMatch: ", isMatch, id, user.id);
  const defaultImgUrl =
    "https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg";
  const [employee, setEmployee] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const handleImageError = (e) => {
    e.target.src = defaultImgUrl;
  };

  const handleEditButtonClick = () => {
    if (!editMode) {
      setEditMode(true);
      console.log("start to edit employee info");
    }
  };

  const handleCancelButtonClick = () => {
    if (editMode) {
      setEditMode(false);
      console.log("cancel edit employee info");
    }
  };

  const handleSaveButtonClick = () => {
    if (editMode) {
      setEditMode(false);
      console.log("save employee info");
    }
  };

  useEffect(() => {
    getApplicationById(id)
      .then((data) => {
        setEmployee(data);
        console.log("employee in personal info: ", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h2>Personal Information</h2>
      {!editMode ? (
        <div className="personal-info">
          {employee ? (
            <div>
              <div className="personal-picture">
                <img
                  src={employee.profilePicture || defaultImgUrl}
                  alt="Employee Avatar"
                  onError={handleImageError}
                />
              </div>
              <h2>
                {employee.firstName ?? "Anonymous First"}
                {`(${employee.preferredName})` ?? ""}{" "}
                {employee.middleName ?? ""}{" "}
                {employee.lastName ?? "Anonymous Last"}
              </h2>
              <h3>Basic Information</h3>
              <p>SSN: {employee.SSN ?? "N/A"}</p>
              <p>Date of Birth: {employee.dateOfBirth ?? "N/A"}</p>
              <p>Gender: {employee.gender ?? "N/A"}</p>

              <h3>Address</h3>
              <p>Building/Apt #: {employee.apt ?? "N/A"}</p>
              <p>Street Name: {employee.streetName ?? "N/A"}</p>
              <p>City: {employee.city ?? "N/A"}</p>
              <p>State: {employee.state ?? "N/A"}</p>
              <p>Zip: {employee.zip ?? "N/A"}</p>

              <h3>Contact Info</h3>
              <p>Cell Phone Number: {employee.cellphone ?? "N/A"}</p>
              <p>Work Phone Number: {employee.workphone ?? "N/A"}</p>

              <h3>Documents</h3>
              {/* {employee.uploadedDocuments.map((document) => (
                <div key={document.documentType}>
                  <a
                    href={document.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {document.documentType}
                  </a>
                </div>
              ))} */}
              <a href={employee.driverLicense ?? ""} target="_blank">
                Diver License
              </a>
              <br />
              {isMatch ? (
                <button
                  className="personal-button"
                  onClick={() => handleEditButtonClick()}
                >
                  Edit
                </button>
              ) : null}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      ) : (
        <>
          <EditPersonalInfo
            employee={employee}
            onCancelClick={() => handleCancelButtonClick()}
          />
          {/* <button
            className="personal-button"
            onClick={() => handleCancelButtonClick()}
          >
            Cancel
          </button>
          <button
            className="personal-button"
            onClick={() => handleSaveButtonClick()}
          >
            Save
          </button> */}
        </>
      )}
    </>
  );
};

export default PersonalInfoPage;
