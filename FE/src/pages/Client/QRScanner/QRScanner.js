// src/components/QRCodeComponent/QRCodeComponent.js
import React from 'react';
import { Input, QRCode, Space } from 'antd';

const QRScanner = () => {
  const [text, setText] = React.useState(`http://localhost:3000/home?tableId=1`); // URL trang chủ

  return (
    <Space direction="vertical" align="center">
      <QRCode value={text || '-'} />
      <Input
        placeholder="-"
        maxLength={60}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Space>
  );
};

export default QRScanner;
