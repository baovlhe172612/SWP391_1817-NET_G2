import React from "react";
import { Button, Col, Input, QRCode, Space } from "antd";
import { LIST_PRODUCT } from "../../../helpers/APILinks";

function Qr({ qr }) {
  //   console.log(qr)
  const [text, setText] = React.useState(`http://192.168.244.176:3000/listProduct/${qr.tableId}`);

  return (
    <>
      <Col span={6} style={{marginBottom: "10px"}}>
        <Space direction="vertical" align="center">
          <Button type="primary">Table: {qr.tableId}</Button>
          <QRCode value={text || "-"} />
          <Input placeholder="-" maxLength={60} value={text} />
        </Space>
      </Col>
    </>
  );
}

export default Qr;
