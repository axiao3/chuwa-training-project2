/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { getRegistrationHistory } from "../../services/hiring";
import "./style.css";
import Loading from "../../utils/Loading";

export default function RegistrationHistory() {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch registrations from your express backend
    getRegistrationHistory().then((data) => {
      console.log("data: ", data);
      setRegistrations(data);
      setIsLoading(false);
      console.log("registrations: ", registrations);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        registrations && (
          <div>
            <h2>Registration History</h2>
            <table>
              <thead>
                <tr>
                  <th>Email Address</th>
                  <th>Person's Name</th>
                  <th>Registration Link</th>
                  <th>Is Submitted</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((registration, index) => (
                  <tr key={index}>
                    <td>{registration.email}</td>
                    <td>{registration.username}</td>
                    <td>{registration.registrationLink}</td>
                    <td>{registration.isSubmitted ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </>
  );
}
