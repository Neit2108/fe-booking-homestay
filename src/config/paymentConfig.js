// src/config/paymentConfig.js

/**
 * Cấu hình thanh toán qua chuyển khoản ngân hàng
 */
export const bankTransferConfig = {
    // Thông tin ngân hàng (thay đổi theo thông tin thực tế của bạn)
    bankName: "MB Bank",           // Tên ngân hàng
    bankId: "970422",              // Mã ngân hàng theo chuẩn Napas
    accountNumber: "0123456789",   // Số tài khoản
    accountName: "HOMIES STAY",    // Tên tài khoản (chủ tài khoản)
    
    // Định dạng nội dung chuyển khoản
    contentTemplate: "Thanh toan dat phong #{{bookingId}}"
  };
  
  /**
   * Các hằng số liên quan đến thanh toán
   */
  export const paymentConstants = {
    // Thời gian hiệu lực của mã QR (phút)
    qrExpireMinutes: 15,
    
    // Loại thanh toán
    paymentTypes: {
      BANK_TRANSFER: "bank_transfer",
      CREDIT_CARD: "credit_card",
      AT_RECEPTION: "paypal"
    }
  };
  
  export default {
    bankTransferConfig,
    paymentConstants
  };