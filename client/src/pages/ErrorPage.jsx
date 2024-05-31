import { Button, Result } from "antd";
import React from "react";
import { useRouteError } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <div id="error.page">
      <Result
        status="warning"
        title={
          <>
            <h1>Oops</h1>
            <p>Sorry, an unexpected error has occurred</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
          </>
        }
        extra={
          <Button href="/" type="primary" key="console">
            Go Home
          </Button>
        }
      />
    </div>
  );
}
