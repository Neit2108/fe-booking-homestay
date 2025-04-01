import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import styles from "./Login.module.css";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({
    EmailorUsername: "",
    Password: "",
  });

  const navigate = useNavigate();
  const {login} = useContext(UserContext);
  
  const goToRegister = () => {
    console.log(`Navigation to register: 2025-03-24 10:10:47 by Neit2108`);
    navigate("/register");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    console.log("Dữ liệu gửi lên:", formData);
  
    try {
      const response = await axios.post(
        "https://localhost:7284/Account/Auth/Login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.data.token) {
        const userData = {
          token: response.data.token,
          fullName: response.data.fullName,
          avatarUrl: response.data.avatarUrl,
        };
  
        await login(userData); // Đợi login() hoàn thành
  
        console.log("Đăng nhập thành công, đang chuyển hướng...");
  
        setTimeout(() => {
          navigate("/");
        }, 300);
      } else {
        alert("Đăng nhập thất bại hihih");
      }
    } catch (error) {
      alert("Đăng nhập thất bại");
      console.log(error.response);
    }
  };
  

  return (
    <div className={styles.loginContainer}>
      {/* Left Side - Background Image & Logo */}
      <div className={styles.leftSide}>
        <Card className={styles.logoCard}>
          <h1 className={styles.logoText}>
            <span className={styles.logoBlue}>Homies</span>
            <span className={styles.logoDark}>Stay.</span>
          </h1>
        </Card>
      </div>

      {/* Right Side - Login Form */}
      <div className={styles.rightSide}>
        <h2 className={styles.loginTitle}>Đăng nhập</h2>

        <div className={styles.formContainer}>
          <Input
            label="Tên đăng nhập"
            name="EmailorUsername"
            placeholder="Email hoặc tên đăng nhập"
            value={formData.EmailorUsername}
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
          Bằng cách đăng nhập, bạn đồng ý với{" "}
          <a href="#" className={styles.link}>
            các điều khoản và điều kiện
          </a>{" "}
          tại HomiesStay.
        </p>

        <Button onClick={handleLogin} className={styles.loginButton}>
          Đăng nhập
        </Button>

        <p className={styles.signupText}>
          Bạn chưa có tài khoản?{" "}
          <a
            href="#"
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
              goToRegister();
            }}
          >
            Đăng ký tài khoản
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
