import React, { useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";

function Sidebar({ activePage }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useContext(UserContext);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const getDashboardLink = () => {
    const roles = Array.isArray(user?.role) ? user.role : [user?.role];
    if (roles.includes("Admin")) {
      return "/admin-booking-dashboard";
    } else if (roles.includes("Landlord")) {
      return "/landlord-booking-dashboard";
    }
    return "/user-booking-dashboard";
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const navItems = [
    {
      to: "/",
      label: "Trang chủ",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },
    {
      to: "/statistics",
      label: "Thống kê",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1H3zm4 9H5V7h2v5zm4 2H9V5h2v9zm4-4h-2V8h2v2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      to: "/profile",
      label: "Thông tin",
      icon: (
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
      ),
    },
    {
      to: getDashboardLink(),
      label: "Đặt phòng",
      icon: (
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
      ),
    },
    {
      to: "/homestay-management",
      label: "Quản lý Homestay",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.5 8.456v6.044a1 1 0 001 1h7a1 1 0 001-1V8.456l2.894-1.236a1 1 0 000-1.84l-7-3zM4 9.506l-1.414.604a1 1 0 000 1.84l7 3a1 1 0 00.788 0l7-3a1 1 0 000-1.84L16 9.506v5.044a2 2 0 01-2 2H6a2 2 0 01-2-2V9.506z" />
        </svg>
      ),
    },
    {
      to: "/settings",
      label: "Cài đặt",
      icon: (
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
      ),
    },
    {
      to: "/logout",
      label: "Logout",
      icon: (
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
      ),
      className: "text-red-400 hover:text-red-600",
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#3252DF] text-white rounded-md"
        onClick={toggleMobileSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white text-primary p-6 z-40 shadow-xl border-r border-gray-200 transform transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="mt-16 flex flex-col h-full">
          <h2 className="text-3xl font-bold mb-10 font-poppins">
            <span className="text-[#3252DF]">Homies</span>
            <span className="text-[#152C5B]">Stay</span>
          </h2>
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-3 py-3 px-4 rounded-lg relative group transition-all duration-300 ${
                      currentPath === item.to
                        ? `bg-[#3252DF] text-white shadow-md ${
                            item.className || ""
                          }`
                        : `text-gray-600 hover:bg-gray-100 hover:text-[#3252DF] ${
                            item.className || ""
                          }`
                    }`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {item.icon}
                    <span
                      className={`text-sm font-medium font-['Open_Sans'] ${
                        currentPath === item.to ? "font-semibold" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
