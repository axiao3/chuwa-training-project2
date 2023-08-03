const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  preferredName: { type: String },
  profilePicture: { type: String },
  streetName: { type: String, required: true },
  apt: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  cellphone: { type: String, required: true },
  workphone: { type: String },
  email: { type: String, required: true },
  SSN: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  residentStatus: { type: String, required: true },
  authorizationType: { type: String, required: true },
  otherVisaTitle: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  referenceFirstName: { type: String, required: true },
  referenceLastName: { type: String, required: true },
  referenceMiddleName: { type: String },
  referencePhone: { type: String },
  referenceEmail: { type: String },
  referenceRelationship: { type: String, required: true },
  // emergencyFirstName: { type: String, required: true },
  // emergencyLastName: { type: String, required: true },
  // emergencyMiddleName: { type: String },
  // emergencyPhone: { type: String },
  // emergencyEmail: { type: String },
  // emergencyRelationship: { type: String, required: true },
  emergencyContacts: [
    {
      firstName: { type: String, required: true }, //require
      lastName: { type: String, required: true }, //require
      middleName: { type: String },
      phone: { type: String },
      email: { type: String },
      relationship: { type: String, required: true }, //require
    },
  ],
  profilePictureName: { type: String },
  driverLicense: { type: String },
  driverLicenseName: { type: String },
  workAuthorization: { type: String },
  workAuthorizationName: { type: String },
  OptEad: { type: String, default: "" },
  OptEadName: { type: String, default: "" },
  I983: { type: String, default: "" },
  I983Name: { type: String, default: "" },
  I20: { type: String, default: "" },
  I20Name: { type: String, default: "" },
  submittedStatus: { type: String, default: "pending" },
  obboardingFeedback: { type: String, default: "" },
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
