// src/components/Navbar/UserDropdown.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon, CogIcon, LogoutIcon, ChevronDownIcon  } from "@heroicons/react/outline";

const UserDropdown = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  
  // Extract user roles
  const roles = Array.isArray(user?.role) ? user?.role : [user?.role];
  const isAdmin = roles.includes("Admin");
  const isLandlord = roles.includes("Landlord");
  
  // Get appropriate dashboard link based on role
  const getDashboardLink = () => {
    if (isAdmin) return "/admin-booking-dashboard";
    if (isLandlord) return "/landlord-booking-dashboard";
    return "/user-booking-dashboard";
  };

  return (
    <Menu as="div" className="relative ml-3">
      <Menu.Button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none">
        <img
          src={user?.avatarUrl || "/default-avatar.png"}
          alt="Avatar"
          className="w-8 h-8 rounded-full object-cover border border-gray-200"
        />
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {user?.fullName || "User"}
        </span>
        <ChevronDownIcon className="w-4 h-4 text-gray-400" />
      </Menu.Button>
      
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-in"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50">
          {/* User Info Section */}
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.fullName}</p>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
          </div>
          
          {/* Primary Actions */}
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } flex items-center px-4 py-2 text-sm`}
                >
                  <UserCircleIcon className="w-5 h-5 mr-3 text-gray-500" />
                  Tài khoản cá nhân
                </Link>
              )}
            </Menu.Item>
            
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={getDashboardLink()}
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } flex items-center px-4 py-2 text-sm`}
                >
                  <CogIcon className="w-5 h-5 mr-3 text-gray-500" />
                  {isAdmin ? "Admin Dashboard" : 
                   isLandlord ? "Quản lý đặt phòng" : 
                   "Đặt phòng của tôi"}
                </Link>
              )}
            </Menu.Item>
          </div>
          
          {/* Admin/Landlord specific options */}
          {(isAdmin || isLandlord) && (
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/homestay-management"
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } flex items-center px-4 py-2 text-sm`}
                  >
                    <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Quản lý Homestay
                  </Link>
                )}
              </Menu.Item>
              
              {isAdmin && (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/statistics"
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } flex items-center px-4 py-2 text-sm`}
                    >
                      <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Thống kê
                    </Link>
                  )}
                </Menu.Item>
              )}
            </div>
          )}
          
          {/* Logout Option */}
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onLogout}
                  className={`${
                    active ? "bg-gray-100 text-red-600" : "text-red-500"
                  } flex items-center w-full text-left px-4 py-2 text-sm`}
                >
                  <LogoutIcon className="w-5 h-5 mr-3" />
                  Đăng xuất
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;