/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Application from "./pages/Application";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import PersonalInformation from "./pages/PersonalInfo";
import HiringManagement from "./pages/HiringManagement";
import EmployeeProfile from "./pages/EmployeeProfile";
import VisaManagement from "./pages/VisaManagement";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/application" element={<Application />} />

            {/* reuse auth */}
            <Route path="/employees" element={<EmployeeProfile />} />
            <Route path="/employees/visa" element={<VisaManagement />} />
            <Route
              path="/employees/:id/hiring"
              element={<HiringManagement />}
            />
            {/*HR↑ Employee↓*/}

            <Route path="/employees/:id" element={<PersonalInformation />} />
            {/* <Route path="/employees/:id/visa" element={<VisaManagement />} /> */}
            {/* <Route path="/error" element={<ErrorPage />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
