import React from "react";
import "./NotFound.css";
import { Button, Result } from 'antd'

function NotFound() {
  const goBack = () => {
    window.history.back();
  }
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={goBack}>Back Home</Button>}
      />
    </>
  );
}

export default NotFound;
