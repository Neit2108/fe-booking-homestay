import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RegisterSuccess from "./pages/Register/RegisterSuccess";
import RegisterFailed from "./pages/Register/RegisterFailed";
import Profile from "./pages/Profile/Profile";
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import UpdateTitleAndFavicon from "./Utils/UpdateTitleAndFavicon";
import { UserProvider } from "./context/UserContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
      <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
      <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
      <Route path="/register-success" element={<PageWrapper><RegisterSuccess /></PageWrapper>} />
      <Route path="/register-failed" element={<PageWrapper><RegisterFailed /></PageWrapper>} />
      <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
      <Route path="/place-details/:id" element={<PageWrapper><PropertyDetails /></PageWrapper>} />
      <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
    </>
  )
);

// Tạo component bọc chung
function PageWrapper({ children }) {
  return (
    <>
      <UpdateTitleAndFavicon />
      {children}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
