/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import InfoSection from "../../components/InfoSection";
import { Card, Input, Modal, Button, DatePicker, Select, Upload } from 'antd';
import { getApplicationByIdAction } from "../../app/applicationSlice";
import { updateApplicationAction } from '../../app/visaSlice';

export default function VisaEmployee() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { user, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/signin", { state: { from: `/employees/${id}/visa` } });
        } else {
            if (user.type === "manager") {
                navigate("/home");
            } else {
                if (user.applicationStatus === "never submitted") {
                    window.location.href = `/${id}/application`;
                } else {
                    dispatch(getApplicationByIdAction({ id }))
                        .then((action) => {
                            // console.log("action: ", action);
                            // console.log("authorizationType: ", action.payload.authorizationType);
                            if (action.payload.authorizationType !== "F1(CPT/OPT)") {
                                navigate("/home");
                            }
                        });
                }
            }
        }
    }, []);

    const application = useSelector((state) => state.applications.applications[0]);

    const [workAuthorization, setWorkAuthorization] = useState("");
    const [workAuthorizationName, setWorkAuthorizationName] = useState("");
    const handleOPTReceiptRemove = () => {
        setWorkAuthorization("");
        setWorkAuthorizationName("");
    };
    const handleOPTReceiptSave = () => {
        const VisaOPTReceipt = { workAuthorization, workAuthorizationName, OPTReceiptFeedback: "", OPTReceiptStatus: "pending", user: user.id };
        dispatch(updateApplicationAction(VisaOPTReceipt)).then((action) => {
            if (updateApplicationAction.fulfilled.match(action)) {
                alert("OPT Receipt Submit Success!");
                window.location.reload();
            }
        })
    }

    const [OPTEAD, setOPTEAD] = useState("");
    const [OPTEADName, setOPTEADName] = useState("");
    const handleOPTEADRemove = () => {
        setOPTEAD("");
        setOPTEADName("");
    };
    const handleOPTEADSave = () => {
        const VisaOPTEAD = { OPTEAD, OPTEADName, OPTEADFeedback: "", OPTEADStatus: "pending", user: user.id };
        dispatch(updateApplicationAction(VisaOPTEAD)).then((action) => {
            if (updateApplicationAction.fulfilled.match(action)) {
                alert("OPT EAD Submit Success!");
                window.location.reload();
            }
        })
    }

    const [I983, setI983] = useState("");
    const [I983Name, setI983Name] = useState("");
    const handleI983Remove = () => {
        setI983("");
        setI983Name("");
    };
    const handleI983Save = () => {
        const VisaI983 = { I983, I983Name, I983Feedback: "", I983Status: "pending", user: user.id };
        dispatch(updateApplicationAction(VisaI983)).then((action) => {
            if (updateApplicationAction.fulfilled.match(action)) {
                alert("I983 Submit Success!");
                window.location.reload();
            }
        })
    }

    const [I20, setI20] = useState("");
    const [I20Name, setI20Name] = useState("");
    const handleI20Remove = () => {
        setI20("");
        setI20Name("");
    };
    const handleI20Save = () => {
        const VisaI20 = { I20, I20Name, I20Feedback: "", I20Status: "pending", user: user.id };
        dispatch(updateApplicationAction(VisaI20)).then((action) => {
            if (updateApplicationAction.fulfilled.match(action)) {
                alert("I20 Submit Success!");
                window.location.reload();
            }
        })
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };


    return (
        <>
            {application && (
                <>
                    <Card className="card-container" title=" OPT Receipt" style={{ marginBottom: '20px' }}>
                        <div style={{ paddingLeft: "16px", paddingRight: "16px" }}>
                            {application.OPTReceiptStatus === "rejected" ?
                                <h4 style={{ color: "red" }}>Feedback: {application.OPTReceiptFeedback}</h4> :
                                application.OPTReceiptStatus === "pending" ?
                                    <h4 style={{ color: "red" }}>Waiting for HR to approve your OPT Receipt</h4> :
                                    null// (!application.OPTEADStatus && <h4 style={{ color: "red" }}>Please upload a copy of your OPT EAD</h4>)
                            }

                            <div className="field-container">
                                <label className="field-label">OPT Receipt:</label>
                                {application.OPTReceiptStatus === "rejected" ? <div className="field-input">
                                    <>
                                        <Upload
                                            showUploadList={false}
                                            beforeUpload={async (file) => {
                                                if (file) {
                                                    const base64 = await convertToBase64(file);
                                                    setWorkAuthorizationName(file.name);
                                                    setWorkAuthorization(base64);
                                                } else {
                                                    setWorkAuthorizationName("");
                                                    setWorkAuthorization("");
                                                }
                                                return false; // prevent auto upload
                                            }}
                                        >
                                            <Button>Upload file</Button>
                                        </Upload>
                                        {workAuthorization &&
                                            <>
                                                <a
                                                    className="field-value"
                                                    href={workAuthorization}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    <button type="button">
                                                        {workAuthorizationName}
                                                    </button>
                                                </a>
                                                <Button onClick={() => handleOPTReceiptRemove()}>Remove</Button>
                                            </>
                                        }
                                    </>
                                </div> : <a className="field-value"
                                    href={application.workAuthorization}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: "none" }}
                                >
                                    <button type="button">
                                        {application.workAuthorizationName}
                                    </button>
                                </a>}
                            </div>

                            {application.OPTReceiptStatus === "rejected" &&
                                <div className="edit-buttons">
                                    <div>
                                        <Button type="primary" onClick={handleOPTReceiptSave}>Save</Button>
                                    </div>
                                </div>}

                        </div>
                    </Card>

                    {application.OPTReceiptStatus === "approved" &&
                        <Card className="card-container" title="OPT EAD" style={{ marginBottom: '20px' }}>
                            <div style={{ paddingLeft: "16px", paddingRight: "16px" }}>
                                {!application.OPTEADStatus ? <h4 style={{ color: "red" }}>Please upload a copy of your OPT EAD</h4>
                                    : application.OPTEADStatus === "rejected" ?
                                        <h4 style={{ color: "red" }}>Feedback: {application.OPTEADFeedback}</h4> :
                                        application.OPTEADStatus === "pending" ?
                                            <h4 style={{ color: "red" }}>Waiting for HR to approve your OPT EAD</h4> :
                                            // (!application.I983Status && <h4 style={{ color: "red" }}>Please download and fill out
                                            //     the I-983 form</h4>)null
                                            null}

                                <div className="field-container">
                                    <label className="field-label">OPT EAD:</label>
                                    {(application.OPTEADStatus === "rejected" || !application.OPTEADStatus) ? <div className="field-input">
                                        <>
                                            <Upload
                                                showUploadList={false}
                                                beforeUpload={async (file) => {
                                                    if (file) {
                                                        const base64 = await convertToBase64(file);
                                                        setOPTEADName(file.name);
                                                        setOPTEAD(base64);
                                                    } else {
                                                        setOPTEADName("");
                                                        setOPTEAD("");
                                                    }
                                                    return false; // prevent auto upload
                                                }}
                                            >
                                                <Button>Upload file</Button>
                                            </Upload>
                                            {OPTEAD &&
                                                <>
                                                    <a
                                                        className="field-value"
                                                        href={OPTEAD}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ textDecoration: "none" }}
                                                    >
                                                        <button type="button">
                                                            {OPTEADName}
                                                        </button>
                                                    </a>
                                                    <Button onClick={() => handleOPTEADRemove()}>Remove</Button>
                                                </>
                                            }
                                        </>
                                    </div> : <a className="field-value"
                                        href={application.OPTEAD}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <button type="button">
                                            {application.OPTEADName}
                                        </button>
                                    </a>}
                                </div>

                                {(application.OPTEADStatus === "rejected" || !application.OPTEADStatus) &&
                                    <div className="edit-buttons">
                                        <div>
                                            <Button type="primary" onClick={handleOPTEADSave}>Save</Button>
                                        </div>
                                    </div>}
                            </div>
                        </Card>}

                    {application.OPTEADStatus === "approved" &&
                        <Card className="card-container" title="I-983" style={{ marginBottom: '20px' }}>
                            <div>
                                <a
                                    href="https://filesstorageplace.s3.amazonaws.com/1691046410290-451458520"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button style={{ marginRight: '10px' }} >Empty Template</Button>
                                </a>
                                <a
                                    href="https://filesstorageplace.s3.amazonaws.com/1691046410290-451458520"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button type="primary" >Sample Template</Button>
                                </a>
                            </div>
                            <div style={{ paddingLeft: "16px", paddingRight: "16px" }}>
                                {!application.I983Status ? <h4 style={{ color: "red" }}>Please download and fill out the I-983 form</h4>
                                    : application.I983Status === "rejected" ?
                                        <h4 style={{ color: "red" }}>Feedback: {application.I983Feedback}</h4> :
                                        application.I983Status === "pending" ?
                                            <h4 style={{ color: "red" }}>Waiting for HR to approve your I-983</h4> :
                                            // (!application.I20Status && <h4 style={{ color: "red" }}>Please send the I-983 along
                                            // with all necessary documents to your school and upload the new I-20</h4>)
                                            null}


                                <div className="field-container">
                                    <label className="field-label">I-983:</label>
                                    {(application.I983Status === "rejected" || !application.I983Status) ? <div className="field-input">
                                        <>
                                            <Upload
                                                showUploadList={false}
                                                beforeUpload={async (file) => {
                                                    if (file) {
                                                        const base64 = await convertToBase64(file);
                                                        setI983Name(file.name);
                                                        setI983(base64);
                                                    } else {
                                                        setI983Name("");
                                                        setI983("");
                                                    }
                                                    return false; // prevent auto upload
                                                }}
                                            >
                                                <Button>Upload file</Button>
                                            </Upload>
                                            {I983 &&
                                                <>
                                                    <a
                                                        className="field-value"
                                                        href={I983}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ textDecoration: "none" }}
                                                    >
                                                        <button type="button">
                                                            {I983Name}
                                                        </button>
                                                    </a>
                                                    <Button onClick={() => handleI983Remove()}>Remove</Button>
                                                </>
                                            }
                                        </>
                                    </div> : <a className="field-value"
                                        href={application.I983}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <button type="button">
                                            {application.I983Name}
                                        </button>
                                    </a>}
                                </div>

                                {(application.I983Status === "rejected" || !application.I983Status) &&
                                    <div className="edit-buttons">
                                        <div>
                                            <Button type="primary" onClick={handleI983Save}>Save</Button>
                                        </div>
                                    </div>}
                            </div>
                        </Card>}

                    {application.I983Status === "approved" &&
                        <Card className="card-container" title="I-20" style={{ marginBottom: '20px' }}>
                            <div style={{ paddingLeft: "16px", paddingRight: "16px" }}>
                                {!application.I20Status ? <h4 style={{ color: "red" }}>Please send the I-983 along with all necessary documents to your school and upload the new I-20</h4>
                                    : application.I20Status === "rejected" ?
                                        <h4 style={{ color: "red" }}>Feedback: {application.I20Feedback}</h4> :
                                        application.I20Status === "pending" ?
                                            <h4 style={{ color: "red" }}>Waiting for HR to approve your I-20</h4> :
                                            <h4 style={{ color: "red" }}>All documents have been approved</h4>
                                }

                                <div className="field-container">
                                    <label className="field-label">I-20:</label>
                                    {(application.I20Status === "rejected" || !application.I20Status) ? <div className="field-input">
                                        <>
                                            <Upload
                                                showUploadList={false}
                                                beforeUpload={async (file) => {
                                                    if (file) {
                                                        const base64 = await convertToBase64(file);
                                                        setI20Name(file.name);
                                                        setI20(base64);
                                                    } else {
                                                        setI20Name("");
                                                        setI20("");
                                                    }
                                                    return false; // prevent auto upload
                                                }}
                                            >
                                                <Button>Upload file</Button>
                                            </Upload>
                                            {I20 &&
                                                <>
                                                    <a
                                                        className="field-value"
                                                        href={I20}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ textDecoration: "none" }}
                                                    >
                                                        <button type="button">
                                                            {I20Name}
                                                        </button>
                                                    </a>
                                                    <Button onClick={() => handleI20Remove()}>Remove</Button>
                                                </>
                                            }
                                        </>
                                    </div> : <a className="field-value"
                                        href={application.I20}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <button type="button">
                                            {application.I20Name}
                                        </button>
                                    </a>}
                                </div>

                                {(application.I20Status === "rejected" || !application.I20Status) &&
                                    <div className="edit-buttons">
                                        <div>
                                            <Button type="primary" onClick={handleI20Save}>Save</Button>
                                        </div>
                                    </div>}
                            </div>
                        </Card>}


                </>)}
        </>
    );
}
