import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import NavLink from "../Navbar/Navlink";

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isPromotionsDropdownOpen, setPromotionsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const promotionsDropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin, isLandlord } = useContext(UserContext);

  const getDashboardLink = () => {
    if (isAdmin()) return "/admin-booking-dashboard";
    if (isLandlord()) return "/landlord-booking-dashboard";
    return "/user-booking-dashboard";
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        promotionsDropdownRef.current &&
        !promotionsDropdownRef.current.contains(event.target)
      ) {
        setPromotionsDropdownOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const promotions = [
    { title: "Khuyến mãi hè", path: "/promotions/summer" },
    { title: "Ngày lễ đặc biệt", path: "/promotions/holidays" },
    { title: "Ưu đãi cuối tuần", path: "/promotions/weekend" },
    { title: "Tết thiếu nhi", path: "/promotions/children" },
    { title: "Lễ Quốc Khánh", path: "/promotions/vietnam" },
  ];

  const navLinks = [
    { title: "Trang chủ", path: "/" },
    { title: "Homestays", path: "/homestay-recommend" },
    {
      title: "Khuyến mãi",
      path: "/promotion",
    },
    { title: "Giới Thiệu", path: "/about" },
    { title: "Liên Hệ", path: "/contact" },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white w-full flex flex-col items-stretch pt-4 pb-2 font-poppins shadow-sm">
      <div className="flex w-full max-w-[1140px] items-center gap-5 justify-between self-center max-md:max-w-full px-4 md:px-0">
        <Link
          to="/"
          className="text-primary text-[26px] font-medium cursor-pointer transition-transform hover:scale-105"
        >
          <span className="text-accent">Homies</span>
          <span>Stay.</span>
        </Link>

        <div className="flex items-center gap-6 flex-wrap">
          <nav className="text-primary text-base font-normal flex items-center gap-8 max-md:hidden">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.path}
                  className="relative"
                  ref={promotionsDropdownRef}
                >
                  <div
                    className={`flex items-center gap-1 cursor-pointer relative font-medium transition-colors duration-200 pb-1 ${
                      location.pathname.includes(link.path)
                        ? "text-accent"
                        : "text-primary hover:text-accent"
                    }`}
                    onClick={() => setPromotionsDropdownOpen((prev) => !prev)}
                  >
                    {link.title}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isPromotionsDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <span
                      className={`absolute left-0 bottom-0 w-full h-0.5 rounded-full transition-transform duration-300 ${
                        location.pathname.includes(link.path)
                          ? "bg-accent scale-x-100"
                          : "bg-accent scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </div>

                  {isPromotionsDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md py-2 z-10 border border-gray-100">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-accent transition-colors"
                          onClick={() => setPromotionsDropdownOpen(false)}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  isActive={location.pathname === link.path}
                >
                  {link.title}
                </NavLink>
              )
            )}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
            <svg
              className="w-6 h-6 text-gray-700"
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

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg transition cursor-pointer"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 bg-gray-200">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-accent text-white font-medium">
                      {user.fullName?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <span className="text-primary font-medium max-md:hidden">
                  {user.fullName}
                </span>
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md py-2 z-10 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Tài khoản cá nhân</span>
                  </Link>

                  <Link
                    to="/saved-places"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3.172 5.172a4.001 4.001 0 015.656 0L10 6.343l1.172-1.171a4.001 4.001 0 115.656 5.656L10 17.657l-6.828-6.829a4.001 4.001 0 010-5.656z" />
                    </svg>
                    <span>Địa điểm đã lưu</span>
                  </Link>

                  <Link
                    to="/wallet"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M21 7H5a1 1 0 0 1 0-2h16a1 1 0 1 1 0 2zM5 8h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3zm13 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>

                    <span>Quản lý ví tiền</span>
                  </Link>

                  <Link
                    to={getDashboardLink()}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span>Quản lý đặt phòng</span>
                  </Link>

                  {(isAdmin() || isLandlord()) && (
                    <>
                      {(isAdmin() || isLandlord()) && (
                        <Link
                          to="/homestay-management"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                          </svg>
                          <span>Quản lý homestay</span>
                        </Link>
                      )}

                      <Link
                        to="/statistics"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                        <span>Thống kê</span>
                      </Link>
                    </>
                  )}

                  {/* {isAdmin() && (
                    <Link
                      to="/statistics"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                      <span>Thống kê</span>
                    </Link>
                  )} */}

                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-8 1a1 1 0 00-1 1v2a1 1 0 001 1h3a1 1 0 001-1V9a1 1 0 00-1-1H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/login")}
                className="bg-accent hover:bg-blue-700 text-white rounded-lg px-5 py-2 font-medium transition-all duration-200 shadow-sm"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => navigate("/register")}
                className="border border-accent text-accent hover:bg-blue-50 rounded-lg px-5 py-2 font-medium transition-all duration-200"
              >
                Đăng ký
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile navigation menu - hidden by default */}
      <div className="md:hidden hidden px-4 py-2 mt-2 bg-gray-50">
        {navLinks.map((link) =>
          link.hasDropdown ? (
            <div key={link.path}>
              <div
                className={`flex items-center justify-between py-2 px-4 text-gray-700 ${
                  location.pathname.includes(link.path)
                    ? "font-medium text-accent"
                    : ""
                }`}
                onClick={() => {
                  // This would toggle the mobile submenu in a real implementation
                }}
              >
                {link.title}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              {/* Mobile submenu - hidden by default */}
              <div className="hidden pl-8">
                {link.dropdown.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block py-2 px-4 text-gray-600"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={link.path}
              to={link.path}
              className={`block py-2 px-4 text-gray-700 ${
                location.pathname === link.path ? "font-medium text-accent" : ""
              }`}
            >
              {link.title}
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export default Navbar;
