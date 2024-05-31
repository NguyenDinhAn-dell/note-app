import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Avatar, Dropdown, Menu, Space } from "antd";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";

export default function UserMenu() {
  const {
    user: { displayName, photoURL, auth },
  } = useContext(AuthContext);
  const handleLogout = () => {
    auth.signOut();
  };

  const items = [
    {
      label: "Logout",
      key: "Logout",
      onClick: handleLogout,
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar src={photoURL}></Avatar>
          {displayName}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
}
