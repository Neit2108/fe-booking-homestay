// src/services/QRCodeService.js

/**
 * QR Code generation service
 * Provides methods to generate QR codes using Google Charts API (no external dependencies)
 */
const QRCodeService = {
  /**
   * Generate QR code URL using Google Charts API (no external dependencies required)
   * @param {string} data - The data to encode in the QR code
   * @param {number} size - The size of the QR code image in pixels (default: 200)
   * @param {string} errorCorrectionLevel - Error correction level: L, M, Q, H (default: H)
   * @returns {string} - URL to the QR code image
   */
  getGoogleQRCodeUrl: (data, size = 200, errorCorrectionLevel = 'H') => {
    if (!data) return null;
    return `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(data)}&chs=${size}x${size}&chld=${errorCorrectionLevel}|0`;
  },

  /**
   * Get appropriate URL for payment QR code
   * @param {object} paymentData - Payment data object from the API
   * @returns {string} - URL to display QR code
   */
  getPaymentQRCodeUrl: (paymentData) => {
    // Check if payment data has a QR code URL
    if (paymentData?.qrCodeUrl) {
      return paymentData.qrCodeUrl;
    }
    // Try QR code base64 if available
    else if (paymentData?.qrCodeBase64) {
      return `data:image/png;base64,${paymentData.qrCodeBase64}`;
    }
    // Fallback to payment URL
    else if (paymentData?.paymentUrl) {
      // Just return the Google Charts QR code URL
      return QRCodeService.getGoogleQRCodeUrl(paymentData.paymentUrl);
    }
    // No valid data available
    return null;
  },

  /**
   * Generate direct VNPay QR code URL
   * 
   * This function creates a QR code that encodes a slightly modified payment URL
   * to improve compatibility when scanning with mobile banking apps
   * 
   * @param {object} paymentData - The payment data from the API
   * @returns {string} QR code URL
   */
  getVNPayDirectQRCode: (paymentData) => {
    if (!paymentData || !paymentData.paymentUrl) {
      return null;
    }

    try {
      // Get the original payment URL
      const paymentUrl = paymentData.paymentUrl;
      
      // Create a QR code URL with Google Charts API
      return QRCodeService.getGoogleQRCodeUrl(paymentUrl);
    } catch (error) {
      console.error("Error generating VNPay QR code:", error);
      // Fallback to standard QR
      return QRCodeService.getGoogleQRCodeUrl(paymentData.paymentUrl);
    }
  }
};

export default QRCodeService;