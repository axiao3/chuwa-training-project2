/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import defaultProfileImage from "../../assets/default_profile.jpg";
import PhoneNumber from "../../components/PhoneNumber";
import "./style.css";

export default function Application() {
  const US_STATES = [
    "AL", "AK", "AZ", "AR", "CA", 
    "CT", "DE", "FL", "GA", "HI", 
    "ID", "IL", "IN", "IA", "KS", 
    "KY", "LA", "ME", "MD", "MA", 
    "MI", "MN", "MS", "MO", "MT", 
    "NE", "NV", "NH", "NJ", "NM",
    "NY", "NC", "ND", "OH", "OK", 
    "OR", "PA", "RI", "SC", "SD", 
    "TN", "TX", "UT", "VT", "VA", 
    "WA", "WV", "WI", "WY", "DC"
    ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [streetName, setStreetName] = useState(null);
  const [city, setCity] = useState(null);
  const [zip, setZip] = useState(null);
  const [apt, setApt] = useState(null);
  const [cellphone, setCellphone] = useState(null);
  const [workphone, setWorkphone] = useState(null);
  const [ssn, setSsn] = useState(null);
  const [driverLicense, setDriverLicense] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(null);
  const [residentStatus, setResidentStatus] = useState("");
  const [authorizationType, setAuthorizationType] = useState("");
  const [otherVisaTitle, setOtherVisaTitle] = useState("");
  const [optReceipt, setOptReceipt] = useState(null);
  const [workAuthorization, setWorkAuthorization] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [referenceFirstName, setReferenceFirstName] = useState("");
  const [referenceLastName, setReferenceLastName] = useState("");
  const [referenceMiddleName, setReferenceMiddleName] = useState("");
  const [referencePhone, setReferencePhone] = useState("");
  const [referenceEmail, setReferenceEmail] = useState("");
  const [referenceRelationship, setReferenceRelationship] = useState("");
  const [emergencyFirstName, setEmergencyFirstName] = useState("");
  const [emergencyLastName, setEmergencyLastName] = useState("");
  const [emergencyMiddleName, setEmergencyMiddleName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyEmail, setEmergencyEmail] = useState("");
  const [emergencyRelationship, setEmergencyRelationship] = useState("");

  const [imagePreviewName, setImagePreviewName] = useState(null);
  const [driverLicenseName, setDriverLicenseName] = useState(null);
  const [workAuthorizationName, setWorkAuthorizationName] = useState(null);

  console.log("imagePreview: ", imagePreview);
  console.log("workAuthorization: ", workAuthorization);
  console.log("driverLicense: ", driverLicense);

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    setImagePreviewName(file.name);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDriverLicenseChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (file) {
        setDriverLicenseName(file.name);
        setDriverLicense(URL.createObjectURL(file));
    }
  };

  const handleWorkAuthorizationChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (file) {
        setWorkAuthorizationName(file.name);
        setWorkAuthorization(URL.createObjectURL(file));
    }

    // URL.revokeObjectURL(workAuthorization);

  };

  const handleApplicationSubmit = () => {};

  return (
    <>
      <form onSubmit={handleApplicationSubmit}>
        <div>
          <label className="custom-file-upload">
            <input
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            Upload Profile Picture
          </label>
          <img
            src={imagePreview || defaultProfileImage}
            alt="Uploaded Preview"
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              border: "1px solid #ddd",
              marginTop: "10px",
            }}
          />
        </div>
        <div>
          <label className="required" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            //   value={email}
            //   onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <div>
            <label className="required" htmlFor="first_name">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="required" htmlFor="last_name">
              Last Name
            </label>
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
        <div>
          <div>
            <label className="required" htmlFor="street_name">
              street name
            </label>
            <input
              type="text"
              id="street_name"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
            />
          </div>
          <div>
            <label className="required" htmlFor="apt">
              building/apt #
            </label>
            <input
              type="text"
              id="apt"
              value={apt}
              onChange={(e) => setApt(e.target.value)}
            />
          </div>
          <div>
            <label className="required" htmlFor="city">
              city
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label className="required" htmlFor="state">
              state
            </label>
            <select id="state" name="state">
              <option value="">Select</option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="required" htmlFor="zip">
              zip
            </label>
            <input
              type="text"
              id="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
        </div>
        <>dasdsadasdasd</>
        <PhoneNumber />
        {/* <div>
          <div>
            <label htmlFor="cellphone">cell phone number</label>
            <input
              type="text"
              id="cellphone"
              value={cellphone}
              onChange={(e) => setCellphone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="workphone">work phone number</label>
            <input
              type="text"
              id="workphone"
              value={workphone}
              onChange={(e) => setWorkphone(e.target.value)}
            />
          </div>
        </div> */}
        <div>
          <div>
            <label className="required" htmlFor="ssn">
              SSN
            </label>
            <input
              type="text"
              id="ssn"
              value={ssn}
              onChange={(e) => setSsn(e.target.value)}
            />
          </div>
          <div>
            <div>Upload Driver License</div>
            <input
              type="file"
              onChange={handleDriverLicenseChange}
              //   accept=".pdf"
            />
          </div>
          <div>
            <label className="required" htmlFor="birth_date">
              date of birth
            </label>
            <input
              type="date"
              id="birth_date"
              value={dateOfBirth}
              onChange={(e) => {
                setDateOfBirth(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="required" htmlFor="gender">
              gender
            </label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <option value="">Select</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="I do not wish to answer">
                I do not wish to answer
              </option>
            </select>
          </div>
        </div>
        <div>
          <label className="required" htmlFor="residentStatus">
            Permanent resident or citizen of the U.S.?
          </label>
          <select
            id="residentStatus"
            value={residentStatus}
            onChange={(e) => setResidentStatus(e.target.value)}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {residentStatus === "yes" && (
            <div>
              <label className="required" htmlFor="authorizationType_GC">
                Green Card or Citizen
              </label>
              <select
                id="authorizationType_GC"
                value={authorizationType}
                onChange={(e) => setAuthorizationType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Green Card">Green Card</option>
                <option value="Citizen">Citizen</option>
              </select>
            </div>
          )}

          {residentStatus === "no" && (
            <div>
              <label className="required" htmlFor="authorizationType">
                What is your work authorization
              </label>
              <select
                id="authorizationType"
                value={authorizationType}
                onChange={(e) => setAuthorizationType(e.target.value)}
              >
                <option value="">Select work authorization</option>
                <option value="H1-B">H1-B</option>
                <option value="L2">L2</option>
                <option value="F1(CPT/OPT)">F1(CPT/OPT)</option>
                <option value="H4">H4</option>
                <option value="Other">Other</option>
              </select>

              {authorizationType === "F1(CPT/OPT)" && (
                <>
                  <label className="required" htmlFor="F1">
                    Upload OPT Receipt
                  </label>
                  <input
                    id="F1"
                    type="file"
                    onChange={handleWorkAuthorizationChange}
                    accept=".pdf"
                  />
                </>
              )}

              {authorizationType === "Other" && (
                <input
                  type="text"
                  value={otherVisaTitle}
                  onChange={(e) => setOtherVisaTitle(e.target.value)}
                  placeholder="Specify the visa title"
                />
              )}

              <label>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <label>End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          )}
        </div>
        <div>
          <div>
            <div>
              <label className="required" htmlFor="reference_first_name">
                First name
              </label>
              <input
                type="text"
                id="reference_first_name"
                value={referenceFirstName}
                onChange={(e) => setReferenceFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="required" htmlFor="reference_last_name">
                Last name
              </label>
              <input
                type="text"
                id="reference_last_name"
                value={referenceLastName}
                onChange={(e) => setReferenceLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="reference_middle_name">Middle name</label>
              <input
                type="text"
                id="reference_middle_name"
                value={referenceMiddleName}
                onChange={(e) => setReferenceMiddleName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="reference_phone">Phone</label>
              <input
                type="text"
                id="reference_phone"
                value={referencePhone}
                onChange={(e) => setReferencePhone(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="reference_email">Email</label>
              <input
                type="text"
                id="reference_email"
                value={referenceEmail}
                onChange={(e) => setReferenceEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="required" htmlFor="reference_relationship">
                relationship
              </label>
              <input
                type="text"
                id="reference_relationship"
                value={referenceRelationship}
                onChange={(e) => setReferenceRelationship(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div>
              <label className="required" htmlFor="emergency_first_name">
                First name
              </label>
              <input
                type="text"
                id="emergency_first_name"
                value={emergencyFirstName}
                onChange={(e) => setEmergencyFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="required" htmlFor="emergency_last_name">
                Last name
              </label>
              <input
                type="text"
                id="emergency_last_name"
                value={emergencyLastName}
                onChange={(e) => setEmergencyLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="emergency_middle_name">Middle name</label>
              <input
                type="text"
                id="emergency_middle_name"
                value={emergencyMiddleName}
                onChange={(e) => setEmergencyMiddleName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="emergency_phone">Phone</label>
              <input
                type="text"
                id="emergency_phone"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="emergency_email">Email</label>
              <input
                type="text"
                id="emergency_email"
                value={emergencyEmail}
                onChange={(e) => setEmergencyEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="required" htmlFor="emergency_relationship">
                relationship
              </label>
              <input
                type="text"
                id="emergency_relationship"
                value={emergencyRelationship}
                onChange={(e) => setEmergencyRelationship(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          {imagePreviewName ? (
            <div>Profile picture: {imagePreviewName}</div>
          ) : null}
          {driverLicenseName ? (
            <div>Driver license: {driverLicenseName}</div>
          ) : null}
          {workAuthorizationName ? (
            <div>Work authorization: {workAuthorizationName}</div>
          ) : null}
        </div>
        {/* <object
          data={workAuthorization}
          type="application/pdf"
          width="600"
          height="400"
        >
          PDF cannot be displayed.
        </object> */}
      </form>
    </>
  );
}
