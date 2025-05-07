import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import useBookings from "../../hooks/useBookings";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Loader from "../../components/Loading/Loader";
import { formatPrice } from "../../Utils/PriceUtils";
import { API_URL } from "../../../constant/config";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Hàm định dạng số theo kiểu VNĐ, giới hạn 2 chữ số thập phân
const formatVND = (number) => {
  if (typeof number !== "number") return "0 VNĐ";
  return (
    number
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ"
  );
};

const Statistics = () => {
  const { user } = useContext(UserContext);
  const [statusFilter] = useState("");
  const [startDateFilter] = useState("");
  const [endDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Số booking mỗi trang
  const { bookings, loading, error, role, refreshBookings } = useBookings(
    user,
    statusFilter,
    startDateFilter,
    endDateFilter
  );

  // State for statistics
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    refundedBookings: 0,
    usersChange: { value: 0, percentage: 0 },
    bookingsChange: { value: 0, percentage: 0 },
    revenueChange: { value: 0, percentage: 0 },
    refundedChange: { value: 0, percentage: 0 },
    lineChartData: { labels: [], datasets: [] },
    doughnutChartData: { labels: [], datasets: [] },
  });

  // State for user and place names
  const [userNames, setUserNames] = useState({});
  const [placeNames, setPlaceNames] = useState({});

  // Tính toán phân trang phía client
  const totalBookings = bookings.length;
  const totalPages = Math.ceil(totalBookings / pageSize);
  const paginatedBookings = bookings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Fetch statistics from API
  useEffect(() => {
    const fetchStatistics = async () => {
      if (!user || !user.token) {
        console.error("User or token is missing. Cannot fetch statistics.");
        return;
      }

      try {
        const response = await axios.get(
          `${API_URL}/statistics`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        console.log("Raw doughnutChartData from API:", response.data.doughnutChartData);

        // Xử lý dữ liệu biểu đồ để đảm bảo tương thích với react-chartjs-2
        const normalizeChartData = (chartData, isDoughnut = false) => {
          return {
            labels: chartData.labels,
            datasets: chartData.datasets.map(dataset => {
              // Đảm bảo backgroundColor là một mảng
              let backgroundColor = Array.isArray(dataset.backgroundColor)
                ? dataset.backgroundColor
                : [dataset.backgroundColor];

              // Nếu là biểu đồ Doughnut và backgroundColor không đủ màu, thêm màu mặc định
              if (isDoughnut && backgroundColor.length < chartData.labels.length) {
                const defaultColors = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];
                backgroundColor = chartData.labels.map((_, index) =>
                  backgroundColor[index] || defaultColors[index % defaultColors.length]
                );
              }

              const normalizedDataset = {
                ...dataset,
                backgroundColor: isDoughnut
                  ? backgroundColor // Giữ nguyên mảng cho Doughnut Chart
                  : Array.isArray(dataset.backgroundColor)
                    ? dataset.backgroundColor[0] // Line Chart chỉ cần 1 màu
                    : dataset.backgroundColor,
                borderColor: Array.isArray(dataset.borderColor)
                  ? dataset.borderColor[0] // Line Chart chỉ cần 1 màu
                  : dataset.borderColor,
                hoverBackgroundColor: Array.isArray(dataset.hoverBackgroundColor)
                  ? dataset.hoverBackgroundColor
                  : [dataset.hoverBackgroundColor],
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                data: dataset.data.map(value => (value == null ? 0 : Number(value))),
              };

              // Log dữ liệu đã chuẩn hóa để debug
              console.log(`Normalized dataset (${isDoughnut ? "Doughnut" : "Line"}):`, normalizedDataset);
              return normalizedDataset;
            }),
          };
        };

        // Sửa nhãn của doughnutChartData để khớp với backend
        const doughnutChartData = response.data.doughnutChartData;
        doughnutChartData.labels = ["Confirmed", "Pending", "Cancelled"];

        const updatedStatistics = {
          totalUsers: response.data.totalUsers,
          totalBookings: response.data.totalBookings,
          totalRevenue: response.data.totalRevenue,
          refundedBookings: response.data.refundedBookings,
          usersChange: response.data.usersChange,
          bookingsChange: response.data.bookingsChange,
          revenueChange: response.data.revenueChange,
          refundedChange: response.data.refundedChange,
          lineChartData: normalizeChartData(response.data.lineChartData, false),
          doughnutChartData: normalizeChartData(doughnutChartData, true),
        };

        setStatistics(updatedStatistics);
      } catch (err) {
        console.error("Error fetching statistics:", err.response?.data || err.message);
      }
    };

    if (user) {
      fetchStatistics();
    }
  }, [user]);

  // Fetch user and place names using bulk API
  useEffect(() => {
    const fetchNames = async () => {
      if (!user || !user.token) {
        console.error("User or token is missing. Cannot fetch user/place names.");
        return;
      }

      const userIds = [...new Set(bookings.map((booking) => booking.userId))];
      const placeIds = [...new Set(bookings.map((booking) => booking.placeId))];

      if (userIds.length > 0) {
        try {
          const userIdsParam = userIds.join(",");
          const userResponse = await axios.get(
            `${API_URL}/user/bulk?ids=${userIdsParam}`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
          const usersData = userResponse.data;
          const userNamesMap = usersData.reduce((acc, user) => {
            acc[user.id] = user.name || "Unknown User";
            return acc;
          }, {});
          setUserNames(userNamesMap);
        } catch (err) {
          console.error("Error fetching users in bulk:", err.response?.data || err.message);
          const fallbackUserNames = userIds.reduce((acc, id) => {
            acc[id] = "Unknown User";
            return acc;
          }, {});
          setUserNames(fallbackUserNames);
        }
      }

      if (placeIds.length > 0) {
        try {
          const placeIdsParam = placeIds.join(",");
          const placeResponse = await axios.get(
            `${API_URL}/places/bulk?ids=${placeIdsParam}`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
          const placesData = placeResponse.data;
          const placeNamesMap = placesData.reduce((acc, place) => {
            acc[place.id] = place.name || "Unknown Place";
            return acc;
          }, {});
          setPlaceNames(placeNamesMap);
        } catch (err) {
          console.error("Error fetching places in bulk:", err.response?.data || err.message);
          const fallbackPlaceNames = placeIds.reduce((acc, id) => {
            acc[id] = "Unknown Place";
            return acc;
          }, {});
          setPlaceNames(fallbackPlaceNames);
        }
      }
    };

    if (bookings && bookings.length > 0) {
      fetchNames();
    }
  }, [bookings, user]);

  // Chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 12 },
          boxWidth: 10,
        },
      },
      title: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#E5E7EB" },
        ticks: { font: { size: 12 }, stepSize: 20 },
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: { size: 12 },
          boxWidth: 10,
        },
      },
    },
    cutout: "70%",
  };

  // Pagination handlers
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Kiểm tra nếu user không tồn tại (chưa đăng nhập)
  if (!user) {
    return (
      <div className="text-red-500 text-center my-10">
        Vui lòng đăng nhập để xem thống kê.
      </div>
    );
  }

  // Loading and Error States
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center my-10">
        {error} <br />
        <button
          onClick={refreshBookings}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
    <Sidebar activePage="statistics" />
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-5xl mx-auto w-full">
          <DashboardHeader />

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Tổng số khách</p>
                  <p className="text-2xl font-bold text-gray-900">{statistics.totalUsers.toLocaleString()}</p>
                </div>
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7v-2a3 3 0 005.356-1.857M17 20v-6m-10 6v-6m5-6V4a2 2 0 10-4 0v4m4 0V4a2 2 0 114 0v4m-6 6h4" />
                </svg>
              </div>
              <p className={`text-sm mt-1 ${statistics.usersChange.percentage >= 0 ? "text-green-500" : "text-red-500"}`}>
                <span className="mr-1">{statistics.usersChange.percentage >= 0 ? "↑" : "↓"}</span>
                {Math.abs(statistics.usersChange.value).toLocaleString()} {statistics.usersChange.percentage.toFixed(2)}% tuần này
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Tổng số đặt phòng</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statistics.totalBookings.toLocaleString()}
                  </p>
                </div>
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3V3zm6 12h6m-6-4h6m-6-4h6" />
                </svg>
              </div>
              <p className={`text-sm mt-1 ${statistics.bookingsChange.percentage >= 0 ? "text-green-500" : "text-red-500"}`}>
                <span className="mr-1">{statistics.bookingsChange.percentage >= 0 ? "↑" : "↓"}</span>
                {Math.abs(statistics.bookingsChange.value).toLocaleString()} {statistics.bookingsChange.percentage.toFixed(2)}% tuần này
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Tổng doanh thu</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatVND(statistics.totalRevenue)}
                  </p>
                </div>
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3v2c0 1.657 1.343 3 3 3s3-1.343 3-3v-2c0-1.657-1.343-3-3-3zm0 0V6m0 8v2" />
                </svg>
              </div>
              <p className={`text-sm mt-1 ${statistics.revenueChange.percentage >= 0 ? "text-green-500" : "text-red-500"}`}>
                <span className="mr-1">{statistics.revenueChange.percentage >= 0 ? "↑" : "↓"}</span>
                {formatVND(Math.abs(statistics.revenueChange.value))} {statistics.revenueChange.percentage.toFixed(2)}% tuần này
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Đã hủy</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statistics.refundedBookings.toLocaleString()}
                  </p>
                </div>
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16m4-12h12M8 8v8m4-12v16m4-12v8" />
                </svg>
              </div>
              <p className={`text-sm mt-1 ${statistics.refundedChange.percentage >= 0 ? "text-green-500" : "text-red-500"}`}>
                <span className="mr-1">{statistics.refundedChange.percentage >= 0 ? "↑" : "↓"}</span>
                {Math.abs(statistics.refundedChange.value).toLocaleString()} {statistics.refundedChange.percentage.toFixed(2)}% tuần này
              </p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Phân tích đơn hàng</h2>
                <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
                  <option>Tháng</option>
                  <option>Tuần</option>
                  <option>Ngày</option>
                </select>
              </div>
              {statistics.lineChartData.labels.length > 0 ? (
                <Line data={statistics.lineChartData} options={lineChartOptions} />
              ) : (
                <p className="text-gray-500 text-center">Không có dữ liệu để hiển thị</p>
              )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu</h2>
              {statistics.doughnutChartData.labels.length > 0 ? (
                <Doughnut data={statistics.doughnutChartData} options={doughnutChartOptions} />
              ) : (
                <p className="text-gray-500 text-center">Không có dữ liệu để hiển thị</p>
              )}
            </div>
          </div>

          {/* Booking List with Pagination */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Danh sách đặt phòng</h2>
                <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
                  <option>Tháng</option>
                  <option>Tuần</option>
                  <option>Ngày</option>
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên khách</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên địa điểm</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedBookings.map((booking, index) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(currentPage - 1) * pageSize + index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{booking.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(booking.startDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {userNames[booking.userId] || "Đang tải..."}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {placeNames[booking.placeId] || "Đang tải..."}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {formatPrice(booking.totalPrice || 0)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            booking.status === "Confirmed" ? "bg-green-100 text-green-800" :
                            booking.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                            booking.status === "Cancelled" ? "bg-red-100 text-red-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {booking.status || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-gray-500 hover:text-gray-700">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {paginatedBookings.length === 0 && (
                      <tr>
                        <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                          Không tìm thấy đặt phòng
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalBookings > 0 && totalPages > 0 && (
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-700">
                    Hiển thị {(currentPage - 1) * pageSize + 1} đến {(currentPage - 1) * pageSize + paginatedBookings.length} của {totalBookings} đặt phòng
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === 1
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      Trước
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => 
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 2 && page <= currentPage + 2)
                      )
                      .map(page => (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === page
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === totalPages
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      Tiếp
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;