import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, Calendar, Building, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { mockCategories } from '../../data/mockData';

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: SearchFilters) => void;
}

interface SearchFilters {
  query: string;
  categories: string[];
  sourceTypes: string[];
  dateRange: string;
  sortBy: string;
}

export function AdvancedSearch({ isOpen, onClose, onSearch }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    categories: [],
    sourceTypes: [],
    dateRange: '',
    sortBy: 'relevance'
  });

  const sourceTypes = [
    { id: 'government', label: 'Government', icon: Building },
    { id: 'educational', label: 'Educational', icon: FileText },
    { id: 'legal', label: 'Legal', icon: FileText }
  ];

  const dateRanges = [
    { value: '', label: 'Any time' },
    { value: 'week', label: 'Past week' },
    { value: 'month', label: 'Past month' },
    { value: 'year', label: 'Past year' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'date', label: 'Date updated' },
    { value: 'downloads', label: 'Most downloaded' }
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleSourceTypeToggle = (sourceType: string) => {
    setFilters(prev => ({
      ...prev,
      sourceTypes: prev.sourceTypes.includes(sourceType)
        ? prev.sourceTypes.filter(type => type !== sourceType)
        : [...prev.sourceTypes, sourceType]
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
    onClose();
  };

  const handleClearFilters = () => {
    setFilters({
      query: '',
      categories: [],
      sourceTypes: [],
      dateRange: '',
      sortBy: 'relevance'
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || 
                          filters.sourceTypes.length > 0 || 
                          filters.dateRange !== '' ||
                          filters.query !== '';

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title="Advanced Search">
      <div className="space-y-6">
        {/* Search Query */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Query
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={filters.query}
              onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
              placeholder="Enter keywords..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Categories
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {mockCategories.map((category) => (
              <label
                key={category.id}
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mr-3"
                />
                <span className="text-sm text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Source Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Source Types
          </label>
          <div className="grid grid-cols-3 gap-2">
            {sourceTypes.map((sourceType) => {
              const Icon = sourceType.icon;
              return (
                <label
                  key={sourceType.id}
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.sourceTypes.includes(sourceType.id)}
                    onChange={() => handleSourceTypeToggle(sourceType.id)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mr-3"
                  />
                  <Icon className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">{sourceType.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Date Range and Sort */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                {dateRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-primary-900">Active Filters</h4>
              <button
                onClick={handleClearFilters}
                className="text-primary-600 hover:text-primary-800 text-sm font-medium"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.categories.map((categoryId) => {
                const category = mockCategories.find(c => c.id === categoryId);
                return category ? (
                  <span
                    key={categoryId}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                  >
                    {category.name}
                    <button
                      onClick={() => handleCategoryToggle(categoryId)}
                      className="ml-1.5 text-primary-600 hover:text-primary-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ) : null;
              })}
              {filters.sourceTypes.map((sourceType) => (
                <span
                  key={sourceType}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                >
                  {sourceType}
                  <button
                    onClick={() => handleSourceTypeToggle(sourceType)}
                    className="ml-1.5 text-emerald-600 hover:text-emerald-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button onClick={handleSearch} variant="primary" className="flex-1">
            <Search className="w-4 h-4 mr-2" />
            Search Forms
          </Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}