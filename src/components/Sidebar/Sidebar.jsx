import React, { useContext, useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";

// Import icons for better visual representation
import { 
  HomeIcon, 
  UserIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  OfficeBuildingIcon, 
  HeartIcon, 
  CogIcon, 
  LogoutIcon, 
  BookmarkIcon,
  SearchIcon,
  ChatIcon,
  XIcon
} from "@heroicons/react/outline";
import { GiftIcon } from "lucide-react";

function Sidebar({ activePage }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, logout, isAdmin, isLandlord } = useContext(UserContext);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  // Function to handle logout with proper navigation
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Close sidebar when route changes (for mobile)
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Generate menu items based on user roles
  const getMenuItems = () => {
    // Base items that all users have access to
    let items = [
      {
        to: "/",
        label: "Trang chủ",
        icon: <HomeIcon className="w-5 h-5" />,
      },
    ];

    // Role-specific items
    if (user) {
      // Add profile link for logged in users
      items.push({
        to: "/profile",
        label: "Thông tin cá nhân",
        icon: <UserIcon className="w-5 h-5" />,
      });
      
      if (isAdmin()) {
        // Admin-specific items
        items = [
          ...items,
          {
            to: "/admin-booking-dashboard",
            label: "Quản lý đặt phòng",
            icon: <CalendarIcon className="w-5 h-5" />,
          },
          {
            to: "/homestay-management",
            label: "Quản lý Homestay",
            icon: <OfficeBuildingIcon className="w-5 h-5" />,
          },
          {
            to: "/statistics",
            label: "Thống kê",
            icon: <ChartBarIcon className="w-5 h-5" />,
          },
          {
            to: "/voucher",
            label : "Khuyến mãi",
            icon: <GiftIcon className="w-5 h-5" />
          }
        ];
      } else if (isLandlord()) {
        // Landlord-specific items
        items = [
          ...items,
          {
            to: "/landlord-booking-dashboard",
            label: "Quản lý đặt phòng",
            icon: <CalendarIcon className="w-5 h-5" />,
          },
          {
            to: "/homestay-management",
            label: "Quản lý Homestay",
            icon: <OfficeBuildingIcon className="w-5 h-5" />,
          },
          {
            to: "/voucher",
            label : "Khuyến mãi",
            icon: <GiftIcon className="w-5 h-5" />
          }
        ];
      } else {
        // Regular user items
        items = [
          ...items,
          {
            to: "/user-booking-dashboard",
            label: "Đơn đặt phòng",
            icon: <CalendarIcon className="w-5 h-5" />,
          },
          {
            to: "/homestay-recommend",
            label: "Gợi ý Homestay",
            icon: <SearchIcon className="w-5 h-5" />,
          },
          {
            to: "/favorites",
            label: "Yêu thích",
            icon: <HeartIcon className="w-5 h-5" />,
          },
          {
            to: "/saved-searches",
            label: "Tìm kiếm đã lưu",
            icon: <BookmarkIcon className="w-5 h-5" />,
          },
        ];
      }
      
      // Add contact support for all logged in users
      items.push({
        to: "/contact",
        label: "Liên hệ hỗ trợ",
        icon: <ChatIcon className="w-5 h-5" />,
      });
    } else {
      // Guest-specific items (not logged in)
      items = [
        ...items,
        {
          to: "/login",
          label: "Đăng nhập",
          icon: <UserIcon className="w-5 h-5" />,
        },
        {
          to: "/register",
          label: "Đăng ký",
          icon: <UserIcon className="w-5 h-5" />,
        },
        {
          to: "/homestay-recommend",
          label: "Tìm Homestay",
          icon: <SearchIcon className="w-5 h-5" />,
        },
        {
          to: "/contact",
          label: "Liên hệ hỗ trợ",
          icon: <ChatIcon className="w-5 h-5" />,
        },
        {
          to: "/host-register",
          label: "Đăng ký cho thuê",
          icon: <OfficeBuildingIcon className="w-5 h-5" />,
        },
      ];
    }

    // Add settings menu for all users at the end
    items.push({
      to: "/settings",
      label: "Cài đặt",
      icon: <CogIcon className="w-5 h-5" />,
    });

    return items;
  };

  // Get the menu items based on current user
  const menuItems = getMenuItems();

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
        className={`fixed left-0 top-0 h-full w-64 bg-white text-primary p-5 z-40 shadow-xl border-r border-gray-200 transform transition-transform duration-300 overflow-y-auto ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="mt-8 flex flex-col h-full">
          {/* Logo and Brand */}
          <h2 className="text-3xl font-bold mb-6 font-poppins text-center">
            <span className="text-[#3252DF]">Homies</span>
            <span className="text-[#152C5B]">Stay</span>
          </h2>
          
          {/* User Profile Section (if logged in) */}
          {user && (
            <div className="flex items-center gap-3 mb-5 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={user.avatarUrl || "/default-avatar.png"} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.fullName || "Người dùng"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {isAdmin() ? "Quản trị viên" : isLandlord() ? "Chủ nhà" : "Người dùng"}
                </p>
              </div>
            </div>
          )}
          
          {/* Navigation Menu */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-3 py-2.5 px-4 rounded-lg relative group transition-all duration-300 ${
                      currentPath === item.to
                        ? `bg-[#3252DF] text-white shadow-md`
                        : `text-gray-600 hover:bg-gray-100 hover:text-[#3252DF]`
                    }`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <span className={currentPath === item.to ? "text-white" : "text-gray-500"}>
                      {item.icon}
                    </span>
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
          
          {/* Logout Button (only shown when logged in) */}
          {user && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 py-2.5 px-4 rounded-lg text-red-500 hover:bg-red-50 w-full transition-colors"
              >
                <LogoutIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Đăng xuất</span>
              </button>
            </div>
          )}
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