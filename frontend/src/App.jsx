import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Application from "./pages/Application/index";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import EmployeeProfiles from "./pages/employeeProfiles";
import PersonalInfoPage from "./pages/PersonalInfoPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app">
        <Router>
          <Header />
          <div className={"app-content"}>
            <Routes>
              
              <Route path="/" element={<MainLayout />}/>
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/application" element={<Application />} />
            <Route path="*" element={<NotFound />} />
              {/* reuse auth */}
              <Route path="/employees" element={<EmployeeProfiles />} />
              <Route
                path="/employees/:id/visaHR"
                element={<>Visa Status Management page for HR: sort & search</>}
              />
              <Route
                path="/employees/:id/hiring"
                element={
                  <>
                    Hiring Management page HR: generate token& review onboarding
                    apps
                  </>
                }
              />
              {/*HR↑ Employee↓*/}
              
              <Route path="/employees/:id" element={<PersonalInfoPage />} />
              <Route
                path="/employees/:id/visa"
                element={<>visa Status Management for employee</>}
              />
              <Route path="/error" element={<ErrorPage />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
