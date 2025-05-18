import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import styles from "./Login.module.css";
import { UserContext } from "../../context/UserContext";
import Modal from "../../components/Modal/Modal";
import ForgotPasswordModal from "../../components/Modal/ForgotPasswordModal";
import { API_URL } from "../../../constant/config";
import TwoFAModal from "../../components/Modal/TwoFAModal";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFAUserId, setTwoFAUserId] = useState("");
  const [twoFAOtp, setTwoFAOtp] = useState("");
  const [twoFAError, setTwoFAError] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const goToRegister = () => {
    console.log(
      `Navigation to register: ${new Date().toISOString()} by Neit2108`
    );
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
    if (!formData.emailOrUsername || !formData.password) {
      setIsLoginFailed(true);
      setErrorMessage("Vui lòng nhập đầy đủ email/tên đăng nhập và mật khẩu.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/account/auth/login`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.requiresTwoFactor) {
        setShow2FAModal(true);
        setTwoFAUserId(response.data.userId);
        setTwoFAOtp("");
        setTwoFAError("");
        setIsLoading(false);
        return;
      }

      // Bình thường như cũ
      if (response.data.token) {
        const userData = {
          token: response.data.token,
          fullName: response.data.fullName,
          avatarUrl: response.data.avatarUrl,
        };

        await login(userData);
        navigate("/");
      } else {
        setIsLoginFailed(true);
        setErrorMessage("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      setIsLoginFailed(true);
      setErrorMessage(
        error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại."
      );
      console.log("Login error:", error.response);
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FALogin = async () => {
    if (!twoFAOtp) {
      setTwoFAError("Vui lòng nhập mã xác thực.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/account/auth/login-2fa`, {
        userId: twoFAUserId,
        otp: twoFAOtp,
      });
      if (res.data.token) {
        await login({
          token: res.data.token,
          fullName: res.data.fullName,
          avatarUrl: res.data.avatarUrl,
        });
        setShow2FAModal(false);
        navigate("/");
      } else {
        setTwoFAError("Mã xác thực không đúng hoặc hết hạn.");
      }
    } catch (error) {
      setTwoFAError(
        error.response?.data?.message ||
          "Mã xác thực không đúng hoặc đã hết hạn."
      );
    } finally {
      setIsLoading(false);
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
            data-testid="email-input"
            label="Tên đăng nhập"
            name="emailOrUsername"
            placeholder="Email hoặc tên đăng nhập"
            value={formData.emailOrUsername}
            onChange={handleChange}
            className={styles.inputField}
            disabled={isLoading}
          />

          <Input
            data-testid="password-input"
            label="Mật khẩu"
            name="password"
            placeholder="******"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.inputField}
            disabled={isLoading}
          />
        </div>

        <div style={{ textAlign: "right", marginTop: 8 }}>
          <a
            href="#"
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
              setForgotModalOpen(true);
            }}
          >
            Quên mật khẩu?
          </a>
        </div>

        <p className={styles.termsText}>
          Bằng cách đăng nhập, bạn đồng ý với{" "}
          <a href="#" className={styles.link}>
            các điều khoản và điều kiện
          </a>{" "}
          tại HomiesStay.
        </p>

        <Button
          onClick={handleLogin}
          className={styles.loginButton}
          data-testid="login-button"
          disabled={isLoading}
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
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

      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
      />

      <Modal
        isOpen={isLoginFailed}
        onClose={() => {
          setIsLoginFailed(false);
          setErrorMessage("");
        }}
        status="error"
        title="Đăng nhập thất bại"
        message={
          errorMessage ||
          "Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại."
        }
        confirmText="Đóng"
        data-testid="login-error-modal"
      />

      <TwoFAModal
        isOpen={show2FAModal}
        onClose={() => {
          setShow2FAModal(false);
          setTwoFAOtp("");
          setTwoFAError("");
        }}
        otp={twoFAOtp}
        setOtp={setTwoFAOtp}
        onSubmit={handle2FALogin}
        error={twoFAError}
        isLoading={isLoading}
      />

    </div>
  );
};

export default Login;
