/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateApplicationAction, sendNotificationAction } from '../../app/visaSlice';

export default function ActionComponent(props) {
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState("");
  const [reject, setReject] = useState(false);

  const handleOPTReceiptReject = () => {
    const reject = { OPTReceiptStatus: "rejected", user: props.user_id, OPTReceiptFeedback: feedback }
    console.log(reject);
    dispatch(updateApplicationAction(reject)).then((action) => {
      if (updateApplicationAction.fulfilled.match(action)) {
        alert("Reject Success!");
        window.location.href = `/visaHR`;
      }
    })
  }

  const handleOPTReceiptApprove = () => {
    const approve = { OPTReceiptStatus: "approved", OPTReceiptFeedback: feedback, user: props.user_id }
    console.log(approve);
    dispatch(updateApplicationAction(approve)).then((action) => {
      if (updateApplicationAction.fulfilled.match(action)) {
        alert("Approve Success!");
        window.location.href = `/visaHR`;
      }
    })
  }

  const handleOPTEADReject = () => {
    const reject = { OPTEADStatus: "rejected", user: props.user_id, OPTEADFeedback: feedback }
    console.log(reject);
    dispatch(updateApplicationAction(reject)).then((action) => {
      if (updateApplicationAction.fulfilled.match(action)) {
        alert("Reject Success!");
        window.location.href = `/visaHR`;
      }
    })
  }

  const handleOPTEADApprove = () => {
    const approve = { OPTEADStatus: "approved", OPTEADFeedback: feedback, user: props.user_id }
    console.log(approve);
    dispatch(updateApplicationAction(approve)).then((action) => {
      if (updateApplicationAction.fulfilled.match(action)) {
        alert("Approve Success!");
        window.location.href = `/visaHR`;
      }
    })
  }

  const handleI983Reject = () => {
    const reject = { I983Status: "rejected", user: props.user_id, I983Feedback: feedback }
    console.log(reject);
    dispatch(updateApplicationAction(reject)).then((action) => {
      if (updateApplicationAction.fulfilled.match(action)) {
        alert("Reject Success!");
        window.location.href = `/visaHR`;
      }
    })
  }

  const handleI983Approve = () => {
    const approve = { I983Status: "approved", I983Feedback: feedback, user: props.user_id }
    console.log(approve);
    dispatch(updateApplicationAction(approve)).then((action) => {
      if (updateApplicationAction.fulfilled.match(action)) {
        alert("Approve Success!");
        window.location.href = `/visaHR`;
      }
    })
  }

  const handleI20Reject = () => {
    const reject = { I20Status: "rejected", user: props.user_id, I20Feedback: feedback }
    console.log(reject);
    dispatch(updateApplicationAction(reject)).then((action) => {
      if (updateApplicationAction.fulfilled.match(action)) {
        alert("Reject Success!");
        window.location.href = `/visaHR`;
      }
    })
  }

  const handleI20Approve = () => {
    const approve = { I20Status: "approved", I20Feedback: feedback, user: props.user_id }
    console.log(approve);
    dispatch(updateApplicationAction(approve)).then((action) => {
      if (updateApplicationAction.fulfilled.match(action)) {
        alert("Approve Success!");
        window.location.href = `/visaHR`;
      }
    })
  }

  const handleSendEmail = (email, type) => {
    console.log("email:", email);
    console.log("type:", type);
    dispatch(sendNotificationAction({email, type})).then((action) => {
      if (sendNotificationAction.fulfilled.match(action)) {
        alert("Send Notication Success!");
        window.location.href = `/visaHR`;
      }
    })
  }

  return (
    <div>
      {props.status === "wait for Approval OPT Receipt" && (
        <div>
          {reject &&
            <>
              <div className="required" style={{ color: "gray" }}>Provide Feedback</div>
              <textarea
                rows="5"
                style={{ fontFamily: 'Arial, sans-serif' }}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required />
            </>}

          {!reject ?
            <div className="two_buttons">
              <button className="form_button" type="button" onClick={handleOPTReceiptApprove}>Approve</button>
              <button className="form_button" type="button" onClick={() => setReject(true)}>Reject</button>
            </div> :
            <div className="two_buttons">
              <button className="form_button" type="button" onClick={handleOPTReceiptReject}>Confirm</button>
              <button className="form_button" type="button" onClick={() => { setReject(false); setFeedback("") }}>Cancel</button>
            </div>}
        </div>
      )}

      {props.status === "resubmit OPT receipt" && (
        <button className="form_button" type="button" onClick={() => handleSendEmail(props.email, "OPT Receipt")}>Send Notification</button>
      )}

      {props.status === "submit OPT EAD" && (
        <button className="form_button" type="button" onClick={() => handleSendEmail(props.email, "OPT EAD")}>Send Notification</button>
      )}

      {props.status === "wait for Approval OPT EAD" && (
        <div>
          {reject &&
            <>
              <div className="required" style={{ color: "gray" }}>Provide Feedback</div>
              <textarea
                rows="5"
                style={{ fontFamily: 'Arial, sans-serif' }}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required />
            </>}

          {!reject ?
            <div className="two_buttons">
              <button className="form_button" type="button" onClick={handleOPTEADApprove}>Approve</button>
              <button className="form_button" type="button" onClick={() => setReject(true)}>Reject</button>
            </div> :
            <div className="two_buttons">
              <button className="form_button" type="button" onClick={handleOPTEADReject}>Confirm</button>
              <button className="form_button" type="button" onClick={() => { setReject(false); setFeedback("") }}>Cancel</button>
            </div>}
        </div>
      )}

      {props.status === "resubmit OPT EAD" && (
        <button className="form_button" type="button" onClick={() => handleSendEmail(props.email, "OPT EAD")}>Send Notification</button>
      )}

      {props.status === "submit I983" && (
        <button className="form_button" type="button" onClick={() => handleSendEmail(props.email, "I983")}>Send Notification</button>
      )}

      {props.status === "wait for Approval I983" && (
        <div>
          {reject &&
            <>
              <div className="required" style={{ color: "gray" }}>Provide Feedback</div>
              <textarea
                rows="5"
                style={{ fontFamily: 'Arial, sans-serif' }}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required />
            </>}

          {!reject ?
            <div className="two_buttons">
              <button className="form_button" type="button" onClick={handleI983Approve}>Approve</button>
              <button className="form_button" type="button" onClick={() => setReject(true)}>Reject</button>
            </div> :
            <div className="two_buttons">
              <button className="form_button" type="button" onClick={handleI983Reject}>Confirm</button>
              <button className="form_button" type="button" onClick={() => { setReject(false); setFeedback("") }}>Cancel</button>
            </div>}
        </div>
      )}

      {props.status === "resubmit I983" && (
        <button className="form_button" type="button" onClick={() => handleSendEmail(props.email, "I983")}>Send Notification</button>
      )}

      {props.status === "submit I20" && (
        <button className="form_button" type="button" onClick={() => handleSendEmail(props.email, "I20")}>Send Notification</button>
      )}

      {props.status === "wait for Approval I20" && (
        <div>
          {reject &&
            <>
              <div className="required" style={{ color: "gray" }}>Provide Feedback</div>
              <textarea
                rows="5"
                style={{ fontFamily: 'Arial, sans-serif' }}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required />
            </>}

          {!reject ?
            <div className="two_buttons">
              <button className="form_button" type="button" onClick={handleI20Approve}>Approve</button>
              <button className="form_button" type="button" onClick={() => setReject(true)}>Reject</button>
            </div> :
            <div className="two_buttons">
              <button className="form_button" type="button" onClick={handleI20Reject}>Confirm</button>
              <button className="form_button" type="button" onClick={() => { setReject(false); setFeedback("") }}>Cancel</button>
            </div>}
        </div>
      )}

      {props.status === "resubmit I20" && (
        <button className="form_button" type="button" onClick={() => handleSendEmail(props.email, "I20")}>Send Notification</button>
      )}

    </div>
  )
}
