/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVisaInProgressAction } from "../../app/visaSlice";
import style from "./style.module.css";
import { List, Input, Badge, Typography, Card, Row, Col } from 'antd';
import ActionComponent from "./ActionComponent";
import File from "./File";

export default function VisaInProgress() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVisaInProgressAction());

    }, []);

    const { visas } = useSelector((state) => state.visas);

    const remains = (startDateStr, endDateStr) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startDate = new Date(startDateStr);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(endDateStr);
        endDate.setHours(0, 0, 0, 0);
        let differenceInTime;
        if (today >= startDate) {
            differenceInTime = endDate.getTime() - today.getTime();
        } else {
            differenceInTime = endDate.getTime() - startDate.getTime();
        }
        const remainingDays = differenceInTime / (1000 * 3600 * 24);  // Convert time difference to days
        return remainingDays > 0 ? String(Math.ceil(remainingDays)) : "0";
    }

    const nextStep = (visa) => {
        if (visa.OPTReceiptStatus !== "approved") {
            if (visa.OPTReceiptStatus === "pending") {
                return ("wait for Approval OPT Receipt");
            } else if (visa.OPTReceiptStatus === "rejected") {
                return "resubmit OPT receipt"
            }
        } else {
            if (!visa.OPTEADStatus) {
                return ("submit OPT EAD");
            } else if (visa.OPTEADStatus === "pending") {
                return ("wait for Approval OPT EAD");
            } else if (visa.OPTEADStatus === "rejected") {
                return ("resubmit OPT EAD")
            } else {
                if (!visa.I983Status) {
                    return ("submit I983");
                } else if (visa.I983Status === "pending") {
                    return ("wait for Approval I983");
                } else if (visa.I983Status === "rejected") {
                    return ("resubmit I983")
                } else {
                    if (!visa.I20Status) {
                        return ("submit I20");
                    } else if (visa.I20Status === "pending") {
                        return ("wait for Approval I20");
                    } else if (visa.I20Status === "rejected") {
                        return ("resubmit I20")
                    } else { }
                }
            }
        }
    }

    return (
        <div className={style.container}>
            <Card style={{backgroundColor: "rgb(250, 252, 254)"}}>
                <List
                    header={
                        <div className={style.listItem}>
                            <div style={{ flex: 1 }}>
                                <strong>Name</strong>
                            </div>
                            <div style={{ flex: 1 }}>
                                <strong>Type</strong>
                            </div>
                            <div style={{ flex: 1 }}>
                                <strong>File</strong>
                                {/* <strong>Work Authorization</strong> */}
                            </div>
                            <div style={{ flex: 1 }}>
                                <strong>Start</strong>
                            </div>
                            <div style={{ flex: 1 }}>
                                <strong>End</strong>
                            </div>
                            <div style={{ flex: 1 }}>
                                <strong>Remain Days</strong>
                            </div>
                            <div style={{ flex: 1, textAlign: "center" }}>
                                <strong>Next Step</strong>
                            </div>
                            <div style={{ flex: 1, textAlign: "center" }}>
                                <strong>Action</strong>
                            </div>
                        </div>
                    }
                    dataSource={visas}
                    renderItem={item => (
                        <div className={style.listItem} >
                            <div style={{ flex: 1 }}>{item.firstName + " " + item.middleName + " " + item.lastName}</div>
                            <div style={{ flex: 1 }}>{item.authorizationType}</div>
                            <div style={{ flex: 1 }}><File status={nextStep(item)} item={item}/></div>
                            <div style={{ flex: 1 }}>{item.startDate}</div>
                            <div style={{ flex: 1 }}>{item.endDate}</div>
                            <div style={{ flex: 1 }}>{(item.startDate && item.endDate) && remains(item.startDate, item.endDate)}</div>
                            <div style={{ flex: 1 }}>{nextStep(item)}</div>
                            <div style={{ flex: 1, textAlign: "center" }}>
                                <ActionComponent status={nextStep(item)} user_id={item.user} email={item.email} />
                            </div>
                            {/* <div style={{ flex: 1 }}>{nextStep(item)}</div> */}
                        </div>
                    )}
                />

            </Card>
        </div>
    )
}
