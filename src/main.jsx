import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' // ✅ Sửa lại
import './index.css'
import HomePage from './pages/HomePage/HomePage.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Profile from './pages/Profile/Profile.jsx'
import UpdateTitleAndFavicon from './Utils/UpdateTitleAndFavicon.jsx'
import { UserProvider } from './context/UserContext' 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>  {/* Bọc toàn bộ ứng dụng trong UserProvider */}
      <Router>
        <UpdateTitleAndFavicon />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </UserProvider>
  </StrictMode>
);
