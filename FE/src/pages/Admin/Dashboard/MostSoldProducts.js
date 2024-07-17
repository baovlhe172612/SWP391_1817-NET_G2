import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { get } from "../../../helpers/API.helper";
import { Row, Col, Table } from "antd";
import { Link } from "react-router-dom";
import { BackwardOutlined } from "@ant-design/icons";
import { LOCALHOST_API } from "../../../helpers/APILinks";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const account = useSelector((state) => state.AccountReducer);

  const isOwner = account.roleName === "Owner";
  const isManager = account.roleName === "Manager";

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let data;
      if (isOwner) {
        data = await get(`${LOCALHOST_API}/api/Order/order-detail-summary`);
      } else {
        data = await get(`${LOCALHOST_API}/api/Order/order-detail-summary/${account.storeId}`);
      }
      setProductData(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  // Group data by store and limit to 10 products per store
  const groupedData = useMemo(() => {
    const stores = {};

    productData.forEach(item => {
      if (!stores[item.storeName]) {
        stores[item.storeName] = [];
      }
      if (stores[item.storeName].length < 5) {
        stores[item.storeName].push(item);
      }
    });

    return stores;
  }, [productData]);

  // Create chart data for each store
  const getChartData = (data) => {
    const labels = data.map(item => `${item.productName}`);
    const totalQuantity = data.map(item => item.totalQuantity);

    return {
      labels: labels,
      datasets: [{
        label: 'Total Quantity Sold',
        data: totalQuantity,
        backgroundColor: [
          '#E74C3C', '#3498DB', '#F1C40F', '#FF69B4', '#9B59B6', '#E67E22', '#2ECC71'
        ],
        borderColor: 'white',
        borderWidth: 1,
      }],
    };
  };

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
            const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
            const percentage = total ? ((value / total) * 100).toFixed(2) : 0;
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Link to={"/admin/dashboard"}><BackwardOutlined /> Back</Link>
      <Row gutter={16}>
        {Object.keys(groupedData).map(storeName => (
          <Col span={12} key={storeName}>
            <h4>{storeName}</h4>
            <Pie data={getChartData(groupedData[storeName])} options={options} />
            <Table
              dataSource={groupedData[storeName].map((item, index) => ({
                key: index,
                name: `${item.productName}`,
                quantity: item.totalQuantity,
                percentage: `${((item.totalQuantity / groupedData[storeName].reduce((sum, product) => sum + product.totalQuantity, 0)) * 100).toFixed(2)}%`
              }))}
              columns={[
                { title: 'Product Name', dataIndex: 'name', key: 'name' },
                { title: 'Quantity Sold', dataIndex: 'quantity', key: 'quantity' },
                { title: 'Percentage', dataIndex: 'percentage', key: 'percentage' }
              ]}
              pagination={false}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Dashboard;
