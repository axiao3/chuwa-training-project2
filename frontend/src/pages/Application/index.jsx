/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
import "./style.css";
import { createApplicationAction } from "../../app/applicationSlice";
import { getApplicationById } from "../../services/application";
import ApplicationForm from "../../components/ApplicationForm";

export default function Application() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [applicationData, setApplicationData] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: `/${id}/application` } });
    } else {
      if (user.type === "manager" || (user.type === "employee" && user.applicationStatus !== "never submitted")) {
        getApplicationById(id).then((data) => {
          console.log("data: ", data);
          setApplicationData(data);
        });
      }
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    console.log("applicationData 2: ", applicationData);
  }, [applicationData]);

  return (
    <>
      {(user.type === "employee" && user.applicationStatus !== "never submitted" && applicationData) && (
        <ApplicationForm
          user_id={id}
          usertype={user.type}
          status={user.applicationStatus}
          firstName={applicationData.firstName}
          lastName={applicationData.lastName}
          middleName={applicationData.middleName}
          preferredName={applicationData.preferredName}
          profilePicture={applicationData.profilePicture}
          streetName={applicationData.streetName}
          apt={applicationData.apt}
          city={applicationData.city}
          email={applicationData.email}
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
          obboardingFeedback={applicationData.obboardingFeedback}
        />
      )}

      {(user.type === "employee" && user.applicationStatus === "never submitted") && (
        <ApplicationForm status={user.applicationStatus} user_id={id} usertype={user.type}/>
      )}

      {user.type === "manager" && (
        applicationData && <ApplicationForm
          user_id={id}
          applicationStatus={applicationData.submittedStatus}
          usertype={user.type}
          status="pending"
          firstName={applicationData.firstName}
          lastName={applicationData.lastName}
          middleName={applicationData.middleName}
          preferredName={applicationData.preferredName}
          profilePicture={applicationData.profilePicture}
          streetName={applicationData.streetName}
          apt={applicationData.apt}
          city={applicationData.city}
          email={applicationData.email}
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
          obboardingFeedback={applicationData.obboardingFeedback}
        />
      )}

    </>
  );
}
