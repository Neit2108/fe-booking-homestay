import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link and useNavigate
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import styles from "./Register.module.css";
import RegisterSuccess from "./RegisterSuccess";
import RegisterFailed from "./RegisterFailed";
import Loader from "../../components/Loading/Loader";

const Register = () => {
  const navigate = useNavigate(); // Add useNavigate hook
  
  const [formData, setFormData] = useState({
    FullName: "",
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

  // Navigation function to go to login page
  const goToLogin = () => {
    console.log(`Navigation to login: ${new Date().toISOString()} by ${localStorage.getItem('username') || 'Neit2108'}`);
    navigate('/login');
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
    setLoading(true);
    setErrorMessage("");

    console.log("Dữ liệu gửi lên:", formData);
    console.log(`Request time: ${new Date().toISOString()} by ${localStorage.getItem('username') || 'Neit2108'}`);

    try {
      const response = await axios.post("https://localhost:7284/Account/Auth/Register", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setShowSuccess(true);
    } catch (error) {
      console.log(error.response);
      // const errorMsg = error.response?.data?.message || "Không thể kết nối đến server";
      // setErrorMessage(errorMsg);
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
        <h2 className={styles.registerTitle}>
          Đăng ký tài khoản
        </h2>

        <div className={styles.formContainer}>
          {/* Form fields remain the same */}
          <Input
            label="Họ và tên"
            name="FullName"
            placeholder="VD : Nguyễn Văn A"
            value={formData.FullName}
            onChange={handleChange}
            className={styles.inputField}
          />
          {/* ... other input fields ... */}
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
          <Input
            label="Mật khẩu"
            name="Password"
            placeholder="******"
            type="password"
            value={formData.Password}
            onChange={handleChange}
            className={styles.inputField}
          />
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
        >
          {loading ? <Loader /> : "Đăng ký"}
        </Button>

        {errorMessage && !showFailed && <p className={styles.errorMessage}>{errorMessage}</p>}

        <p className={styles.loginText}>
          Bạn đã có tài khoản?{" "}
          {/* Updated the login link with onClick handler */}
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
            goToLogin(); // Navigate to login after successful registration
          }} 
        />
      )}
      
      {showFailed && <RegisterFailed onClose={() => setShowFailed(false)} errorMessage={errorMessage} />}
    </div>
  );
};

export default Register;