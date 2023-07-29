import React, { useEffect, useState } from "react";
import { getAllApplications } from "../services/application";

import EmployeeSummary from "./EmployeeSummary";

const EmployeeProfiles = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getAllApplications()
      .then((data) => {
        setApplications(data);
        console.log("applications: ", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="employee-profiles">
      <h2>Employee Profiles</h2>
      {applications.length === 0 ? (
        <p>
          No employees found. Please check your connection and authorization.
        </p>
      ) : (
        <div className="employee-container">
          {applications.map((application) => (
            <EmployeeSummary
              key={applications.user}
              application={application}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeProfiles;
