import React from "react";

// Bạn nên encodeURIComponent nội dung chuyển khoản để tránh lỗi URL
function buildVietQRUrl(bankCode, accountNumber, amount, addInfo) {
  return `https://img.vietqr.io/image/${bankCode}-${accountNumber}-basic.png?amount=${amount}&addInfo=${encodeURIComponent(addInfo)}`;
}

const BankTransferQR = ({ totalPrice, paymentId }) => {
  const bankCode = "mb"; // đổi thành mã ngân hàng bạn muốn (MB: mb, TCB: tcb, ACB: acb, BIDV: bidv,...)
  const accountNumber = "0962004713"; // đổi thành số tài khoản nhận
  const addInfo = `Thanh toan don hang #${paymentId}`;
  const qrUrl = buildVietQRUrl(bankCode, accountNumber, totalPrice, addInfo);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-base text-primary font-semibold">Chuyển khoản - Mã QR</div>
      <div className="flex flex-col items-center border border-gray-200 rounded-lg p-4 bg-white">
        <img
          src={qrUrl}
          alt="QR Code"
          className="w-[300px] h-[300px] object-cover rounded-lg shadow-md"
        />
        <p className="text-sm text-center mt-2 text-gray-600">
          Quét mã QR để chuyển khoản đúng số tiền và nội dung!
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg mt-4">
        <div className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Ngân hàng:</span> <span className="ml-2 uppercase">{bankCode}</span>
        </div>
        <div className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Số tài khoản:</span> <span className="ml-2">{accountNumber}</span>
        </div>
        <div className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Số tiền:</span> <span className="ml-2 text-blue-700 font-semibold">{Number(totalPrice).toLocaleString()}₫</span>
        </div>
        <div className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Nội dung:</span> <span className="ml-2">{addInfo}</span>
        </div>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg mt-4 text-sm">
        <h3 className="font-medium text-blue-700 mb-2">Hướng dẫn thanh toán:</h3>
        <ol className="list-decimal pl-4 text-blue-800 space-y-1">
          <li>Mở app ngân hàng bất kỳ (có hỗ trợ QR chuyển khoản Napas)</li>
          <li>Quét mã QR bên trên</li>
          <li>Xác nhận đúng số tiền và nội dung chuyển khoản</li>
          <li>Hoàn tất giao dịch, gửi xác nhận cho shop nếu cần</li>
        </ol>
      </div>
    </div>
  );
};

export default BankTransferQR;
