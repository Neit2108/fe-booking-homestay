import React from 'react';

const PromotionTable = ({ 
  promotions, 
  onEdit, 
  onDelete 
}) => {
  if (promotions.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No promotions found.</p>
      </div>
    );
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Voucher Code
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Type
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Discount
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Start Date
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            End Date
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {promotions.map((promotion) => (
          <tr key={`promotion-${promotion.id || promotion.name}-${promotion.voucherCode || Math.random()}`} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                {promotion.image && (
                  <div className="flex-shrink-0 h-10 w-10 mr-3">
                    <img className="h-10 w-10 rounded object-cover" src={promotion.image} alt="" />
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium text-gray-900">{promotion.title}</div>
                  <div className="text-sm text-gray-500 truncate max-w-[200px]">
                    {promotion.description}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                {promotion.code}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                promotion.promotionType === 'Global' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {promotion.promotionType}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {promotion.discount}%
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {(promotion.startDate)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {(promotion.endDate)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                promotion.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {promotion.isActive ? 'Active' : 'Expired'}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                onClick={() => onEdit(promotion)}
                className="text-blue-600 hover:text-blue-900 mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(promotion)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PromotionTable;