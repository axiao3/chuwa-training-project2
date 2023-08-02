import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import {
  getAllApplicationAction,
  getApplicationByIdAction,
  updateApplicationAction,
} from "../../app/applicationSlice";
import InfoSectionForDocuments from "../../components/InfoSection/InfoSectionForDocuments";

export default function VisaManagement() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const { id } = user;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else {
      if (user.type === "manager") {
        dispatch(getAllApplicationAction());
      } else {
        dispatch(getApplicationByIdAction({ id }));
        // if (user.applicationStatus !== "approved") {
        //   window.location.href = "/application";
        // } else {
        //   dispatch(getApplicationByIdAction({ id }));
        // }
      }
    }
  }, []);
  const application = useSelector(
    (state) => state.applications.applications[0]
  );
  console.log("app in visa: ", application);
  const [currentVisa, setCurrentVisa] = useState("OPT Receipt");
  if (application?.submittedStatus === "approved") {
    setCurrentVisa("OPT EAD");
  }

  const handleUpload = (changes) => {
    console.log("changes", changes);
    changes.user = id;
    changes.submittedStatus = "pending";
    dispatch(updateApplicationAction(changes)).then((action) => {
      if (updateApplicationAction.fulfilled.match(action)) {
        navigate("/employees/visa");
      }
    });
  };

  return (
    <div>
      <h2>Visa Status Management</h2>
      {user.type === "employee" ? (
        <div>
          <h3>Status: {application?.authorizationType}</h3>
          {application?.authorizationType === "F1(CPT/OPT)" ? (
            <>
              {(() => {
                switch (currentVisa) {
                  case "OPT Receipt":
                    return (
                      <div>
                        <p>
                          You are on the step to upload or modify OPT Receipt.
                        </p>
                        <InfoSectionForDocuments
                          usertype={user.type}
                          title="Upload files"
                          fields={[
                            {
                              key: "workAuthorization",
                              label: "OPT receipt",
                              value: application.workAuthorization,
                              fileName: application.workAuthorizationName,
                              inputType: "file",
                              name: "workAuthorizationName",
                            },
                          ]}
                          onSave={handleUpload}
                        />
                      </div>
                    );
                  case "OPT EAD":
                    return (
                      <div>
                        <p>You are on the step to upload or modify OPT EAD.</p>
                      </div>
                    );
                  case "I-983":
                    return (
                      <div>
                        <p>You are on the step to upload or modify I-983.</p>
                      </div>
                    );
                  case "I-20":
                    return (
                      <div>
                        <p>You are on the step to upload or modify I-20.</p>
                      </div>
                    );
                  // Add more cases here for other values of currentVisa
                  default:
                    return null;
                }
              })()}
            </>
          ) : (
            <p>No further actions needed.</p>
          )}
        </div>
      ) : (
        <p>Manager mode</p>
      )}
    </div>
  );
}
