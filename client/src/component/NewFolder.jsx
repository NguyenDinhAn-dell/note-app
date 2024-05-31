import { Input, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { addNewFolder } from "../utils/folderUtils";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FolderAddOutlined } from "@ant-design/icons";
export default function NewFolder() {
  const [newFolderName, setNewFolderName] = useState();
  const [searchparams, setSearchParams] = useSearchParams();
  const popupName = searchparams.get("popup");
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const showModal = () => {
    setSearchParams({ popup: "add-folder" });
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const { addFolder } = await addNewFolder({ name: newFolderName });
    console.log({ addFolder });
    setIsModalOpen(false);
    setNewFolderName("");
    navigate(-1);
    messageApi.open({
      type: "success",
      content: `Add new folder success!`,
    });
  };
  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      await handleOk();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewFolderName("");
    navigate(-1);
  };

  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value);
  };

  useEffect(() => {
    if (popupName === "add-folder") {
      setIsModalOpen(true);
      return;
    }
    setIsModalOpen(false);
  }, [popupName]);

  return (
    <>
      <FolderAddOutlined title="add-folder" onClick={showModal} />
      {contextHolder}
      <Modal
        title="Add new folder"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          id="name"
          value={newFolderName}
          onChange={handleNewFolderNameChange}
          onKeyPress={handleKeyPress}
        />
      </Modal>
    </>
  );
}
