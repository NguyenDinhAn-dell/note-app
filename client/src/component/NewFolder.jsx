import { Button, Input, Modal } from "antd";
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
        />
      </Modal>
    </>
  );
}
