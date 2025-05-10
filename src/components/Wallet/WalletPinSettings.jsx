import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_URL } from "../../../constant/config";
import { UserContext } from "../../context/UserContext";

/**
 * Component for managing wallet PIN settings
 *
 * @param {Object} props
 * @param {string} props.className - Additional CSS classes
 */
const WalletPinSettings = ({ className = "" }) => {
  const [hasPin, setHasPin] = useState(false);
  const [isSettingPin, setIsSettingPin] = useState(false);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [currentPin, setCurrentPin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const isWeakPin = (pin) => {
    if (!/^\d{6}$/.test(pin)) return true;

    // Kiểm tra 6 số giống nhau
    if (/^(\d)\1{5}$/.test(pin)) return true;

    // Kiểm tra tăng dần (vd: 123456)
    if ("0123456789".includes(pin)) return true;

    // Kiểm tra giảm dần (vd: 987654)
    if ("9876543210".includes(pin)) return true;

    // Kiểm tra chuỗi tăng hoặc giảm bất kỳ
    const isSequential = (pin) => {
      const inc = [...pin].every(
        (digit, i, arr) => i === 0 || +digit === +arr[i - 1] + 1
      );
      const dec = [...pin].every(
        (digit, i, arr) => i === 0 || +digit === +arr[i - 1] - 1
      );
      return inc || dec;
    };

    if (isSequential(pin)) return true;

    return false;
  };

  // Check if user has already set a PIN
  useEffect(() => {
    const checkPin = async () => {
      try {
        if (!user.token || user) return;

        const response = await axios.get(`${API_URL}/wallet/has-pin`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setHasPin(response.data.hasPin);
      } catch (err) {
        console.error("Error checking PIN status:", err);
      }
    };

    checkPin();
  }, []);

  // Handle PIN submission
  const handleSubmitPin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate PIN
    if (pin.length !== 6 || !/^\d+$/.test(pin)) {
      setError("PIN phải có 6 chữ số");
      return;
    }

    if (isWeakPin(pin)) {
      setError("Mã PIN quá dễ đoán. Vui lòng chọn mã khác.");
      return;
    }

    // For new PIN, verify that confirmation matches
    if (!hasPin && pin !== confirmPin) {
      setError("Xác nhận PIN không khớp");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const response = await axios.post(
        `${API_URL}/wallet/set-pin`,
        { pin },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Đã thiết lập mã PIN thành công");
      setHasPin(true);
      setIsSettingPin(false);
      setPin("");
      setConfirmPin("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Không thể thiết lập mã PIN. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  // Toggle PIN setting mode
  const togglePinSetting = () => {
    setIsSettingPin(!isSettingPin);
    setError("");
    setSuccess("");
    setPin("");
    setConfirmPin("");
    setCurrentPin("");
  };

  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-primary mb-4">Bảo mật ví</h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {!isSettingPin ? (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Mã PIN ví tiền</h3>
              <p className="text-sm text-gray-600">
                {hasPin
                  ? "Mã PIN được sử dụng để xác thực các giao dịch từ ví của bạn"
                  : "Thiết lập mã PIN để bảo vệ các giao dịch từ ví của bạn"}
              </p>
            </div>
          </div>

          <button
            onClick={togglePinSetting}
            className="px-4 py-2 bg-accent hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            {hasPin ? "Thay đổi mã PIN" : "Thiết lập mã PIN"}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmitPin} className="space-y-4">
          {hasPin && (
            <div>
              <label
                htmlFor="currentPin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mã PIN hiện tại
              </label>
              <input
                type="password"
                id="currentPin"
                inputMode="numeric"
                maxLength={6}
                value={currentPin}
                onChange={(e) =>
                  setCurrentPin(
                    e.target.value.replace(/\D/g, "").substring(0, 6)
                  )
                }
                placeholder="Nhập mã PIN hiện tại"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                required
              />
            </div>
          )}

          <div>
            <label
              htmlFor="pin"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {hasPin ? "Mã PIN mới" : "Mã PIN"} (6 chữ số)
            </label>
            <input
              type="password"
              id="pin"
              inputMode="numeric"
              maxLength={6}
              value={pin}
              onChange={(e) =>
                setPin(e.target.value.replace(/\D/g, "").substring(0, 6))
              }
              placeholder="Nhập mã PIN 6 chữ số"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>

          {!hasPin && (
            <div>
              <label
                htmlFor="confirmPin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Xác nhận mã PIN
              </label>
              <input
                type="password"
                id="confirmPin"
                inputMode="numeric"
                maxLength={6}
                value={confirmPin}
                onChange={(e) =>
                  setConfirmPin(
                    e.target.value.replace(/\D/g, "").substring(0, 6)
                  )
                }
                placeholder="Nhập lại mã PIN"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                required
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-accent hover:bg-blue-700 text-white rounded-md transition-colors disabled:bg-blue-300"
            >
              {loading
                ? "Đang xử lý..."
                : hasPin
                ? "Cập nhật mã PIN"
                : "Thiết lập mã PIN"}
            </button>

            <button
              type="button"
              onClick={togglePinSetting}
              className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              Hủy
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 text-sm text-gray-600">
        <div className="flex items-center gap-2 text-yellow-600">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-medium">Lưu ý về bảo mật</span>
        </div>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>
            PIN của bạn chỉ được sử dụng cho các giao dịch từ ví HomiesStay
          </li>
          <li>Không chia sẻ mã PIN với bất kỳ ai, kể cả nhân viên hỗ trợ</li>
          <li>Hệ thống không lưu trữ mã PIN gốc của bạn</li>
          <li>Nên sử dụng mã PIN khác với mật khẩu đăng nhập của bạn</li>
        </ul>
      </div>
    </div>
  );
};

export default WalletPinSettings;
