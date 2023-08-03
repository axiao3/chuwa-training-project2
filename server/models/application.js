const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  preferredName: { type: String },

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
  profilePicture: {type: String},
  profilePictureName: { type: String },
  driverLicense: { type: String },
  driverLicenseName: { type: String },
  workAuthorization: { type: String },
  workAuthorizationName: { type: String },
  OPTReceiptStatus: { type: String, default: "pending" },
  OPTReceiptFeedback: { type: String, default: "" },
  submittedStatus: { type: String, default: "pending" },
  obboardingFeedback: { type: String, default: "" },
  OPTEAD: { type: String, default: "" },
  OPTEADName: { type: String, default: "" },
  OPTEADStatus: { type: String, default: "" },
  OPTEADFeedback: { type: String, default: "" },
  I983: { type: String, default: "" },
  I983Name: { type: String, default: "" },
  I983Status: { type: String, default: "" },
  I983Feedback: { type: String, default: "" },
  I20: { type: String, default: "" },
  I20Name: { type: String, default: "" },
  I20Status: { type: String, default: "" },
  I20Feedback: { type: String, default: "" },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;