/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { getApplicationByIdAction } from "../../app/applicationSlice";
import { Card, Input, Modal, Button, Select, Upload } from 'antd';

export default function VisaFiles() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const [fields, setFields] = useState([]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/signin", { state: { from: `/employees/${id}/files` } });
        } else {
            dispatch(getApplicationByIdAction({ id })).then((action) => {
                if (getApplicationByIdAction.fulfilled.match(action)) {
                    if (action.payload.driverLicense) {
                        setFields((prev) => {
                            return [...prev, {
                                key: 'driverLicense', label: 'driver license', value: action.payload.driverLicense,
                                fileName: action.payload.driverLicenseName, inputType: 'file', name: "driverLicenseName"
                            }];
                        })
                    }
                    if (action.payload.workAuthorization) {
                        setFields((prev) => {
                            return [...prev, {
                                key: 'workAuthorization', label: 'OPT Receipt', value: action.payload.workAuthorization,
                                fileName: action.payload.workAuthorizationName, inputType: 'file', name: "workAuthorizationName"
                            }];
                        })
                    }
                    if (action.payload.OPTEAD) {
                        setFields((prev) => {
                            return [...prev, {
                                key: 'OPTEAD', label: 'OPT EAD', value: action.payload.OPTEAD,
                                fileName: action.payload.OPTEADName, inputType: 'file', name: "OPTEADName"
                            }];
                        })
                    }
                    if (action.payload.I983) {
                        setFields((prev) => {
                            return [...prev, {
                                key: 'I983', label: 'driver license', value: action.payload.I983,
                                fileName: action.payload.I983Name, inputType: 'file', name: "I983Name"
                            }];
                        })
                    }
                    if (action.payload.I20) {
                        setFields((prev) => {
                            return [...prev, {
                                key: 'I20', label: 'I20', value: action.payload.I20,
                                fileName: action.payload.I20Name, inputType: 'file', name: "I20Name"
                            }];
                        })
                    }
                }
            });
        }
    }, []);

    const FileSection = ({ title, fields, firstName, lastName, preferredName, middleName }) => {
        return (
            <Card className="card-container" title={title} style={{ marginBottom: '20px' }}>
                <div className="card-content">
                    {/* <div className="field-container">
                    <label className="field-label">Name:</label>
                    <span className="field-value">{firstName + " (" + preferredName + ") " + middleName + " " + lastName}</span>
                    </div> */}
                    {fields.map((field, index) => (
                        <div key={index} className="field-container">
                            <label className="field-label">{field.label}:</label>

                            <a className="field-value"
                                href={field.value}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none" }}
                            >
                                <button type="button">
                                    {field.fileName}
                                </button>
                            </a>
                        </div>
                    ))}
                </div>
            </Card>
        )
    }

    return (
        <div>
            {fields && <FileSection title="All Documents" fields={fields} />}
        </div>
    );
}
