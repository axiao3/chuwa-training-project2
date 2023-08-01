/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Card, Input, Modal, Button, Select, Upload } from 'antd';
import "./style.css";

const InfoSectionForDocuments = ({ title, fields, onSave, usertype }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedFields, setEditedFields] = useState({});
    const [filePreviews, setFilePreviews] = useState(fields.reduce((acc, field) => {
        acc[field.key] = field.value;
        return acc;
    }, {}));
    const [fileNames, setFileNames] = useState(fields.reduce((acc, field) => {
        acc[field.key] = field.fileName;
        return acc;
    }, {}));

    const handleCancel = () => {
        if (window.confirm('Do you want to discard all changes?')) {
            setEditedFields({});
            setIsEditing(false);
        }
    };

    const handleSave = () => {
        if (onSave) {
            onSave(editedFields);
        }
        setEditedFields({});
        setIsEditing(false);
    };

    const handleChange = (key, value) => {
        setEditedFields((prev) => ({ ...prev, [key]: value }));
    };

    const handleRemove = (fileKey, nameKey) => {
        setFileNames(prev => ({ ...prev, [fileKey]: "" }));
        setFilePreviews(prev => ({ ...prev, [fileKey]: "" }));
        handleChange(fileKey, "");
        handleChange(nameKey, "");
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const renderInput = (field) => {
        switch (field.inputType) {
            case 'file':
                return (
                    <>
                        <Upload
                            showUploadList={false}
                            beforeUpload={async (file) => {
                                if (file) {
                                    const base64 = await convertToBase64(file);
                                    setFileNames(prev => ({ ...prev, [field.key]: file.name }));
                                    setFilePreviews(prev => ({ ...prev, [field.key]: base64 }));
                                    handleChange(field.key, base64);
                                    handleChange(field.name, file.name);
                                } else {
                                    setFileNames(prev => ({ ...prev, [field.key]: "" }));
                                    setFilePreviews(prev => ({ ...prev, [field.key]: "" }));
                                    handleChange(field.key, "");
                                    handleChange(field.name, "");
                                }
                                return false; // prevent auto upload
                            }}
                            accept={field.fileType || "*"}
                        >
                            <Button>Upload file</Button>
                        </Upload>
                        {filePreviews[field.key] &&
                            <>
                                <a
                                    className="field-value"
                                    href={filePreviews[field.key]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: "none" }}
                                >
                                    <button type="button">
                                        {fileNames[field.key]}
                                    </button>
                                </a>
                                <Button onClick={() => handleRemove(field.key, field.name)}>Remove</Button>
                            </>
                        }
                    </>
                );
            default:
                return <span>{field.value}</span>;
        }
    };

    return (
        <Card className="card-container" title={title} style={{ marginBottom: '20px' }}>
            <div className="card-content">
                {fields.map((field, index) => (
                    <div key={index} className="field-container">
                        <label className="field-label">{field.label}:</label>
                        {isEditing ? <div className="field-input"> {renderInput(field)} </div> : (field.fileName) ? (
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
                        ) : null}
                    </div>
                ))}
                {usertype === "employee" && <div className="edit-buttons">
                    {isEditing ? (
                        <div>
                            <Button style={{ marginRight: '10px' }} onClick={handleCancel}>Cancel</Button>
                            <Button type="primary" onClick={handleSave}>Save</Button>
                        </div>
                    ) : (
                        <Button onClick={() => setIsEditing(true)}>Edit</Button>
                    )}
                </div>}

            </div>
        </Card>
    );
};

export default InfoSectionForDocuments;
