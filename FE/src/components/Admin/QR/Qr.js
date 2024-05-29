import React from "react";
import { Button, Col, Input, QRCode, Space } from "antd";
import { LIST_PRODUCT } from "../../../helpers/APILinks";

function Qr({ qr }) {
  //   console.log(qr)
  const [text, setText] = React.useState(`${LIST_PRODUCT}${qr.tableId}`);

  return (
    <>
      <Col span={6} style={{marginBottom: "10px"}}>
        <Space direction="vertical" align="center">
          <Button type="primary">Table: {qr.tableId}</Button>
          <QRCode value={text || "-"} />
          <Input placeholder="-" maxLength={60} value={text} readOnly/>
        </Space>
      </Col>
    </>
  );
}

export default Qr;
