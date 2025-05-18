import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"; // ← đổi sang useParams
import axios from "axios";
import Loader from "../../components/Loading/Loader";
import { UserContext } from "../../context/UserContext";
import { API_URL } from "../../../constant/config";

function VerifyAccess() {
  const { token } = useParams(); // ← lấy token từ URL path param
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    const validate = async () => {
      let currentUser = user;
      if (!currentUser) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          currentUser = JSON.parse(storedUser);
        }
      }      // Nếu vẫn không có user, yêu cầu đăng nhập
      if (!currentUser) {
        navigate("/login");
        return;
      }

      const roles = Array.isArray(currentUser?.role)
        ? currentUser.role
        : [currentUser?.role].filter(Boolean);

      try {
        const res = await axios.post(
          `${API_URL}/account/auth/verify-action`,
          {
            token,
          }
        );

        const { action, referenceId } = res.data;
        console.log("User : ", user);
        console.log("Role : ", roles);
        switch (action) {
          case "ConfirmInfo":
            navigate(`/user-booking-dashboard`);
            break;

          case "BookingRequest":
            if (roles.includes("Admin")) {
              navigate("/admin-booking-dashboard");
            } else if (roles.includes("Landlord")) {
              navigate("/landlord-booking-dashboard");
            } else {
              navigate("/unauthorized");
            }
            break;
          case "PaymentSuccess":
            navigate(`/user-booking-dashboard`);
            break;
          case "PaymentFailure":
            navigate(`/user-booking-dashboard`);
            break;
          case "PasswordReset":
            navigate('/login');
            break;
          default:
            setError("Không xác định hành động");
        }
      } catch (error) {
        if (error.response?.status === 440 || error.response?.status === 401) {
          navigate("/login");
        } else {
          setError("Token không hợp lệ hoặc đã hết hạn");
        }
      }
    };

    if (token) validate();
  }, [token]);

  return error ? (
    <div style={{ padding: 40, color: "red" }}>{error}</div>
  ) : (
    <Loader />
  );
}

export default VerifyAccess;
