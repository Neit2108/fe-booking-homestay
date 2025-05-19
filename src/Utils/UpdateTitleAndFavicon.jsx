import { useEffect } from "react";
import { useLocation } from "react-router-dom";


function UpdateTitleAndFavicon() {
  const location = useLocation();

  useEffect(() => {
    const favicon =
      document.querySelector("link[rel='icon']") ||
      document.createElement("link");
    favicon.rel = "icon";
    if (!favicon.parentNode) document.head.appendChild(favicon);

    // Thay đổi title & favicon dựa trên URL
    switch (location.pathname) {
      case "/":
        document.title = "Homies Stay - Trang chủ";
        favicon.href = "https://res.cloudinary.com/dbswzktwo/image/upload/v1747617291/favicon_ttmp6c.png";
        break;
      case "/login":
        document.title = "Đăng nhập";
        favicon.href = "https://res.cloudinary.com/dbswzktwo/image/upload/v1747617291/favicon_ttmp6c.png";
        break;
      case "/register":
        document.title = "Đăng ký";
        favicon.href = "https://res.cloudinary.com/dbswzktwo/image/upload/v1747617291/favicon_ttmp6c.png";
        break;
      case "/register-success":
        document.title = "Đăng ký thành công";
        favicon.href = "https://res.cloudinary.com/dbswzktwo/image/upload/v1747617291/favicon_ttmp6c.png";
        break;
      case "/register-failed":
        document.title = "Đăng ký thất bại";
        favicon.href = "https://res.cloudinary.com/dbswzktwo/image/upload/v1747617291/favicon_ttmp6c.png";
        break;
      case "/host-register":
        document.title = "Đăng ký làm Host";
        favicon.href = "https://res.cloudinary.com/dbswzktwo/image/upload/v1747617291/favicon_ttmp6c.png";
        break;
      case "/host-register-success":
        document.title = "Đăng ký Host thành công";
        favicon.href = "https://res.cloudinary.com/dbswzktwo/image/upload/v1747617291/favicon_ttmp6c.png";
        break;
      case "/host-register-failed":
        document.title = "Đăng ký Host thất bại";
        favicon.href = "https://res.cloudinary.com/dbswzktwo/image/upload/v1747617291/favicon_ttmp6c.png";
        break;
      case "/profile":
        document.title = "Trang cá nhân";
        favicon.href = "https://res.cloudinary.com/dbswzktwo/image/upload/v1747617291/favicon_ttmp6c.png";
        break;
      case "/dashboard":
        document.title = "Admin Dashboard";
        favicon.href = "https://res.cloudinary.com/dbswzktwo/image/upload/v1747617291/favicon_ttmp6c.png";
        break;
      case "/booking-request":
        document.title = "Yêu cầu đặt phòng";
        favicon.href = "https://res.cloudinary.com/dbswzktwo/image/upload/v1747617291/favicon_ttmp6c.png";
        break;
      case "/user-booking-dashboard":
        document.title = "Danh sách đặt phòng";
        favicon.href = "https://res.cloudinary.com/dbswzktwo/image/upload/v1747617291/favicon_ttmp6c.png";
        break;
      case "/user-booking-details":
        document.title = "Chi tiết đặt phòng";
        favicon.href = "https://res.cloudinary.com/dbswzktwo/image/upload/v1747617291/favicon_ttmp6c.png";
        break;
      case "/landlord-booking-dashboard":
        document.title = "Chủ nhà";
        favicon.href = "https://res.cloudinary.com/dbswzktwo/image/upload/v1747617291/favicon_ttmp6c.png";
        break;
      case "/admin-booking-dashboard":
        document.title = "Admin";
        favicon.href = "https://res.cloudinary.com/dbswzktwo/image/upload/v1747617291/favicon_ttmp6c.png";
        break;
      
      default:
        // Xử lý các route động như /place-details/:id
        if (location.pathname.startsWith("/place-details/")) {
          document.title = "Chi tiết homestay";
          favicon.href = "https://res.cloudinary.com/dbswzktwo/image/upload/v1747617291/favicon_ttmp6c.png";
        } else {
          document.title = "Homies Stay";
          favicon.href =  'https://res.cloudinary.com/dbswzktwo/image/upload/v1747617291/favicon_ttmp6c.png';
        }
    }
  }, [location.pathname]);

  return null;
}

export default UpdateTitleAndFavicon;