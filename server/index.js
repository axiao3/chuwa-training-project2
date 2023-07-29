require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/application");
const hiringManagementRoutes = require("./routes/hiring");
const db = require("./models");
const employeeRoutes = require("./routes/employeeRoutes");

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/api", employeeRoutes);
app.use("/application", applicationRoutes);;
app.use("/hiring", hiringManagementRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
