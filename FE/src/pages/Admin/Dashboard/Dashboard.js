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
import { DoubleRightOutlined } from "@ant-design/icons";
import { LOCALHOST_API } from "../../../helpers/APILinks";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const { RangePicker } = DatePicker;

function Dashboard() {
  const account = useSelector((state) => state.AccountReducer);

  const isOwner = account.roleName === "Owner";
  const isManager = account.roleName === "Manager";

  const options = {};
  const [revenue, setRevenue] = useState([]);
  const [monthRevenue, setMonthRevenue] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [viewBy, setViewBy] = useState("day");

  const fetchApi = async () => {
    try {
      let data;
      if (isOwner) {
        data = await get(`${LOCALHOST_API}/api/Order/daily-revenue`);
      } else if (isManager) {
        data = await get(`${LOCALHOST_API}/api/Order/daily-revenue/${account.storeId}`);
      }
      setRevenue(data);
      if (viewBy === "day") {
        setFilteredData(getRecentData(data, 14)); // Display only the most recent 14 days
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
        data = await get(`${LOCALHOST_API}/api/Order/month-revenue`);
      } else if (isManager) {
        data = await get(`${LOCALHOST_API}/api/Order/month-revenue/${account.storeId}`);
      }
      setMonthRevenue(data);
      if (viewBy === "month") {
        setFilteredData(data); // Display all months
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

  const getRecentData = (data, count) => {
    const sortedData = [...data].sort((a, b) => new Date(b.date || `${b.yearMonth}-01`) - new Date(a.date || `${a.yearMonth}-01`));
    return sortedData.slice(0, count);
  };

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setViewBy(value);
    if (value === "day") {
      setFilteredData(getRecentData(revenue, 14)); // Display only the most recent 14 days
    } else if (value === "month") {
      setFilteredData(monthRevenue); // Display all months
    }
  };

  useEffect(() => {
    if (filteredData.length > 0) {
      const groupedData = filteredData.reduce((acc, entry) => {
        if (!acc[entry.storeName]) {
          acc[entry.storeName] = [];
        }
        acc[entry.storeName].push(entry);
        return acc;
      }, {});

      const uniqueDates = [
        ...new Set(
          filteredData.map((entry) => {
            if (viewBy === "day") {
              return new Date(entry.date).toLocaleDateString();
            } else if (viewBy === "month") {
              return formatYearMonth(entry.yearMonth);
            }
            return null;
          })
        ),
      ].sort((a, b) => new Date(a) - new Date(b));

      const datasets = Object.keys(groupedData).map((storeName, index) => {
        const storeData = groupedData[storeName];
        const data = uniqueDates.map((date) => {
          if (viewBy === "day") {
            const entry = storeData.find(
              (d) => new Date(d.date).toLocaleDateString() === date
            );
            return entry ? entry.totalRevenue : 0;
          } else if (viewBy === "month") {
            const entry = storeData.find((d) => formatYearMonth(d.yearMonth) === date);
            return entry ? entry.totalRevenue : 0;
          }
          return 0;
        });
        return {
          label: storeName,
          data: data,
          backgroundColor: getRandomColor(index),
          borderWidth: 1,
        };
      });

      setDatasets(datasets);
    }
  }, [filteredData, viewBy]);

  const getRandomColor = (index) => {
    const colors = [
      "#47BFBE",
      "pink",
      // add more colors as needed
    ];
    return colors[index % colors.length];
  };

  const formatYearMonth = (yearMonth) => {
    const [year, month] = yearMonth.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleDateString("default", { month: "long", year: "numeric" });
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
    if (dates && dates.length === 2) {
      const [start, end] = dates.map((date) => date.toDate());
      const filtered = (viewBy === "day" ? revenue : monthRevenue).filter((entry) => {
        if (viewBy === "day") {
          const entryDate = new Date(entry.date);
          return entryDate >= start && entryDate <= end;
        } else if (viewBy === "month") {
          const entryDate = new Date(`${entry.yearMonth}-01`);
          return entryDate >= start && entryDate <= end;
        }
        return false;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(viewBy === "day" ? getRecentData(revenue, 14) : monthRevenue); // Display recent 14 days or all months
    }
  };

  const data1 = {
    labels: [
      ...new Set(
        filteredData.map((entry) => {
          if (viewBy === "day") {
            return new Date(entry.date).toLocaleDateString();
          } else if (viewBy === "month") {
            return formatYearMonth(entry.yearMonth);
          }
          return null;
        })
      ),
    ].sort((a, b) => new Date(a) - new Date(b)),
    datasets: datasets,
  };

  return (
    <>
      {isOwner || isManager ? (
        <>
          <div style={{ marginBottom: 16, textAlign: "right" }}>
            <Link to="/admin/MostSoldProducts" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid #1890ff",
                  background: "#1890ff",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                }}
              >
                <DoubleRightOutlined style={{ marginRight: "4px" }} />
                See the best-selling products chart
                <DoubleRightOutlined style={{ marginLeft: "4px" }} />
              </button>
            </Link>
          </div>

          <Radio.Group onChange={handleRadioChange} value={viewBy} style={{ marginBottom: 16 }}>
            <Radio.Button value="day">Day</Radio.Button>
            <Radio.Button value="month">Month</Radio.Button>
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
