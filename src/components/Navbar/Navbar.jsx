// components/Navbar/Navbar.jsx
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, logout } = useContext(UserContext);

  const getDashboardLink = () => {
    const roles = Array.isArray(user.role) ? user.role : [user.role];
    if (roles.includes("Admin")) {
      return "/admin-booking-dashboard";
    } else if (roles.includes("Host")) {
      return "/landlord-booking-dashboard";
    }
    return "/user-booking-dashboard";
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login"); // Điều hướng về trang login sau khi logout
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-white w-full flex flex-col items-stretch pt-[19px] font-poppins">
      <div className="flex w-full max-w-[1140px] items-stretch gap-5 flex-wrap justify-between self-center max-md:max-w-full">
        <Link
          to="/"
          className="text-primary text-[26px] font-medium cursor-pointer mt-[8px]"
        >
          <span className="text-accent">Homies</span>
          <span>Stay.</span>
        </Link>

        <div className="flex items-stretch gap-[49px] flex-wrap">
          <nav className="text-primary text-base font-normal flex-grow flex items-center justify-center gap-8 max-md:gap-4 max-md:flex-wrap max-md:justify-center">
            <Link
              to="/"
              className={`border-b-2 ${
                isActive("/")
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-primary"
              } hover:border-blue-500 transition-all`}
            >
              Trang chủ
            </Link>
            <Link
              to="/hotels"
              className={`border-b-2 ${
                isActive("/hotels")
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-primary"
              } hover:border-blue-500 transition-all`}
            >
              Homestays
            </Link>
            <Link
              to="/rooms"
              className={`border-b-2 ${
                isActive("/rooms")
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-primary"
              } hover:border-blue-500 transition-all`}
            >
              Phòng
            </Link>
            <Link
              to="/about"
              className={`border-b-2 ${
                isActive("/about")
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-primary"
              } hover:border-blue-500 transition-all`}
            >
              Giới Thiệu
            </Link>
            <Link
              to="/contact"
              className={`border-b-2 ${
                isActive("/contact")
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent text-primary"
              } hover:border-blue-500 transition-all`}
            >
              Liên Hệ
            </Link>
          </nav>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-4 hover:bg-gray-200 p-2 rounded-lg transition cursor-pointer"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <img
                  src={user.avatarUrl}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <span className="text-primary font-medium">
                  {user.fullName}
                </span>
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-10">
                <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 flex-shrink-0" // Đảm bảo icon không bị co giãn
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="flex-1">Profile</span> {/* Đảm bảo chữ không bị đẩy xuống */}
                  </Link>
                  <Link
                    to={getDashboardLink()} // Sử dụng getDashboardLink để điều hướng đúng
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
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
                    Đặt phòng
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-accent rounded-[7px] shadow-md px-[26px] py-[6px] text-xl text-white font-medium cursor-pointer hover:bg-blue-700 active:bg-blue-800 transition-all duration-200"
            >
              Login
            </button>
          )}
        </div>
      </div>

      <div className="bg-[#E5E5E5] flex mt-[19px] h-px max-md:max-w-full" />
    </div>
  );
}

export default Navbar;