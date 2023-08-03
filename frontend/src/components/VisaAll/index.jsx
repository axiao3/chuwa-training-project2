/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllApplicationAction } from "../../app/applicationSlice";
import { List, Input, Badge, Typography, Card, Row, Col } from 'antd';
import style from "./style.module.css";
import { Link } from 'react-router-dom';

export default function VisaAll() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllApplicationAction());
    }, []);

    const { applications } = useSelector((state) => state.applications);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredApplications, setFilteredApplications] = useState([]);

    useEffect(() => {
        const sortedApplications = [...applications].sort((a, b) =>
            a.lastName.localeCompare(b.lastName)
        );

        if (searchTerm === '') {
            setFilteredApplications(sortedApplications);
        } else {
            const results = sortedApplications.filter(employee =>
                employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (employee.preferredName && employee.preferredName.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredApplications(results);
        }
    }, [searchTerm, applications]);

    function highlightSearch(text, searchTerm) {
        if (!searchTerm) return text;

        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === searchTerm.toLowerCase() ?
                        <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span> :
                        part
                )}
            </span>
        );
    }

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
            <Card style={{ backgroundColor: "rgb(250, 252, 254)" }}>
                <Row gutter={16} className={style.header}>

                    <Col span={8} style={{ textAlign: 'right', fontWeight: "bold", color: "gray" }}>
                        {filteredApplications.length === 0 ? 'No records found' : filteredApplications.length === 1 ? 'One record found' : `${filteredApplications.length} records found`}
                    </Col>

                    <Col span={8} style={{ textAlign: 'right' }}>
                        <Input.Search
                            className={style.searchBox}
                            placeholder="Search by name"
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </Col>
                </Row>

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
                                <strong>Files</strong>
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
                            <div style={{ flex: 1 }}>
                                <strong>Next Step</strong>
                            </div>
                        </div>
                    }
                    dataSource={filteredApplications}
                    renderItem={item => (
                        <div className={style.listItem}>
                            <div style={{ flex: 1 }}>
                                <Link className={style.linkItem} to={`/employees/${item.user}/files`} target="_blank">
                                    {highlightSearch(item.firstName, searchTerm)}
                                    {" "}
                                    {item.preferredName &&
                                        <span>({highlightSearch(item.preferredName, searchTerm)}) </span>}
                                    {item.middleName &&
                                        <span>{highlightSearch(item.middleName, searchTerm)} </span>}
                                    {highlightSearch(item.lastName, searchTerm)}
                                </Link>
                            </div>
                            <div style={{ flex: 1 }}>{item.authorizationType}</div>
                            <div style={{ flex: 1 }}>
                                {item.authorizationType === "F1(CPT/OPT)" &&
                                    <Link className={style.linkItem} to={`/employees/${item.user}/files`} target="_blank">
                                        Files
                                    </Link>
                                }
                            </div>
                            <div style={{ flex: 1 }}>{item.startDate}</div>
                            <div style={{ flex: 1 }}>{item.endDate}</div>
                            <div style={{ flex: 1 }}>{(item.startDate && item.endDate) && remains(item.startDate, item.endDate)}</div>
                            <div style={{ flex: 1 }}>{nextStep(item)}</div>
                        </div>
                    )}
                />
            </Card>
        </div>
    );
}
