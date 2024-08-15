import { Category, Collection } from '@/app/lib/definitions';
import { getTailwindColor } from '@/utils/colorMap';
import { getIconComponent } from '@/utils/iconMap';
import React, { useState } from 'react';


interface TestTableProps {
  categories?: Category[];
}

const TestTable: React.FC<TestTableProps> = ({ categories = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.collections || []).some(collection => 
      collection.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (categories.length === 0) {
    return (
      <div className="w-full p-4 text-center text-gray-500">
        No categories available.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="sticky top-0 bg-white z-10 p-4">
        <input
          type="text"
          placeholder="Search categories or collections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {filteredCategories.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-16 bg-white z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collections</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Decks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCategories.map((category) => {
              const totalDecks = (category.collections || []).reduce((sum, collection) => 
                sum + ((collection.decks && collection.decks.length) || 0), 0
              );
              
              return (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{category.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {(category.collections || []).map((collection: Collection) => {
                        const IconComponent = getIconComponent(collection.icon || 'help-circle');
                        const tailwindColor = getTailwindColor(collection.color || 'gray');
                        return (
                          <div key={collection.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                            <IconComponent className={`text-${tailwindColor}-500 h-4 w-4 mr-2`} />
                            <span className="text-sm">{collection.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{totalDecks}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(category.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(category.updatedAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="w-full p-4 text-center text-gray-500">
          No categories found matching your search.
        </div>
      )}
    </div>
  );
};

export default TestTable;