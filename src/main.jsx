import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage/HomePage.jsx";
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import RegisterSuccess from "./pages/Register/RegisterSuccess.jsx";
import RegisterFailed from "./pages/Register/RegisterFailed.jsx";
import HostRegister from "./pages/HostRegister/HostRegister.jsx";
import HostRegisterSuccess from "./pages/HostRegister/HostRegisterSuccess.jsx";
import HostRegisterFailed from "./pages/HostRegister/HostRegisterFailed.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import AdminDashboard from "./pages/Dashboard/AdminDashboard.jsx";
import BookingRequest from "./pages/BookingRequest/BookingRequest.jsx";
import UpdateTitleAndFavicon from "./Utils/UpdateTitleAndFavicon.jsx";
import UserBookingDashboard from "./pages/Dashboard/UserBookingDashboard.jsx";
import VerifyAccess from "./pages/VerifyAccess/VerifyAccess.jsx";
import AdminBookingDashboard from "./pages/Dashboard/AdminBookingDashboard.jsx";
import LandlordBookingDashboard from "./pages/Dashboard/LandlordBookingDashboard.jsx";

import { UserProvider } from "./context/UserContext.jsx";

function AppLayout() {
  return (
    <>
      <UpdateTitleAndFavicon />
      <Outlet />
    </>
  );
}

// Định nghĩa router với AppLayout
const router = createBrowserRouter([
  {
    element: <AppLayout />, // Bọc tất cả các route trong AppLayout
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/place-details/:id", element: <PropertyDetails /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/register-success", element: <RegisterSuccess /> },
      { path: "/register-failed", element: <RegisterFailed /> },
      { path: "/host-register", element: <HostRegister /> },
      { path: "/host-register-success", element: <HostRegisterSuccess /> },
      { path: "/host-register-failed", element: <HostRegisterFailed /> },
      { path: "/profile", element: <Profile /> },
      { path: "/dashboard", element: <AdminDashboard /> },
      { path: "/admin-booking-dashboard", element: <AdminBookingDashboard /> },
      { path: "/landlord-booking-dashboard", element: <LandlordBookingDashboard /> },
      { path: "/booking-request", element: <BookingRequest /> },
      { path: "/user-booking-dashboard", element: <UserBookingDashboard /> },
      { path: "/auth/verify-action/:token", element: <VerifyAccess /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
