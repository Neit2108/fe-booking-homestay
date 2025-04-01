import React from "react";
import Button from "../../components/Button/Button";
import styles from "./RegisterFailed.module.css";

const RegisterFailed = ({ onClose, errorMessage }) => {
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
          src="/src/assets/Register/error_circle.png" 
          alt="Error"
          className={styles.errorIcon}
        />

        <h3 className={styles.errorTitle}>
          Đăng ký tài khoản thất bại!
        </h3>
        <p className={styles.errorMessage}>
          {errorMessage || "Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại."}
        </p>

        <div className={styles.buttonGroup}>
          <Button
            onClick={onClose}
            className={styles.retryButton}
          >
            Thử lại
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterFailed;