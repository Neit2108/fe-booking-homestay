import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../constant/config';

const PromotionForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  selectedPromotion, 
  modalMode, 
  saveLoading, 
  user 
}) => {
  const [places, setPlaces] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
    promotionType: 'Global',
    placeId: null,
    image: '',
    voucherCode: '',
    discount: 10,
    maxUsage: 100
  });

  // Fetch places for personal promotions
  useEffect(() => {
    if (isOpen && formData.promotionType === 'Personal') {
      const fetchPlaces = async () => {
        try {
          const response = await axios.get(`${API_URL}/places/get-all`);
          setPlaces(response.data || []);
        } catch (error) {
          console.error('Error fetching places:', error);
        }
      };

      fetchPlaces();
    }
  }, [isOpen, formData.promotionType]);

  // Initialize form with selected promotion data when editing
  useEffect(() => {
    if (selectedPromotion && modalMode === 'edit') {
      setFormData({
        name: selectedPromotion.name || '',
        title: selectedPromotion.title || '',
        description: selectedPromotion.description || '',
        startDate: selectedPromotion.startDate ? 
          new Date(selectedPromotion.startDate).toISOString().split('T')[0] : '',
        endDate: selectedPromotion.endDate ? 
          new Date(selectedPromotion.endDate).toISOString().split('T')[0] : '',
        promotionType: selectedPromotion.promotionType || 'Global',
        placeId: selectedPromotion.placeId || null,
        image: selectedPromotion.image || '',
        voucherCode: selectedPromotion.voucherCode || '',
        discount: selectedPromotion.discount || 10,
        maxUsage: 100
      });
    } else {
      // Reset form for new promotion
      setFormData({
        name: '',
        title: '',
        description: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
        promotionType: 'Global',
        placeId: null,
        image: '',
        voucherCode: '',
        discount: 10,
        maxUsage: 100
      });
    }
  }, [selectedPromotion, modalMode]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Generate a unique voucher code
  const generateVoucherCode = () => {
    if (!formData.title) {
      alert('Please enter a title first');
      return;
    }

    // Create code from title: uppercase, remove spaces, limit length
    const baseCode = formData.title
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .substring(0, 8);
      
    // Add current year
    const year = new Date().getFullYear();
    const generatedCode = `${baseCode}${year}`;
    
    setFormData(prev => ({
      ...prev,
      voucherCode: generatedCode
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.title || !formData.voucherCode || !formData.discount) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Prepare data for API
    const promotionRequest = {
      name: formData.name,
      title: formData.title,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      image: formData.image,
      promotionType: formData.promotionType,
      placeId: formData.promotionType === 'Personal' ? Number(formData.placeId) : null
    };
    
    const voucherRequest = {
      name: formData.name,
      code: formData.voucherCode,
      usageCount: 0,
      maxUsage: Number(formData.maxUsage),
      discount: Number(formData.discount),
      from: formData.startDate,
      to: formData.endDate
    };

    const submitData = {
      promotion: promotionRequest,
      voucher: voucherRequest
    };
    
    onSubmit(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-blue-600">
            {modalMode === 'edit' ? 'Edit Promotion' : 'Add New Promotion'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Promotion Information Section */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Promotion Information</h3>
            </div>
            
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Promotion Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Display Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Start Date */}
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date*
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* End Date */}
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date*
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Promotion Type */}
            <div>
              <label htmlFor="promotionType" className="block text-sm font-medium text-gray-700 mb-1">
                Promotion Type*
              </label>
              <select
                id="promotionType"
                name="promotionType"
                value={formData.promotionType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Global">Global (All Properties)</option>
                <option value="Personal">Personal (Specific Property)</option>
              </select>
            </div>

            {/* Place ID - Only show if promotion type is Personal */}
            {formData.promotionType === 'Personal' && (
              <div>
                <label htmlFor="placeId" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Property*
                </label>
                <select
                  id="placeId"
                  name="placeId"
                  value={formData.placeId || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required={formData.promotionType === 'Personal'}
                >
                  <option value="">Select a property</option>
                  {places.map(place => (
                    <option key={place.id} value={place.id}>{place.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            {/* Voucher Information Section */}
            <div className="md:col-span-2 border-t pt-4 mt-2">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Voucher Information</h3>
            </div>

            {/* Voucher Code */}
            <div>
              <label htmlFor="voucherCode" className="block text-sm font-medium text-gray-700 mb-1">
                Voucher Code*
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="voucherCode"
                  name="voucherCode"
                  value={formData.voucherCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={generateVoucherCode}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r-md hover:bg-gray-300"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* Discount */}
            <div>
              <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                Discount (%)*
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                min="1"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Max Usage */}
            <div>
              <label htmlFor="maxUsage" className="block text-sm font-medium text-gray-700 mb-1">
                Max Usage Count*
              </label>
              <input
                type="number"
                id="maxUsage"
                name="maxUsage"
                value={formData.maxUsage}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              disabled={saveLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
              disabled={saveLoading}
            >
              {saveLoading ? 'Saving...' : modalMode === 'edit' ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromotionForm;