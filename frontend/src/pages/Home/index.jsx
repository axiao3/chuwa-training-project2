/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

export default function Home() {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else {
      if (user.type === "manager") {
        navigate(`/employees/${user.id}/hiring`);
      } else {
        navigate(`/employees/${user.id}`);
      }
    }
  }, [isAuthenticated, user, navigate]);

  return null;
}
