import React, { useState, useEffect } from "react";
import UserMenu from "../component/UserMenu";
import { Col, Layout, Row, Typography } from "antd";
import FolderList from "../component/FolderList";
import { Outlet, useLoaderData } from "react-router-dom";
import logo from "../assets/logo/note-app-logo.png";
import { Content, Footer, Header } from "antd/es/layout/layout";

export default function Home() {
  const { folders: initialFolders } = useLoaderData();
  const [folders, setFolders] = useState(initialFolders);

  const handleDeleteFolder = (id) => {
    setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== id));
  };

  useEffect(() => {
    setFolders(initialFolders);
  }, [initialFolders]);

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img style={{ width: 75, height: 75 }} src={logo} alt="Logo" />
          <Typography
            style={{
              marginLeft: 10,
              fontSize: 32,
              fontFamily: "Ubuntu",
              color: "#DEA0D1",
            }}
          >
            <strong>NOTE APP</strong>
          </Typography>
        </div>
        <UserMenu />
      </Header>
      <Content style={{ padding: "0 48px", backgroundColor: "#494B9E" }}>
        <div
          style={{
            minHeight: 280,
            padding: 24,
          }}
        >
          <Row
            justify="center"
            align="middle"
            style={{
              height: "70vh",
            }}
          >
            <Col
              span={8}
              style={{
                height: "100%",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                backgroundColor: "#AFECFF",
                border:"solid"
              }}
            >
              <FolderList folders={folders} onDeleteFolder={handleDeleteFolder} />
            </Col>
            <Col
              span={12}
              style={{
                height: "100%",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                backgroundColor: "#AFECFF",
                border:"solid"
              }}
            >
              <Outlet />
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}
