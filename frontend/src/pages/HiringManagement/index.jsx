/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import RegistrationHistory from "../../components/RegistrationHistory";
import ApplicationReview from "../../components/ApplicationReview";

export default function HiringManagement() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("user.type: ", user.type);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: `/employees/${id}/hiring` } });
    } else if (user.type !== "manager") {
      navigate("/home");
    }
  }, []);

  const [view, setView] = useState('history'); // 'history' or 'another'

  return (
    <div className={style.hiring_page}>
      <header className={style.hiring_page_header}>
        <button className={style.hiring_page_button} onClick={() => setView("history")}>Registration History</button>
        <button className={style.hiring_page_button} onClick={() => setView("another")}>Application Review</button>
      </header>
      <main>
        {view === "history" ? (
          <RegistrationHistory />
        ) : (
          <ApplicationReview />
        )}
      </main>
    </div>
  );
}
