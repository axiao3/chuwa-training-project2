const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const employeeSchema = new mongoose.Schema({
  // Manager or employee:
  type: {
    type: String,
    required: true,
    enum: ["employee", "manager"],
  },
  // Basic employee details
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String, default: "" },
  preferredName: { type: String, default: "" },
  token: { type: String, default: "" },
  password: { type: String, required: true },

  // Profile picture
  profilePicture: { type: String, default: "default.npg" },

  // Current address
  address: {
    buildingApt: { type: String, default: "" },
    streetName: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zip: { type: String, default: "" },
  },

  // Contact details
  cellPhone: { type: String, default: "", required: true },
  workPhone: { type: String, default: "" },

  // Personal information
  ssn: { type: String, default: "", required: true },
  dateOfBirth: { type: Date, default: null }, //+required:true
  gender: {
    type: String,
    enum: ["male", "female", "not wish to answer"],
    default: "not wish to answer",
    required: true,
  },

  // Citizenship and work authorization
  isCitizen: { type: Boolean, default: false }, //require
  workAuthor: {
    type: String,
    enum: ["GreenCard", "H1-B", "L2", "F1(CPT/OPT)", "H4", "Other"],
    default: "Other",
  },
  visaTitle: { type: String, default: "" },
  visaStartDate: { type: Date, default: null },
  visaEndDate: { type: Date, default: null },
  optReceipt: {
    optUrl: { type: String, default: "" },
  },

  // Reference and emergency contacts
  reference: {
    firstName: { type: String, default: "" }, //require
    lastName: { type: String, default: "" }, //require
    middleName: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    relationship: { type: String, default: "" }, //require
  },
  emergencyContacts: [
    {
      firstName: { type: String, default: "" }, //require
      lastName: { type: String, default: "" }, //require
      middleName: { type: String, default: "" },
      phone: { type: String, default: "" },
      email: { type: String, default: "" },
      relationship: { type: String, default: "" }, //require
    },
  ],

  // Application status and document uploads
  applicationStatus: {
    type: String,
    enum: ["Never Submitted", "Pending", "Approved", "Rejected"],
    default: "Never Submitted",
  },
  uploadedDocuments: [
    {
      documentType: { type: String, default: "" },
      documentUrl: { type: String, default: "" },
    },
  ],
});

employeeSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

employeeSchema.methods.comparePassword = async function (
  candidatePassword,
  next
) {
  try {
    let isMatched = await bcrypt.compare(candidatePassword, this.password);
    return isMatched;
  } catch (err) {
    return next(err);
  }
};

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
