// import { useNavigate } from "react-router-dom";

// function Footer() {
//   const navigate = useNavigate();

//   const handleRegisterClick = () => {
//     navigate("/host-register");
//   };
//   return (
//     <>
//       <div className="flex mt-[50px] w-full max-w-[1140px] items-stretch gap-5 font-poppins text-primary font-medium flex-wrap justify-between max-md:max-w-full max-md:mt-10">
//         <a href="/" className="text-[26px] cursor-pointer">
//           <span className="text-accent">Homies</span>
//           <span>Stay.</span>
//         </a>

//         <div className="text-lg mt-auto mb-auto">Hợp tác với chúng tôi</div>
//       </div>

//       <div className="flex mt-2 w-full max-w-[1140px] items-stretch gap-5 font-poppins flex-wrap justify-between max-md:max-w-full">
//         <div className="text-[#B0B0B0] text-base font-light">
//           <span>Chúng tôi sẽ khiến kỳ nghỉ</span>
//           <br />
//           <span>của bạn trở nên bùng nổ.</span>
//         </div>

//         <button
//           className="rounded-[5px] bg-accent mt-2 px-[25px] py-2 text-sm text-white font-medium ml-auto max-md:px-5 hover:bg-blue-700 active:bg-blue-800 active:shadow-sm active:translate-y-0.5 transition-all duration-200 cursor-pointer"
//           onClick={handleRegisterClick}
//         >
//           Đăng ký ngay
//         </button>
//       </div>

//       {/* Footer content ends here */}
//     </>
//   );
// }

// export default Footer;

