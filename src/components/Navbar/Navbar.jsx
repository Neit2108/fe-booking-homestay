// // components/Navbar/Navbar.jsx
// import { useState, useEffect, useRef, useContext } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { UserContext } from "../../context/UserContext";

// function Navbar() {
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const { user, logout } = useContext(UserContext);
//   const roles = Array.isArray(user?.role) ? user.role : [user?.role];

//   const getDashboardLink = () => {
//     const roles = Array.isArray(user.role) ? user.role : [user.role];
//     if (roles.includes("Admin")) {
//       return "/admin-booking-dashboard";
//     } else if (roles.includes("Landlord")) {
//       return "/landlord-booking-dashboard";
//     }
//     return "/user-booking-dashboard";
//   };

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     }

//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [isDropdownOpen]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login"); // Điều hướng về trang login sau khi logout
//   };

//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="bg-white w-full flex flex-col items-stretch pt-[19px] font-poppins">
//       <div className="flex w-full max-w-[1140px] items-stretch gap-5 flex-wrap justify-between self-center max-md:max-w-full">
//         <Link
//           to="/"
//           className="text-primary text-[26px] font-medium cursor-pointer mt-[8px]"
//         >
//           <span className="text-accent">Homies</span>
//           <span>Stay.</span>
//         </Link>

//         <div className="flex items-stretch gap-[49px] flex-wrap">
//           <nav className="text-primary text-base font-normal flex-grow flex items-center justify-center gap-8 max-md:gap-4 max-md:flex-wrap max-md:justify-center">
//             <Link
//               to="/"
//               className={`border-b-2 ${
//                 isActive("/")
//                   ? "border-blue-500 text-blue-500"
//                   : "border-transparent text-primary"
//               } hover:border-blue-500 transition-all`}
//             >
//               Trang chủ
//             </Link>
//             <Link
//               to="/homestay-recommend"
//               className={`border-b-2 ${
//                 isActive("/homestay-recommend")
//                   ? "border-blue-500 text-blue-500"
//                   : "border-transparent text-primary"
//               } hover:border-blue-500 transition-all`}
//             >
//               Homestays
//             </Link>
//             <Link
//               to="/rooms"
//               className={`border-b-2 ${
//                 isActive("/rooms")
//                   ? "border-blue-500 text-blue-500"
//                   : "border-transparent text-primary"
//               } hover:border-blue-500 transition-all`}
//             >
//               Phòng
//             </Link>
//             <Link
//               to="/about"
//               className={`border-b-2 ${
//                 isActive("/about")
//                   ? "border-blue-500 text-blue-500"
//                   : "border-transparent text-primary"
//               } hover:border-blue-500 transition-all`}
//             >
//               Giới Thiệu
//             </Link>
//             <Link
//               to="/contact"
//               className={`border-b-2 ${
//                 isActive("/contact")
//                   ? "border-blue-500 text-blue-500"
//                   : "border-transparent text-primary"
//               } hover:border-blue-500 transition-all`}
//             >
//               Liên Hệ
//             </Link>
//           </nav>

//           {user ? (
//             <div className="relative" ref={dropdownRef}>
//               <div
//                 className="flex items-center gap-4 hover:bg-gray-200 p-2 rounded-lg transition cursor-pointer"
//                 onClick={() => setDropdownOpen((prev) => !prev)}
//               >
//                 <img
//                   src={user.avatarUrl}
//                   alt="Avatar"
//                   className="w-10 h-10 rounded-full border border-gray-300"
//                 />
//                 <span className="text-primary font-medium">
//                   {user.fullName}
//                 </span>
//               </div>

//               {isDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 z-10">
//                 <Link
//                     to="/profile"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 flex-shrink-0" // Đảm bảo icon không bị co giãn
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     <span className="flex-1">Tài khoản</span> {/* Đảm bảo chữ không bị đẩy xuống */}
//                   </Link>
//                   <Link
//                     to={getDashboardLink()} // Sử dụng getDashboardLink để điều hướng đúng
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
//                       <path
//                         fillRule="evenodd"
//                         d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     Quản lý đặt phòng
//                   </Link>
//                   {/* <Link
//                     to={getDashboardLink()} // Sử dụng getDashboardLink để điều hướng đúng
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
//                       <path
//                         fillRule="evenodd"
//                         d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     Quản lý đặt phòng
//                   </Link>
//                   {roles.includes("Landlord") || roles.includes("Admin") && (
//                     <Link
//                       to="/homestay-management"
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M10 2a8 8 0 100 16 8 8 0 000-16zm1.5 11.5a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v3zm1-4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       Quản lý homestay
//                     </Link>
//                   )} */}
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-accent rounded-[7px] shadow-md px-[26px] py-[6px] text-xl text-white font-medium cursor-pointer hover:bg-blue-700 active:bg-blue-800 transition-all duration-200"
//             >
//               Login
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="bg-[#E5E5E5] flex mt-[19px] h-px max-md:max-w-full" />
//     </div>
//   );
// }

// export default Navbar;

// components/Navbar/Navbar.jsx
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import NavLink from "../Navbar/Navlink";

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
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

  const navLinks = [
    { title: "Trang chủ", path: "/" },
    { title: "Homestays", path: "/homestay-recommend" },
    { title: "Phòng", path: "/rooms" },
    { title: "Giới Thiệu", path: "/about" },
    { title: "Liên Hệ", path: "/contact" }
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
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path} 
                isActive={location.pathname === link.path}
              >
                {link.title}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
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
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md py-2 z-10 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.fullName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
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
                  
                  {isAdmin() && (
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
                  )}
                  
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
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block py-2 px-4 text-gray-700 ${
              location.pathname === link.path ? "font-medium text-accent" : ""
            }`}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;