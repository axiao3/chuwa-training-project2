/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { getAllApplicationAction } from "../../app/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { List, Input, Badge, Typography, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

export default function EmployeeProfile() {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/signin", { state: { from: `/employees` } });
        } else if (user.type !== "manager") {
            navigate("/home");
        } else {
            dispatch(getAllApplicationAction());
        }
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

    return (
        <div className={style.container}>
            <Card>
                <Row gutter={16} className={style.header}>
                    <Col span={8}>
                        <Badge count={applications.length} showZero>
                            <Typography.Text>Total Employees</Typography.Text>
                        </Badge>
                    </Col>

                    <Col span={8} style={{ textAlign: 'center' }}>
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
                                <strong>SSN</strong>
                            </div>
                            <div style={{ flex: 1 }}>
                                <strong>Work Authorization Title</strong>
                            </div>
                            <div style={{ flex: 1 }}>
                                <strong>Phone Number</strong>
                            </div>
                            <div style={{ flex: 1 }}>
                                <strong>Email</strong>
                            </div>
                        </div>
                    }
                    dataSource={filteredApplications}
                    renderItem={item => (
                        <div className={style.listItem}>
                            <div style={{ flex: 1 }}>
                                <Link className={style.linkItem} to={`/employees/${item.user}`} target="_blank">
                                    {highlightSearch(item.firstName, searchTerm)}
                                    {" "}
                                    {item.preferredName &&
                                        <span>({highlightSearch(item.preferredName, searchTerm)}) </span>}
                                    {item.middleName &&
                                        <span>{highlightSearch(item.middleName, searchTerm)} </span>}
                                    {highlightSearch(item.lastName, searchTerm)}
                                </Link>
                            </div>
                            <div style={{ flex: 1 }}>{item.SSN}</div>
                            <div style={{ flex: 1 }}>{item.authorizationType !== "Other" ? item.authorizationType : item.otherVisaTitle}</div>
                            <div style={{ flex: 1 }}>{item.cellphone}</div>
                            <div style={{ flex: 1 }}>{item.email}</div>
                        </div>
                    )}
                />
            </Card>
        </div>
    );
}
