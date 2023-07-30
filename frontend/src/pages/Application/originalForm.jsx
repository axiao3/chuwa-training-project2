/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
import defaultProfileImage from "../../assets/default_profile.jpg";
import "./style.css";
import { createApplicationAction } from "../../app/applicationSlice";

export default function Application() {
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
    firstName: "",
    lastName: "",
    middleName: "",
    preferredName: "",
    profilePicture: "",
    streetName: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    cellphone: "",
    workphone: "",
    email: user.emailReceivedLink,
    SSN: "",
    driverLicense: "",
    dateOfBirth: "",
    gender: "",
    residentStatus: "",
    authorizationType: "",
    otherVisaTitle: "",
    workAuthorization: "",
    startDate: "",
    endDate: "",
    referenceFirstName: "",
    referenceLastName: "",
    referenceMiddleName: "",
    referencePhone: "",
    referenceEmail: "",
    referenceRelationship: "",
    emergencyContacts: [initialEmergencyContact],
    profilePictureName: "",
    driverLicenseName: "",
    workAuthorizationName: "",
  };

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
    // delete values["residentStatus"];
    values.user = user.id;
    console.log("values:", values);
    dispatch(createApplicationAction(values)).then((action) => {
      if (createApplicationAction.fulfilled.match(action)) {
        alert("Submit Success!");
        // navigate("/home");
      }
    });
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
          e.preventDefault();
          let file = e.target.files[0];
          const base64 = await convertToBase64(file);
          if (file) {
            formik.setFieldValue("profilePictureName", file.name);
            formik.setFieldValue("profilePicture", base64);
            // formik.setFieldValue("profilePicture", URL.createObjectURL(file));
          }
        };

        const handleDriverLicenseChange = async (e) => {
          e.preventDefault();
          let file = e.target.files[0];
          const base64 = await convertToBase64(file);
          if (file) {
            formik.setFieldValue("driverLicenseName", file.name);
            formik.setFieldValue("driverLicense", base64);
          }
        };

        const handleWorkAuthorizationChange = async (e) => {
          e.preventDefault();
          let file = e.target.files[0];
          const base64 = await convertToBase64(file);
          if (file) {
            formik.setFieldValue("workAuthorizationName", file.name);
            formik.setFieldValue("workAuthorization",base64);
          }
        };

        return (
          <Form>
            <p>
              <span className="asterisk">*</span> stands for required field
            </p>
            <div>
              <label className="custom-file-upload">
                <input
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  name="profileImage"
                />
                Upload Profile Picture
              </label>
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
                Email
              </label>
              <Field type="text" id="email" name="email" disabled />
            </div>

            <div>
              <label className="required" htmlFor="firstName">
                First Name
              </label>
              <Field type="text" id="firstName" name="firstName" />
              <ErrorMessage
                component="span"
                className="errorMessage"
                name="firstName"
              />
            </div>

            <div>
              <label className="required" htmlFor="lastName">
                Last Name
              </label>
              <Field type="text" id="lastName" name="lastName" />
              <ErrorMessage
                component="span"
                className="errorMessage"
                name="lastName"
              />
            </div>

            <div>
              <label htmlFor="middleName">Middle Name</label>
              <Field type="text" id="middleName" name="middleName" />
            </div>

            <div>
              <label htmlFor="preferredName">Preferred Name</label>
              <Field type="text" id="preferredName" name="preferredName" />
            </div>

            <div>
              <label className="required" htmlFor="streetName">
                Street Name
              </label>
              <Field type="text" id="streetName" name="streetName" />
              <ErrorMessage
                component="span"
                className="errorMessage"
                name="streetName"
              />
            </div>

            <div>
              <label className="required" htmlFor="apt">
                building/apt #
              </label>
              <Field type="text" id="apt" name="apt" />
              <ErrorMessage
                component="span"
                className="errorMessage"
                name="apt"
              />
            </div>

            <div>
              <label className="required" htmlFor="city">
                city
              </label>
              <Field type="text" id="city" name="city" />
              <ErrorMessage
                component="span"
                className="errorMessage"
                name="city"
              />
            </div>

            <div>
              <label className="required" htmlFor="state">
                State
              </label>
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
            </div>

            <div>
              <label className="required" htmlFor="zip">
                zip
              </label>
              <Field type="text" id="zip" name="zip" />
              <ErrorMessage
                component="span"
                className="errorMessage"
                name="zip"
              />
            </div>

            <div>
              <label className="required" htmlFor="cellphone">
                Cell Phone Number
              </label>
              <Field type="text" id="cellphone" name="cellphone" />
              <ErrorMessage
                component="span"
                className="errorMessage"
                name="cellphone"
              />
            </div>

            <div>
              <label htmlFor="workphone">Work Phone Number</label>
              <Field type="text" id="workphone" name="workphone" />
              <ErrorMessage
                component="span"
                className="errorMessage"
                name="workphone"
              />
            </div>

            <div>
              <label className="required" htmlFor="SSN">
                SSN
              </label>
              <Field type="text" id="SSN" name="SSN" />
              <ErrorMessage
                component="span"
                className="errorMessage"
                name="SSN"
              />
            </div>

            <div>
              <label htmlFor="driver_license">Upload Driver License</label>
              <Field
                name="driver_license" // different from driverLicense
                type="file"
                onChange={handleDriverLicenseChange}
                // accept=".pdf"
              />
            </div>

            <div>
              <label className="required" htmlFor="dateOfBirth">
                date of birth
              </label>
              <Field type="date" id="dateOfBirth" name="dateOfBirth" />
              <ErrorMessage
                component="span"
                className="errorMessage"
                name="dateOfBirth"
              />
            </div>

            <div>
              <label className="required" htmlFor="gender">
                gender
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
            </div>

            <div>
              <label className="required" htmlFor="residentStatus">
                Permanent resident or citizen of the U.S.?
              </label>
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
            </div>

            {formik.values.residentStatus === "yes" && (
              <div>
                <label className="required" htmlFor="authorizationType_GC">
                  Green Card or Citizen
                </label>
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
              </div>
            )}

            {formik.values.residentStatus === "no" && (
              <div>
                <label className="required" htmlFor="authorizationType">
                  What is your work authorization
                </label>
                <Field
                  as="select"
                  name="authorizationType"
                  id="authorizationType"
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

                {formik.values.authorizationType === "F1(CPT/OPT)" && (
                  <div>
                    <label className="required" htmlFor="F1">
                      Upload OPT Receipt
                    </label>
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
                  </div>
                )}

                {formik.values.authorizationType === "Other" && (
                  <div>
                    <label className="required" htmlFor="otherVisaTitle">
                      specify the visa title
                    </label>
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
                  </div>
                )}
              </div>
            )}

            <div>
              <label htmlFor="startDate">Start Date</label>
              <Field type="date" id="startDate" name="startDate" />
            </div>

            <div>
              <label htmlFor="endDate">End Date</label>
              <Field type="date" id="endDate" name="endDate" />
            </div>

            <p>Reference</p>
            <div>
              <label className="required" htmlFor="referenceFirstName">
                First Name
              </label>
              <Field
                type="text"
                id="referenceFirstName"
                name="referenceFirstName"
              />
              <ErrorMessage
                component="span"
                className="errorMessage"
                name="referenceFirstName"
              />
            </div>

            <div>
              <label className="required" htmlFor="referenceLastName">
                Last Name
              </label>
              <Field
                type="text"
                id="referenceLastName"
                name="referenceLastName"
              />
              <ErrorMessage
                component="span"
                className="errorMessage"
                name="referenceLastName"
              />
            </div>

            <div>
              <label htmlFor="referenceMiddleName">Middle Name</label>
              <Field
                type="text"
                id="referenceMiddleName"
                name="referenceMiddleName"
              />
            </div>

            <div>
              <label htmlFor="referencePhone">Phone</label>
              <Field type="text" id="referencePhone" name="referencePhone" />
              <ErrorMessage
                component="span"
                className="errorMessage"
                name="referencePhone"
              />
            </div>

            <div>
              <label htmlFor="referenceEmail">Email</label>
              <Field type="text" id="referenceEmail" name="referenceEmail" />
              <ErrorMessage
                component="span"
                className="errorMessage"
                name="referenceEmail"
              />
            </div>

            <div>
              <label className="required" htmlFor="referenceRelationship">
                Relationship
              </label>
              <Field
                type="text"
                id="referenceRelationship"
                name="referenceRelationship"
              />
              <ErrorMessage
                component="span"
                className="errorMessage"
                name="referenceRelationship"
              />
            </div>

            <p>Emergency Contacts</p>
            <FieldArray name="emergencyContacts">
              {({ remove, push }) => (
                <div>
                  {formik.values.emergencyContacts.length > 0 &&
                    formik.values.emergencyContacts.map((contact, index) => (
                      <div key={index}>
                        <div>
                          <label className="required">First Name</label>
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
                          <label className="required">Last Name</label>
                          <Field name={`emergencyContacts.${index}.lastName`} />
                          <ErrorMessage
                            component="span"
                            className="errorMessage"
                            name={`emergencyContacts.${index}.lastName`}
                          />
                        </div>
                        <div>
                          <label>Middle Name</label>
                          <Field
                            name={`emergencyContacts.${index}.middleName`}
                          />
                        </div>
                        <div>
                          <label>phone</label>
                          <Field name={`emergencyContacts.${index}.phone`} />
                          <ErrorMessage
                            component="span"
                            className="errorMessage"
                            name={`emergencyContacts.${index}.phone`}
                          />
                        </div>
                        <div>
                          <label>email</label>
                          <Field name={`emergencyContacts.${index}.email`} />
                          <ErrorMessage
                            component="span"
                            className="errorMessage"
                            name={`emergencyContacts.${index}.email`}
                          />
                        </div>
                        <div>
                          <label className="required">relationship</label>
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

            <p>Uploaded Summary</p>
            <div>
              {formik.values.profilePictureName ? (
                <div>Profile picture: {formik.values.profilePictureName}</div>
              ) : null}
              {formik.values.driverLicenseName ? (
                <div>Driver license: {formik.values.driverLicenseName}</div>
              ) : null}
              {formik.values.workAuthorizationName ? (
                <div>
                  Work authorization: {formik.values.workAuthorizationName}
                </div>
              ) : null}
            </div>

            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
}
