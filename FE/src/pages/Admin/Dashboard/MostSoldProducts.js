
// import {
//   Chart as ChartJS,
//   ArcElement, // Import ArcElement for Pie chart
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { useEffect, useMemo, useState } from "react";
// import { Pie } from "react-chartjs-2"; // Import Pie instead of Bar
// import { useSelector } from "react-redux";
// import { get } from "../../../helpers/API.helper";

// ChartJS.register(ArcElement, Tooltip, Legend); // Register ArcElement

// function Dashboard() {
//   const account = useSelector((state) => state.AccountReducer);
//   const [productData, setProductData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await get(`http://localhost:5264/api/Order/order-detail-summary/${account.storeId}`);
//       console.log("response", response);
//       setProductData(response);
//       console.log('Product data:', response);
//     } catch (error) {
//       console.error('Error fetching product data:', error);
//       // Handle error state as needed
//     }
//   };

//   // Extracting data for chart
//   const chartData = useMemo(() => {
//     const labels = productData.map(item => item.productName);
//     const totalQuantity = productData.map(item => item.totalQuantity);

//     return {
//       labels: labels,
//       datasets: [{
//         label: 'Total Quantity Sold',
//         data: totalQuantity,
//         backgroundColor: [
//           '#FF6384',
//           '#36A2EB',
//           '#FFCE56',
//           '#4BC0C0',
//           '#9966FF',
//           '#FF9F40'
//         ],
//         borderColor: 'white',
//         borderWidth: 1,
//       }],
//     };
//   }, [productData]);

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const label = context.label || '';
//             const value = context.raw || 0;
//             return `${label}: ${value}`;
//           }
//         }
//       }
//     }
//   };

//   return (
//     <>
//       <div
//         style={{
//           width: '1000px',  // Adjust width
//           height: '600px', // Adjust height
//           margin: '0 auto', // Center the chart
//         }}
//       >
//         <Pie data={chartData} options={options} />
//       </div>
//     </>
//   );
// }

// export default Dashboard;

import {
  Chart as ChartJS,
  ArcElement, // Import ArcElement for Pie chart
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2"; // Import Pie instead of Bar
import { useSelector } from "react-redux";
import { get } from "../../../helpers/API.helper";
import { Row, Col, Table } from "antd"; // Import Table for structured data display
import { Link } from "react-router-dom";
import { BackwardOutlined } from "@ant-design/icons";

ChartJS.register(ArcElement, Tooltip, Legend); // Register ArcElement

function Dashboard() {
  const account = useSelector((state) => state.AccountReducer);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await get(`http://localhost:5264/api/Order/order-detail-summary/${account.storeId}`);
      console.log("response", response);
      setProductData(response);
      console.log('Product data:', response);
    } catch (error) {
      console.error('Error fetching product data:', error);
      // Handle error state as needed
    }
  };

  // Extracting data for chart
  const chartData = useMemo(() => {
    const labels = productData.map(item => item.productName);
    const totalQuantity = productData.map(item => item.totalQuantity);
    const total = totalQuantity.reduce((sum, value) => sum + value, 0); // Calculate total for percentage

    return {
      labels: labels,
      datasets: [{
        label: 'Total Quantity Sold',
        data: totalQuantity,
        backgroundColor: [
          '#E74C3C', // Red
          '#3498DB', // Blue
          '#F1C40F', // Yellow
          '#FF69B4', // Pink
          '#9B59B6', // Purple
          '#E67E22', // Orange
          '#2ECC71'  // Green
        ],
        
        borderColor: 'white',
        borderWidth: 1,
      }],
    };
  }, [productData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((sum, val) => sum + val, 0); // Calculate total for percentage
            const percentage = total ? ((value / total) * 100).toFixed(2) : 0; // Calculate percentage
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  // Prepare data for table
  const tableData = productData.map((item, index) => ({
    key: index,
    name: item.productName,
    quantity: item.totalQuantity,
    percentage: `${((item.totalQuantity / productData.reduce((sum, product) => sum + product.totalQuantity, 0)) * 100).toFixed(2)}%`
  }));

  return (
   
    <div style={{ width: '80%', margin: '0 auto', display: 'flex' }}>
       <Link to ={"/admin/dashboard"}><BackwardOutlined />Back</Link>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <Pie data={chartData} options={options} />
      </div>
      <div style={{ flex: 1 }}>
        <Table
          dataSource={tableData}
          columns={[
            { title: 'Product Name', dataIndex: 'name', key: 'name' },
            { title: 'Quantity Sold', dataIndex: 'quantity', key: 'quantity' },
            { title: 'Percentage', dataIndex: 'percentage', key: 'percentage' }
          ]}
          pagination={false} // Hide pagination if not needed
        />
      </div>
    </div>
  );
}

export default Dashboard;