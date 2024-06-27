


//---------------------------------------------------------Thống kê theo độc ngày:--------------------------------------------------------------- 
// import { message, DatePicker } from "antd";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import { get } from "../../../helpers/API.helper";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const { RangePicker } = DatePicker;

// function Dashboard() {
//   const options = {};
//   const [revenue, setRevenue] = useState([]);
//   const [datasets, setDatasets] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [dateRange, setDateRange] = useState([null, null]);

//   const fetchApi = async () => {
//     try {
//       const data = await get("http://localhost:5264/api/Order/daily-revenue");
//       console.log("data-revenue", data);
//       setRevenue(data);
//       setFilteredData(data); // Initially show all data
//     } catch (error) {
//       message.error("Error fetching accounts");
//       setRevenue([]);
//     }
//   };

//   useEffect(() => {
//     fetchApi();
//   }, []);

//   useEffect(() => {
//     if (filteredData.length > 0) {
//       // Group data by store
//       const groupedData = filteredData.reduce((acc, entry) => {
//         if (!acc[entry.storeName]) {
//           acc[entry.storeName] = [];
//         }
//         acc[entry.storeName].push(entry);
//         return acc;
//       }, {});

//       // Extract unique dates
//       const uniqueDates = [...new Set(filteredData.map((entry) => new Date(entry.date).toLocaleDateString()))].sort();

//       // Create datasets
//       const datasets = Object.keys(groupedData).map((storeName, index) => {
//         const storeData = groupedData[storeName];
//         const data = uniqueDates.map((date) => {
//           const entry = storeData.find((d) => new Date(d.date).toLocaleDateString() === date);
//           return entry ? entry.totalRevenue : 0;
//         });
//         return {
//           label: storeName,
//           data: data,
//           backgroundColor: getRandomColor(index), // Generate a random color
//           borderColor: "black",
//           borderWidth: 1,
//         };
//       });

//       setDatasets(datasets);
//     }
//   }, [filteredData]);

//   // Utility function to generate random colors
//   const getRandomColor = (index) => {
//     const colors = [
//       "aqua", "blue", "green", "red", "purple", "orange", "yellow", "pink"
//     ];
//     return colors[index % colors.length];
//   };

//   // Handle date range change
//   const handleDateChange = (dates) => {
//     setDateRange(dates);
//     if (dates && dates.length === 2) {
//       const [start, end] = dates.map((date) => date.toDate()); // Convert AntD moment objects to JavaScript Date objects
//       const filtered = revenue.filter((entry) => {
//         const entryDate = new Date(entry.date);
//         return entryDate >= start && entryDate <= end;
//       });
//       setFilteredData(filtered);
//     } else {
//       setFilteredData(revenue);
//     }
//   };

//   const data1 = {
//     labels: [...new Set(filteredData.map((entry) => new Date(entry.date).toLocaleDateString()))].sort(),
//     datasets: datasets,
//   };

//   return (
//     <>
//       <RangePicker onChange={handleDateChange} style={{ marginBottom: 16 }} />
//       <Bar data={data1} options={options} />
//     </>
//   );
// }

// export default Dashboard;


// --------------------------------------------------------Thông kế theo ngày theo cả cả tháng----------------------------------------------

import { message, DatePicker, Radio } from "antd";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { get } from "../../../helpers/API.helper";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const { RangePicker } = DatePicker;

