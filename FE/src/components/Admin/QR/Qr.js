import React, { useState } from "react";
import { Button, Col, Input, QRCode, Space } from "antd";
import { LIST_PRODUCT } from "../../../helpers/APILinks";

function Qr({ qr }) {
  //   console.log(qr)
  const [text, setText] = useState(`http://localhost:3000/listProduct/${qr.tableId}/${qr.storeId}`);

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
