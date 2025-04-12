import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // ← đổi sang useParams
import axios from "axios";
import Loader from "../../components/Loading/Loader";

function VerifyAccess () {
    const { token } = useParams(); // ← lấy token từ URL path param
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const validate = async () => {
            try {
                const res = await axios.post('https://localhost:7284/account/auth/verify-action', {
                    token
                });

                const { action, referenceId } = res.data;

                switch (action) {
                    case "BookingConfirmation":
                        navigate(`/user-booking-dashboard`);
                        break;
                    // Thêm các case khác ở đây
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

    return (
        error
            ? <div style={{ padding: 40, color: "red" }}>{error}</div>
            : <Loader />
    );
}

export default VerifyAccess;
