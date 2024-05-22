import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import './Table.css';
import { get } from '../../../helpers/API.helper';

function ListTable() {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await get('http://localhost:5264/api/Table');
        setTables(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch data:', err);
      }
    };
    fetchApi();
  }, []);

  const toggleStatus = (id) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id
          ? { ...table, status: table.status === '1' ? 'full' : 'available' }
          : table
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
              <Col key={table.id} xxl={6} xl={6} lg={6} md={12} sm={24}>
                <div className="table-item">
                  <div className="status-container">
                    Bàn {table.id}:
                    <span className={`status ${table.status}`}>
                      {table.status === '1' ? 'Còn trống' : 'Đã full'}
                    </span>
                  </div>
                  <Button
                    onClick={() => toggleStatus(table.id)}
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
