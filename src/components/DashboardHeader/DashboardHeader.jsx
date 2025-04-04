import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";

function DashboardHeader() {
  const { user } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      {/* Greeting */}
      <div>
        <div className="text-xl font-semibold text-neutral-950">
          Hello, {user?.fullName || "Admin"}
        </div>
        <div className="text-sm text-neutral-500">Have a nice day</div>
      </div>

      {/* Notifications and Profile */}
      <div className="flex gap-6 items-center">
        {/* Notification Bell */}
        <div className="relative cursor-pointer">
          <svg
            width="24"
            height="24"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.0189 7.47512C21.0209 9.40512 19.4526 10.9767 17.5226 10.9787C15.5926 10.9807 14.0209 9.41237 14.0189 7.48237C14.0169 5.55238 15.5853 3.98075 17.5153 3.97875C19.4453 3.97675 21.0169 5.54512 21.0189 7.47512ZM19.0244 12.7672C18.5246 12.8977 18.0246 12.9782 17.5246 12.9787C16.0668 12.9776 14.6687 12.3987 13.6368 11.3689C12.6049 10.3391 12.0231 8.94232 12.0189 7.48445C12.0174 6.01445 12.596 4.68385 13.515 3.69289C13.3333 3.47062 13.1043 3.29169 12.8447 3.16913C12.5851 3.04658 12.3014 2.98348 12.0143 2.98445C10.9143 2.98559 10.0152 3.88652 10.0164 4.98652L10.0167 5.27652C7.04757 6.1596 5.0204 8.8917 5.02361 11.9917L5.02983 17.9917L3.03191 19.9938L3.03294 20.9938L21.0329 20.9751L21.0319 19.9751L19.0298 17.9772L19.0244 12.7672ZM12.036 23.9844C13.146 23.9833 14.0351 23.0924 14.034 21.9824L10.034 21.9865C10.0345 22.5169 10.2458 23.0254 10.6212 23.4001C10.9967 23.7748 11.5056 23.985 12.036 23.9844Z"
              fill="#0A0A0A"
            />
            <circle
              cx="17.5189"
              cy="7.47873"
              r="3.5"
              transform="rotate(-0.0593957 17.5189 7.47873)"
              fill="#4A85F6"
            />
          </svg>
        </div>

        {/* Divider */}
        <div className="w-px h-12 bg-stone-300" />

        {/* User Profile */}
        <div
          className="flex gap-4 items-center pr-2 cursor-pointer"
          onClick={toggleDropdown}
          ref={dropdownRef}
        >
          {/* User Avatar */}
          <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
            <img
              src={user?.avatarUrl || "/default-avatar.png"}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <div className="text-base font-semibold text-neutral-950">
              {user?.fullName || "Admin User"}
            </div>
            <div className="text-xs text-neutral-950">Admin</div>
          </div>

          {/* Dropdown Arrow */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.47763 9.30066L12.0724 13.8859L16.6576 9.29115L18.0691 10.7097L12.0753 16.7159L6.0691 10.7221L7.47763 9.30066Z"
              fill="black"
            />
          </svg>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 top-16">
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                href="/logout"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
