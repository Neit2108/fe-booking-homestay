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
      case "/login":
        document.title = "Đăng nhập";
        favicon.href = "src/assets/favicon.png";
        break;
      case "/register":
        document.title = "Đăng ký";
        favicon.href = "src/assets/favicon.png";
        break;
      case "/profile":
        document.title = "Trang cá nhân";
        favicon.href = "src/assets/favicon.png";
        break
      default:
        document.title = "Homies Stay";
        favicon.href = "src/assets/favicon.png";
    }
  }, [location.pathname]);

  return null;
}

export default UpdateTitleAndFavicon;
