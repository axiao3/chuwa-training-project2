import React, { useEffect, useState } from "react";
import { getEmployeesList } from "../services/info";

import EmployeeSummary from "./EmployeeSummary";

const EmployeeProfiles = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployeesList()
      .then((data) => {
        setEmployees(data);
        console.log("employees: ", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="employee-profiles">
      <h2>Employee Profiles</h2>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div className="employee-container">
          {employees.map((employee) => (
            <EmployeeSummary key={employee._id} employee={employee} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeProfiles;
