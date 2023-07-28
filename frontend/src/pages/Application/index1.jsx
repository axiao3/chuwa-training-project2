/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import defaultProfileImage from "../../assets/default_profile.jpg";
import PhoneNumber from "../../components/PhoneNumber";
import "./style.css";

export default function Application() {
  const cellphoneRegex =
    /^(\+1|1)?\s?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      preferredName: "",
      imagePreview: "",
      streetName: "",
      apt: "",
      city: "",
      state: "",
      zip: "",
      cellphone: "",
      workphone: "",
      email: "xli199911@gmail.com",
      ssn: "",
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
      emergencyFirstName: "",
      emergencyLastName: "",
      emergencyMiddleName: "",
      emergencyPhone: "",
      emergencyEmail: "",
      emergencyRelationship: "",
      imagePreviewName: "",
      driverLicenseName: "",
      workAuthorizationName: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email format").required("Required"),
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      streetName: yup.string().required("Required"),
      apt: yup.string().required("Required"),
      city: yup.string().required("Required"),
      state: yup.string().required("Required"),
      zip: yup.string().required("Required"),
      cellphone: yup
        .string()
        .matches(cellphoneRegex, "Invalid phone number")
        .required("Required"),
      //   workphone: yup
      //     .string()
      //     .matches(cellphoneRegex, "Invalid US phone number format"),
      //   ssn: yup.string().required("Required"),
      //   dateOfBirth: yup.string().required("Required"),
      //   gender: yup.string().required("Required"),
      //   residentStatus: yup.string().required("Required"),
      //   authorizationType: yup.string().required("Required"),
      //   otherVisaTitle: yup.string().when("authorizationType", {
      //     is: "Other", // or whatever condition makes otherVisaTitle required
      //     then: yup.string().required("Required"),
      //     otherwise: yup.string().notRequired(),
      //   }),
      //   workAuthorization: yup.string().when("authorizationType", {
      //     is: "F1(CPT/OPT)", // or whatever condition makes otherVisaTitle required
      //     then: yup.string().required("Required"),
      //     otherwise: yup.string().notRequired(),
      //   }),
      //   referenceFirstName: yup.string().required("Required"),
      //   referenceLastName: yup.string().required("Required"),
      //   referenceRelationship: yup.string().required("Required"),
      //   emergencyFirstName: yup.string().required("Required"),
      //   emergencyLastName: yup.string().required("Required"),
      //   emergencyRelationship: yup.string().required("Required")
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    formik.setFieldValue("imagePreviewName", file.name);
    reader.onloadend = () => {
      // Update Formik's state
      formik.setFieldValue("imagePreview", reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
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
          src={formik.values.imagePreview || defaultProfileImage}
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
        <input
          type="text"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          disabled
        />
        {/* {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null} */}
      </div>

      <div>
        <label className="required" htmlFor="firstName">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div>{formik.errors.firstName}</div>
        ) : null}
      </div>

      <div>
        <label className="required" htmlFor="lastName">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div>{formik.errors.lastName}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="middleName">Middle Name</label>
        <input
          type="text"
          id="middleName"
          value={formik.values.middleName}
          onChange={formik.handleChange}
          //   onBlur={formik.handleBlur}
        />
      </div>

      <div>
        <label htmlFor="preferredName">Preferred Name</label>
        <input
          type="text"
          id="preferredName"
          value={formik.values.preferredName}
          onChange={formik.handleChange}
          //   onBlur={formik.handleBlur}
        />
      </div>

      <div>
        <label className="required" htmlFor="streetName">
          Street Name
        </label>
        <input
          type="text"
          id="streetName"
          value={formik.values.streetName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.streetName && formik.errors.streetName ? (
          <div>{formik.errors.streetName}</div>
        ) : null}
      </div>

      <div>
        <label className="required" htmlFor="apt">
          building/apt #
        </label>
        <input
          type="text"
          id="apt"
          value={formik.values.apt}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.apt && formik.errors.apt ? (
          <div>{formik.errors.apt}</div>
        ) : null}
      </div>

      <div>
        <label className="required" htmlFor="city">
          city
        </label>
        <input
          type="text"
          id="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.city && formik.errors.city ? (
          <div>{formik.errors.city}</div>
        ) : null}
      </div>

      <div>
        <label className="required" htmlFor="state">
          state
        </label>
        <input
          type="text"
          id="state"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.state && formik.errors.state ? (
          <div>{formik.errors.state}</div>
        ) : null}
      </div>

      <div>
        <label className="required" htmlFor="zip">
          zip
        </label>
        <input
          type="text"
          id="zip"
          value={formik.values.zip}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.zip && formik.errors.zip ? (
          <div>{formik.errors.zip}</div>
        ) : null}
      </div>

      <div>
        <label className="required" htmlFor="cellphone">
          Cell Phone Number
        </label>
        <input
          type="text"
          id="cellphone"
          value={formik.values.cellphone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.cellphone && formik.errors.cellphone ? (
          <div>{formik.errors.cellphone}</div>
        ) : null}
      </div>

      <div>
        <label className="required" htmlFor="workphone">
          Work Phone Number
        </label>
        <input
          type="text"
          id="workphone"
          value={formik.values.workphone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.workphone && formik.errors.workphone ? (
          <div>{formik.errors.workphone}</div>
        ) : null}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
