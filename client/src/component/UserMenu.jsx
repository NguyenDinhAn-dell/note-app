import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Avatar, Dropdown, Space } from "antd";
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
      <div onClick={(e) => e.preventDefault()} style={{ cursor: "pointer" }}>
        <Space>
          <Avatar src={photoURL}></Avatar>
          {displayName}
          <DownOutlined />
        </Space>
      </div>
    </Dropdown>
  );
}
