import React, { useEffect, useState } from "react";
import { Row, Col, Button, message, Modal, Form, Input } from "antd";
import "./Table.css";
import { deleteItem, get, put } from "../../../helpers/API.helper";
import {
  DELETE_MESSAGE,
  DELETE_MESSAGE_STORE,
  LIST_TABLE,
} from "../../../helpers/APILinks";
import { useSelector } from "react-redux";
import {
  confirm,
} from "../../../helpers/Alert.helper";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";

function ListTable() {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [tableName, setTableName] = useState("");


  const [statusTable, setStatusTable] = useState("");
  const [tableId, setTableId] = useState("");
  const account = useSelector((state) => state.AccountReducer);
  // console.log("account", account.roleId)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    try {
      const data = await get(`${LIST_TABLE}/${account.storeId}`);
      // console.log('data', data);
      setTables(data);
    } catch (err) {
      console.error("ERR tại ListTable:", err);
      setTables([]);
    }
  };

  const onReload = () => {
    fetchApi();
  }

  // reset 1 table
  const toggleStatus = async (id, status) => {
    // console.log("status Table: ",status)
    setStatusTable(status)
    // console.log(id);
    if (status == 1) {
      const confirmReset = await confirm(
        "Are you sure want to reset",
        "If you reset, all chat will delete"
      );

      if (confirmReset.isConfirmed) {
        // hiện thị bên FE
        setTableFunction(id, 1);

        UpdateStatusTable(id, 0);

        try {
          // xoá tin nhắn
          const data = await deleteItem(
            `${DELETE_MESSAGE}/${account.storeId}/${id}`
          );

          if (data.ok) {
            message.success("Reset success");
          }
        } catch (error) {
          message.error("Reset error");
        }
      }
    } else {
      // hiện thị bên FE
      setTableFunction(id, 0);

      console.log('update thanh 1')

      UpdateStatusTable(id, 1);
    }
  };

  const deleteTable = async (id) => {
    console.log(id)
    const confirmReset = await confirm(
      "Are you want to delete",
      "If you delete, all chat will delete"
    );
    if (confirmReset.isConfirmed) {
      const data = await put(`http://localhost:5264/api/tables/updateisDelete/${id}?isDelete=1`);
      if (data) {
        message.success("Reset success", 2);
      }
      console.log(data);
    }
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
  }

  const UpdateStatusTable = async (id, status) => {
    // console.log(id, status)

    const data = await put(`http://localhost:5264/api/tables/updateisStatus/${id}?status=${status}`);
    if (data) {
      message.success("Reset success");
    }
    // console.log(data);
  }

  // reset all tables => còn trống
  const resetAllTables = async () => {
    const confirmReset = await confirm(
      "Are you sure to reset",
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
  const setTableFunction = (id, status) => {
    // console.log(id, status)
    setTables((prevTables) =>
      prevTables.map((tables) =>
        tables.tableId === id
          ? { ...tables, status: status == 1 ? 0 : 1 }
          : tables
      )
    );
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handlesubmit = async () => {
    // console.log("tableName", tableName)
    try {
      const response = await put(`http://localhost:5264/api/tables/updatetable/${tableId}?tableName=${tableName}`, {
        name: tableName
      });
      if (response) {
        message.success("Table name updated successfully", 2);
        setModalIsOpen(false);
        onReload();
      }
    } catch (err) {
      console.error("Error updating table name:", err);
      message.error("Failed to update table name");
    }
  };



  const openModal = (tableId, tableName) => {
    setModalIsOpen(true);
    // console.log("tableId:", tableId);
    // console.log("tableName:", tableName);

    setTableId(tableId);
    setTableName(tableName);
  }

  console.log(tables)

  return (
    <>
      <Modal
        visible={modalIsOpen}
        onOk={handlesubmit}
        onCancel={closeModal}

      >
        <Form>
          <FormItem label="Table Name" style={{ marginTop: '20px' }}>

            <Input

              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
            />


          </FormItem>
        </Form>
      </Modal>


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
              {account.roleId == 2 && <Button
                style={{
                  border: 'none',
                  background: 'red',
                  borderRadius: "5px",
                  fontSize: '10px',
                  cursor: 'pointer',
                  color: 'white',
                  fontWeight: 800,

                }}
                icon={<DeleteOutlined />}
                onClick={() => deleteTable(table.tableId)}
              >
              </Button>}

              {account.roleId == 2 && <Button
                style={{
                  border: 'none',
                  background: 'blue',
                  cursor: 'pointer',
                  color: 'white',
                  fontWeight: 800,

                }}
                icon={<EditOutlined />}
                onClick={() => openModal(table.tableId, table.tableName)}
              
              >
              </Button>
              }
              <div
                className={
                  table.status == 0
                    ? "table-item-warning"
                    : "table-item-success"
                }
                onClick={() => (
                  // console.log(table)
                  toggleStatus(table.tableId, table.status)
                )}

              >

                <div className="status-container">
                  {table.tableName}:
                  <span className={`status ${table.status}`}>
                    {table.status == 0 ? "Empty" : "Full"}
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