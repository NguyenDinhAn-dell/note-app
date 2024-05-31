import React, { useEffect, useState } from "react";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Button, Typography ,message} from "antd";
import { useLoaderData, useSubmit, useLocation } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Note() {
  const { note } = useLoaderData();
  const submit = useSubmit();
  const location = useLocation();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [rawHTML, setRawHTML] = useState(note?.content || ""); 
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (note) {
      const blocksFromHTML = convertFromHTML(note.content);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(state));
      setRawHTML(note.content);
    }
  }, [note]);

  const handleSave = () => {
    if (rawHTML !== note?.content) {
      submit(
        { ...note, content: rawHTML },
        {
          method: "post",
          action: location.pathname,
        }
      );
    }
    messageApi.open({
      type: "success",
      content: `Deleted note success`,
    });
  };

  const handleOnChange = (e) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };

  if (!note) {
    return <Typography.Text>No note selected</Typography.Text>; 
  }

  return (
    <>
      <div
        style={{
          background: "#f7f7f7",
          fontWeight: "bold",
          position: "sticky",
          height: 50,
          top: 0,
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 16px",
        }}
      >
        {contextHolder}
        <Typography.Title level={5}>Editing Note</Typography.Title>
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleOnChange}
        placeholder="Write something"
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "history",
            "embedded",
            "emoji",
            "image",
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    </>
  );
}
