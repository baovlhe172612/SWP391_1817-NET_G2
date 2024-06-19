import { CommentOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import React from "react";

function FloatButtonMess({ handleOnclick }) {
  return (
    <>
      <FloatButton
        trigger="click"
        onClick={handleOnclick}
        type="primary"
        style={{
          fontSize: "100px",
        }}
        icon={<CommentOutlined />}
      />
    </>
  );
}

export default FloatButtonMess;
