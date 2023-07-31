/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, List, Radio } from "antd";
import "./style.css";
import { getAllApplicationsByStatus } from "../../services/application";

const ApplicationReview = () => {
  const [status, setStatus] = useState("Pending");
  const [applications, setApplications] = useState([]);

  //   const filteredApplications = applications.filter(app => app.status === status);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getAllApplicationsByStatus(status);
        setApplications(response);
      } catch (error) {
        console.error("Failed to fetch applications", error);
      }
    };

    fetchApplications();
  }, [status]);

  return (
    <div>
      <Radio.Group
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ marginBottom: 20 }}
      >
        <Radio.Button value="Pending">Pending</Radio.Button>
        <Radio.Button value="Rejected">Rejected</Radio.Button>
        <Radio.Button value="Approved">Approved</Radio.Button>
      </Radio.Group>

      <List
        itemLayout="horizontal"
        dataSource={applications}
        renderItem={(item) => (
          //   <List.Item
          //     actions={[
          //       <a href={item.link} target="_blank" rel="noopener noreferrer">
          //         View Application
          //       </a>,
          //     ]}
          //   >
          <List.Item
            actions={[
              <Button
                type="link"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Application
              </Button>,
            ]}
          >
            <List.Item.Meta title={item.fullName} description={item.email} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ApplicationReview;
