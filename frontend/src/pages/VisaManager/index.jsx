/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import VisaAll from "../../components/VisaAll";
import VisaInProgress from "../../components/VisaInProgress";

export default function VisaManager() {
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [view, setView] = useState('Inprogress');

    useEffect(() => {
        if (!isAuthenticated) {
          navigate("/signin", { state: { from: "employees/visaHR" } });
        } else if (user.type !== "manager") {
          navigate("/home");
        }
      }, []);

    return (
        <div className={style.visa_page}>
          <header className={style.visa_page_header}>
            <button className={style.visa_page_button} onClick={() => setView("Inprogress")}>In Progress</button>
            <button className={style.visa_page_button} onClick={() => setView("All")}>All</button>
          </header>
          <main>
            {view === "Inprogress" ? (
              <VisaInProgress />
            ) : (
              <VisaAll />
            )}
          </main>
        </div>
      );
}
