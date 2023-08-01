/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
import "./style.css";
import { createApplicationAction } from "../../app/applicationSlice";
import { getApplicationById } from "../../services/application";
import ApplicationForm from "../../components/ApplicationForm";

export default function Application() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [applicationData, setApplicationData] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: "/application" } });
    } else {
      if (user.applicationStatus !== "never submitted") {
        getApplicationById(user.id).then((data) => {
          console.log("data: ", data);
          setApplicationData(data);
        });
      }
      //   if (user.applicationStatus === "pending") {
      //     getApplicationById(user.id).then((data) => {
      //       setApplicationData(data);     //set state is async
      //       // console.log("applicationData 1: ", applicationData);
      //     });
      //   }
      //   if (user.applicationStatus === "rejected") {
      //     getApplicationById(user.id).then((data) => setApplicationData(data));
      //   }
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    console.log("applicationData 2: ", applicationData);
  }, [applicationData]);

  return (
    <>
      {user.applicationStatus !== "never submitted" && applicationData ? (
        <ApplicationForm
          status={user.applicationStatus}
          firstName={applicationData.firstName}
          lastName={applicationData.lastName}
          middleName={applicationData.middleName}
          preferredName={applicationData.preferredName}
          profilePicture={applicationData.profilePicture}
          streetName={applicationData.streetName}
          apt={applicationData.apt}
          city={applicationData.city}
          state={applicationData.state}
          zip={applicationData.zip}
          cellphone={applicationData.cellphone}
          workphone={applicationData.workphone}
          SSN={applicationData.SSN}
          driverLicense={applicationData.driverLicense}
          dateOfBirth={applicationData.dateOfBirth}
          gender={applicationData.gender}
          residentStatus={applicationData.residentStatus}
          authorizationType={applicationData.authorizationType}
          otherVisaTitle={applicationData.otherVisaTitle}
          workAuthorization={applicationData.workAuthorization}
          startDate={applicationData.startDate}
          endDate={applicationData.endDate}
          referenceFirstName={applicationData.referenceFirstName}
          referenceLastName={applicationData.referenceLastName}
          referenceMiddleName={applicationData.referenceMiddleName}
          referencePhone={applicationData.referencePhone}
          referenceEmail={applicationData.referenceEmail}
          referenceRelationship={applicationData.referenceRelationship}
          emergencyContacts={applicationData.emergencyContacts}
          profilePictureName={applicationData.profilePictureName}
          driverLicenseName={applicationData.driverLicenseName}
          workAuthorizationName={applicationData.workAuthorizationName}
        />
      ) : user.applicationStatus === "never submitted" ? (
        <ApplicationForm status={user.applicationStatus} />
      ) : null}
    </>
  );
}
