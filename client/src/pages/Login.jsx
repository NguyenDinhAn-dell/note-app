import React, { useContext } from "react";
import { Button, Card, Col, Row } from "antd";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import { graphQLRequest } from "../utils/request";
import logo from "../assets/logo/note-app-logo.png";
import { GoogleOutlined } from "@ant-design/icons";

export default function Login() {
  const auth = getAuth();
  const { user } = useContext(AuthContext);
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);

    const { data } = await graphQLRequest({
      query: `mutation register($uid: String!, $name: String!) {
    register(uid: $uid, name: $name){
      uid
      name
    }
   }`,
      variables: {
        uid,
        name: displayName,
      },
    });
    console.log("register", { data });
  };
  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#494B9E",
        }}
      >
        <Card
          title={<h1>Welcome to Note App!</h1>}
          style={{ height: 500, textAlign: "center", backgroundColor:"#F0F2F5" }}
        >
          <div>
            <img style={{ width: "300px", height: "300" }} src={logo} />
          </div>
          <Button
            type="primary"
            style={{ backgroundColor: "#DB4437", borderColor: "#DB4437" }}
            onClick={handleLoginWithGoogle}
            icon={<GoogleOutlined />}
          >
            Login with Google
          </Button>
        </Card>
      </div>
    </>
  );
}
