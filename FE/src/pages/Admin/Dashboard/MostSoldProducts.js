
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

    return {
      labels: labels,
      datasets: [{
        label: 'Total Quantity Sold',
        data: totalQuantity,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
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
            return `${label}: ${value}`;
          }
        }
      }
    }
  };

  return (
    <>
      <div
        style={{
          width: '1000px',  // Adjust width
          height: '600px', // Adjust height
          margin: '0 auto', // Center the chart
        }}
      >
        <Pie data={chartData} options={options} />
      </div>
    </>
  );
}

export default Dashboard;