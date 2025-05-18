import { useContext, useEffect, useState } from "react";
import Modal from "../Modal/Modal"; // đảm bảo import đúng đường dẫn modal
import { API_URL } from "../../../constant/config";
import { formatDate } from "../../Utils/DateUtils";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import TwoFAModal from "../Modal/TwoFAModal";

const PasswordCriteriaItem = ({ isMet, text }) => (
  <div
    className={`flex items-center ${
      isMet ? "text-green-600" : "text-gray-400"
    }`}
  >
    {isMet ? (
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    ) : (
      <span className="w-4 h-4 border border-gray-400 rounded-full mr-2"></span>
    )}
    {text}
  </div>
);

function SecuritySettings() {
  const { user, loading: userLoading } = useContext(UserContext);
  const token = user?.token;
  const userId = user.id;


  const [showModalChangePassword, setShowModalChangePassword] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Thêm state cho error message

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timeChangePassword, setTimeChangePassword] = useState(null);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPasswordCriteria, setShowNewPasswordCriteria] = useState(false);
  const [showConfirmPasswordCriteria, setShowConfirmPasswordCriteria] =
    useState(false);

  const [openTwoFactor, setOpenTwoFactor] = useState(false);
  const [otp2FA, setOtp2FA] = useState("");
  const [show2FAModal, setShow2FAModal] = useState(false);

  const [isLoading2FA, setIsLoading2FA] = useState(false);
  const [enable2FAError, setEnable2FAError] = useState("");

  useEffect(() => {
    if (userLoading) {
      console.log("User loading...");
      return;
    }
    console.log("User twoFactor:", user.twoFactor);
    if (user && typeof user.twoFactor === "boolean") {
      setOpenTwoFactor(user.twoFactor);
    }
    console.log("Time ",user.passwordChangeAt)
    if (user && user.passwordChangeAt) {
      const date = formatDate(user.passwordChangeAt);
      setTimeChangePassword(date);
    }
  }, [user]);

  const handleTwoFactorToggle = async (e) => {
    e.preventDefault();

    if (openTwoFactor) {
      setIsLoading2FA(true);
      try {
        await axios.post(
          `${API_URL}/account/auth/disable-2fa`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setOpenTwoFactor(false);
        setOtp2FA("");
      } catch (error) {
        alert("Tắt xác thực 2 lớp thất bại!");
      } finally {
        setIsLoading2FA(false);
      }
      return;
    }

    setIsLoading2FA(true);
    try {
      await axios.post(
        `${API_URL}/account/auth/send-2fa-otp`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setShow2FAModal(true);
    } catch (error) {
      alert("Không gửi được mã xác thực. Vui lòng thử lại sau.");
    } finally {
      setIsLoading2FA(false);
    }
  };

  const handleEnable2FAConfirm = async () => {
    if (!otp2FA) {
      setEnable2FAError("Vui lòng nhập mã xác thực.");
      return;
    }
    setIsLoading2FA(true);
    try {
      await axios.post(
        `${API_URL}/account/auth/enable-2fa`,
        { token: otp2FA },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setOpenTwoFactor(true);
      setShow2FAModal(false);
      setOtp2FA("");
      setEnable2FAError("");
    } catch (error) {
      setEnable2FAError("Mã xác thực không đúng hoặc đã hết hạn.");
    } finally {
      setIsLoading2FA(false);
    }
  };

  const checkPasswordCriteria = (password, criterion) => {
    switch (criterion) {
      case "containsLetter":
        return /[a-z]/.test(password) && /[A-Z]/.test(password);
      case "containsNumber":
        return /[0-9]/.test(password);
      case "containsSpecial":
        return /[!@#$%^&*]/.test(password);
      case "minLength":
        return password.length >= 6;
      case "oldMatchNew":
        return !(password === oldPassword);
      default:
        return false;
    }
  };

  const checkPasswordMatch = (newPassword, confirmPassword) => {
    return newPassword === confirmPassword && newPassword.length > 0;
  };

  // Kiểm tra xem có nên disable nút xác nhận không
  const isConfirmButtonDisabled = () => {
    // Kiểm tra mật khẩu mới và xác nhận mật khẩu mới có giống nhau không
    return !checkPasswordMatch(newPassword, confirmPassword);
  };

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/account/auth/change-password`,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setShowModalChangePassword(false);
        setShowModalSuccess(true);
      } else {
        setErrorMessage(
          response.data.message ||
            "Đổi mật khẩu không thành công. Vui lòng kiểm tra lại."
        );
        setShowModalChangePassword(false);
        setShowModalError(true);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      // Lấy message lỗi từ response
      const errorMsg =
        error.response?.data?.message ||
        "Đổi mật khẩu không thành công. Vui lòng kiểm tra lại.";
      setErrorMessage(errorMsg);
      setShowModalChangePassword(false);
      setShowModalError(true);
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-primary mb-4">Bảo mật</h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Mật khẩu</h3>
        <div className="flex items-center justify-between">
          <div>
            {timeChangePassword != null ? (
              <p className="text-gray-700">
                Thay đổi lần cuối : {timeChangePassword}
              </p>
            ) : (
              <p className="text-gray-700">Chưa thay đổi mật khẩu</p>
            )}
            <p className="text-sm text-gray-500">
              Hãy đảm bảo mật khẩu của bạn đủ mạnh và không chia sẻ với bất kỳ
              ai.
            </p>
          </div>
          <button
            onClick={() => setShowModalChangePassword(true)}
            className="px-4 py-2 border border-accent text-accent rounded-md hover:bg-blue-50 transition-colors duration-200"
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Xác thực 2 lớp</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700">
              Trạng thái:
              {openTwoFactor ? (
                <span className="text-green-500">Đang bật</span>
              ) : (
                <span className="text-red-500">Chưa bật</span>
              )}
            </p>
            <p className="text-sm text-gray-500">
              Bảo vệ tài khoản bằng cách yêu cầu mã xác thực mỗi khi đănh nhập.
            </p>
          </div>
          <button
            className="px-4 py-2 bg-accent text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            onClick={handleTwoFactorToggle}
            disabled={isLoading2FA}
          >
            {openTwoFactor ? "Tắt" : "Bật"}
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Phiên đăng nhập</h3>
        <div className="border rounded-md p-4 mb-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Hiện tại</p>
              <p className="text-sm text-gray-500">
                Chrome trên Windows.
              </p>
              <p className="text-xs text-gray-400">
                Đăng nhập : Hôm nay {formatDate(new Date())}
              </p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Hoạt động
            </span>
          </div>
        </div>
      </div>

      {/* Modal nhập mật khẩu mới */}
      {showModalChangePassword && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-opacity-50 z-50">
          <div className="bg-white border rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Đổi mật khẩu</h2>
            <div className="space-y-4">
              {/* Mật khẩu cũ */}
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Mật khẩu cũ"
                  className="w-full p-2 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {/* icon con mắt */}
                  {showOldPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a12.057 12.057 0 014-5.5M6.75 6.75l10.5 10.5M9.878 9.879a3 3 0 104.243 4.243"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Mật khẩu mới */}
              <div>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Mật khẩu mới"
                    className="w-full p-2 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onFocus={() => setShowNewPasswordCriteria(true)}
                    onBlur={() => setShowNewPasswordCriteria(false)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a12.057 12.057 0 014-5.5M6.75 6.75l10.5 10.5M9.878 9.879a3 3 0 104.243 4.243"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {showNewPasswordCriteria && (
                  <div className="mt-2 text-sm text-gray-600 space-y-1">
                    <PasswordCriteriaItem
                      isMet={checkPasswordCriteria(
                        newPassword,
                        "containsLetter"
                      )}
                      text="Có chữ cái in hoa và thường"
                    />
                    <PasswordCriteriaItem
                      isMet={checkPasswordCriteria(
                        newPassword,
                        "containsNumber"
                      )}
                      text="Có số"
                    />
                    <PasswordCriteriaItem
                      isMet={checkPasswordCriteria(
                        newPassword,
                        "containsSpecial"
                      )}
                      text="Có ký tự đặc biệt (!@#$...)"
                    />
                    <PasswordCriteriaItem
                      isMet={checkPasswordCriteria(newPassword, "minLength")}
                      text="Tối thiểu 6 ký tự"
                    />
                    <PasswordCriteriaItem
                      isMet={checkPasswordCriteria(newPassword, "oldMatchNew")}
                      text="Mật khẩu mới không trùng với mật khẩu cũ"
                    />
                  </div>
                )}
              </div>

              {/* Xác nhận mật khẩu */}
              <div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Xác nhận mật khẩu mới"
                    className="w-full p-2 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setShowConfirmPasswordCriteria(true)}
                    onBlur={() => setShowConfirmPasswordCriteria(false)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5a12.057 12.057 0 014-5.5M6.75 6.75l10.5 10.5M9.878 9.879a3 3 0 104.243 4.243"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {showConfirmPasswordCriteria && (
                  <div className="mt-2 text-sm text-gray-600 space-y-1">
                    <PasswordCriteriaItem
                      isMet={checkPasswordMatch(newPassword, confirmPassword)}
                      text="Trùng khớp với mật khẩu mới"
                    />
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  onClick={() => setShowModalChangePassword(false)}
                >
                  Huỷ
                </button>
                <button
                  className={`px-4 py-2 ${
                    isConfirmButtonDisabled()
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white rounded`}
                  onClick={handleChangePassword}
                  disabled={isConfirmButtonDisabled()}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal thành công */}
      {showModalSuccess && (
        <Modal
          isOpen={showModalSuccess}
          onClose={reloadPage}
          onContinue={reloadPage}
          title="Thành công"
          message="Mật khẩu đã được thay đổi thành công."
          status="success"
          confirmText="Tiếp tục"
        />
      )}

      {/* Modal thất bại */}
      {showModalError && (
        <Modal
          isOpen={showModalError}
          onClose={reloadPage}
          onContinue={reloadPage}
          title="Thất bại"
          message={errorMessage}
          status="error"
          confirmText="Đóng"
        />
      )}

      <TwoFAModal
        isOpen={show2FAModal}
        onClose={() => {
          setShow2FAModal(false);
          setOtp2FA("");
          setEnable2FAError("");
        }}
        otp={otp2FA}
        setOtp={setOtp2FA}
        onSubmit={handleEnable2FAConfirm}
        error={enable2FAError}
        isLoading={isLoading2FA}
      />
    </div>
  );
}

export default SecuritySettings;
