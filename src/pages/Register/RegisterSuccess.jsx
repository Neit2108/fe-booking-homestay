import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./RegisterSuccess.module.css";

const RegisterSuccess = ({ onClose }) => {
  const navigate = useNavigate();
  
  const handleClose = () => {
    console.log(`Navigation to login from success modal: 2025-03-24 10:13:25 by Neit2108`);
    
    // Call the original onClose function first (to close the modal)
    if (onClose) onClose();
    
    // Then navigate to login page
    navigate('/login');
  };

  return (
    <div className={styles.overlay}>
      {/* Background overlay with image */}
      <div
        className={styles.backgroundLayer}
        style={{
          backgroundImage: "url('/src/assets/Register/success.png')",
        }}
      ></div>

      {/* Modal content */}
      <div className={styles.modalContent}>
        <h2 className={styles.brand}>
          <span className={styles.brandBlue}>Homies</span>
          <span className={styles.brandDark}>Stay.</span>
        </h2>
        
        <img
          src="src/assets/Register/check_circle.png"
          alt="Success"
          className={styles.successIcon}
        />

        <h3 className={styles.successTitle}>
          Tài khoản đã tạo thành công!
        </h3>
        <p className={styles.successMessage}>Vui lòng kiểm tra email</p>

        <Button
          onClick={handleClose}
          className={styles.closeButton}
        >
          Đăng nhập ngay
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;