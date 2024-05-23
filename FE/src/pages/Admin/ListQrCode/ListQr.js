import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { get } from "../../../helpers/API.helper";
import Qr from "../../../components/Admin/QR/Qr";
import { TABLE } from "../../../helpers/APILinks";

function ListQr() {
  const [qrs, setQrs] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(TABLE);

        if (data) {
          setQrs(data);
          // console.log(data)
        }
      } catch (error) {
        console.log("err in ListQr", error);
        setQrs([]);
      }
    };

    fetchApi();
  }, []);

  return (
    <>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {qrs.length > 0 && qrs.map((qr) => <Qr key={qr.tableId} qr={qr} />)}
      </Row>
    </>
  );
}

export default ListQr;
