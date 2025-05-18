import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import styles from "./Register.module.css";
import RegisterSuccess from "./RegisterSuccess";
import RegisterFailed from "./RegisterFailed";
import Loader from "../../components/Loading/Loader";
import { API_URL } from "../../../constant/config";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FullName: "",
    IdentityCard: "",
    Email: "",
    PhoneNumber: "",
    HomeAddress: "",
    Username: "",
    Password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // Theo dõi focus

  // Hàm kiểm tra điều kiện mật khẩu
  const checkPasswordConditions = (password) => {
    return {
      hasUpperLower: /^(?=.*[a-z])(?=.*[A-Z])/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      isValidLength: password.length >= 6,
    };
  };

  const passwordConditions = checkPasswordConditions(formData.Password); // Sửa từ personalInfo thành formData

  // Navigation function to go to login page
  const goToLogin = () => {
    console.log(
      `Navigation to login: ${new Date().toISOString()} by ${
        localStorage.getItem("username") || "Neit2108"
      }`
    );
    navigate("/login");
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gửi request API khi nhấn "Đăng ký"
  const handleRegister = async () => {
    console.log("Đã bấm");
    setLoading(true);
    setErrorMessage("");

    console.log("Dữ liệu gửi lên:", formData);
    console.log(
      `Request time: ${new Date().toISOString()} by ${
        localStorage.getItem("username") || "Neit2108"
      }`
    );

    try {
      const response = await axios.post(
        `${API_URL}/Account/Auth/Register`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setShowSuccess(true);
    } catch (error) {
      console.log(error.response);
      const errorMsg =
        error.response?.data?.message || "Không thể kết nối đến server";
      setErrorMessage(errorMsg);
      setShowFailed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      {/* Left Panel (Image Background) */}
      <div className={styles.leftSide}>
        <Card className={styles.logoCard}>
          <h1 className={styles.logoText}>
            <span className={styles.logoBlue}>Homies</span>
            <span className={styles.logoDark}>Stay.</span>
          </h1>
        </Card>
      </div>

      {/* Right Panel (Form) */}
      <div className={styles.rightSide}>
        <h2 className={styles.registerTitle}>Đăng ký tài khoản</h2>

        <div className={styles.formContainer}>
          <Input
            label="Họ và tên"
            name="FullName"
            placeholder="VD : Nguyễn Văn A"
            value={formData.FullName}
            onChange={handleChange}
            className={styles.inputField}
          />
          <Input
            label="Căn cước công dân"
            name="IdentityCard"
            placeholder="VD : 012345678901"
            value={formData.IdentityCard}
            onChange={handleChange}
            className={styles.inputField}
          />
          <Input
            label="E-mail"
            name="Email"
            placeholder="VD : name@gmail.com"
            value={formData.Email}
            onChange={handleChange}
            className={styles.inputField}
          />
          <Input
            label="Số điện thoại"
            name="PhoneNumber"
            placeholder="VD : 0912345678"
            value={formData.PhoneNumber}
            onChange={handleChange}
            className={styles.inputField}
          />
          <Input
            label="Địa chỉ"
            name="HomeAddress"
            placeholder="VD : Hà Nội"
            value={formData.HomeAddress}
            onChange={handleChange}
            className={styles.inputField}
          />
          <Input
            label="Tên đăng nhập"
            name="Username"
            placeholder="VD : nva.123"
            value={formData.Username}
            onChange={handleChange}
            className={styles.inputField}
          />
          <div className="relative">
            <Input
              label="Mật khẩu"
              name="Password"
              placeholder="******"
              type={showPassword ? "text" : "password"}
              value={formData.Password}
              onChange={handleChange}
              onFocus={() => setIsPasswordFocused(true)} 
              onBlur={() => setIsPasswordFocused(false)} 
              className={styles.inputField}
            />
          
            {/* Hiển thị điều kiện khi focus */}
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
                  Có 6 ký tự trở lên
                </div>
              </div>
            )}
          </div>
        </div>

        <p className={styles.termsText}>
          Bằng cách đăng ký, bạn đồng ý với{" "}
          <a href="#" className={styles.link}>
            các điều khoản và điều kiện
          </a>{" "}
          tại HomiesStay.
        </p>

        <Button
          onClick={handleRegister}
          disabled={loading}
          className={styles.registerButton}
          data-testid='register-button'
        >
          {loading ? <Loader /> : "Đăng ký"}
        </Button>

        {errorMessage && !showFailed && (
          <p className={styles.errorMessage} data-testid="register-error">{errorMessage}</p>
        )}

        <p className={styles.loginText}>
          Bạn đã có tài khoản?{" "}
          <a
            href="#"
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
              goToLogin();
            }}
          >
            Đăng nhập
          </a>
        </p>
      </div>

      {showSuccess && (
        <RegisterSuccess
          onClose={() => {
            setShowSuccess(false);
            goToLogin();
          }}
          data-testid='register-success-modal'
        />
      )}

      {showFailed && (
        <RegisterFailed
          onClose={() => setShowFailed(false)}
          errorMessage={errorMessage}
          data-testid='register-error-modal'
        />
      )}
    </div>
  );
};

export default Register;
