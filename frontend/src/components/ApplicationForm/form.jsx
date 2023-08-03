/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import CustomField from "./CustomField";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

export default function ApplicationForm(props) {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
            {(formik) => {
                return (
                    <Form>
                        <h2 style={{ color: "red" }}>Status: {props.status}</h2>
                        <p><span className="asterisk">*</span> stands for required field</p>
                        {props.status === "rejected" && <p>{props.feedback}</p>}
                        <div>
                            <div>Profile picture</div>
                            <div>{props.status !== "pending" ? (
                                <label className="custom-file-upload">
                                    <input /> Upload Profile Picture
                                </label>) : ("Profile Picture: ")}
                                <img src={formik.values.profilePicture} />
                            </div>
                        </div>
                        <div>
                            <div>Name:</div>
                            <CustomField status={props.status} label="First Name:" required={true} name="firstName" type="text" />
                            <CustomField status={props.status} label="Last Name:" required={true} name="lastName" type="text" />
                            <CustomField status={props.status} label="Middle Name:" required={false} name="middleName" type="text" />
                            <CustomField status={props.status} label="First Name:" required={false} name="firstName" type="text" />
                            <CustomField status={props.status} label="Preferred Name:" required={false} name="preferredName" type="text" />
                        </div>
                        <div>
                            <div>Current Address:</div>
                            <CustomField status={props.status} label="Street Name:" required={true} name="streetName" type="text" />
                            <CustomField status={props.status} label="Building/apt #:" required={true} name="apt" type="text" />
                            <CustomField status={props.status} label="City:" required={false} name="city" type="text" />
                            <div>
                                <label className="required" htmlFor="state">State</label>
                                {props.status !== "pending" ? (
                                    <><Field as="select" id="state" name="state">
                                        <option value="">Select</option>
                                        {US_STATES.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}</Field>
                                        <ErrorMessage component="span" className="errorMessage" name="state" /></>) : (
                                    <Field type="text" id="state" name="state" disabled />)}
                            </div>
                            <CustomField status={props.status} label="Zip:" required={false} name="zip" type="text" />
                        </div>
                        <div>
                            <div>Phone Number:</div>
                            <CustomField status={props.status} label="Cell Phone Number:" required={true} name="cellphone" type="text" />
                            <CustomField status={props.status} label="Work Phone Number:" required={false} name="workphone" type="text" />
                        </div>
                        <div>
                            <div>Info:</div>
                            <div><label className="required" htmlFor="email">Email:</label><Field type="text" id="email" name="email" disabled /></div>
                            <CustomField status={props.status} label="SSN:" required={true} name="SSN" type="text" />
                            <div><label htmlFor="driver_license ">Upload Driver License:</label>
                                {props.status !== "pending" && (<Field id="driver_license" name="driver_license" type="file" onChange={handleDriverLicenseChange} />)}
                                {formik.values.driverLicenseName ? (<a href={formik.values.driverLicense} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }} >
                                    <button type="button">{formik.values.driverLicenseName}</button></a>) : null}
                            </div>
                            <CustomField status={props.status} label="date of birth:" required={true} name="dateOfBirth" type="text" />
                            <div>
                                {props.status !== "pending" ? (<><label className="required" htmlFor="gender">gender:</label>
                                    <Field as="select" id="gender" name="gender"><option value="">Select</option><option value="male">male</option><option value="female">female</option><option value="I do not wish to answer">I do not wish to answer</option></Field>
                                    <ErrorMessage component="span" className="errorMessage" name="gender" /> </>) : (
                                    <CustomField status={props.status} label="gender:" type="select" name="gender" required={true} />)}
                            </div>
                        </div>


                        <div>
                            <div>Resident Status & Work Status</div>
                            <div>
                                <label className="required" htmlFor="residentStatus">Permanent resident or citizen of the U.S.?</label>
                                {props.status !== "pending" ? (<><Field as="select" id="residentStatus" name="residentStatus"><option value="">Select</option><option value="yes">Yes</option><option value="no">No</option></Field>
                                    <ErrorMessage component="span" className="errorMessage" name="residentStatus" /></>) : (
                                    <Field type="select" id="residentStatus" name="residentStatus" disabled />)}
                            </div>
                            {formik.values.residentStatus === "yes" && (
                                <div><label className="required" htmlFor="authorizationType_GC">Green Card or Citizen:</label>
                                    {props.status !== "pending" ? (<><Field as="select" name="authorizationType" id="authorizationType_GC">
                                        <option value="">Select</option><option value="Green Card">Green Card</option><option value="Citizen">Citizen</option></Field>
                                        <ErrorMessage component="span" className="errorMessage" name="authorizationType" /></>) : (
                                        <Field type="select" id="authorizationType_GC" name="authorizationType" disabled />)}
                                </div>)}
                            {formik.values.residentStatus === "no" && (
                                <div><label className="required" htmlFor="authorizationType">What is your work authorization:</label>
                                    {props.status !== "pending" ? (<><Field as="select" name="authorizationType" id="authorizationType_OPT">
                                        <option value="">Select work authorization</option><option value="H1-B">H1-B</option><option value="L2">L2</option><option value="F1(CPT/OPT)">F1(CPT/OPT)</option><option value="H4">H4</option><option value="Other">Other</option></Field>
                                        <ErrorMessage component="span" className="errorMessage" name="authorizationType" /></>) : (
                                        <Field type="select" id="authorizationType_OPT" name="authorizationType" disabled />)}

                                    {formik.values.authorizationType === "F1(CPT/OPT)" && (<div><label className="required" htmlFor="F1">Upload OPT Receipt:</label>
                                        {props.status !== "pending" && (<><Field name="work_authorization" type="file" onChange={handleWorkAuthorizationChange} required />
                                            <ErrorMessage component="span" className="errorMessage" name="workAuthorization" /></>)}
                                        {formik.values.workAuthorizationName ? (<a href={formik.values.workAuthorization} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                                            <button type="button"> {formik.values.workAuthorizationName} </button> </a>) : null}</div>)}

                                    {formik.values.authorizationType === "Other" && (
                                        <div><label className="required" htmlFor="otherVisaTitle">specify the visa title:</label>
                                            {props.status !== "pending" ? (<><Field name="otherVisaTitle" type="text" placeholder="Specify the visa title" required />
                                                <ErrorMessage component="span" className="errorMessage" name="otherVisaTitle" /> </>) : (
                                                <Field id="otherVisaTitle" name="otherVisaTitle" type="text" disabled />)}
                                        </div>)}
                                </div>)}
                                <CustomField status={props.status} label="Start Date:" required={false} name="startDate"type="date"/>
                                <CustomField status={props.status} label="End Date:" required={false} name="endDate" type="date"/>
                        </div>
                        <div>
                            <div>Reference</div>
                            <CustomField status={props.status} label="First Name:" required={true} name="referenceFirstName"type="text"/>
                            <CustomField status={props.status} label="Last Name:" required={true} name="referenceLastName"type="text"/>
                            <CustomField status={props.status} label="Middle Name:" required={false} name="referenceMiddleName"type="text"/>
                            <CustomField status={props.status} label="Phone:" required={false} name="referencePhone"type="text"/>
                            <CustomField status={props.status} label="Email:" required={false} name="referenceEmail"type="text"/>
                            <CustomField status={props.status} label="Relationship:" required={true} name="referenceRelationship"type="text"/>
                        </div>
                        <div>
                            <div>Emergency Contacts</div>
                            {props.status !== "pending" ? (
                                <FieldArray name="emergencyContacts">
                                    {({ remove, push }) => (<div>
                                        {formik.values.emergencyContacts.length > 0 &&
                                            formik.values.emergencyContacts.map((contact, index) => (
                                                <div key={index}>
                                                    <div>{`Emergency Contact ${index + 1}`}</div>
                                                    <div>
                                                        <label className="required">First Name:</label><Field name={`emergencyContacts.${index}.firstName`} />
                                                        <ErrorMessage component="span" className="errorMessage" name={`emergencyContacts.${index}.firstName`} />
                                                    </div>
                                                    <div>
                                                        <label className="required">Last Name:</label><Field name={`emergencyContacts.${index}.lastName`} />
                                                        <ErrorMessage component="span" className="errorMessage" name={`emergencyContacts.${index}.lastName`} />
                                                    </div>
                                                    <div>
                                                        <label>Middle Name:</label><Field name={`emergencyContacts.${index}.middleName`} />
                                                    </div>
                                                    <div>
                                                        <label>phone:</label><Field name={`emergencyContacts.${index}.phone`} />
                                                        <ErrorMessage component="span" className="errorMessage" name={`emergencyContacts.${index}.phone`} />
                                                    </div>
                                                    <div>
                                                        <label>email:</label><Field name={`emergencyContacts.${index}.email`} />
                                                        <ErrorMessage component="span" className="errorMessage" name={`emergencyContacts.${index}.email`} />
                                                    </div>
                                                    <div>
                                                        <label className="required">relationship:</label><Field name={`emergencyContacts.${index}.relationship`} />
                                                        <ErrorMessage component="span" className="errorMessage" name={`emergencyContacts.${index}.relationship`} />
                                                    </div>
                                                    <button type="button" onClick={() => remove(index)}> Remove </button>
                                                </div>
                                            ))}
                                        <button type="button" onClick={() => push(initialEmergencyContact)}> +Add </button>
                                    </div>
                                    )} </FieldArray>) : (formik.values.emergencyContacts.map((oneEmergencyObject, index) => {
                                        return (
                                            <div key={index}>
                                                <div>{`Emergency Contact ${index + 1}`}</div>
                                                <div><label>First Name:</label><input value={oneEmergencyObject.firstName} disabled /></div>
                                                <div><label>Last Name:</label><input value={oneEmergencyObject.lastName} disabled /></div>
                                                <div><label>Middle Name:</label><input value={oneEmergencyObject.middleName} disabled /></div>
                                                <div><label>phone:</label><input value={oneEmergencyObject.phone} disabled /></div>
                                                <div><label>email:</label><input value={oneEmergencyObject.email} disabled /></div>
                                                <div><label>relationship:</label><input value={oneEmergencyObject.relationship} disabled /></div>
                                                <br></br>
                                            </div>
                                        );
                                    }
                                    )
                            )}
                        </div>
                        <div>
                            <div>Uploaded Summary</div>
                            <div>
                                {formik.values.profilePictureName ? (<div>Profile picture:
                                    <a href={formik.values.profilePicture} target="_blank" rel="noopener noreferrer"style={{ textDecoration: "none" }}>
                                        <button type="button">{formik.values.profilePictureName}</button></a>
                                </div>) : null}

                                {formik.values.driverLicenseName ? (<div>Driver license:
                                    <a href={formik.values.driverLicense} target="_blank" rel="noopener noreferrer"style={{ textDecoration: "none" }}>
                                        <button type="button">{formik.values.driverLicenseName}</button></a>
                                    </div>) : null}

                                {formik.values.workAuthorizationName ? (<div>Work authorization:
                                    <a href={formik.values.workAuthorization} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                                        <button type="button">{formik.values.workAuthorizationName}</button></a>
                                    </div>) : null}
                            </div>
                        </div>
                        <div>{props.status !== "pending" && (<button type="submit">Submit</button>)}</div>
                    </Form>
                );
            }}
        </Formik>
    );
}