function Dashboard() {
  const account = useSelector((state) => state.AccountReducer);

  console.log("{account", account)
  console.log("{account.storeId", account.storeId)

  console.log("{account.accountId", account.accountId)
  // Assuming account object has a role property
  const isOwner = account.roleName === "Owner";

  const isManager = account.roleName === "Manager";

  const options = {};
  const [revenue, setRevenue] = useState([]);
  const [monthRevenue, setMonthRevenue] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [viewBy, setViewBy] = useState("day"); // Track whether to show daily or monthly view

  const fetchApi = async () => {
    try {
      let data;
      if (isOwner) {
        data = await get("http://172.20.10.5:5264/api/Order/daily-revenue");
      } else if (isManager) {
        data = await get(`http://172.20.10.5:5264/api/Order/daily-revenue/${account.storeId}`);
      }
      console.log("data-revenue", data);
      setRevenue(data);
      if (viewBy === "day") {
        setFilteredData(data);
      }
    } catch (error) {
      message.error("Error fetching daily revenue");
      setRevenue([]);
    }
  };

  const fetchApiMonthRevenue = async () => {
    try {
      let data;
      if (isOwner) {
        data = await get("http://172.20.10.5:5264/api/Order/month-revenue");
      } else if (isManager) {
        data = await get(`http://172.20.10.5:5264/api/Order/month-revenue/${account.storeId}`);
      }
      console.log("data-revenue", data);
      setMonthRevenue(data);
      if (viewBy === "month") {
        setFilteredData(data);
      }
    } catch (error) {
      message.error("Error fetching monthly revenue");
      setMonthRevenue([]);
    }
  };

  useEffect(() => {
    fetchApi();
    fetchApiMonthRevenue();
  }, []);

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setViewBy(value);
    if (value === "day") {
      setFilteredData(revenue);
    } else if (value === "month") {
      setFilteredData(monthRevenue);
    }
  };

  useEffect(() => {
    if (filteredData.length > 0) {
      // Group data by store
      const groupedData = filteredData.reduce((acc, entry) => {
        if (!acc[entry.storeName]) {
          acc[entry.storeName] = [];
        }
        acc[entry.storeName].push(entry);
        return acc;
      }, {});

      // Extract unique dates or yearMonths
      const uniqueDates = [
        ...new Set(
          filteredData.map((entry) => {
            if (viewBy === "day") {
              return new Date(entry.date).toLocaleDateString();
            } else if (viewBy === "month") {
              return entry.yearMonth;
            }
            return null;
          })
        ),
      ].sort();

      console.log("uniqueDates", uniqueDates);

      // Create datasets
      const datasets = Object.keys(groupedData).map((storeName, index) => {
        const storeData = groupedData[storeName];
        const data = uniqueDates.map((date) => {
          if (viewBy === "day") {
            const entry = storeData.find(
              (d) => new Date(d.date).toLocaleDateString() === date
            );
            return entry ? entry.totalRevenue : 0;
          } else if (viewBy === "month") {
            const entry = storeData.find((d) => d.yearMonth === date);
            return entry ? entry.totalRevenue : 0;
          }
          return 0;
        });
        return {
          label: storeName,
          data: data,
          backgroundColor: getRandomColor(index), // Generate a random color
          borderColor: "black",
          borderWidth: 1,
        };
      });

      setDatasets(datasets);
    }
  }, [filteredData, viewBy]);

  // Utility function to generate random colors
  const getRandomColor = (index) => {
    const colors = [
      "aqua",
      "blue",
      "green",
      "red",
      "purple",
      "orange",
      "yellow",
      "pink",
    ];
    return colors[index % colors.length];
  };

  // Handle date range change
  const handleDateChange = (dates) => {
    setDateRange(dates);
    if (dates && dates.length === 2) {
      const [start, end] = dates.map((date) => date.toDate()); // Convert AntD moment objects to JavaScript Date objects
      const filtered = (viewBy === "day" ? revenue : monthRevenue).filter(
        (entry) => {
          if (viewBy === "day") {
            const entryDate = new Date(entry.date);
            return entryDate >= start && entryDate <= end;
          } else if (viewBy === "month") {
            const entryDate = new Date(`${entry.yearMonth}-01`);
            return entryDate >= start && entryDate <= end;
          }
          return false;
        }
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(viewBy === "day" ? revenue : monthRevenue);
    }
  };

  const data1 = {
    labels: [
      ...new Set(
        filteredData.map((entry) => {
          if (viewBy === "day") {
            return new Date(entry.date).toLocaleDateString();
          } else if (viewBy === "month") {
            return entry.yearMonth;
          }
          return null;
        })
      ),
    ].sort(),
    datasets: datasets,
  };

  return (
    <>
      {isOwner || isManager ? (
        <>
          <div style={{ marginBottom: 16 }}>
            <Link to="/admin/MostSoldProducts">Xem biểu đồ sản phẩm bán chạy nhất</Link>
          </div>

          <Radio.Group
            onChange={handleRadioChange}
            value={viewBy}
            style={{ marginBottom: 16 }}
          >
            <Radio.Button value="day">Ngày</Radio.Button>
            <Radio.Button value="month">Tháng</Radio.Button>
          </Radio.Group>
          <RangePicker onChange={handleDateChange} style={{ marginBottom: 16 }} />
          <Bar data={data1} options={options} />

        </>
      ) : (
        <p>You do not have permission to view this chart.</p>
      )}
    </>
  );
}

export default Dashboard;
