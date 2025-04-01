import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
//import { useUser } from "../../context/UserContext";
function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); // Lấy URL hiện tại
  const {user, logout} = useContext(UserContext);

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
  };

  const isActive = (path) => location.pathname === path; 

  return (
    <div className="bg-white w-full flex flex-col items-stretch pt-[19px] font-poppins">
      <div className="flex w-full max-w-[1140px] items-stretch gap-5 flex-wrap justify-between self-center max-md:max-w-full">
        <a href="/" className="text-primary text-[26px] font-medium cursor-pointer">
          <span className="text-accent">Homies</span>
          <span>Stay.</span>
        </a>

        <div className="flex items-stretch gap-[49px] flex-wrap">
          <nav className="text-primary text-base font-normal flex-grow flex items-center justify-center gap-8 max-md:gap-4 max-md:flex-wrap max-md:justify-center">
            <a
              href="/"
              className={`border-b-2 ${isActive("/") ? "border-blue-500 text-blue-500" : "border-transparent text-primary"} hover:border-blue-500 transition-all`}
            >
              Home
            </a>
            <a
              href="/"
              className={`border-b-2 ${isActive("/hotels") ? "border-blue-500 text-blue-500" : "border-transparent text-primary"} hover:border-blue-500 transition-all`}
            >
              Hotels
            </a>
            <a
              href="/"
              className={`border-b-2 ${isActive("/rooms") ? "border-blue-500 text-blue-500" : "border-transparent text-primary"} hover:border-blue-500 transition-all`}
            >
              Rooms
            </a>
            <a
              href="/"
              className={`border-b-2 ${isActive("/about") ? "border-blue-500 text-blue-500" : "border-transparent text-primary"} hover:border-blue-500 transition-all`}
            >
              About
            </a>
            <a
              href="/"
              className={`border-b-2 ${isActive("/contact") ? "border-blue-500 text-blue-500" : "border-transparent text-primary"} hover:border-blue-500 transition-all`}
            >
              Contact
            </a>
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
                <span className="text-primary font-medium">{user.fullName}</span>
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-2">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
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
