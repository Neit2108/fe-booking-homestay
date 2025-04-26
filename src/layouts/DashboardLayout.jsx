// src/layouts/DashboardLayout.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import EnhancedSidebar from "../components/Sidebar/EnhancedSidebar";

const DashboardLayout = ({ children, activePage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Component */}
      <EnhancedSidebar
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        activePage={activePage}
      />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar Component */}
        <AdminNavbar
          user={user}
          onLogout={handleLogout}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 pt-24">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;