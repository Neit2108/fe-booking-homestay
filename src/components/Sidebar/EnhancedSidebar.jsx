// src/components/Sidebar/EnhancedSidebar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  TemplateIcon,
  ChartPieIcon,
  CogIcon,
  LogoutIcon,
  XIcon
} from "@heroicons/react/outline";

// Icon mapping for navigation items
const icons = {
  dashboardIcon: <TemplateIcon className="w-6 h-6" />,
  bookingIcon: <BookOpenIcon className="w-6 h-6" />,
  homestayIcon: <HomeIcon className="w-6 h-6" />,
  bookingUserIcon: <BookOpenIcon className="w-6 h-6" />,
  userIcon: <UsersIcon className="w-6 h-6" />,
  statisticsIcon: <ChartPieIcon className="w-6 h-6" />,
  settingsIcon: <CogIcon className="w-6 h-6" />,
};

const EnhancedSidebar = ({ 
  user, 
  isOpen, 
  onClose,
  onLogout,
  activePage 
}) => {
  const location = useLocation();
  const [menuItems, setMenuItems] = useState([]);
  
  // Extract user roles
  const roles = Array.isArray(user?.role) ? user?.role : [user?.role];
  const isAdmin = roles.includes("Admin");
  const isLandlord = roles.includes("Landlord");
  
  // Generate navigation items based on user role
  useEffect(() => {
    let items = [
      {
        path: "/",
        label: "Trang chủ",
        icon: icons.homeIcon,
      }
    ];
    
    // User specific items (everyone gets these)
    items.push({
      path: "/profile",
      label: "Thông tin cá nhân",
      icon: icons.userIcon,
    });
    
    // Add role-specific items
    if (isAdmin) {
      items = [
        ...items,
        {
          path: "/admin-booking-dashboard",
          label: "Quản lý đặt phòng",
          icon: icons.bookingIcon,
        },
        {
          path: "/homestay-management",
          label: "Quản lý Homestay",
          icon: icons.homestayIcon,
        },
        {
          path: "/statistics",
          label: "Thống kê",
          icon: icons.statisticsIcon,
        }
      ];
    } else if (isLandlord) {
      items = [
        ...items,
        {
          path: "/landlord-booking-dashboard",
          label: "Quản lý đặt phòng",
          icon: icons.bookingIcon,
        },
        {
          path: "/homestay-management",
          label: "Quản lý Homestay",
          icon: icons.homestayIcon,
        }
      ];
    } else {
      // Regular user menu items
      items = [
        ...items,
        {
          path: "/user-booking-dashboard",
          label: "Đặt phòng của tôi",
          icon: icons.bookingUserIcon,
        }
      ];
    }
    
    setMenuItems(items);
  }, [user, isAdmin, isLandlord]);
  
  // Check if a route is active
  const isActive = (path) => {
    if (activePage) {
      return activePage === path.replace('/', '');
    }
    return location.pathname === path;
  };
  
  // Sidebar UI
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 w-64 h-screen transition-transform ${
          isOpen ? "transform-none" : "-translate-x-full lg:translate-x-0"
        } lg:w-64 lg:static lg:h-auto`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r border-gray-200">
          {/* Mobile close button */}
          <div className="flex items-center justify-between lg:hidden mb-6">
            <div className="text-xl font-semibold">
              <span className="text-accent">Homies</span>
              <span className="text-primary">Stay.</span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          
          {/* User profile summary */}
          {user && (
            <div className="flex items-center space-x-4 p-4 mb-5 border-b">
              <img 
                src={user.avatarUrl || "/default-avatar.png"} 
                alt="User avatar" 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900 truncate">{user.fullName}</p>
                <p className="text-sm text-gray-500">
                  {isAdmin ? "Admin" : isLandlord ? "Chủ nhà" : "Người dùng"}
                </p>
              </div>
            </div>
          )}
          
          {/* Navigation items */}
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  } transition-colors group`}
                  onClick={onClose}
                >
                  <span className={`${isActive(item.path) ? "text-blue-700" : "text-gray-500 group-hover:text-gray-900"}`}>
                    {item.icon || <div className="w-6 h-6" />}
                  </span>
                  <span className="ml-3 font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
            
            {/* Logout button */}
            <li className="pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={onLogout}
                className="flex items-center w-full p-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogoutIcon className="w-6 h-6" />
                <span className="ml-3 font-medium">Đăng xuất</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default EnhancedSidebar;