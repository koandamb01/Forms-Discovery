import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Bookmark, ExternalLink } from 'lucide-react';
import { Form } from '../../types';
import { Icon } from './Icon';
import { mockCategories } from '../../data/mockData';

interface FormCardProps {
  form: Form;
  onClick?: () => void;
  showStats?: boolean;
}

export function FormCard({ form, onClick, showStats = true }: FormCardProps) {
  const category = mockCategories.find(cat => form.categoryIds.includes(cat.id));
  
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <img
            src={form.thumbnailUrl}
            alt={form.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
            <Icon name="file-text" size={32} className="text-blue-600" />
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 backdrop-blur">
            {form.sourceName}
          </span>
        </div>
        {form.isVerified && (
          <div className="absolute top-3 right-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Icon name="check" size={14} className="text-white" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {form.title}
          </h3>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors ml-2 flex-shrink-0" />
        </div>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {form.description}
        </p>

        {category && (
          <div className="flex items-center mb-4">
            <Icon name={category.icon} size={16} className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-500">{category.name}</span>
          </div>
        )}

        {showStats && (
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Download className="w-4 h-4 mr-1" />
                <span>{formatNumber(form.downloadCount)}</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                <span>{formatNumber(form.viewCount)}</span>
              </div>
              <div className="flex items-center">
                <Bookmark className="w-4 h-4 mr-1" />
                <span>{formatNumber(form.saveCount)}</span>
              </div>
            </div>
            <span className="text-xs">
              Updated {new Date(form.lastUpdated).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}