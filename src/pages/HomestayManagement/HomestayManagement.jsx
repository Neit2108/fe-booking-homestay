import React, { useState, useEffect, useContext } from "react";
import { usePlaces } from "../../hooks/usePlaces";
import { useHomestayFiltering } from "../../hooks/useHomestayFiltering";
import HomestayModal from "../../components/HomestayModal/HomestayModal";
import Loader from "../../components/Loading/Loader";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import Sidebar from "../../components/Sidebar/Sidebar";
import Modal from "../../components/Modal/Modal";
import { formatPrice } from "../../Utils/PriceUtils";
import axios from "axios";
import { API_URL } from "../../../constant/config";

// 1. Tách thành component riêng
const StatusToggleModal = ({
  isOpen,
  onClose,
  placeId,
  currentStatus,
  formData,
  onFormChange,
  onSubmit,
}) => {
  const isActive = currentStatus === "Active";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-opacity-30 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="bg-white rounded-xl p-8 shadow-xl z-10 max-w-md w-full mx-4 relative border border-black-2000">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold text-primary text-center mb-4">
          {isActive ? "Dừng hoạt động Homestay" : "Kích hoạt Homestay"}
        </h2>

        {isActive ? (
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="isPermanent"
                name="isPermanent"
                checked={formData.isPermanent}
                onChange={onFormChange}
                className="h-4 w-4 text-blue-600"
              />
              <label
                htmlFor="isPermanent"
                className="ml-2 text-sm text-gray-700"
              >
                Dừng hoạt động cho đến khi thay đổi
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Từ ngày:
              </label>
              <input
                type="date"
                name="inactiveFrom"
                value={formData.inactiveFrom}
                onChange={onFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {!formData.isPermanent && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Đến ngày:
                </label>
                <input
                  type="date"
                  name="inactiveTo"
                  value={formData.inactiveTo}
                  onChange={onFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  min={formData.inactiveFrom}
                />
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600 mb-4">
            Bạn có chắc chắn muốn hoạt động lại homestay này không?
          </p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lý do:
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={onFormChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            rows="3"
            placeholder={
              isActive
                ? "Nhập lý do dừng hoạt động..."
                : "Nhập lý do kích hoạt lại..."
            }
          ></textarea>
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className={`px-4 py-2 ${
              isActive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            } text-white rounded-md disabled:opacity-50`}
            disabled={
              !formData.reason.trim() ||
              (!formData.isPermanent && !formData.inactiveTo)
            }
            onClick={onSubmit}
          >
            {isActive ? "Dừng hoạt động" : "Kích hoạt"}
          </button>
        </div>
      </div>
    </div>
  );
};

const HomestayManagement = () => {
  const {
    places,
    loading,
    error,
    fetchPlaces,
    addPlace,
    updatePlace,
    deletePlace,
  } = usePlaces({ mode: "managed" });

  // Hook up with useHomestayFiltering
  const {
    searchTerm,
    categoryFilter,
    priceRange,
    ratingFilter,
    guestsFilter,
    statusFilter,
    sortOption,
    setSearchTerm,
    setCategoryFilter,
    setStatusFilter,
    handlePriceChange,
    setRatingFilter,
    setGuestsFilter,
    setSortOption,
    filteredPlaces,
    resetFilters,
    currentPage,
    setCurrentPage,
    getPaginatedResults,
  } = useHomestayFiltering(places);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentHomestay, setCurrentHomestay] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [homestayToDelete, setHomestayToDelete] = useState(null);

  const [approveModal, setApproveModal] = useState({
    isOpen: false,
    placeId: null,
  });

  const [rejectModal, setRejectModal] = useState({
    isOpen: false,
    placeId: null,
  });

  const [rejectReasonModal, setRejectReasonModal] = useState({
    isOpen: false,
    placeId: null,
  });

  const [rejectReason, setRejectReason] = useState("");
  // For admin check
  const { user, loading: userLoading, isAdmin, isLandlord } = useContext(UserContext);
  const navigate = useNavigate();

  // Items per page for pagination
  const [itemsPerPage] = useState(10);

  const [statusToggleModal, setStatusToggleModal] = useState({
    isOpen: false,
    placeId: null,
    currentStatus: null,
  });

  const [statusModalState, setStatusModalState] = useState({
    isOpen: false,
    placeId: null,
    currentStatus: null,
  });

  const [statusFormData, setStatusFormData] = useState({
    isPermanent: true,
    inactiveFrom: new Date().toISOString().split("T")[0],
    inactiveTo: "",
    reason: "",
  });

  // Check if user is admin
  useEffect(() => {
    if (!userLoading && user) {
      if(!isAdmin() && !isLandlord()) {
        navigate("/unauthorized"); // Redirect to home if not admin or landlord
      }
      console.log("true", isAdmin(), isLandlord());
    }
  }, [user, navigate, userLoading]);

  // Open modal for adding a new homestay
  const handleAddHomestay = () => {
    setModalMode("add");
    setCurrentHomestay(null);
    setIsModalOpen(true);
  };

  // Open modal for editing a homestay
  const handleEditHomestay = (homestay) => {
    setModalMode("edit");
    setCurrentHomestay(homestay);
    setIsModalOpen(true);
  };

  // Handle modal form submission
  const handleModalSubmit = async (formData, mode) => {
    try {
      if (mode === "add") {
        await addPlace(formData);
      } else {
        await updatePlace(currentHomestay.id, formData);
      }

      // Close modal and refresh data
      setIsModalOpen(false);
      fetchPlaces();

      // Show success notification
      alert(
        mode === "add"
          ? "Homestay added successfully!"
          : "Homestay updated successfully!"
      );
    } catch (error) {
      console.error("Error submitting homestay:", error);
      alert(`Error: ${error.message || "Something went wrong"}`);
    }
  };

  // Open delete confirmation modal
  const handleDeleteClick = (homestay) => {
    setHomestayToDelete(homestay);
    setIsDeleteModalOpen(true);
  };

  // Confirm and execute delete
  const confirmDelete = async () => {
    if (!homestayToDelete) return;

    try {
      await deletePlace(homestayToDelete.id);
      setIsDeleteModalOpen(false);
      setHomestayToDelete(null);

      // Refresh data
      fetchPlaces();

      // Show success notification
      alert("Homestay deleted successfully!");
    } catch (error) {
      console.error("Error deleting homestay:", error);
      alert(`Error: ${error.message || "Something went wrong"}`);
    }
  };

  const openApproveModal = (place) => {
    setApproveModal({
      isOpen: true,
      placeId: place.id,
    });
  };

  // Hàm hiển thị modal xác nhận từ chối
  const openRejectModal = (place) => {
    setRejectModal({
      isOpen: true,
      placeId: place.id,
    });
  };

  // Hàm hiển thị modal nhập lý do từ chối
  const openRejectReasonModal = (placeId) => {
    setRejectReasonModal({
      isOpen: true,
      placeId,
    });
    setRejectReason(""); // Reset lý do
  };

  const handleApproveHomestay = async () => {
    try {
      
      const requestBody = {
        placeId: approveModal.placeId,
        newStatus: "Active",
        inactiveFrom: null,
        inactiveTo: null,
        reason: "Đã được phê duyệt",
      };

      const response = await axios.put(
        `${API_URL}/places/update-status`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setApproveModal({ isOpen: false, placeId: null });
        // Hiển thị modal thành công
        setSuccessModal({
          isOpen: true,
          message: "Homestay đã được phê duyệt thành công!",
        });
        fetchPlaces(); // Refresh danh sách
      }
    } catch (error) {
      console.error("Lỗi khi phê duyệt homestay:", error);
      setApproveModal({ isOpen: false, placeId: null });
      // Hiển thị modal lỗi
      setErrorModal({
        isOpen: true,
        message: `Lỗi: ${
          error.response?.data ||
          error.message ||
          "Không thể phê duyệt homestay"
        }`,
      });
    }
  };

  const handleRejectConfirm = () => {
    setRejectModal({ isOpen: false, placeId: null });
    const placeId = rejectModal.placeId;
    if (placeId) {
      openRejectReasonModal(placeId);
    }
  };

  // Function to decline a pending homestay
  const RejectReasonModal = () => (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        rejectReasonModal.isOpen ? "" : "hidden"
      }`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        onClick={() => setRejectReasonModal({ isOpen: false, placeId: null })}
      ></div>

      <div className="bg-white rounded-xl p-8 shadow-xl z-10 max-w-md w-full mx-4 relative border border-gray-200">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => setRejectReasonModal({ isOpen: false, placeId: null })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold text-primary text-center mb-4">
          Lý do từ chối
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vui lòng nhập lý do từ chối homestay này:
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            rows="4"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Nhập lý do từ chối..."
          ></textarea>
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={() =>
              setRejectReasonModal({ isOpen: false, placeId: null })
            }
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300"
            disabled={!rejectReason.trim()}
            onClick={handleDeclineHomestay}
          >
            Từ chối
          </button>
        </div>
      </div>
    </div>
  );

  // Hàm xử lý từ chối homestay sau khi có lý do
  const handleDeclineHomestay = async () => {
    try {
    
      if (!rejectReason.trim()) {
        // Hiển thị thông báo lỗi
        return;
      }

      // Tạo request body theo đúng định dạng API
      const requestBody = {
        placeId: rejectReasonModal.placeId,
        newStatus: "Inactive",
        inactiveFrom: new Date().toISOString(),
        inactiveTo: null,
        reason: rejectReason,
      };

      const response = await axios.put(
        `${API_URL}/places/update-status`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setRejectReasonModal({ isOpen: false, placeId: null });
        // Hiển thị modal thành công
        setSuccessModal({
          isOpen: true,
          message: "Homestay đã bị từ chối thành công",
        });
        fetchPlaces(); // Refresh danh sách
      }
    } catch (error) {
      console.error("Lỗi khi từ chối homestay:", error);
      setRejectReasonModal({ isOpen: false, placeId: null });
      // Hiển thị modal lỗi
      setErrorModal({
        isOpen: true,
        message: `Lỗi: ${
          error.response?.data || error.message || "Không thể từ chối homestay"
        }`,
      });
    }
  };

  const handleToggleStatus = (place) => {
    setStatusModalState({
      isOpen: true,
      placeId: place.id,
      currentStatus: place.status,
    });

    // Reset form
    setStatusFormData({
      isPermanent: true,
      inactiveFrom: new Date().toISOString().split("T")[0],
      inactiveTo: "",
      reason: "",
    });
  };

  const handleCloseStatusModal = () => {
    setStatusModalState({
      isOpen: false,
      placeId: null,
      currentStatus: null,
    });
  };

  // Hàm xử lý khi form thay đổi
  const handleStatusFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStatusFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitStatusChange = async () => {
    // Kiểm tra điều kiện trước khi submit
    if (!statusFormData.reason.trim()) {
      // Thông báo lỗi
      return;
    }

    if (!statusFormData.isPermanent && !statusFormData.inactiveTo) {
      // Thông báo lỗi
      return;
    }

    try {

      const { placeId, currentStatus } = statusModalState;

      // Tạo request body dựa trên trạng thái hiện tại
      const requestBody = {
        placeId: placeId,
        newStatus: currentStatus === "Active" ? "Inactive" : "Active",
        inactiveFrom:
          currentStatus === "Active" ? statusFormData.inactiveFrom : null,
        inactiveTo:
          currentStatus === "Active" && !statusFormData.isPermanent
            ? statusFormData.inactiveTo
            : null,
        reason: statusFormData.reason,
      };
      console.log("update status");
      const response = await axios.put(
        `${API_URL}/places/update-status`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      if (response.status === 200) {
        handleCloseStatusModal();
        // Hiển thị thông báo thành công
        fetchPlaces(); // Refresh danh sách
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      handleCloseStatusModal();
      // Hiển thị thông báo lỗi
    }
  };

  // Thêm state cho modal thông báo
  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    message: "",
  });

  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    message: "",
  });
  // Function to render rating stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`star-${i}`}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half-star"
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient
              id="half-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half-gradient)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      );
    }

    // Add empty stars to make total of 5
    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <svg
          key={`empty-star-${i}`}
          className="w-4 h-4 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return <div className="flex">{stars}</div>;
  };

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Get paginated places
  const { items: paginatedPlaces, totalPages } =
    getPaginatedResults(itemsPerPage);

  // Pagination handlers
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Render loading state
  if (loading) return <Loader />;

  // Render error state
  if (error)
    return (
      <div className="text-red-500 text-center my-10">
        Error loading data: {error.message}
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage="homestay-management" />
      <div className="flex-1 md:ml-64 p-6">
        <div className="max-w-6xl mx-auto">
          <DashboardHeader />
          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            Quản lý Homestay
          </h1>

          {/* Search and Filter section */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tìm theo tên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <button
                onClick={handleAddHomestay}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Thêm
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-700">Trạng thái</label>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Tất cả trạng thái</option>
                  <option value="Active">Hoạt động</option>
                  <option value="Inactive">Không hoạt động</option>
                  <option value="Pending">Chờ duyệt</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-700">Tầm giá</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Từ"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange("min", e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Đến"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange("max", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-700">
                  Đánh giá tối thiểu
                </label>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                >
                  <option value="">Bất kỳ</option>
                  <option value="3">3+ sao</option>
                  <option value="4">4+ sao</option>
                  <option value="4.5">4.5+ sao</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm text-gray-700">
                  Số khách tối đa
                </label>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  value={guestsFilter}
                  onChange={(e) => setGuestsFilter(e.target.value)}
                >
                  <option value="">Bất kỳ</option>
                  <option value="2">2+</option>
                  <option value="4">4+</option>
                  <option value="6">6+</option>
                  <option value="8">8+</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
              >
                Đặt lại
              </button>
            </div>
          </div>

          {/* Homestay Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        setSortOption(
                          sortOption === "id" && sortOption === "asc"
                            ? "desc"
                            : "asc"
                        )
                      }
                    >
                      <div className="flex items-center">
                        ID
                        {sortOption === "id" && (
                          <svg
                            className={`ml-1 w-4 h-4 ${
                              sortOption === "desc"
                                ? "transform rotate-180"
                                : ""
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        setSortOption(
                          sortOption === "name" ? "name-desc" : "name"
                        )
                      }
                    >
                      <div className="flex items-center">
                        Tên
                        {sortOption.includes("name") && (
                          <svg
                            className={`ml-1 w-4 h-4 ${
                              sortOption === "name-desc"
                                ? "transform rotate-180"
                                : ""
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Ảnh
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        setSortOption(
                          sortOption === "rating" ? "rating-desc" : "rating"
                        )
                      }
                    >
                      <div className="flex items-center">
                        Đánh giá
                        {sortOption.includes("rating") && (
                          <svg
                            className={`ml-1 w-4 h-4 ${
                              sortOption === "rating-desc"
                                ? "transform rotate-180"
                                : ""
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Danh mục
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        setSortOption(
                          sortOption === "price-low-high"
                            ? "price-high-low"
                            : "price-low-high"
                        )
                      }
                    >
                      <div className="flex items-center">
                        Giá
                        {sortOption.includes("price") && (
                          <svg
                            className={`ml-1 w-4 h-4 ${
                              sortOption === "price-high-low"
                                ? "transform rotate-180"
                                : ""
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        setSortOption(
                          sortOption === "maxGuests"
                            ? "maxGuests-desc"
                            : "maxGuests"
                        )
                      }
                    >
                      <div className="flex items-center">
                        Số khách tối đa
                        {sortOption.includes("maxGuests") && (
                          <svg
                            className={`ml-1 w-4 h-4 ${
                              sortOption === "maxGuests-desc"
                                ? "transform rotate-180"
                                : ""
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Trạng thái
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Lựa chọn
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedPlaces.length > 0 ? (
                    paginatedPlaces.map((place) => (
                      <tr key={place.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {place.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {place.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-16 h-16 rounded-md overflow-hidden">
                            {place.images && place.images.length > 0 ? (
                              <img
                                src={place.images[0].imageUrl || ""}
                                alt={place.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                                No image
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            {renderStars(place.rating)}
                            <span className="text-sm text-gray-500">
                              {place.rating} / 5
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {place.category || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {formatPrice(place.price)} VNĐ
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {place.maxGuests || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              place.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : place.status === "Inactive"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {place.status === "Active"
                              ? "Hoạt động"
                              : place.status === "Inactive"
                              ? "Không hoạt động"
                              : "Chờ duyệt"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2">
                            {place.status === "Pending" && isAdmin() ? (
                              // Show approve/decline buttons for pending homestays
                              <>
                                <button
                                  onClick={() => openApproveModal(place)}
                                  className="text-green-600 hover:text-green-900"
                                  title="Approve"
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 13l4 4L19 7"
                                    ></path>
                                  </svg>
                                </button>
                                <button
                                  onClick={() => openRejectModal(place)}
                                  className="text-red-600 hover:text-red-900"
                                  title="Decline"
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                  </svg>
                                </button>
                              </>
                            ) : (
                              // Show regular action buttons for non-pending homestays
                              <>
                                <button
                                  onClick={() => handleEditHomestay(place)}
                                  className="text-blue-600 hover:text-blue-900"
                                  title="Edit"
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    ></path>
                                  </svg>
                                </button>

                                {/* Nút chuyển đổi trạng thái */}

                                {place.status != "Pending" &&(<button
                                  onClick={() => handleToggleStatus(place)}
                                  className={`${
                                    place.status === "Active"
                                      ? "text-green-600 hover:text-green-900"
                                      : "text-gray-600 hover:text-gray-900"
                                  }`}
                                  title={
                                    place.status === "Active"
                                      ? "Vô hiệu hóa Homestay"
                                      : "Kích hoạt Homestay"
                                  }
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    ></path>
                                  </svg>
                                </button>)}

                                <button
                                  onClick={() => handleDeleteClick(place)}
                                  className="text-red-600 hover:text-red-900"
                                  title="Delete"
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    ></path>
                                  </svg>
                                </button>
                              </>
                            )}
                            {/* View details button is always shown */}
                            <button
                              onClick={() =>
                                window.open(
                                  `/place-details/${place.id}`,
                                  "_blank"
                                )
                              }
                              className="text-gray-600 hover:text-gray-900"
                              title="View details"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                ></path>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        Không tìm thấy kết quả nào phù hợp
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? "text-gray-400 bg-gray-100"
                      : "text-gray-700 bg-white hover:bg-gray-50"
                  }`}
                >
                  Trước
                </button>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? "text-gray-400 bg-gray-100"
                      : "text-gray-700 bg-white hover:bg-gray-50"
                  }`}
                >
                  Tiếp
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Hiển thị{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * itemsPerPage + 1}
                    </span>{" "}
                    đến{" "}
                    <span className="font-medium">
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredPlaces.length
                      )}
                    </span>{" "}
                    trong{" "}
                    <span className="font-medium">{filteredPlaces.length}</span>{" "}
                    kết quả được tìm thấy
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 ${
                        currentPage === 1
                          ? "text-gray-400 bg-gray-100"
                          : "text-gray-500 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Trước</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, index) => {
                      const pageNumber = index + 1;
                      // Show first, last, and pages around current page
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 &&
                          pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => goToPage(pageNumber)}
                            aria-current={
                              currentPage === pageNumber ? "page" : undefined
                            }
                            className={`${
                              currentPage === pageNumber
                                ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                          >
                            {pageNumber}
                          </button>
                        );
                      }

                      // Show ellipsis for gaps
                      if (
                        (pageNumber === 2 && currentPage > 3) ||
                        (pageNumber === totalPages - 1 &&
                          currentPage < totalPages - 2)
                      ) {
                        return (
                          <span
                            key={pageNumber}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                          >
                            ...
                          </span>
                        );
                      }

                      return null;
                    })}

                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 ${
                        currentPage === totalPages
                          ? "text-gray-400 bg-gray-100"
                          : "text-gray-500 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Tiếp</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Homestay Modal */}
      <HomestayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={currentHomestay}
        mode={modalMode}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Xác nhận xóa
            </h3>
            <p className="mb-4 text-gray-700">
              Bạn có chắc chắn muốn xóa homestay "{homestayToDelete?.name}"? Sau
              khi xóa sẽ không thể hoàn tác.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={approveModal.isOpen}
        onClose={() => setApproveModal({ isOpen: false, placeId: null })}
        onContinue={handleApproveHomestay}
        status="warning"
        title="Xác nhận phê duyệt"
        message="Bạn có chắc chắn muốn phê duyệt homestay này không?"
        confirmText="Phê duyệt"
      />

      {/* Modal xác nhận từ chối */}
      <Modal
        isOpen={rejectModal.isOpen}
        onClose={() => setRejectModal({ isOpen: false, placeId: null })}
        onContinue={handleRejectConfirm}
        status="error"
        title="Xác nhận từ chối"
        message="Bạn có chắc chắn muốn từ chối homestay này không?"
        confirmText="Tiếp tục"
      />

      {/* Modal nhập lý do từ chối - Custom modal */}
      <RejectReasonModal />

      {/* Modal thành công */}
      <Modal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ isOpen: false, message: "" })}
        status="success"
        title="Thành công"
        message={successModal.message}
      />

      {/* Modal lỗi */}
      <Modal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: "" })}
        status="error"
        title="Lỗi"
        message={errorModal.message}
      />

      <StatusToggleModal
        isOpen={statusModalState.isOpen}
        onClose={handleCloseStatusModal}
        placeId={statusModalState.placeId}
        currentStatus={statusModalState.currentStatus}
        formData={statusFormData}
        onFormChange={handleStatusFormChange}
        onSubmit={handleSubmitStatusChange}
      />
    </div>
  );
};

export default HomestayManagement;
