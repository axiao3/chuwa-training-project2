/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import style from "./style.module.css";
import { getAllApplicationAction } from "../../app/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { List, Input, Badge, Typography } from 'antd';
import { Link } from 'react-router-dom';

export default function EmployeeProfile() {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();

    console.log("user.type: ", user.type);

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
        if (searchTerm === '') {
            setFilteredApplications(applications);
        } else {
            const results = applications.filter(employee =>
                employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (employee.preferredName && employee.preferredName.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredApplications(results);
        }
    }, [searchTerm, applications]);

    const highlightSearch = (text, searchTerm) => {
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
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
                <div>
                    <Badge count={applications.length} showZero>
                        <Typography.Text>Total Employees</Typography.Text>
                    </Badge>
                </div>

                <div>
                    {filteredApplications.length === 0 ? 'No records found' : filteredApplications.length === 1 ? 'One record found' : `${filteredApplications.length} records found`}
                </div>

                <div>
                    <Input.Search
                        placeholder="Search by name"
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <List
                dataSource={filteredApplications}
                renderItem={item => (
                    <List.Item>
                        <div style={{ flex: 1 }}>
                            {/* <Link to={`/${item.name}`} target="_blank">{item.name}</Link> */}
                            {/* <Link to={`/${item.user}`} target="_blank">{item.firstName + (item.preferredName && " (" + item.preferredName + ") ") + " " + item.middleName + " " + item.lastName}</Link> */}
                            <Link to={`/${item.user}`} target="_blank">
                                {highlightSearch(item.firstName, searchTerm)}
                                {(item.preferredName &&
                                    " (" + highlightSearch(item.preferredName, searchTerm) + ") ")}
                                {(item.middleName &&
                                    " " + highlightSearch(item.middleName, searchTerm))}
                                {" " + highlightSearch(item.lastName, searchTerm)}
                            </Link>
                        </div>
                        <div style={{ flex: 1 }}>{item.SSN}</div>
                        <div style={{ flex: 1 }}>{item.authorizationType !== "Other" ? item.authorizationType : item.otherVisaTitle}</div>
                        <div style={{ flex: 1 }}>{item.cellphone}</div>
                        <div style={{ flex: 1 }}>{item.email}</div>
                    </List.Item>
                )}
            />
        </div>
    );
}
