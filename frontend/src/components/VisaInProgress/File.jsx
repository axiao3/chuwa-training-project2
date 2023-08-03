/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Card, Input, Modal, Button, Select, Upload } from 'antd';

export default function File(props) {

    const [fileurl, setFileurl] = useState("");
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        if (props.status === "wait for Approval OPT Receipt") {
            setFileurl(props.item.workAuthorization);
            setFileName(props.item.workAuthorizationName);
        } else if (props.status === "wait for Approval OPT EAD") {
            setFileurl(props.item.OPTEAD);
            setFileName(props.item.OPTEADName);
        } else if (props.status === "wait for Approval I983") {
            setFileurl(props.item.I983);
            setFileName(props.item.I983Name);
        } else if (props.status === "wait for Approval I20") {
            setFileurl(props.item.I20);
            setFileName(props.item.I20Name);
        }
    }, [])

    return (
        <>
            {fileurl && fileName && 
            <a
                href={fileurl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
            >
                <button className="form_button" type="button" >
                    {fileName}
                </button>
            </a>}
        </>

    )
}
