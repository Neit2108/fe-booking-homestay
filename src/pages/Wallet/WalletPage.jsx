import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import WalletBalanceCard from '../../components/Wallet/WalletBalanceCard';
import WalletStatsCards from '../../components/Wallet/WalletStatsCards';
import WalletTransactionHistory from '../../components/Wallet/WalletTransactionHistory';
import WalletDepositModal from '../../components/Wallet/WalletDepositModal';
import WalletQRPaymentModal from '../../components/Wallet/WalletQRPaymentModal';
import CardPaymentRedirectModal from '../../components/Wallet/CardPaymentRedirectModal';
import SuccessResultCard from '../../components/Wallet/SuccessResultCard';
import WalletPinSettings from '../../components/Wallet/WalletPinSettings';
import useWallet from '../../hooks/useWallet';

const WalletPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    balance, 
    transactions, 
    pagination,
    loading, 
    error, 
    fetchBalance, 
    fetchTransactions,
    deposit,
    checkPaymentStatus
  } = useWallet();

  // UI state
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isCardRedirectModalOpen, setIsCardRedirectModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [depositAmount, setDepositAmount] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' or 'security'
  
  // Check for payment result in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    const paymentId = params.get('paymentId');

    // Clear URL parameters after processing
    if (status || paymentId) {
      // Replace URL without parameters
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Refresh wallet data
      fetchBalance();
      fetchTransactions();
    }
  }, [location, fetchBalance, fetchTransactions]);

  // Handle deposit button click
  const handleDepositClick = () => {
    setIsDepositModalOpen(true);
  };

  // Handle deposit form submit
  const handleDepositSubmit = async (data) => {
    try {
      // Create deposit request
      const response = await deposit({
        amount: data.amount,
        paymentMethod: data.paymentMethod
      });

      // Save data for modal
      setPaymentData(response);
      setDepositAmount(data.amount);
      
      // Close deposit modal
      setIsDepositModalOpen(false);
      
      // For credit card payments, show redirect modal with countdown
      if (data.paymentMethod === 'credit_card') {
        setIsCardRedirectModalOpen(true);
      } else {
        // For bank transfer, show QR modal
        setIsQRModalOpen(true);
      }
    } catch (error) {
      console.error('Deposit failed:', error);
      // Keep deposit modal open and show error
    }
  };

  // Handle page change in transaction history
  const handlePageChange = (page) => {
    fetchTransactions(page, pagination.pageSize);
  };

  // Handle payment status check
  const handleCheckPaymentStatus = async (paymentId) => {
    try {
      const result = await checkPaymentStatus(paymentId);
      
      if (result.status === 'Success') {
        setIsQRModalOpen(false);
        // Show success message
      }
      
      return result;
    } catch (error) {
      console.error('Failed to check payment status:', error);
      return null;
    }
  };

  // Get payment result information from URL (if present)
  const getPaymentResult = () => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    const paymentId = params.get('paymentId');
    
    if (!status || !paymentId) return null;
    
    return {
      status: status === 'Success' ? 'success' : 'error',
      paymentId: paymentId
    };
  };

  // Payment result from URL
  const paymentResult = getPaymentResult();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-primary mb-6">Quản lý ví</h1>
          
          {/* Show payment result if present in URL */}
          {paymentResult && (
            <div className="mb-8">
              <SuccessResultCard 
                status={paymentResult.status}
                title={paymentResult.status === 'success' ? 'Nạp tiền thành công' : 'Nạp tiền thất bại'}
                message={
                  paymentResult.status === 'success' 
                    ? 'Tiền đã được nạp vào ví của bạn thành công.' 
                    : 'Đã xảy ra lỗi trong quá trình nạp tiền. Vui lòng thử lại sau.'
                }
                onButtonClick={() => navigate('/wallet')}
              />
            </div>
          )}
          
          {!paymentResult && (
            <>
              {/* Tab navigation */}
              <div className="flex border-b border-gray-200 mb-6">
                <button 
                  className={`py-2 px-4 font-medium ${activeTab === 'overview' ? 'text-accent border-b-2 border-accent' : 'text-gray-600 hover:text-gray-900'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Tổng quan
                </button>
                <button 
                  className={`py-2 px-4 font-medium ${activeTab === 'security' ? 'text-accent border-b-2 border-accent' : 'text-gray-600 hover:text-gray-900'}`}
                  onClick={() => setActiveTab('security')}
                >
                  Bảo mật
                </button>
              </div>
              
              {activeTab === 'overview' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Balance card */}
                    <div className="md:col-span-1">
                      <WalletBalanceCard 
                        balance={balance} 
                        loading={loading.balance} 
                        onDepositClick={handleDepositClick} 
                      />
                    </div>
                    
                    {/* Quick actions card */}
                    <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6">
                      <h2 className="text-xl font-semibold text-primary mb-4">Thao tác nhanh</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <button 
                          onClick={handleDepositClick}
                          className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white mb-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </div>
                          <span className="text-primary font-medium">Nạp tiền</span>
                        </button>
                        
                        <button 
                          onClick={() => navigate('/homestay-recommend')}
                          className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mb-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          </div>
                          <span className="text-primary font-medium">Đặt phòng</span>
                        </button>
                        
                        <button 
                          onClick={() => navigate('/user-booking-dashboard')}
                          className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                        >
                          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white mb-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <span className="text-primary font-medium">Đơn đặt phòng</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats cards */}
                  <div className="mb-8">
                    <WalletStatsCards 
                      transactions={transactions} 
                      loading={loading.transactions} 
                    />
                  </div>
                  
                  {/* Transaction history */}
                  <div>
                    <WalletTransactionHistory 
                      transactions={transactions} 
                      loading={loading.transactions}
                      onPageChange={handlePageChange}
                      currentPage={pagination.page}
                      totalPages={pagination.totalPages}
                    />
                  </div>
                </>
              ) : (
                <WalletPinSettings className="mb-8" />
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* Deposit modal */}
      <WalletDepositModal 
        isOpen={isDepositModalOpen} 
        onClose={() => setIsDepositModalOpen(false)} 
        onSubmit={handleDepositSubmit}
        loading={loading.deposit}
      />
      
      {/* QR Payment modal (for bank transfers) */}
      <WalletQRPaymentModal 
        isOpen={isQRModalOpen} 
        onClose={() => setIsQRModalOpen(false)} 
        paymentData={paymentData}
        onCheckStatus={handleCheckPaymentStatus}
        amount={depositAmount}
      />
      
      {/* Card Payment Redirect modal (for card payments) */}
      <CardPaymentRedirectModal 
        isOpen={isCardRedirectModalOpen} 
        onClose={() => setIsCardRedirectModalOpen(false)} 
        paymentData={paymentData}
        amount={depositAmount}
        countdown={10}
      />
    </div>
  );
};

export default WalletPage;