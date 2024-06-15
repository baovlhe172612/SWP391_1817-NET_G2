import { Col, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import { get } from "../../../helpers/API.helper";
import Qr from "../../../components/Admin/QR/Qr";
import { LIST_TABLE, TABLE } from "../../../helpers/APILinks";
import { useSelector } from "react-redux";

function ListQr() {
  const [qrs, setQrs] = useState([]);
  const account = useSelector(state => state.AccountReducer)

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`${LIST_TABLE}/${account?.storeId}`);

        if (data) {
          setQrs(data);

          if(data.length == 0) {
            message.error('No data')
          }
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
        {qrs.length > 0 &&
          qrs.map((qr) => (
            <>
              <Qr key={qr.tableId} qr={qr} />
            </>
          ))}
      </Row>
    </>
  );
}

export default ListQr;
