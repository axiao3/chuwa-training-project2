/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Application from "./pages/Application";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/Layout";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/home" element={<div>Home</div>} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/application" element={<Application />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
