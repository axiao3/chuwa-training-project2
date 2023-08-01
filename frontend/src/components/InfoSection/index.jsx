/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Card, Input, Modal, Button, DatePicker, Select, Upload } from 'antd';
import moment from 'moment';
import "./style.css";

const { Option } = Select;

const InfoSection = ({ title, fields, onSave, usertype }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({});
  const [imagePreview, setImagePreview] = useState(null);



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
      case 'text':
        return (
          <Input
            // value={editedFields[field.key] || field.value}
            value={field.key in editedFields ? editedFields[field.key] : field.value}
            onChange={(e) => handleChange(field.key, e.target.value)}
          />
        );
      case 'date':
        const toMoment = date => date ? moment(date) : null;
        return (
          <DatePicker
            defaultValue={toMoment(field.value)}
            value={toMoment(editedFields[field.key])}
            onChange={(date, dateString) => handleChange(field.key, dateString)}
          />
        );
      case 'select':
        return (
          <Select style={{ width: "100%" }} value={editedFields[field.key] || field.value} onChange={(value) => handleChange(field.key, value)}>
            {field.options.map((option) => (
              <Option key={option.value} value={option.value} style={{ width: "100%" }}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
      case 'img':
        const imageSrc = (field.key in editedFields) ? imagePreview : field.value;
        return (
          <>
            <img src={imageSrc} alt="Preview" style={{}} width="100" />
            <Upload
              showUploadList={false}
              beforeUpload={async (file) => {
                // Use FileReader to get the image preview
                const base64 = await convertToBase64(file);
                setImagePreview(base64);
                handleChange(field.key, base64);
                return false; // prevent auto upload
              }}
              accept={field.fileType || "*"}
            >
              <Button>Upload {field.label}</Button>
            </Upload>
          </>
        );
      default:
        return <span>{field.value}</span>;
    }
  };

  return (
    <Card className="card-container" title={title} style={{ marginBottom: '20px' }} >
      <div className="card-content">
        {fields.map((field, index) => (
          <div key={index} className="field-container">
            <label className="field-label">{field.label}:</label>
            {isEditing ? <div className="field-input">{renderInput(field)}</div> : field.key === "profilePicture" ? <span className="field-value"><img src={field.value} alt="Preview" style={{}} width="100" /></span> : <span className="field-value">{field.value}</span>}
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

export default InfoSection;
