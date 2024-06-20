import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import './Table.css';
import { get } from '../../../helpers/API.helper';
import { LIST_TABLE } from '../../../helpers/APILinks';
import { useSelector } from 'react-redux';
function ListTable() {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
const account = useSelector (state => state.AccountReducer);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get(`${LIST_TABLE}/${account.storeId}`);
        setTables(data);
      } catch (err) {
        console.error('ERR tại ListTable:', err);
        setTables([]);

      }
    };
    fetchApi();
  }, []);

  const toggleStatus = (id) => {
    setTables((prevTables) =>
      prevTables.map((tables) =>
        tables.tableId === id
          ? { ...tables, status: tables.status === '1' ? '0 ' : '1' }
          : tables
      )
    );
  };

  const resetAllTables = () => {
    setTables((prevTables) =>
      prevTables.map((table) => ({
        ...table,
        status: '1'
      }))
    );
  };

  return (
    <>
      <h1>List table</h1>
      <Button onClick={resetAllTables} type="primary">
        Reset
      </Button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {Array.from({ length: 4 }, (_, rowIndex) => (
        <Row gutter={[20, 20]} key={rowIndex}>
          {tables
            .slice(rowIndex * 4, rowIndex * 4 + 4)
            .map((table) => (
              <Col key={table.tableId} xxl={6} xl={6} lg={6} md={12} sm={24}>
                <div className="table-item">
                  <div className="status-container">
                    Bàn {table.tableId}:
                    <span className={`status ${table.status}`}>
                      {table.status === '1' ? 'Còn trống' : 'Đã full'}
                    </span>
                  </div>
                  <Button
                    onClick={() => toggleStatus(table.tableId)}
                    className="status-button"
                  >
                    {table.status === '1'
                      ? 'Chuyển thành Đã full'
                      : 'Chuyển thành Còn trống'}
                  </Button>
                </div>
              </Col>
            ))}
        </Row>
      ))}
    </>
  );
}

export default ListTable;
