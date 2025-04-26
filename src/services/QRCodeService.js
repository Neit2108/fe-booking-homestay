// src/services/QRCodeService.js

/**
 * QR Code generation service
 * Provides multiple methods to generate QR codes depending on available options
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
   * Generate a QR code base64 data URI using a canvas-based solution
   * This is a fallback method when no QR code library is available
   * @param {string} data - The data to encode in the QR code
   * @returns {Promise<string>} - Base64 data URI of the QR code
   */
  generateQRCodeDataUri: async (data) => {
    // Try to import QRCode.js dynamically if it's available
    try {
      const QRCode = await import('qrcode');
      return await QRCode.toDataURL(data, {
        width: 200,
        margin: 1,
        errorCorrectionLevel: 'H'
      });
    } catch (error) {
      // Fallback to Google Charts API if QRCode.js is not available
      console.warn('QRCode library not available, using Google Charts API fallback');
      return QRCodeService.getGoogleQRCodeUrl(data);
    }
  },

  /**
   * Creates a QR code SVG string
   * @param {string} data - The data to encode in the QR code
   * @returns {string} - SVG string representation of the QR code
   */
  generateSVGString: (data) => {
    // Return a simple SVG string with a link to Google Charts API
    // This acts as a placeholder until a better SVG generator is implemented
    const googleUrl = QRCodeService.getGoogleQRCodeUrl(data);
    return `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <image href="${googleUrl}" width="200" height="200"/>
    </svg>`;
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
    // Fallback to payment URL
    else if (paymentData?.paymentUrl) {
      return QRCodeService.getGoogleQRCodeUrl(paymentData.paymentUrl);
    }
    // No valid data available
    return null;
  }
};

export default QRCodeService;