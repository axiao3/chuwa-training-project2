const express = require("express");
require("dotenv").config(); // Load environment variables from .env file, if present.
const cors = require("cors");
const db = require("./models");
const employeeRoutes = require("./routes/employeeRoutes");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", employeeRoutes);
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
