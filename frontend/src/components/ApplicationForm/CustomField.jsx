/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

export default function CustomField({ status, label, required, name, textContent }) {
  return (
    <div>
      {required ? (
        <label className="required" htmlFor={name}>{label}</label>
      ) : (
        <label htmlFor={name}>{label}</label>
      )}
      
      {status === "pending" ? (
        <span>{textContent}</span>
      ) : (
        <Field type="text" id={name} name={name} />
      )}
      {status !== "pending" && (
        <ErrorMessage component="span" className="errorMessage" name={name} />
      )}
    </div>
  );
}