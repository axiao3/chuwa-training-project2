/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { getApplicationByIdAction, updateApplicationAction } from "../../app/applicationSlice";
import InfoSection from "../../components/InfoSection";
import InfoSectionForDocuments from "../../components/InfoSection/InfoSectionForDocuments";

export default function PersonalInformation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: `/employees/${id}` } });
    } else {
      if (user.type === "manager") {
        dispatch(getApplicationByIdAction({ id }));
      } else {
        if (user.applicationStatus !== "approved") {
          window.location.href = `/${id}/application`;
        } else {
          dispatch(getApplicationByIdAction({ id }));
        }
      }

    }
  }, []);

  const application = useSelector((state) => state.applications.applications[0]);
  const [fields, setFields] = useState([]);
  useEffect(() => {
    // if (application.driverLicense) {
    //   setFields((prev) => prev.push({ key: 'driverLicense', label: 'driver license', value: application.driverLicense, 
    //   fileName: application.driverLicenseName, inputType: 'file', name: "driverLicenseName" }))
    // }    
    // if (application.workAuthorization) {
    //   setFields((prev) => prev.push({ key: 'workAuthorization', label: 'work authorization', value: application.workAuthorization, 
    //   fileName: application.workAuthorizationName, inputType: 'file', name: "workAuthorizationName" }))
    // }
    // if (application.workAuthorization) {
    //   setFields((prev) => prev.push({ key: 'workAuthorization', label: 'work authorization', value: application.workAuthorization, 
    //   fileName: application.workAuthorizationName, inputType: 'file', name: "workAuthorizationName" }))
    // }
    // if (application.workAuthorization) {
    //   setFields((prev) => prev.push({ key: 'workAuthorization', label: 'work authorization', value: application.workAuthorization, 
    //   fileName: application.workAuthorizationName, inputType: 'file', name: "workAuthorizationName" }))
    // }    
    // if (application.workAuthorization) {
    //   setFields((prev) => prev.push({ key: 'workAuthorization', label: 'work authorization', value: application.workAuthorization, 
    //   fileName: application.workAuthorizationName, inputType: 'file', name: "workAuthorizationName" }))
    // }
  }, [application])

  const handleSaveChanges = (changes) => {
    changes.user = id;
    changes.submittedStatus = "approved";
    console.log("changes:", changes);
    dispatch(updateApplicationAction(changes)).then((action) => {
      if (updateApplicationAction.fulfilled.match(action)) {
        // window.location.href = `/employees/${id}`;
        // window.location.reload();
        navigate(`/employees/${id}`);
      }
    })
  };

  const handleEmergencyContactsChange = (index, changes) => {
    const emergency = { ...application.emergencyContacts[index] };
    for (let key in changes) {
      emergency[key] = changes[key];
    }
    const updatedEmergency = [...application.emergencyContacts];
    updatedEmergency[index] = emergency;
    // console.log(updatedEmergency);
    const updatedData = { user: id, emergencyContacts: updatedEmergency, submittedStatus: "approved" };
    dispatch(updateApplicationAction(updatedData)).then((action) => {
      if (updateApplicationAction.fulfilled.match(action)) {
        // window.location.href = `/employees/${id}`;
        // window.location.reload();
        navigate(`/employees/${id}`);
      }
    })
  }

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

  const stateOptions = US_STATES.map(state => ({
    value: state,
    label: state
  }));

  return application && (<div>
    <InfoSection
      usertype={user.type}
      title="Name"
      fields={[
        { key: 'profilePicture', label: 'Profile Picture', value: application.profilePicture, inputType: 'img', fileType: '.jpg,.jpeg,.png' },
        { key: 'firstName', label: 'First Name', value: application.firstName, inputType: 'text' },
        { key: 'lastName', label: 'Last Name', value: application.lastName, inputType: 'text' },
        { key: 'middleName', label: 'Middle Name', value: application.middleName, inputType: 'text' },
        { key: 'preferredName', label: 'Preferred Name', value: application.preferredName, inputType: 'text' },
        { key: 'email', label: 'Email', value: application.email, inputType: 'text' },
        { key: 'SSN', label: 'SSN', value: application.SSN, inputType: 'text' }, // Be cautious about displaying SSN in any application.
        { key: 'dateOfBirth', label: 'Date of Birth', value: application.dateOfBirth, inputType: 'date' },
        { key: 'gender', label: 'Gender', value: application.gender, inputType: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] }
      ]}
      onSave={handleSaveChanges}
    />
    <InfoSection
      usertype={user.type}
      title="Address"
      fields={[
        { key: 'apt', label: 'Building/apt #,', value: application.apt, inputType: 'text' },
        { key: 'streetName', label: 'street name', value: application.streetName, inputType: 'text' },
        { key: 'city', label: 'city', value: application.city, inputType: 'text' },
        { key: 'state', label: 'state', value: application.state, inputType: 'select', options: stateOptions },
        { key: 'zip', label: 'zip', value: application.zip, inputType: 'text' }
      ]}
      onSave={handleSaveChanges}
    />
    <InfoSection
      usertype={user.type}
      title="Contact Info"
      fields={[
        { key: 'cellphone', label: 'Cell phone number', value: application.cellphone, inputType: 'text' },
        { key: 'workphone', label: 'work phone number', value: application.workphone, inputType: 'text' },

      ]}
      onSave={handleSaveChanges}
    />
    <InfoSection
      usertype={user.type}
      title="Employment"
      fields={[
        { key: 'authorizationType', label: 'Visa title', value: application.authorizationType !== "Other" ? application.authorizationType : application.otherVisaTitle, inputType: 'select', options: [{ value: 'H1-B', label: 'H1-B' }, { value: 'L2', label: 'L2' }, { value: 'F1(CPT/OPT)', label: 'F1(CPT/OPT)' }, { value: 'H4', label: 'H4' }, { value: 'Other', label: 'Other' }] },
        { key: 'otherVisaTitle', label: 'If select Other, please specify', value: "", inputType: 'text' },
        { key: 'startDate', label: 'start date', value: application.startDate, inputType: 'date' },
        { key: 'endDate', label: 'end date', value: application.endDate, inputType: 'date' },
      ]}
      onSave={handleSaveChanges}
    />

    {application.emergencyContacts.length !== 0 && application.emergencyContacts.map((emergencyContact, index) => {
      console.log("emergencyContact: ", emergencyContact);
      return (<InfoSection
        usertype={user.type}
        key={index}
        title="Emergency contact"
        fields={[
          { key: 'firstName', label: 'First Name', value: emergencyContact.firstName, inputType: 'text' },
          { key: 'lastName', label: 'Last Name', value: emergencyContact.lastName, inputType: 'text' },
          { key: 'middleName', label: 'Middle Name', value: emergencyContact.middleName, inputType: 'text' },
          { key: 'phone', label: 'Phone', value: emergencyContact.phone, inputType: 'text' },
          { key: 'email', label: 'Email', value: emergencyContact.email, inputType: 'text' },
          { key: 'relationship', label: 'Relationship', value: emergencyContact.relationship, inputType: 'text' },
        ]}
        onSave={(changes) => handleEmergencyContactsChange(index, changes)}
      />)
    })}

    <InfoSectionForDocuments
      usertype={user.type}
      title="Documents"
      fields={[
        { key: 'driverLicense', label: 'driver license', value: application.driverLicense, fileName: application.driverLicenseName, inputType: 'file', name: "driverLicenseName" },
        { key: 'workAuthorization', label: 'work authorization', value: application.workAuthorization, fileName: application.workAuthorizationName, inputType: 'file', name: "workAuthorizationName" },
      ]}
      onSave={handleSaveChanges}
    />
  </div>
  );
}
