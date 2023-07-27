import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneEmployee, updateEmployee } from "../services/info";

const PersonalInfoPage = () => {
  const { id } = useParams();
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
    getOneEmployee(id)
      .then((data) => {
        setEmployee(data);
        console.log("employee: ", data);
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
              <div className="employee-picture">
                <img
                  src={employee.profilePicture || defaultImgUrl}
                  alt="Employee Avatar"
                  onError={handleImageError}
                />
              </div>
              <h2>
                {employee.firstName ?? "Anonymous First"}{" "}
                {employee.lastName ?? "Anonymous Last"}
              </h2>
              <h3>Basic Information</h3>
              <p>SSN: {employee.ssn ?? "N/A"}</p>
              <p>Date of Birth: {employee.dateOfBirth ?? "N/A"}</p>
              <p>Gender: {employee.gender ?? "N/A"}</p>

              <h3>Address</h3>
              <p>Building/Apt #: {employee.address.buildingApt ?? "N/A"}</p>
              <p>Street Name: {employee.address.streetName ?? "N/A"}</p>
              <p>City: {employee.address.city ?? "N/A"}</p>
              <p>State: {employee.address.state ?? "N/A"}</p>
              <p>Zip: {employee.address.zip ?? "N/A"}</p>

              <h3>Contact Info</h3>
              <p>Cell Phone Number: {employee.cellPhone ?? "N/A"}</p>
              <p>Work Phone Number: {employee.workPhone ?? "N/A"}</p>

              <h3>Documents</h3>
              {employee.uploadedDocuments.map((document) => (
                <div key={document.documentType}>
                  <a
                    href={document.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {document.documentType}
                  </a>
                </div>
              ))}

              <button onClick={() => handleEditButtonClick()}>Edit</button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      ) : (
        <>
          <button onClick={() => handleCancelButtonClick()}>Cancel</button>
          <button onClick={() => handleSaveButtonClick()}>Save</button>
        </>
      )}
    </>
  );
};

export default PersonalInfoPage;