import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/host-register");
  };

  return (
    <footer className="w-full py-10">
      <div className="max-w-[1140px] mx-auto">
        {/* Top Section with Logo and Partnership Button */}
        <div className="flex flex-wrap justify-between items-center gap-5 mb-8">
          <div>
            <a href="/" className="text-[26px] font-medium">
              <span className="text-accent">Homies</span>
              <span className="text-primary">Stay.</span>
            </a>
            <p className="text-gray-500 mt-2 text-sm max-w-md">
              Chúng tôi sẽ khiến kỳ nghỉ của bạn trở nên bùng nổ. 
              <br/>Trải nghiệm lưu trú tốt nhất với HomiesStay.
            </p>
          </div>

          <div className="flex flex-col items-end">
            <div className="text-lg font-medium text-primary mb-2">Hợp tác với chúng tôi</div>
            <button
              onClick={handleRegisterClick}
              className="rounded-lg bg-accent hover:bg-blue-700 px-6 py-3 text-white font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-t border-gray-100">
          <div>
            <h3 className="text-lg font-medium text-primary mb-4">Về chúng tôi</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-500 hover:text-accent">Giới thiệu</a></li>
              <li><a href="/jobs" className="text-gray-500 hover:text-accent">Tuyển dụng</a></li>
              <li><a href="/press" className="text-gray-500 hover:text-accent">Báo chí</a></li>
              <li><a href="/news" className="text-gray-500 hover:text-accent">Tin tức</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-primary mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li><a href="/help" className="text-gray-500 hover:text-accent">Trung tâm trợ giúp</a></li>
              <li><a href="/safety" className="text-gray-500 hover:text-accent">An toàn</a></li>
              <li><a href="/cancellation" className="text-gray-500 hover:text-accent">Chính sách hủy</a></li>
              <li><a href="/covid" className="text-gray-500 hover:text-accent">Thông tin COVID-19</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-primary mb-4">Homestay</h3>
            <ul className="space-y-2">
              <li><a href="/become-host" className="text-gray-500 hover:text-accent">Đăng ký chủ nhà</a></li>
              <li><a href="/community" className="text-gray-500 hover:text-accent">Cộng đồng</a></li>
              <li><a href="/host-resources" className="text-gray-500 hover:text-accent">Tài nguyên chủ nhà</a></li>
              <li><a href="/responsible-hosting" className="text-gray-500 hover:text-accent">Đón tiếp khách có trách nhiệm</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-primary mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-500">+84 123 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-500">homiesstay@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-500">235 Hoàng Quốc Việt</span>
              </li>
            </ul>

            <div className="mt-6 flex gap-4">
              <a href="https://facebook.com" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-accent hover:bg-blue-200 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.42,15.37l0.71-4.63h-4.45V7.98c0-1.27,0.62-2.5,2.61-2.5h2.02V1.6c0,0-1.83-0.31-3.59-0.31 c-3.66,0-6.06,2.22-6.06,6.24v3.22H5.89v4.63h3.78v11.2c0.76,0.12,1.54,0.18,2.33,0.18c0.79,0,1.57-0.06,2.33-0.18v-11.2H18.42z"/>
                </svg>
              </a>
              <a href="https://twitter.com" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-accent hover:bg-blue-200 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46,6c-0.77,0.35-1.6,0.58-2.46,0.69c0.88-0.53,1.56-1.37,1.88-2.38c-0.83,0.5-1.75,0.85-2.72,1.05 C18.37,4.5,17.26,4,16,4c-2.35,0-4.27,1.92-4.27,4.29c0,0.34,0.04,0.67,0.11,0.98C8.28,9.09,5.11,7.38,3,4.79 c-0.37,0.63-0.58,1.37-0.58,2.15c0,1.49,0.75,2.81,1.91,3.56c-0.71,0-1.37-0.2-1.95-0.5c0,0.02,0,0.03,0,0.05 c0,2.08,1.48,3.82,3.44,4.21c-0.36,0.1-0.74,0.15-1.13,0.15c-0.27,0-0.54-0.03-0.8-0.08c0.54,1.69,2.11,2.95,4,2.98 c-1.46,1.16-3.31,1.84-5.33,1.84c-0.34,0-0.68-0.02-1.02-0.06C3.9,20.29,6.1,21,8.47,21 c8.95,0,13.86-7.56,13.86-14.12c0-0.21,0-0.43-0.01-0.64C23.07,7.62,22.84,6.87,22.46,6z"/>
                </svg>
              </a>
              <a href="https://instagram.com" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-accent hover:bg-blue-200 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.01,2.19l6.8,0c1.8,0,3.21,0.4,4.31,1.5c1.11,1.11,1.49,2.52,1.49,4.32l0,6.8c0,1.8-0.4,3.21-1.5,4.31
                  c-1.11,1.11-2.51,1.49-4.32,1.49l-6.8,0c-1.8,0-3.21-0.4-4.31-1.5c-1.11-1.11-1.49-2.51-1.49-4.32l0-6.8
                  c0-1.8,0.4-3.21,1.5-4.31C8.8,2.6,10.2,2.19,12.01,2.19z M19.57,5.63c-0.62-0.62-1.47-0.93-2.76-0.93l-6.8,0
                  c-1.29,0-2.14,0.31-2.76,0.94c-0.62,0.62-0.93,1.47-0.93,2.76l0,6.8c0,1.29,0.31,2.14,0.94,2.76c0.62,0.62,1.47,0.93,2.76,0.93
                  l6.8,0c1.29,0,2.14-0.31,2.76-0.94c0.62-0.62,0.93-1.47,0.93-2.76l0-6.8C20.5,7.1,20.19,6.25,19.57,5.63z M12,7.15
                  c2.68,0,4.85,2.17,4.85,4.85c0,2.68-2.17,4.85-4.85,4.85c-2.68,0-4.85-2.17-4.85-4.85C7.15,9.32,9.32,7.15,12,7.15z M12,9.23
                  c-1.53,0-2.77,1.24-2.77,2.77c0,1.53,1.24,2.77,2.77,2.77c1.53,0,2.77-1.24,2.77-2.77C14.77,10.47,13.53,9.23,12,9.23z M17.6,5.36
                  c0.63,0,1.13,0.51,1.13,1.13c0,0.63-0.51,1.13-1.13,1.13c-0.63,0-1.13-0.51-1.13-1.13C16.47,5.86,16.97,5.36,17.6,5.36z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        {/* <div className="pt-8 mt-8 border-t border-gray-100 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} HomiesStay. All rights reserved.</p>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;