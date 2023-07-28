/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./style.css"

export default function PhoneNumber() {
  const [cellphone, setCellphone] = useState("");
  const [workphone, setWorkphone] = useState("");
  const [cellphoneWarning, setCellphoneWarning] = useState("");
  const [cellphoneTouched, setCellphoneTouched] = useState(false);
  const [workphoneWarning, setWorkphoneWarning] = useState("");
  const [workphoneTouched, setWorkphoneTouched] = useState(false);

  const handleCellphoneBlur = () => {
    const cellphoneRegex = /^(\+1|1)?\s?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
    setCellphoneWarning(!cellphoneRegex.test(cellphone) ? "Invalid cellphone number" : null);
    setCellphoneTouched(true);
  };

  const handleWorkphoneBlur = () => {
    const workphoneRegex = /^(\+1|1)?\s?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
    setWorkphoneWarning(!workphoneRegex.test(workphone) ? "Invalid workphone number" : null);
    setWorkphoneTouched(true);
  };

  return (
    <div>
      <div>
        <label className="required" htmlFor="cellphone">cell phone number</label>
        <input
          type="text"
          id="cellphone"
          value={cellphone}
          onChange={(e) => setCellphone(e.target.value)}
          onBlur={handleCellphoneBlur}
        />
        {cellphoneTouched ? <div style={{color: 'red'}}>{cellphoneWarning}</div> : null}
      </div>
      <div>
        <label htmlFor="workphone">work phone number</label>
        <input
          type="text"
          id="workphone"
          value={workphone}
          onChange={(e) => setWorkphone(e.target.value)}
          onBlur={handleWorkphoneBlur}
        />
        {(workphone && workphoneTouched) ? <div style={{color: 'red'}}>{workphoneWarning}</div> : null}
      </div>
    </div>
  );
}
