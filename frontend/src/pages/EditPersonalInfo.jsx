/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  // more fields...
});

const EditPersonalInfo = ({ employee, isSubmitting, onCancelClick }) => {
  console.log("enter edit page...");
  return (
    <Formik
      initialValues={{
        firstName: employee?.firstName ?? "",
        lastName: employee?.lastName ?? "",
        // Add other initial values for the fields
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // Handle form submission here
        console.log("Form values:", values);
        // Call the API to update the employee information
        // ...
      }}
    >
      <Form>
        {/* Formik fields and error messages here */}
        <button
          className="personal-button"
          type="submit"
          disabled={isSubmitting}
        >
          Save
        </button>
        <button
          className="personal-button"
          type="button"
          onClick={onCancelClick}
        >
          Cancel
        </button>
      </Form>
    </Formik>
  );
};

export default EditPersonalInfo;
