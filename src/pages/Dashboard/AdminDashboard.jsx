import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import UserTable from "../../components/UserTable/UserTable";

function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(6);
  const [currentPage] = useState(1);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex min-h-screen bg-neutral-100 max-sm:flex-col">
      {/* Sidebar */}
      <Sidebar activePage="dashboard" />

      {/* Main Content */}
      <div className="flex-1 pt-8 pr-6 pb-6 pl-11 max-md:px-4 max-md:py-6 max-sm:p-4 md:ml-80">
        {/* Dashboard Header */}
        <DashboardHeader />

        {/* Dashboard Title */}
        <div className="mb-6 text-2xl font-bold text-accent">
          Admin Dashboard
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-6 items-center mb-6 max-sm:flex-col">
          <div className="flex flex-1 items-center px-5 py-3 bg-white rounded-2xl">
            <svg
              width="16"
              height="16"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-4"
            >
              <path
                d="M6.68498 2.05365C7.61696 2.05265 8.53068 2.31215 9.32301 2.80287C10.1153 3.29359 10.7548 3.99599 11.1691 4.83081C11.5834 5.66563 11.7562 6.59964 11.6679 7.52743C11.5796 8.45522 11.2337 9.33987 10.6693 10.0815L13.8346 13.2416C13.9543 13.3614 14.0239 13.5223 14.0292 13.6916C14.0345 13.8609 13.9752 14.0259 13.8634 14.1531C13.7515 14.2802 13.5954 14.36 13.4268 14.3763C13.2582 14.3925 13.0897 14.344 12.9556 14.2405L12.8929 14.1852L9.72628 11.0265C9.09545 11.5086 8.35889 11.8335 7.57755 11.9743C6.79622 12.1152 5.99258 12.068 5.23312 11.8366C4.47366 11.6052 3.78022 11.1962 3.21018 10.6436C2.64014 10.091 2.2099 9.4106 1.95504 8.65869C1.70018 7.90677 1.62804 7.10498 1.74459 6.31965C1.86114 5.53432 2.16303 4.78804 2.62527 4.14255C3.08751 3.49706 3.69682 2.97092 4.40278 2.60768C5.10874 2.24443 5.89105 2.05452 6.68498 2.05365ZM6.68636 3.38699C5.7139 3.388 4.78167 3.77527 4.09475 4.46362C3.40783 5.15196 3.02249 6.08499 3.02349 7.05745C3.0245 8.02991 3.41178 8.96214 4.10012 9.64906C4.78847 10.336 5.7215 10.7213 6.69396 10.7203C7.66642 10.7193 8.59865 10.332 9.28557 9.64369C9.97249 8.95534 10.3578 8.02231 10.3568 7.04985C10.3558 6.07739 9.96854 5.14516 9.28019 4.45824C8.59185 3.77132 7.65882 3.38598 6.68636 3.38699Z"
                fill="#404040"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="w-full text-base border-none outline-none text-neutral-700 bg-transparent"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button className="px-5 py-3 text-base font-semibold text-white bg-accent rounded-lg cursor-pointer border-none hover:bg-blue-600 transition-colors">
            Add Owner +
          </button>
          <div className="flex gap-4 items-center max-sm:justify-between max-sm:w-full">
            <div className="flex gap-2 items-center text-base font-semibold cursor-pointer text-neutral-700">
              <span>Sort by</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.1166 6.74665C10.2071 6.66924 10.332 6.646 10.4443 6.68568C10.5566 6.72535 10.6392 6.82192 10.661 6.93901C10.6828 7.0561 10.6404 7.17591 10.5499 7.25332L8.21661 9.25332C8.09187 9.36001 7.90802 9.36001 7.78327 9.25332L5.44994 7.25332C5.31003 7.13365 5.29361 6.92323 5.41327 6.78332C5.53294 6.6434 5.74336 6.62699 5.88327 6.74665L7.99994 8.56065L10.1166 6.74732V6.74665Z"
                  fill="#404040"
                  stroke="black"
                />
              </svg>
            </div>
            <div className="flex gap-2 items-center text-base font-semibold cursor-pointer text-neutral-700">
              <span>Saved search</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.1166 6.74665C10.2071 6.66924 10.332 6.646 10.4443 6.68568C10.5566 6.72535 10.6392 6.82192 10.661 6.93901C10.6828 7.0561 10.6404 7.17591 10.5499 7.25332L8.21661 9.25332C8.09187 9.36001 7.90802 9.36001 7.78327 9.25332L5.44994 7.25332C5.31003 7.13365 5.29361 6.92323 5.41327 6.78332C5.53294 6.6434 5.74336 6.62699 5.88327 6.74665L7.99994 8.56065L10.1166 6.74732V6.74665Z"
                  fill="#404040"
                  stroke="black"
                />
              </svg>
            </div>
            <div className="cursor-pointer">
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_0_615)">
                  <path
                    d="M7.6 0C6.365 0 5.32 0.798 4.921 1.9H0V3.8H4.921C5.3105 4.902 6.3555 5.7 7.6 5.7C9.1675 5.7 10.45 4.4175 10.45 2.85C10.45 1.2825 9.1675 0 7.6 0ZM12.35 1.9V3.8H19V1.9H12.35ZM12.35 6.65C11.115 6.65 10.07 7.448 9.671 8.55H0V10.45H9.671C10.0605 11.552 11.1055 12.35 12.35 12.35C13.9175 12.35 15.2 11.0675 15.2 9.5C15.2 7.9325 13.9175 6.65 12.35 6.65ZM17.1 8.55V10.45H19V8.55H17.1ZM4.75 13.3C3.515 13.3 2.47 14.098 2.071 15.2H0V17.1H2.071C2.4605 18.202 3.5055 19 4.75 19C6.3175 19 7.6 17.7175 7.6 16.15C7.6 14.5825 6.3175 13.3 4.75 13.3ZM9.5 15.2V17.1H19V15.2H9.5Z"
                    fill="#404040"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_0_615">
                    <rect width="19" height="19" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* User Table */}
        <UserTable />

        {/* Pagination */}
        <div className="flex gap-6 justify-center items-center mt-6">
          <div className="flex gap-2 items-center text-xs text-neutral-500">
            <span>Items per page:</span>
            <span className="flex gap-1 items-center px-2 py-1 bg-neutral-100">
              <span>{itemsPerPage}</span>
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 5.59106L0.669872 0.591064L9.33013 0.591064L5 5.59106Z"
                  fill="#717171"
                />
              </svg>
            </span>
          </div>
          <div className="text-xs text-neutral-500">1-4 of 10</div>
          <div className="flex gap-2">
            <button
              disabled
              className="cursor-not-allowed border-none text-stone-300"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="#C4C4C4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="cursor-pointer border-none text-neutral-500">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="#717171"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
