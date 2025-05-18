import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import EmailSection from "../../components/EmailSection/EmailSection";
import SecuritySettings from "../../components/SecuritySettings/SecuritySettings";
import Sidebar from "../../components/Sidebar/Sidebar";
//import { useUser } from "../../context/UserContext";
import Loader from "../../components/Loading/Loader";
import { UserContext } from "../../context/UserContext";

function Profile() {
  const {user, loading, error} = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("profile");

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-[1140px] mx-auto px-4 py-8 font-poppins bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-6 md:ml-80">
        Thông tin cá nhân
      </h1>

      <div className="flex flex-col md:flex-row gap-6 relative">
        {/* Main Sidebar - Fixed on left */}
        <Sidebar />

        <div className="md:ml-80 w-full bg-gray-50 flex-1">
          <ProfileHeader user = {user} />
          <div className="flex flex-col md:flex-row gap-6 relative">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-white shadow-md rounded-lg p-4 h-fit border border-gray-100 sticky top-4">
              <nav>
                <ul>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-3 rounded-md transition-colors duration-200 ${
                        activeTab === "profile"
                          ? "bg-accent text-white"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveTab("profile")}
                    >
                      Thông tin cá nhân
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-3 rounded-md transition-colors duration-200 ${
                        activeTab === "email"
                          ? "bg-accent text-white"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveTab("email")}
                    >
                      Email
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-3 rounded-md transition-colors duration-200 ${
                        activeTab === "security"
                          ? "bg-accent text-white"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveTab("security")}
                    >
                      Bảo mật
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-3 rounded-md transition-colors duration-200 ${
                        activeTab === "notifications"
                          ? "bg-accent text-white"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveTab("notifications")}
                    >
                      Thông báo
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full text-left px-4 py-3 rounded-md transition-colors duration-200 ${
                        activeTab === "payment"
                          ? "bg-accent text-white"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveTab("payment")}
                    >
                      Phương thức thanh toán
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-gray-50">
              {activeTab === "profile" && <ProfileDetails user = {user} />}

              {activeTab === "email" && (
                <div className="bg-white shadow-md rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">
                    Email Settings
                  </h2>
                  <EmailSection user = {user}/>
                </div>
              )}

              {activeTab === "security" && <SecuritySettings />}

              {activeTab === "notifications" && (
                <div className="bg-white shadow-md rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">
                    Thông báo
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Quản lý thông báo của bạn để nhận thông tin cập nhật và ưu đãi.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <h3 className="font-medium">Thông báo qua mail</h3>
                        <p className="text-sm text-gray-500">
                          Nhận thông báo qua email về các cập nhật và ưu đãi
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <h3 className="font-medium">Voucher</h3>
                        <p className="text-sm text-gray-500">
                          Nhận thông báo về các voucher và ưu đãi mới
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div>
                        <h3 className="font-medium">Tin nhắn sms</h3>
                        <p className="text-sm text-gray-500">
                          Nhận thông báo qua tin nhắn về các cập nhật và ưu đãi
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                      </label>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button className="px-6 py-2 bg-accent text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "payment" && (
                <div className="bg-white shadow-md rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">
                    Phương thức thanh toán
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Quản lý phương thức thanh toán của bạn để dễ dàng thanh
                    toán cho các đơn hàng trong tương lai.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="border rounded-md p-4 flex items-center">
                      <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Ví Homies</p>
                        <p className="text-sm text-gray-500"></p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-accent hover:underline">
                          Sửa
                        </button>
                        <button className="text-red-500 hover:underline">
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>

                  <button className="px-6 py-2.5 bg-accent text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Thêm
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
