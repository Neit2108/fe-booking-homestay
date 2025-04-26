// src/components/AdminNavbar/AdminNavbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserDropdown from "../Navbar/UserDropdown";
import { BellIcon, SearchIcon, MenuIcon } from "@heroicons/react/outline";

const AdminNavbar = ({ user, onLogout, onToggleSidebar }) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  
  const getPageTitle = () => {
    switch(location.pathname) {
      case "/admin-booking-dashboard":
        return "Admin Dashboard";
      case "/homestay-management":
        return "Quản lý Homestay";
      case "/statistics":
        return "Thống kê";
      default:
        return "Admin Dashboard";
    }
  };
  
  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            
            {/* Logo */}
            <Link to="/" className="text-xl font-semibold flex items-center lg:ml-2.5">
              <span className="text-accent">Homies</span>
              <span className="text-primary">Stay.</span>
            </Link>
            
            {/* Page title - visible on larger screens */}
            <h1 className="text-xl font-bold text-gray-800 md:ml-10 hidden md:block">
              {getPageTitle()}
            </h1>
          </div>
          
          <div className="flex items-center">
            {/* Search */}
            <div className="hidden lg:flex lg:items-center lg:ml-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Tìm kiếm..."
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Notifications */}
            <button className="p-1 ml-5 mr-4 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="sr-only">Thông báo</span>
              <BellIcon className="h-6 w-6" />
            </button>
            
            {/* User dropdown */}
            <UserDropdown user={user} onLogout={onLogout} />
          </div>
        </div>
      </div>
      
      {/* Mobile title bar */}
      <div className="py-2 px-4 lg:hidden bg-gray-50 border-b border-gray-100">
        <h1 className="text-lg font-semibold text-gray-700">
          {getPageTitle()}
        </h1>
      </div>
    </nav>
  );
};

export default AdminNavbar;