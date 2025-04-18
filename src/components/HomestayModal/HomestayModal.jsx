import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const HomestayModal = ({ isOpen, onClose, onSubmit, initialData, mode = 'add'}) => {
  const { user } = useContext(UserContext);
  
  // Check if user is Admin
  const isAdmin = user && (
    (Array.isArray(user.role) && user.role.includes('Admin')) ||
    (typeof user.role === 'string' && user.role === 'Admin')
  );

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    category: 'homestay',
    description: '',
    price: '',
    maxGuests: '',
    ownerId: mode === 'add' && !isAdmin ? user?.id || '' : '',
    images: []
  });

  const [errors, setErrors] = useState({});
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  // Initialize form with data when editing
  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        name: initialData.name || '',
        address: initialData.address || '',
        category: initialData.category || 'homestay',
        description: initialData.description || '',
        price: initialData.price || '',
        maxGuests: initialData.maxGuests || '',
        ownerId: initialData.ownerId || '',
        images: initialData.images || []
      });

      // Create preview URLs for existing images
      if (initialData.images && initialData.images.length > 0) {
        const urls = initialData.images.map(img => img.imageUrl);
        setPreviewUrls(urls);
      }
    } else {
      // Reset form when adding new
      resetForm();
    }
  }, [initialData, mode, isOpen]);

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrls]);

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      category: 'homestay',
      description: '',
      price: '',
      maxGuests: '',
      ownerId: mode === 'add' && !isAdmin ? user?.id || '' : '',
      images: []
    });
    setImageFiles([]);
    setPreviewUrls([]);
    setErrors({});
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    // Create preview URLs for new files
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    
    setImageFiles([...imageFiles, ...files]);
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  // Remove image
  const handleRemoveImage = (index) => {
    // Remove from preview URLs
    const newPreviewUrls = [...previewUrls];
    const removedUrl = newPreviewUrls.splice(index, 1)[0];
    
    // Revoke object URL to free memory
    if (removedUrl.startsWith('blob:')) {
      URL.revokeObjectURL(removedUrl);
    }
    
    // Remove from image files if it's a new image
    if (index < imageFiles.length) {
      const newImageFiles = [...imageFiles];
      newImageFiles.splice(index, 1);
      setImageFiles(newImageFiles);
    }
    
    setPreviewUrls(newPreviewUrls);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (formData.maxGuests && (isNaN(formData.maxGuests) || parseInt(formData.maxGuests) <= 0)) {
      newErrors.maxGuests = 'Max guests must be a positive number';
    }
    
    if (mode === 'add' && previewUrls.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Create FormData for API submission
    const submitData = new FormData();
    
    // Add text fields
    Object.keys(formData).forEach(key => {
      if (key !== 'images') {
        submitData.append(key, formData[key]);
      }
    });
    
    // Add images
    imageFiles.forEach(file => {
      submitData.append('images', file);
    });
    
    // Add existing image IDs if editing
    if (mode === 'edit' && formData.images) {
      const existingImageIds = formData.images
        .map((img, idx) => previewUrls.includes(img.imageUrl) ? img.id : null)
        .filter(id => id !== null);
      
      submitData.append('existingImageIds', JSON.stringify(existingImageIds));
    }
    
    onSubmit(submitData, mode);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-blue-600">
            {mode === 'edit' ? 'Sửa thông tin Homestay' : 'Thêm Homestay mới'}
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
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">
                Tên địa điểm*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-1">
                Loại*
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="homestay">Homestay</option>
                <option value="resort">Resort</option>
                <option value="hotel">Hotel</option>
                <option value="villa">Villa</option>
              </select>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-bold text-gray-700 mb-1">
                Địa chỉ*
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-bold text-gray-700 mb-1">
                Giá*
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`w-full pl-7 pr-3 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  min="0"
                  step="0.01"
                />
              </div>
              {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
            </div>

            {/* Max Guests */}
            <div>
              <label htmlFor="maxGuests" className="block text-sm font-bold text-gray-700 mb-1">
                Số khách tối đa
              </label>
              <input
                type="number"
                id="maxGuests"
                name="maxGuests"
                value={formData.maxGuests}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.maxGuests ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                min="1"
                step="1"
              />
              {errors.maxGuests && <p className="mt-1 text-sm text-red-500">{errors.maxGuests}</p>}
            </div>

            {isAdmin && mode === 'add' && (
              <div>
                <label htmlFor="ownerId" className="block text-sm font-bold text-gray-700 mb-1">
                  Mã chủ nhà*
                </label>
                <input
                  type="text"
                  id="ownerId"
                  name="ownerId"
                  value={formData.ownerId}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.ownerId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter landlord ID"
                />
                {errors.ownerId && <p className="mt-1 text-sm text-red-500">{errors.ownerId}</p>}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-1">
              Mô tả
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          {/* Images */}
          <div className="mt-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Hình ảnh*{mode === 'add' ? '*' : ''}
            </label>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden h-32">
                  <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              
              <label className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span className="mt-2 text-sm text-gray-500">Add Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images}</p>}
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {mode === 'edit' ? 'Xác nhân' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomestayModal;