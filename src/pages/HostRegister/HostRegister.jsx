import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HostRegisterSuccess from "./HostRegisterSuccess";
import HostRegisterFailed from "./HostRegisterFailed";
import Loader from "../../components/Loading/Loader";
import { API_URL } from "../../../constant/config";

const HostRegister = () => {
  const navigate = useNavigate();

  // Personal information state
  const [personalInfo, setPersonalInfo] = useState({
    FullName: "",
    IdentityCard: "",
    Email: "",
    PhoneNumber: "",
    HomeAddress: "",
    Username: "",
    Password: "",
  });

  // Hotel information state
  const [hotelInfo, setHotelInfo] = useState({
    PlaceName: "",
    PlaceAddress: "",
    PlacePrice: "",
    PlaceImages: [],
    // documents: [],
    PlaceDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup function to revoke object URLs
      hotelInfo.PlaceImages.forEach((file) => {
        if (file instanceof File) {
          URL.revokeObjectURL(file);
        }
      });
    };
  }, []);

  // Navigation function to go to login page
  const goToLogin = () => {
    console.log(
      `Navigation to login: ${new Date().toISOString()} by ${localStorage.getItem("username") || "User"}`,
    );
    navigate("/login");
  };

  // Handle personal information changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle hotel information changes
  const handleHotelInfoChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      // Convert FileList to Array for easier handling
      const fileArray = Array.from(files);

      setHotelInfo((prevData) => ({
        ...prevData,
        // Append new files to existing files
        [name]: [...prevData[name], ...fileArray],
      }));

      // Reset the file input value so the same file can be selected again if needed
      e.target.value = "";
    } else {
      setHotelInfo((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle removing a file
  const handleRemoveFile = (type, index, e) => {
    // Stop propagation to prevent opening the file dialog
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    // Revoke object URL to prevent memory leaks
    if (type === "images" && hotelInfo[type][index]) {
      URL.revokeObjectURL(hotelInfo[type][index]);
    }

    setHotelInfo((prevData) => ({
      ...prevData,
      [type]: prevData[type].filter((_, i) => i !== index),
    }));
  };

  const checkPasswordConditions = (password) => {
    return {
      hasUpperLower: /^(?=.*[a-z])(?=.*[A-Z])/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      isValidLength: password.length >= 6,
    };
  };

  const passwordConditions = checkPasswordConditions(personalInfo.Password);

  // Custom file input handler
  const handleFileInputClick = (inputId) => {
    document.getElementById(inputId).click();
  };

  // Handle form submission
  const handleRegister = async () => {
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData();

    // Add personal info
    Object.entries(personalInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Add hotel info
    Object.entries(hotelInfo).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, value);
      }
    });

    console.log("Submitting host registration data");
    console.log(`Request time: ${new Date().toISOString()}`);

    try {
      const response = await axios.post(
        `${API_URL}/owners/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Registration response:", response.data);
      setShowSuccess(true);
    } catch (error) {
      console.error("Registration error:", error.response);
      const errorMsg =
        error.response?.data?.message || "Could not connect to server";
      setErrorMessage(errorMsg);
      setShowFailed(true);
    } finally {
      setLoading(false);
    }
  };

  // Common input field style
  const inputFieldClass =
    "w-full h-10 px-3 py-2 text-sm bg-white rounded-lg border-2 border-gray-300 text-gray-500";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-[1100px] h-full max-h-screen">
        <div className="flex gap-4 h-full">
          {/* Left Column - Personal Information */}
          <div className="w-1/2 flex flex-col overflow-y-auto pr-2">
            <div className="flex flex-col gap-3 text-black">
              <h1 className="text-4xl font-medium text-primary mr-4 mb-2">
                <span className="text-accent">Homies</span>
                <span>Stay.</span>
              </h1>

              <div className="mb-2">
                <label className="block text-sm text-black mb-1">Họ và tên</label>
                <input
                  
                  name="FullName"
                  placeholder="VD : Nguyễn Văn A"
                  value={personalInfo.FullName}
                  onChange={handlePersonalInfoChange}
                  className={inputFieldClass}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-black mb-1">Email</label>
                <input
                  name="Email"
                  placeholder="VD : name@gmail.com"
                  value={personalInfo.Email}
                  onChange={handlePersonalInfoChange}
                  className={inputFieldClass}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-black mb-1">
                  Số điện thoại
                </label>
                <input
                  name="PhoneNumber"
                  placeholder="VD : 0123456789"
                  value={personalInfo.PhoneNumber}
                  onChange={handlePersonalInfoChange}
                  className={inputFieldClass}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-black mb-1">Địa chỉ</label>
                <input
                  name="HomeAddress"
                  placeholder="VD : Hà Nội"
                  value={personalInfo.HomeAddress}
                  onChange={handlePersonalInfoChange}
                  className={inputFieldClass}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-black mb-1">Số CCCD/CMT</label>
                <input
                  name="IdentityCard"
                  placeholder="VD : 000000000000"
                  value={personalInfo.IdentityCard}
                  onChange={handlePersonalInfoChange}
                  className={inputFieldClass}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-black mb-1">
                  Tên đăng nhập
                </label>
                <input
                  name="Username"
                  placeholder="VD : username"
                  value={personalInfo.Username}
                  onChange={handlePersonalInfoChange}
                  className={inputFieldClass}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-black mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    name="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="6+ kí tự"
                    value={personalInfo.Password}
                    onChange={handlePersonalInfoChange}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    className={`${inputFieldClass} pr-10`}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src="/src/assets/Register/eye-icon.png"
                      alt={showPassword ? "Hide password" : "Show password"}
                      className="w-4 h-4 object-contain"
                    />
                  </button>
                </div>

                {isPasswordFocused && (
                  <div className="mt-2 text-sm text-gray-700">
                    <div className="flex items-center">
                      <span
                        className={`w-4 h-4 mr-2 rounded-full flex items-center justify-center ${
                          passwordConditions.hasUpperLower
                            ? "bg-green-500 text-white"
                            : "bg-gray-300"
                        }`}
                      >
                        {passwordConditions.hasUpperLower && "✓"}
                      </span>
                      Có chữ cái in hoa và in thường
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`w-4 h-4 mr-2 rounded-full flex items-center justify-center ${
                          passwordConditions.hasNumber
                            ? "bg-green-500 text-white"
                            : "bg-gray-300"
                        }`}
                      >
                        {passwordConditions.hasNumber && "✓"}
                      </span>
                      Có số
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`w-4 h-4 mr-2 rounded-full flex items-center justify-center ${
                          passwordConditions.hasSpecialChar
                            ? "bg-green-500 text-white"
                            : "bg-gray-300"
                        }`}
                      >
                        {passwordConditions.hasSpecialChar && "✓"}
                      </span>
                      Có ký tự đặc biệt (ví dụ: !@#$%^&*)
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`w-4 h-4 mr-2 rounded-full flex items-center justify-center ${
                          passwordConditions.isValidLength
                            ? "bg-green-500 text-white"
                            : "bg-gray-300"
                        }`}
                      >
                        {passwordConditions.isValidLength && "✓"}
                      </span>
                      Có nhiều hơn 6 ký tự
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Hotel Information */}
          <div className="w-1/2 flex flex-col overflow-y-auto pr-2">
            <div className="flex flex-col gap-3 text-black mt-2">
              <h2 className="text-2xl font-medium text-center ml-2 mb-4">
                Đăng ký homestay
              </h2>

              <div className="mb-2">
                <label className="block text-sm text-black mb-1">
                  Tên homestay
                </label>
                <input
                  name="PlaceName"
                  placeholder="VD : Homestay A"
                  value={hotelInfo.PlaceName}
                  onChange={handleHotelInfoChange}
                  className={inputFieldClass}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-black mb-1">
                  Địa chỉ
                </label>
                <input
                  name="PlaceAddress"
                  placeholder="VD : 123 Đường ABC"
                  value={hotelInfo.PlaceAddress}
                  onChange={handleHotelInfoChange}
                  className={inputFieldClass}
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm text-black mb-1">Giá dự kiến</label>
                <input
                  name="PlacePrice"
                  placeholder="VD : 1000000"
                  value={hotelInfo.PlacePrice}
                  onChange={handleHotelInfoChange}
                  className={inputFieldClass}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-black mb-2">
                  Ảnh homestay
                </label>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    className="flex items-center justify-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => handleFileInputClick("imagesInput")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Chọn Ảnh
                  </button>

                  <input
                    id="imagesInput"
                    type="file"
                    name="PlaceImages"
                    accept="image/*"
                    multiple
                    onChange={handleHotelInfoChange}
                    className="hidden"
                  />

                  {hotelInfo.PlaceImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {hotelInfo.PlaceImages.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center p-2 bg-gray-100 rounded-lg"
                        >
                          <div className="w-10 h-10 mr-2 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="text-xs truncate">{file.name}</p>
                          </div>
                          <button
                            type="button"
                            className="ml-1 text-red-500 hover:text-red-700 focus:outline-none flex-shrink-0"
                            onClick={() =>
                              handleRemoveFile("PlaceImages", index, {
                                stopPropagation: () => {},
                              })
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* <div className="mb-4">
                <label className="block text-sm text-black mb-2">
                  Upload Documents
                </label>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    className="flex items-center justify-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => handleFileInputClick("documentsInput")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Select Documents
                  </button>

                  <input
                    id="documentsInput"
                    type="file"
                    name="documents"
                    accept=".pdf,.doc,.docx"
                    multiple
                    onChange={handleHotelInfoChange}
                    className="hidden"
                  />

                  {hotelInfo.documents.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {hotelInfo.documents.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center p-2 bg-gray-100 rounded-lg"
                        >
                          <div className="w-10 h-10 mr-2 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="text-xs truncate">{file.name}</p>
                          </div>
                          <button
                            type="button"
                            className="ml-1 text-red-500 hover:text-red-700 focus:outline-none flex-shrink-0"
                            onClick={() =>
                              handleRemoveFile("documents", index, {
                                stopPropagation: () => {},
                              })
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div> */}

              <div className="mb-2">
                <label className="block text-sm text-black mb-1">
                  Mô tả
                </label>
                <input
                  name="PlaceDescription"
                  placeholder="VD : Homestay đẹp, view biển"
                  value={hotelInfo.PlaceDescription}
                  onChange={handleHotelInfoChange}
                  className={inputFieldClass}
                />
              </div>

              <div className="flex flex-col items-center mt-4">
                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 h-10"
                >
                  {loading ? <Loader /> : "Đăng ký"}
                </button>
                
                <div
                  className="text-sm underline cursor-pointer mt-1"
                  onClick={goToLogin}
                >
                  Đăng nhập
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <HostRegisterSuccess
          onClose={() => {
            setShowSuccess(false);
            goToLogin();
          }}
        />
      )}

      {showFailed && (
        <HostRegisterFailed
          onClose={() => setShowFailed(false)}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

export default HostRegister;
