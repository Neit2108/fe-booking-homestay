// src/utils/VietQRUtils.js

/**
 * Tạo chuỗi dữ liệu cho QR code theo chuẩn Napas VietQR
 * Tham khảo: https://vietqr.io/portal/en/developer
 * 
 * @param {string} bankId Mã ngân hàng (mã BIN)
 * @param {string} accountNo Số tài khoản
 * @param {number} amount Số tiền (không bắt buộc)
 * @param {string} description Nội dung chuyển khoản (không bắt buộc)
 * @returns {string} Chuỗi dữ liệu QR
 */
export function generateVietQRContent(bankId, accountNo, amount = null, description = null) {
    // Bỏ khoảng trắng và ký tự đặc biệt từ accountNo
    accountNo = accountNo.replace(/\s+/g, '');
    
    // Tạo định dạng cơ bản
    // Tham khảo: https://vietqr.io/portal/en/specification/general
    let content = '';
    
    // Cách 1: Sử dụng tiêu chuẩn VietQR thuần túy
    content = `${bankId}|${accountNo}`;
    
    // Thêm số tiền nếu có
    if (amount && amount > 0) {
      content += `|${amount}`;
    }
    
    // Thêm nội dung nếu có
    if (description) {
      content = content + (amount ? '' : '|') + `|${description}`;
    }
    
    // Thêm tiền tố
    return `vietqr_${content.replace(/\s+/g, '_')}`;
  }
  
  /**
   * Tạo chuỗi URL cho VietQR
   * 
   * @param {string} bankId Mã ngân hàng (mã BIN)
   * @param {string} accountNo Số tài khoản
   * @param {number} amount Số tiền (không bắt buộc)
   * @param {string} description Nội dung chuyển khoản (không bắt buộc)
   * @returns {string} URL cho VietQR
   */
  export function generateVietQRUrl(bankId, accountNo, amount = null, description = null) {
    // Tạo URL cho VietQR
    let url = `https://img.vietqr.io/image/${bankId}-${accountNo}`;
    
    if (amount) {
      url += `-${amount}`;
    }
    
    if (description) {
      url += `-${encodeURIComponent(description)}`;
    }
    
    return url;
  }
  
  export default {
    generateVietQRContent,
    generateVietQRUrl
  };