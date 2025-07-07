import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter } from 'lucide-react';
import { FormCard } from '../components/ui/FormCard';
import { Icon } from '../components/ui/Icon';
import { mockCategories } from '../data/mockData';
import { getFormsByCategory } from '../utils/search';

export function CategoryDetailPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const category = mockCategories.find(cat => cat.id === categoryId);
  const forms = categoryId ? getFormsByCategory(categoryId) : [];

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Category not found</h1>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/categories')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Browse all categories
          </button>
        </div>
      </div>
    );
  }

  const handleFormClick = (formId: string) => {
    navigate(`/forms/${formId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/categories')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            All Categories
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: `${category.color}15` }}
          >
            <Icon 
              name={category.icon} 
              size={40} 
              style={{ color: category.color }}
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {category.name}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            {category.description}
          </p>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Filter className="w-4 h-4 mr-1" />
              {category.formCount} forms available
            </div>
            {category.isFeatured && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                Popular Category
              </span>
            )}
          </div>
        </motion.div>

        {/* Forms Grid */}
        {forms.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {forms.map((form, index) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <FormCard
                  form={form}
                  onClick={() => handleFormClick(form.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Icon name={category.icon} size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No forms available yet
            </h3>
            <p className="text-gray-600 mb-6">
              We're working on adding forms to this category. Check back soon!
            </p>
            <button
              onClick={() => navigate('/categories')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Browse other categories
            </button>
          </div>
        )}
      </div>
    </div>
  );
}