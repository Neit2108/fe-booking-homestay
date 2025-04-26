// src/services/QRCodeService.js
import axios from 'axios';

const QRCodeService = {
  // Tạo QR code từ URL (sử dụng API QR Code Generator)
  generateQRCode: async (text, size = 200) => {
    try {
      // Sử dụng QR Code Generator API (nếu bạn muốn thay đổi API, hãy cập nhật URL này)
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
      
      return qrCodeUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw error;
    }
  },
  
  // Hàm khác để xử lý QR code nếu cần
};

export default QRCodeService;