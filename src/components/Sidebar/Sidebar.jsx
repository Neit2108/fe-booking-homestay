// components/Sidebar/Sidebar.jsx
import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom"; // Thêm Link từ react-router-dom
import { UserContext } from "../../context/UserContext.jsx";

function Sidebar({ activePage }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useContext(UserContext);

  const getDashboardLink = () => {
    const roles = Array.isArray(user.role) ? user.role : [user.role];
    if (roles.includes("Admin")) {
      return "/admin-booking-dashboard";
    } else if (roles.includes("Landlord")) {
      return "/landlord-booking-dashboard";
    }
    return "/user-booking-dashboard";
  };

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white text-primary p-6 hidden md:block z-10 shadow-lg border-r border-gray-100">
      <div className="mt-16">
        <h2 className="text-[36px] font-medium mb-10 font-poppins">
          <span className="text-[#3252DF]">Homies</span>
          <span className="text-[#152C5B]">Stay</span>
        </h2>
        <nav>
          <ul className="space-y-5">
            <li>
              <Link
                to="/"
                className={`flex items-center gap-3 py-3 relative group transition-all duration-200 ${
                  activePage === "dashboard" || currentPath === "/dashboard"
                    ? "text-[#3252DF]"
                    : "text-[#757575] hover:text-[#3252DF]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="text-base font-normal font-['Open_Sans']">
                  Trang chủ
                </span>
                <span
                  className={`absolute right-0 top-0 h-full w-1 bg-[#3252DF] transform transition-transform duration-200 origin-top ${
                    activePage === "dashboard" || currentPath === "/dashboard"
                      ? "scale-y-100"
                      : "scale-y-0 group-hover:scale-y-100"
                  }`}
                ></span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`flex items-center gap-3 py-3 relative group transition-all duration-200 ${
                  currentPath === "/profile"
                    ? "text-[#3252DF]"
                    : "text-[#757575] hover:text-[#3252DF]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
                <span
                  className={`text-base font-['Open_Sans'] ${
                    currentPath === "/profile" ? "font-semibold" : "font-normal"
                  }`}
                >
                  Thông tin
                </span>
                <span
                  className={`absolute right-0 top-0 h-full w-1 bg-[#3252DF] transform transition-transform duration-200 origin-top ${
                    currentPath === "/profile"
                      ? "scale-y-100"
                      : "scale-y-0 group-hover:scale-y-100"
                  }`}
                ></span>
              </Link>
            </li>
            <li>
              <Link
                to={getDashboardLink()} // Sử dụng getDashboardLink để điều hướng đúng
                className={`flex items-center gap-3 py-3 relative group transition-all duration-200 ${
                  currentPath === getDashboardLink()
                    ? "text-[#3252DF]"
                    : "text-[#757575] hover:text-[#3252DF]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path
                    fillRule="evenodd"
                    d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal font-['Open_Sans']">
                  Đặt phòng
                </span>
                <span
                  className={`absolute right-0 top-0 h-full w-1 bg-[#3252DF] transform transition-transform duration-200 origin-top ${
                    currentPath === getDashboardLink()
                      ? "scale-y-100"
                      : "scale-y-0 group-hover:scale-y-100"
                  }`}
                ></span>
              </Link>
            </li>
            <li>
              <Link
                to="#" // Cần xác định đường dẫn cho mục này
                className={`flex items-center gap-3 py-3 relative group transition-all duration-200 ${
                  currentPath === "#" // Cập nhật điều kiện nếu có đường dẫn cụ thể
                    ? "text-[#3252DF]"
                    : "text-[#757575] hover:text-[#3252DF]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                    clipRule="evenodd"
                  />
                  <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                </svg>
                <span className="text-base font-normal font-['Open_Sans']">
                  ?? {/* Cần thay thế bằng tên mục cụ thể */}
                </span>
                <span
                  className={`absolute right-0 top-0 h-full w-1 bg-[#3252DF] transform transition-transform duration-200 origin-top ${
                    currentPath === "#" // Cập nhật điều kiện nếu có đường dẫn cụ thể
                      ? "scale-y-100"
                      : "scale-y-0 group-hover:scale-y-100"
                  }`}
                ></span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={`flex items-center gap-3 py-3 relative group transition-all duration-200 ${
                  currentPath === "/settings"
                    ? "text-[#3252DF]"
                    : "text-[#757575] hover:text-[#3252DF]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal font-['Open_Sans']">
                  Cài đặt
                </span>
                <span
                  className={`absolute right-0 top-0 h-full w-1 bg-[#3252DF] transform transition-transform duration-200 origin-top ${
                    currentPath === "/settings"
                      ? "scale-y-100"
                      : "scale-y-0 group-hover:scale-y-100"
                  }`}
                ></span>
              </Link>
            </li>
            <li className="mt-16">
              <Link
                to="/logout" // Cần xử lý logout (có thể cần một route hoặc hàm xử lý)
                className="flex items-center gap-3 py-3 text-red-300 hover:text-red-500 relative group transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-normal font-['Open_Sans']">
                  Logout
                </span>
                <span className="absolute right-0 top-0 h-full w-1 bg-red-300 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top"></span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
