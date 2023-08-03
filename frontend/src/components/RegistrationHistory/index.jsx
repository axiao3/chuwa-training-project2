/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { getRegistrationHistory } from "../../services/hiring";
import styles from './style.module.css';
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
        <div className={styles.loadingState}>
            <Loading />
        </div>
      ) : (
        registrations && (
          <div className={styles.registrationContainer}>
            <h2 className={styles.header}>Registration History</h2>
            <table className={styles.tableStyle}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Email Address</th>
                  <th className={styles.tableHeader}>Person's Name</th>
                  <th className={styles.tableHeader}>Registration Link</th>
                  <th className={styles.tableHeader}>Is Submitted</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((registration, index) => (
                  <tr key={index} className={styles.rowHover}>
                    <td className={styles.tableCell}>{registration.email}</td>
                    <td className={styles.tableCell}>{registration.username}</td>
                    <td className={`${styles.tableCell} registrationLink`}>{registration.registrationLink}</td>
                    <td className={styles.tableCell}>{registration.isSubmitted ? "Yes" : "No"}</td>
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
