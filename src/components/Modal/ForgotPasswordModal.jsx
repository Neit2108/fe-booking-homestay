import { useState } from 'react';
import { X, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { API_URL } from '../../../constant/config';
import axios from 'axios';

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
    await axios.post(`${API_URL}/account/auth/forgot-password`, { email: emailOrUsername });
      setSuccess(true);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white border rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Quên mật khẩu</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {!success ? (
            <>
              <div className="flex items-center mb-4 text-blue-600">
                <Mail className="mr-2" size={20} />
                <p className="text-sm">Mật khẩu mới sẽ được gửi tới email của bạn.</p>
              </div>

              <div onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700 mb-1">
                    Email hoặc tên đăng nhập
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="emailOrUsername"
                      value={emailOrUsername}
                      onChange={(e) => setEmailOrUsername(e.target.value)}
                      placeholder="VD: customer@gmail.com hoặc customer"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Bạn có thể nhập email hoặc tên đăng nhập để khôi phục mật khẩu
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !emailOrUsername.trim()}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      Gửi liên kết
                      <ArrowRight size={16} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Kiểm tra email của bạn</h3>
              <p className="text-gray-600 mb-4">
                Chúng tôi đã gửi liên kết đặt lại mật khẩu đến tài khoản <strong>{emailOrUsername}</strong>
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
              >
                Đóng
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}