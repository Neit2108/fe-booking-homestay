import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import usePromotions from '../../hooks/usePromotions';
import axios from 'axios';
import { API_URL } from '../../../constant/config';

// Import components
import Sidebar from '../../components/Sidebar/Sidebar';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loading/Loader';
import Pagination from '../../components/Pagination/Pagination';
import PromotionFilters from '../../components/Promotion/PromotionFilters';
import PromotionTable from '../../components/Promotion/PromotionTable';
import PromotionForm from '../../components/Promotion/PromotionForm';
import DeleteConfirmationModal from '../../components/Promotion/DeleteConfirmationModal';

const PromotionManagement = () => {
  const { user} = useContext(UserContext);
  const { promotions, loading, fetchPromotions } = usePromotions();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  
  // Loading states
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  
  // Message states
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Reset currentPage when filters change
  useEffect(() => {
    if (!user || !user.token) {
      console.error("User or token is missing.");
      return;
    }
    setCurrentPage(1);
  }, [searchTerm, typeFilter, statusFilter]);

  // Filter the promotions based on search term, type, and status
  const filteredPromotions = promotions.filter(promo => {
    // Filter by search term
    const searchMatch = !searchTerm || 
      promo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.voucherCode?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by type
    const typeMatch = !typeFilter || promo.promotionType === typeFilter;
    
    // Filter by status - use promo.isActive directly from API
    const statusMatch = 
      statusFilter === '' || 
      (statusFilter === 'active' && promo.isActive) ||
      (statusFilter === 'expired' && !promo.isActive);
    
    return searchMatch && typeMatch && statusMatch;
  });

  // Get current promotions for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPromotions = filteredPromotions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPromotions.length / itemsPerPage);

  // Handler for changing page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handler for opening the add promotion modal
  const handleAddPromotion = () => {
    setSelectedPromotion(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  // Handler for opening the edit promotion modal
  const handleEditPromotion = (promotion) => {
    setSelectedPromotion(promotion);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  // Handler for opening the delete confirmation modal
  const handleDeleteClick = (promotion) => {
    setSelectedPromotion(promotion);
    setIsDeleteModalOpen(true);
  };

  // Handler for submitting the promotion form (both add and edit)
  const handleSubmitPromotion = async (formData) => {
    setSaveLoading(true);
    setErrorMessage('');
    
    try {
      if (modalMode === 'add') {
        // Create new promotion
        await axios.post(`${API_URL}/promotions/create-promotion`, formData, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        setSuccessMessage('Promotion created successfully!');
      } else {
        // Edit promotion - placeholder for API update
        setSuccessMessage('Promotion updated successfully!');
      }
      
      // Refresh the promotions list
      await fetchPromotions();
      
      // Close the modal
      setIsModalOpen(false);
      
      // Clear the success message after a delay
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error saving promotion:', error);
      
      const errorMsg = error.response?.data?.message || 'Error saving promotion';
      setErrorMessage(errorMsg);
    } finally {
      setSaveLoading(false);
    }
  };

  // Handler for confirming promotion deletion
  const handleDeletePromotion = async () => {
    if (!selectedPromotion) return;
    
    setDeleteLoading(true);
    setErrorMessage('');
    
    try {
      // Note: This is a placeholder. The actual delete API call would go here
      // when backend support is implemented
      
      setSuccessMessage('Promotion deleted successfully!');
      
      // Refresh the promotions list
      await fetchPromotions();
      
      // Close the modal
      setIsDeleteModalOpen(false);
      
      // Clear the success message after a delay
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error deleting promotion:', error);
      
      const errorMsg = error.response?.data?.message || 'Error deleting promotion';
      setErrorMessage(errorMsg);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setTypeFilter('');
    setStatusFilter('');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 p-8 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Promotion Management</h1>
            
            <button
              onClick={handleAddPromotion}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Promotion
            </button>
          </div>
          
          {/* Success/Error Messages */}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
              {successMessage}
            </div>
          )}
          
          {errorMessage && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {errorMessage}
            </div>
          )}
          
          {/* Filters Component */}
          <PromotionFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            resetFilters={resetFilters}
          />
          
          {/* Promotions Table with Loader */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader />
              </div>
            ) : filteredPromotions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No promotions found.</p>
                <button
                  onClick={handleAddPromotion}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add New Promotion
                </button>
              </div>
            ) : (
              <>
                <PromotionTable
                  promotions={currentPromotions}
                  onEdit={handleEditPromotion}
                  onDelete={handleDeleteClick}
                />
                
                {/* Pagination */}
                <div className="p-4 border-t border-gray-200">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Add/Edit Promotion Modal */}
      {isModalOpen && (
        <PromotionForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitPromotion}
          selectedPromotion={selectedPromotion}
          modalMode={modalMode}
          saveLoading={saveLoading}
          user={user}
        />
      )}
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeletePromotion}
          promotion={selectedPromotion}
          deleteLoading={deleteLoading}
        />
      )}
      
      {/* Success/Error Modal */}
      <Modal
        isOpen={!!successMessage || !!errorMessage}
        onClose={() => {
          setSuccessMessage('');
          setErrorMessage('');
        }}
        status={successMessage ? 'success' : 'error'}
        title={successMessage ? 'Success' : 'Error'}
        message={successMessage || errorMessage}
        confirmText="OK"
      />
    </div>
  );
};

export default PromotionManagement;