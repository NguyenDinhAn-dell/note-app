import { Button, Card, List, Typography, Modal, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NewFolder from "./NewFolder";
import { deleteFolder, updateFolder } from "../utils/folderUtils";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export default function FolderList({
  folders,
  onDeleteFolder,
  onUpdateFolder,
}) {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [form] = Form.useForm();

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this folder?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteFolder(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDeleteFolder = async (id) => {
    try {
      await deleteFolder(id);
      onDeleteFolder(id);
      if (id === activeFolderId) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const handleEditFolder = (folder) => {
    setCurrentFolder(folder);
    form.setFieldsValue({ name: folder.name });
    setIsEditModalVisible(true);
  };

  const handleUpdateFolder = async (values) => {
    try {
      const updatedFolder = await updateFolder(currentFolder.id, values.name);
      onUpdateFolder(updatedFolder);
    } catch (error) {
      console.error("Error updating folder:", error);
    }
    setIsEditModalVisible(false);
    navigate(`/folders/${currentFolder.id}`);
  };

  useEffect(() => {
    if (folderId) {
      setActiveFolderId(folderId);
    } else if (folders[0]) {
      navigate(`folders/${folders[0].id}`);
    }
  }, [folderId, folders, navigate]);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <div
          style={{
            background: "#f7f7f7",
            fontWeight: "bold",
            position: "sticky",
            top: 0,
            zIndex: 1,
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 16px",
          }}
        >
          <Typography.Title level={5}>Folders</Typography.Title>
          <NewFolder />
        </div>
        <div style={{ position: "relative", zIndex: 0 }}>
          <List
            bordered
            dataSource={folders.map(({ id, name }) => (
              <Link
                key={id}
                to={`folders/${id}`}
                onClick={() => setActiveFolderId(id)}
              >
                <Card
                  style={{
                    width: 400,
                    backgroundColor: id === activeFolderId ? "#ADD8E6" : null,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  actions={[
                    <Button  icon={<EditOutlined
                      key="edit"
                      onClick={() => handleEditFolder({ id, name })}
                    />}/>
                    ,
                    <Button  icon={ <DeleteOutlined
                
                      onClick={() => showDeleteConfirm(id)}
                      key="ellipsis"
                    />}/>
                   
                  ]}
                >
                  {name}
                </Card>
              </Link>
            ))}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div>
      </div>
      <Modal
        title="Edit Folder"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleUpdateFolder}>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input the folder name!" },
            ]}
          >
            <Input placeholder="Folder Name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
