/* eslint-disable no-unused-vars */
import React, { useState } from "react";

export default function ApplicantName() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [middleName, setMiddleName] = useState(null);
  const [preferredName, setPreferredName] = useState(null);

  return (
    <div>
      <div>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first_name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last_name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="middle_name">Middle Name</label>
        <input
          type="text"
          id="middle_name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="preferred_name">preferred Name</label>
        <input
          type="text"
          id="preferred_name"
          value={preferredName}
          onChange={(e) => setPreferredName(e.target.value)}
        />
      </div>
    </div>
  );
}
