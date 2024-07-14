import React, { useEffect, useState } from "react";
import { Row, Col, Button, message } from "antd";
import "./Table.css";
import { deleteItem, get } from "../../../helpers/API.helper";
import {
  DELETE_MESSAGE,
  DELETE_MESSAGE_STORE,
  LIST_TABLE,
} from "../../../helpers/APILinks";
import { useSelector } from "react-redux";
import {
  confirm,
} from "../../../helpers/Alert.helper";

function ListTable() {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const account = useSelector((state) => state.AccountReducer);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`${LIST_TABLE}/${account.storeId}`);
        console.log('data', data);
        setTables(data);
      } catch (err) {
        console.error("ERR tại ListTable:", err);
        setTables([]);
      }
    };
    fetchApi();
  }, []);

  // reset 1 table
  const toggleStatus = async (id, status) => {
    console.log(id);
    if (status == 1) {
      const confirmReset = await confirm(
        "Are you sure want to delete",
        "If you reset, all chat will delete"
      );

      if (confirmReset.isConfirmed) {
        // hiện thị bên FE
        setTableFunction(id);

        try {
          // xoá tin nhắn
          const data = await deleteItem(
            `${DELETE_MESSAGE}/${account.storeId}/${id}`
          );

          if (data.ok) {
            message.success("Reset success");
          }
        } catch (error) {
          message.error("Reset success");
        }
      }
    } else {
      setTableFunction(id);
    }
  };

  // reset all tables => còn trống
  const resetAllTables = async () => {
    const confirmReset = await confirm(
      "Are you sure",
      "If you reset, all chat will delete"
    );
    if (confirmReset.isConfirmed) {
      setTables((prevTables) =>
        prevTables.map((table) => ({
          ...table,
          status: 0,
        }))
      );

      // delete all message
      try {
        const deleteAll = await deleteItem(
          `${DELETE_MESSAGE_STORE}/${account.storeId}`
        );

        if (deleteAll.ok) {
          message.success("Reset success");
        }
      } catch (error) { }
    }
  };

  // setTableFunction
  const setTableFunction = (id) => {
    setTables((prevTables) =>
      prevTables.map((tables) =>
        tables.tableId === id
          ? { ...tables, status: tables.status == 1 ? 0 : 1 }
          : tables
      )
    );
  };

  return (
    <>
      <h1>List table</h1>

      <Button
        onClick={resetAllTables}
        type="primary"
        style={{ marginBottom: "30px" }}
      >
        Reset
      </Button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {Array.from({ length: 4 }, (_, rowIndex) => (
        <Row gutter={[20, 20]} key={rowIndex}>
          {tables.slice(rowIndex * 4, rowIndex * 4 + 4).map((table) => (
            <Col key={table.tableId} xxl={6} xl={6} lg={6} md={12} sm={24}>
            <div
              className={
                table.status == 0
                  ? "table-item-warning"
                  : "table-item-success"
              }
              onClick={() => toggleStatus(table.tableId, table.status)}
              style={{ position: 'relative' }}
            >
              <button 
                style={{
                  border: 'none', 
                  borderRadius: "0 6px 0 0",
                  background: 'red', 
                  fontSize: '10px', 
                  cursor: 'pointer', 
                  color: 'white', 
                  fontWeight: 800,
                  position: 'absolute', 
                  top: '0', 
                  right: '0' 
                }}
                
              >
                X
              </button>
              <div className="status-container">
                Bàn {table.tableName}:
                <span className={`status ${table.status}`}>
                  {table.status == 0 ? "Còn trống" : "Đã full"}
                </span>
              </div>
            </div>
          </Col>
          ))}
        </Row>
      ))}
    </>
  );
}

export default ListTable;
