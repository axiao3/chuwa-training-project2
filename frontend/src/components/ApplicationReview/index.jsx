/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, List, Radio } from "antd";
import "./style.css";
import { getAllApplicationAction } from "../../app/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../utils/Loading";

const ApplicationReview = () => {
  const dispatch = useDispatch();
  const { applications } = useSelector((state) => state.applications);
  const [status, setStatus] = useState("pending");
  const [applicationsByState, setApplicationsByState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllApplicationAction()).then(setIsLoading(false));
  }, []);

  const handleStateChangeHandler = (e) => {
    // setStatus(e.target.value);
    setApplicationsByState(
      applications.filter((each) => {
        return each.submittedStatus === e.target.value;
      })
    );
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Radio.Group
          onChange={handleStateChangeHandler}
          style={{ marginBottom: 20 }}
        >
          <Radio.Button value="pending">Pending</Radio.Button>
          <Radio.Button value="rejected">Rejected</Radio.Button>
          <Radio.Button value="approved">Approved</Radio.Button>
        </Radio.Group>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={applicationsByState}
        renderItem={(item) => {
          // console.log(item.user);
          return (
            <List.Item
              actions={[
                <Button
                  type="link"
                  href={`/${item.user}/application`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Application
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  item.firstName +
                  (item.preferredName && "(" + item.preferredName + ") ") +
                  item.middleName +
                  " " +
                  item.lastName
                }
                description={item.email}
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default ApplicationReview;
