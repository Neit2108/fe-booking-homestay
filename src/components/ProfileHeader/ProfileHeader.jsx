import { useContext, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loading/Loader";
import { UserContext } from "../../context/UserContext";

function ProfileHeader() {
  const { user, setUser } = useContext(UserContext);
  const [avatar, setAvatar] = useState(user?.avatarUrl || "/default-avatar.png");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.put("https://localhost:7284/uploads/update-image", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      console.log(response.data.avatarUrl);
      setAvatar(response.data.avatarUrl);
      setUser((prevUser) => {
        const updatedUser = {
          ...prevUser, 
          avatarUrl: response.data.avatarUrl,
        };
        console.log("Updated user data:", updatedUser);

        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      });
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src={avatar}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-primary">{user.fullName}</h1>
          <p className="text-[#B0B0B0] mt-1">Member since January 2023</p>

          <div className="flex gap-4 mt-4">
            {/* Input file ẩn */}
            <input type="file" className="hidden" id="fileInput" onChange={handleFileChange} />

            {/* Nút Chọn Ảnh */}
            <button
              className="px-4 py-2 bg-accent text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              onClick={() => document.getElementById("fileInput").click()} // Click vào input file
              disabled={loading}
            >
              {loading ? <Loader /> : "Chọn Ảnh"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
