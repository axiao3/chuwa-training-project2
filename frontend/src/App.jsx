import { useState } from "react";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="app">
        <Router>
          <Header />
          <div className={"app-content"}>
            <Routes>
              <Route path="/" element={<>HOME</>} />
              <Route path="/sign-up" element={<>needs token</>} />
              <Route path="/sign-in" element={<>sign in</>} />
              <Route path="/forget-password" element={<>forget password</>} />
              {/* reuse auth */}
              <Route path="/employees" element={<>employee profiles list</>} />
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
              <Route
                path="/employees/:id/application"
                element={<>employee onboarding application page</>}
              />
              <Route path="/employees/:id" element={<>personal info page</>} />
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
