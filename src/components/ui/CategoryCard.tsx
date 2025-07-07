import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Category } from '../../types';
import { Icon } from './Icon';

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer group hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
          style={{ backgroundColor: `${category.color}15` }}
        >
          <Icon 
            name={category.icon} 
            size={24} 
            className="group-hover:scale-110 transition-transform duration-200"
            style={{ color: category.color }}
          />
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
      </div>

      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
        {category.name}
      </h3>
      
      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
        {category.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">
          {category.formCount} forms
        </span>
        {category.isFeatured && (
          <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
            Popular
          </span>
        )}
      </div>
    </motion.div>
  );
}