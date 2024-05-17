import React, { useEffect, useState } from 'react'
import { Row, Col, Carousel, Collapse, Image, Button } from "antd"
import "./Table.css"
function ListTable() {
  const [tables, setTables] = useState([
    { id: 1, status: 'available' },
    { id: 2, status: 'full' },
    { id: 3, status: 'available' },
    { id: 4, status: 'full' },
    { id: 5, status: 'available' },
    { id: 6, status: 'full' },
    { id: 7, status: 'available' },
    { id: 8, status: 'full' },
    { id: 9, status: 'available' },
    { id: 10, status: 'full' },
    { id: 11, status: 'available' },
    { id: 12, status: 'full' },
    { id: 13, status: 'available' },
    { id: 14, status: 'full' },
    { id: 15, status: 'available' },
    { id: 16, status: 'full' },
  ]);

  // Giả sử bạn có một API trả về dữ liệu trạng thái của các bàn
  useEffect(() => {
    const fetchData = async () => {
      // Giả lập dữ liệu mới từ API
      const newData = [
        { id: 1, status: 'full' },
        { id: 2, status: 'available' },
        // ... các bàn khác
      ];

      // Cập nhật trạng thái bàn dựa trên dữ liệu mới
      setTables(prevTables =>
        prevTables.map(table =>
          newData.find(newTable => newTable.id === table.id) || table
        )
      );
    };

    fetchData();
  }, []);

  const toggleStatus = (id) => {
    setTables(prevTables =>
      prevTables.map(table =>
        table.id === id? { ...table, status: table.status === 'available' ? 'full' : 'available' }
          : table
      )
    );
  };
   const resetAllTables = () =>{
    setTables(prevTables => prevTables.map(tables =>({
      ...tables, status: "available"
    })))
   }

  return (
    <>
      <h1>List table</h1>
      <Button onClick={resetAllTables } type="primary">
        Reset
      </Button>
      {Array.from({ length: 4 }, (_, rowIndex) => (
       <Row gutter={[20, 20]} key={rowIndex}>
       {tables
         .slice(rowIndex * 4, rowIndex * 4 + 4)
         .map((table) => (
           <Col key={table.id} xxl={6} xl={6} lg={6} md={12} sm={24}>
             <div className='table-item'>
               <div className="status-container">
                 Bàn {table.id}:
                 <span className={`status ${table.status}`}>
                   {table.status === 'available' ? 'Còn trống' : 'Đã full'}
                 </span>
               </div>
               <Button onClick={() => toggleStatus(table.id)} className="status-button">
                 {table.status === 'available' ? 'Chuyển thành Đã full' : 'Chuyển thành Còn trống'}
               </Button>
             </div>
           </Col>
         ))}
     </Row>
     
      ))}
    </>
  );

}

export default ListTable