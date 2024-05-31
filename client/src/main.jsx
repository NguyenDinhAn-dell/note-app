import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./firebase/config";
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./index.css";
import routes from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  // </React.StrictMode>
);
