"use client"; // This is a client component 👈🏽

import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import axios from "axios";
const Applications = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<any>();
  const getApplicants = async () => {
    try {
      const email = "vikas@gmail.com";
      const response = await axios.get(
        "https://pgrkam-uh5k.onrender.com/api/v1/jobs/",
      );
      const tempInfo = response.data.data;
      const allInfo = tempInfo.filter(
        (info: any) => info.recruiterEmail === email,
      );
      let tempData = allInfo[0].applications;
      tempData = tempData.map((datas: any) => {
        return {
          ...datas,
          jobTitle: allInfo.jobTitle,
        };
      });
      setData(tempData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getApplicants();
  }, []);

  const columns: any = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: () => (
        <a
          style={{ color: "orange" }}
          onClick={() => {
            getApplicants();
            // setVisible(true);
          }}
        >
          View
        </a>
      ),
    },
  ];
  return (
    <>
      <Modal open={visible}></Modal>
      <Table dataSource={data} columns={columns} />;
    </>
  );
};

export default Applications;
