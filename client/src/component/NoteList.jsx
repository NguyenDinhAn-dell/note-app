import { Button, Card, List, Modal, Typography,message, } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link, Outlet, useParams, useSubmit, useLoaderData, useNavigate } from "react-router-dom";
import { deleteNote } from "../utils/noteUtils";
import { DeleteOutlined, EditOutlined, FileAddOutlined } from "@ant-design/icons";

export default function NoteList() {
  const { noteId, folderId } = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);
  const { folder } = useLoaderData();
  const submit = useSubmit();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  console.log("[NoteLIST]", { folder });

  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId);
      return;
    }

    if (folder?.notes?.[0]) {
      navigate(`note/${folder.notes[0].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId, folder.notes]);

  const handleAddNewNote = () => {
    submit(
      {
        content: "",
        folderId,
      },
      { method: "post", action: `/folders/${folderId}` }
    );
  };

  const handleDeleteNote = async (id) => {
    const { deletedNote } = await deleteNote(id);
    console.log({ deletedNote });
    messageApi.open({
      type: "success",
      content: `Deleted note success`,
    });
    if (deletedNote) {
      setActiveNoteId(null);
      window.location.reload();
      
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
            <Typography.Title level={5}>Notes</Typography.Title>
            <FileAddOutlined onClick={handleAddNewNote} />
          </div>
          {contextHolder}
          <List
            bordered
            dataSource={folder.notes.map(({ id, content, updatedAt }) => (
              !id.includes('deleted') && // Filter out deleted notes
              <Link
                key={id}
                to={`note/${id}`}
                onClick={() => setActiveNoteId(id)}
                style={{ textDecoration: "none" }}
              >
                <Card
                    style={{
                      width: 400,
                      marginBottom: "16px",
                      backgroundColor: id === activeNoteId ? "#DEA0D1" : null,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    title={
                      <p>{moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
                    }
                    extra={<div>
                      <Button icon={<DeleteOutlined/>} onClick={() => handleDeleteNote(id)}></Button>
                      <Button
                        icon={<EditOutlined />}
                        onClick={showModal}
                        style={{ marginLeft: "10px" }}
                      />
                      </div>}
                  >
                    
                   
                    <div
                        dangerouslySetInnerHTML={{
                          __html: `${
                            content ? content.substring(0, 30) : "Empty"
                          }`,
                        }}
                      ></div>
                  </Card>
              </Link>
            ))}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
       
        <Modal
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Outlet />
        </Modal>
      </div>
    </>
  );
}