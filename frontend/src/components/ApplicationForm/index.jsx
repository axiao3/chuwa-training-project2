/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
import defaultProfileImage from "../../assets/default_profile.jpg";
import style from "./style.module.css";
import {
  createApplicationAction,
  updateApplicationAction,
} from "../../app/applicationSlice";
import { getUserByIdAction } from "../../app/userSlice";
import CustomField from "./CustomField";

export default function ApplicationForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: "/application" } });
    }
  }, [isAuthenticated, navigate]);

  const initialEmergencyContact = {
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    email: "",
    relationship: "",
  };

  const initialValues = {
    firstName: props.firstName || "",
    lastName: props.lastName || "",
    middleName: props.middleName || "",
    preferredName: props.preferredName || "",
    profilePicture: props.profilePicture || "",
    streetName: props.streetName || "",
    apt: props.apt || "",
    city: props.city || "",
    state: props.state || "",
    zip: props.zip || "",
    cellphone: props.cellphone || "",
    workphone: props.workphone || "",
    email: user.emailReceivedLink,
    SSN: props.SSN || "",
    driverLicense: props.driverLicense || "",
    dateOfBirth: props.dateOfBirth || "",
    gender: props.gender || "",
    residentStatus: props.residentStatus || "",
    authorizationType: props.authorizationType || "",
    otherVisaTitle: props.otherVisaTitle || "",
    workAuthorization: props.workAuthorization || "",
    startDate: props.startDate || "",
    endDate: props.endDate || "",
    referenceFirstName: props.referenceFirstName || "",
    referenceLastName: props.referenceLastName || "",
    referenceMiddleName: props.referenceMiddleName || "",
    referencePhone: props.referencePhone || "",
    referenceEmail: props.referenceEmail || "",
    referenceRelationship: props.referenceRelationship || "",
    emergencyContacts: props.emergencyContacts || [initialEmergencyContact],
    profilePictureName: props.profilePictureName || "",
    driverLicenseName: props.driverLicenseName || "",
    workAuthorizationName: props.workAuthorizationName || "",
  };

  const US_STATES = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
    "DC",
  ];

  const cellphoneRegex =
    /^(\+1|1)?\s?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;

  const validationSchema = yup.object({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    streetName: yup.string().required("Required"),
    apt: yup.string().required("Required"),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    zip: yup
      .string()
      .matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, "Invalid ZIP Code format")
      .required("Required"),
    cellphone: yup
      .string()
      .matches(cellphoneRegex, "Invalid phone number")
      .required("Required"),
    workphone: yup.string().matches(cellphoneRegex, "Invalid phone number"),
    SSN: yup
      .string()
      .matches(/^(?:\d{3}-\d{2}-\d{4}|\d{9})$/, "Invalid SSN format")
      .required("Required"),
    dateOfBirth: yup.string().required("Required"),
    gender: yup.string().required("Required"),
    residentStatus: yup.string().required("Required"),
    authorizationType: yup.string().required("Required"),
    // otherVisaTitle: yup.string().when("authorizationType", {
    //   is: "Other",
    //   then: yup.string().required("Required"),
    //   otherwise: yup.string().notRequired(),
    // }),
    // workAuthorization: yup.string().when("authorizationType", {
    //   is: "F1(CPT/OPT)",
    //   then: yup.string().required("Required"),
    //   otherwise: yup.string().notRequired(),
    // }),
    referenceFirstName: yup.string().required("Required"),
    referenceLastName: yup.string().required("Required"),
    referencePhone: yup
      .string()
      .matches(cellphoneRegex, "Invalid phone number"),
    referenceEmail: yup.string().email("Invalid email format"),
    referenceRelationship: yup.string().required("Required"),
    emergencyContacts: yup.array().of(
      yup.object({
        firstName: yup.string().required("Required"),
        lastName: yup.string().required("Required"),
        phone: yup.string().matches(cellphoneRegex, "Invalid phone number"),
        email: yup.string().email("Invalid email format"),
        relationship: yup.string().required("Required"),
      })
    ),
  });

  const onSubmit = (values) => {
    // alert(values);
    values.user = user.id;
    console.log("values:", values);
    if (props.status === "never submitted") {
      dispatch(createApplicationAction(values)).then((action) => {
        if (createApplicationAction.fulfilled.match(action)) {
          dispatch(getUserByIdAction({ id: user.id })).then((action) => {
            if (getUserByIdAction.fulfilled.match(action)) {
              alert("Submit Success!");
              navigate("/home");
            }
          });
        }
      });
    } else if (props.status === "rejected") {
      dispatch(updateApplicationAction(values)).then((action) => {
        if (updateApplicationAction.fulfilled.match(action)) {
          dispatch(getUserByIdAction({ id: user.id })).then((action) => {
            if (getUserByIdAction.fulfilled.match(action)) {
              alert("Update Success!");
              navigate("/home");
            }
          });
        }
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const convertToBase64 = (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          });
        };

        const handleImageChange = async (e) => {
          let file = e.target.files[0];
          if (file) {
            e.preventDefault();
            const base64 = await convertToBase64(file);
            formik.setFieldValue("profilePictureName", file.name);
            formik.setFieldValue("profilePicture", base64);
            // formik.setFieldValue("profilePicture", URL.createObjectURL(file));
          } else {
            // If no file was selected, reset the values
            formik.setFieldValue("profilePictureName", "");
            formik.setFieldValue("profilePicture", "");
          }
        };

        const handleDriverLicenseChange = async (e) => {
          let file = e.target.files[0];
          if (file) {
            e.preventDefault();
            const base64 = await convertToBase64(file);
            formik.setFieldValue("driverLicenseName", file.name);
            formik.setFieldValue("driverLicense", base64);
          } else {
            // If no file was selected, reset the values
            formik.setFieldValue("driverLicenseName", "");
            formik.setFieldValue("driverLicense", "");
          }
        };

        const handleWorkAuthorizationChange = async (e) => {
          let file = e.target.files[0];
          if (file) {
            e.preventDefault();
            const base64 = await convertToBase64(file);
            formik.setFieldValue("workAuthorizationName", file.name);
            formik.setFieldValue("workAuthorization", base64);
          } else {
            // If no file was selected, reset the values
            formik.setFieldValue("profilePictureName", "");
            formik.setFieldValue("profilePicture", "");
          }
        };

        return (
          <Form>
            <h2 style={{ color: "red" }}>Status: {props.status}</h2>
            <p>
              <span className="asterisk">*</span> stands for required field
            </p>
            <div>
              {props.status !== "pending" ? (
                <label className="custom-file-upload">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    name="profileImage"
                  />
                  Upload Profile Picture
                </label>
              ) : (
                "Profile Picture: "
              )}

              <img
                src={formik.values.profilePicture || defaultProfileImage}
                alt="Uploaded Preview"
                style={{
                  maxWidth: "50px",
                  maxHeight: "50px",
                  border: "1px solid #ddd",
                  marginTop: "10px",
                }}
              />
            </div>

            <div>
              <label className="required" htmlFor="email">
                Email:
              </label>
              <Field type="text" id="email" name="email" disabled />
            </div>

            <CustomField
              status={props.status}
              label="First Name:"
              required={true}
              name="firstName"
              type="text"
            />

            <CustomField
              status={props.status}
              label="Last Name:"
              required={true}
              name="lastName"
              type="text"
            />

            <CustomField
              status={props.status}
              label="Middle Name:"
              required={false}
              name="middleName"
              type="text"
            />

            <CustomField
              status={props.status}
              label="Preferred Name:"
              required={false}
              name="preferredName"
              type="text"
            />

            <CustomField
              status={props.status}
              label="Street Name:"
              required={true}
              name="streetName"
              type="text"
            />

            <CustomField
              status={props.status}
              label="building/apt #:"
              required={true}
              name="apt"
              type="text"
            />

            <CustomField
              status={props.status}
              label="city:"
              required={true}
              name="city"
              type="text"
            />

            <div>
              <label className="required" htmlFor="state">
                State
              </label>
              {props.status !== "pending" ? (
                <>
                  <Field as="select" id="state" name="state">
                    <option value="">Select</option>
                    {US_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    component="span"
                    className="errorMessage"
                    name="state"
                  />
                </>
              ) : (
                <Field type="text" id="state" name="state" disabled />
              )}
            </div>

            <CustomField
              status={props.status}
              label="zip:"
              required={true}
              name="zip"
              type="text"
            />

            <CustomField
              status={props.status}
              label="Cell Phone Number:"
              required={true}
              name="cellphone"
              type="text"
            />

            <CustomField
              status={props.status}
              label="Work Phone Number:"
              required={false}
              name="workphone"
              type="text"
            />

            <CustomField
              status={props.status}
              label="SSN:"
              required={true}
              name="SSN"
              type="text"
            />

            <div>
              <label htmlFor="driver_license ">Upload Driver License:</label>
              {props.status !== "pending" && (
                <Field
                  id="driver_license"
                  name="driver_license" // different from driverLicense
                  type="file"
                  onChange={handleDriverLicenseChange}
                  // accept=".pdf"
                />
              )}
              {formik.values.driverLicenseName ? (
                <a
                  href={formik.values.driverLicense}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <button type="button">
                    {formik.values.driverLicenseName}
                  </button>
                </a>
              ) : null}
            </div>

            <CustomField
              status={props.status}
              label="date of birth:"
              required={true}
              name="dateOfBirth"
              type="date"
            />

            <div>
              {props.status !== "pending" ? (
                <>
                  <label className="required" htmlFor="gender">
                    gender:
                  </label>
                  <Field as="select" id="gender" name="gender">
                    <option value="">Select</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="I do not wish to answer">
                      I do not wish to answer
                    </option>
                  </Field>
                  <ErrorMessage
                    component="span"
                    className="errorMessage"
                    name="gender"
                  />
                </>
              ) : (
                <CustomField
                  status={props.status}
                  label="gender:"
                  type="select"
                  name="gender"
                  required={true}
                />
              )}
            </div>

            <div>
              <label className="required" htmlFor="residentStatus">
                Permanent resident or citizen of the U.S.?
              </label>
              {props.status !== "pending" ? (
                <>
                  <Field as="select" id="residentStatus" name="residentStatus">
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Field>
                  <ErrorMessage
                    component="span"
                    className="errorMessage"
                    name="residentStatus"
                  />
                </>
              ) : (
                <Field
                  type="select"
                  id="residentStatus"
                  name="residentStatus"
                  disabled
                />
              )}
            </div>

            {formik.values.residentStatus === "yes" && (
              <div>
                <label className="required" htmlFor="authorizationType_GC">
                  Green Card or Citizen:
                </label>
                {props.status !== "pending" ? (
                  <>
                    <Field
                      as="select"
                      name="authorizationType"
                      id="authorizationType_GC"
                    >
                      <option value="">Select</option>
                      <option value="Green Card">Green Card</option>
                      <option value="Citizen">Citizen</option>
                    </Field>
                    <ErrorMessage
                      component="span"
                      className="errorMessage"
                      name="authorizationType"
                    />
                  </>
                ) : (
                  <Field
                    type="select"
                    id="authorizationType_GC"
                    name="authorizationType"
                    disabled
                  />
                )}
              </div>
            )}

            {formik.values.residentStatus === "no" && (
              <div>
                <label className="required" htmlFor="authorizationType">
                  What is your work authorization:
                </label>
                {props.status !== "pending" ? (
                  <>
                    <Field
                      as="select"
                      name="authorizationType"
                      id="authorizationType_OPT"
                    >
                      <option value="">Select work authorization</option>
                      <option value="H1-B">H1-B</option>
                      <option value="L2">L2</option>
                      <option value="F1(CPT/OPT)">F1(CPT/OPT)</option>
                      <option value="H4">H4</option>
                      <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage
                      component="span"
                      className="errorMessage"
                      name="authorizationType"
                    />
                  </>
                ) : (
                  <Field
                    type="select"
                    id="authorizationType_OPT"
                    name="authorizationType"
                    disabled
                  />
                )}

                {formik.values.authorizationType === "F1(CPT/OPT)" && (
                  <div>
                    <label className="required" htmlFor="F1">
                      Upload OPT Receipt:
                    </label>
                    {props.status !== "pending" && (
                      <>
                        <Field
                          name="work_authorization"
                          type="file"
                          onChange={handleWorkAuthorizationChange}
                          //   accept=".pdf"
                          required
                        />
                        <ErrorMessage
                          component="span"
                          className="errorMessage"
                          name="workAuthorization"
                        />
                      </>
                    )}
                    {formik.values.workAuthorizationName ? (
                      <a
                        href={formik.values.workAuthorization}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <button type="button">
                          {formik.values.workAuthorizationName}
                        </button>
                      </a>
                    ) : null}
                  </div>
                )}

                {formik.values.authorizationType === "Other" && (
                  <div>
                    <label className="required" htmlFor="otherVisaTitle">
                      specify the visa title:
                    </label>
                    {props.status !== "pending" ? (
                      <>
                        <Field
                          name="otherVisaTitle"
                          type="text"
                          placeholder="Specify the visa title"
                          required
                        />
                        <ErrorMessage
                          component="span"
                          className="errorMessage"
                          name="otherVisaTitle"
                        />
                      </>
                    ) : (
                      <Field id="otherVisaTitle" name="otherVisaTitle" type="text" disabled/>
                    )}
                  </div>
                )}
              </div>
            )}

            <CustomField
              status={props.status}
              label="Start Date:"
              required={false}
              name="startDate"
              type="date"
            />

            <CustomField
              status={props.status}
              label="End Date:"
              required={false}
              name="endDate"
              type="date"
            />

            <p>Reference</p>
            <CustomField
              status={props.status}
              label="First Name:"
              required={true}
              name="referenceFirstName"
              type="text"
            />

            <CustomField
              status={props.status}
              label="Last Name:"
              required={true}
              name="referenceLastName"
              type="text"
            />

            <CustomField
              status={props.status}
              label="Middle Name:"
              required={false}
              name="referenceMiddleName"
              type="text"
            />

            <CustomField
              status={props.status}
              label="Phone:"
              required={false}
              name="referencePhone"
              type="text"
            />

            <CustomField
              status={props.status}
              label="Email:"
              required={false}
              name="referenceEmail"
              type="text"
            />

            <CustomField
              status={props.status}
              label="Relationship:"
              required={true}
              name="referenceRelationship"
              type="text"
            />

            <p>Emergency Contacts</p>

            {props.status !== "pending" ? (
              <FieldArray name="emergencyContacts">
                {({ remove, push }) => (
                  <div>
                    {formik.values.emergencyContacts.length > 0 &&
                      formik.values.emergencyContacts.map((contact, index) => (
                        <div key={index}>
                          <div>{`Emergency Contact ${index + 1}`}</div>
                          <div>
                            <label className="required">First Name:</label>
                            <Field
                              name={`emergencyContacts.${index}.firstName`}
                            />
                            <ErrorMessage
                              component="span"
                              className="errorMessage"
                              name={`emergencyContacts.${index}.firstName`}
                            />
                          </div>
                          <div>
                            <label className="required">Last Name:</label>
                            <Field
                              name={`emergencyContacts.${index}.lastName`}
                            />
                            <ErrorMessage
                              component="span"
                              className="errorMessage"
                              name={`emergencyContacts.${index}.lastName`}
                            />
                          </div>
                          <div>
                            <label>Middle Name:</label>
                            <Field
                              name={`emergencyContacts.${index}.middleName`}
                            />
                          </div>
                          <div>
                            <label>phone:</label>
                            <Field name={`emergencyContacts.${index}.phone`} />
                            <ErrorMessage
                              component="span"
                              className="errorMessage"
                              name={`emergencyContacts.${index}.phone`}
                            />
                          </div>
                          <div>
                            <label>email:</label>
                            <Field name={`emergencyContacts.${index}.email`} />
                            <ErrorMessage
                              component="span"
                              className="errorMessage"
                              name={`emergencyContacts.${index}.email`}
                            />
                          </div>
                          <div>
                            <label className="required">relationship:</label>
                            <Field
                              name={`emergencyContacts.${index}.relationship`}
                            />
                            <ErrorMessage
                              component="span"
                              className="errorMessage"
                              name={`emergencyContacts.${index}.relationship`}
                            />
                          </div>
                          <button type="button" onClick={() => remove(index)}>
                            Remove
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() => push(initialEmergencyContact)}
                    >
                      +Add
                    </button>
                  </div>
                )}
              </FieldArray>
            ) : (
              formik.values.emergencyContacts.map(
                (oneEmergencyObject, index) => {
                  return (
                    <div key={index}>
                      <div>{`Emergency Contact ${index + 1}`}</div>
                      <div>
                        <label>First Name:</label>
                        <input value={oneEmergencyObject.firstName} disabled/>
                      </div>
                      <div>
                        <label>Last Name:</label>
                        <input value={oneEmergencyObject.lastName} disabled/>
                      </div>
                      <div>
                        <label>Middle Name:</label>
                        <input value={oneEmergencyObject.middleName} disabled/>
                      </div>
                      <div>
                        <label>phone:</label>
                        <input value={oneEmergencyObject.phone} disabled/>
                      </div>
                      <div>
                        <label>email:</label>
                        <input value={oneEmergencyObject.email} disabled/>
                      </div>
                      <div>
                        <label>relationship:</label>
                        <input value={oneEmergencyObject.relationship} disabled/>
                      </div>
                      <br></br>
                    </div>
                  );
                }
              )
            )}

            <p>Uploaded Summary</p>
            <div>
              {formik.values.profilePictureName ? (
                <div>
                  Profile picture:
                  <a
                    href={formik.values.profilePicture}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <button type="button">
                      {formik.values.profilePictureName}
                    </button>
                  </a>
                </div>
              ) : null}

              {formik.values.driverLicenseName ? (
                <div>
                  Driver license:
                  <a
                    href={formik.values.driverLicense}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <button type="button">
                      {formik.values.driverLicenseName}
                    </button>
                  </a>
                </div>
              ) : null}

              {formik.values.workAuthorizationName ? (
                <div>
                  Work authorization:
                  <a
                    href={formik.values.workAuthorization}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <button type="button">
                      {formik.values.workAuthorizationName}
                    </button>
                  </a>
                </div>
              ) : null}
            </div>

            {props.status !== "pending" && (
              <button type="submit">Submit</button>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}
