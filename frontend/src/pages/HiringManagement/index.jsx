/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

export default function HiringManagement() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("user.type: ", user.type);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: `/employees/${id}/hiring` } });
    } else if (user.type !== "manager") {
      navigate('/home');
    }
  }, []);

//   useEffect(() => {
//     alert(user.type);
//     if (user.type !== "manager") {
//       window.location.href = `/employees/${user.id}`;
//     }
//   }, [user.id, user.type]);

  return <div>Hiring Management Page</div>;
}
