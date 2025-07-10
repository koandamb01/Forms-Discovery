import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';
import { SearchBar } from '../components/ui/SearchBar';
import { FormCard } from '../components/ui/FormCard';
import { Button } from '../components/ui/Button';
import { searchForms } from '../utils/search';
import { SearchFilters, SearchResult } from '../types';
import { mockCategories } from '../data/mockData';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    sources: [],
    dateRange: '',
    sortBy: 'relevance'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      const result = searchForms(query, filters, currentPage);
      setSearchResult(result);
    } else {
      // Show popular forms when no query
      const result = searchForms('', { sortBy: 'popularity' }, currentPage);
      setSearchResult(result);
    }
  }, [query, filters, currentPage]);

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim()) {
      setSearchParams({ q: newQuery });
    } else {
      setSearchParams({});
    }
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handleFormClick = (formId: string) => {
    navigate(`/forms/${formId}`);
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      sources: [],
      dateRange: '',
      sortBy: 'relevance'
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || 
                          filters.sources.length > 0 || 
                          filters.dateRange !== '';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              {query ? `Search Results` : 'Forms'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              {query 
                ? `Results for "${query}"` 
                : 'Discover and download official forms from government agencies, educational institutions, and legal resources. Browse our comprehensive collection or use the search above to find specific documents.'
              }
            </motion.p>
          </div>
          
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search forms..."
            className="max-w-2xl mx-auto"
          />
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 lg:mb-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Clear Filters */}
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                )}

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="popularity">Popularity</option>
                    <option value="date">Date Updated</option>
                    <option value="downloads">Most Downloaded</option>
                  </select>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categories
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {mockCategories.map((category) => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category.id)}
                          onChange={(e) => {
                            const newCategories = e.target.checked
                              ? [...filters.categories, category.id]
                              : filters.categories.filter(id => id !== category.id);
                            handleFilterChange({ categories: newCategories });
                          }}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Source Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Source Type
                  </label>
                  <div className="space-y-2">
                    {['government', 'educational', 'legal'].map((source) => (
                      <label key={source} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.sources.includes(source)}
                          onChange={(e) => {
                            const newSources = e.target.checked
                              ? [...filters.sources, source]
                              : filters.sources.filter(s => s !== source);
                            handleFilterChange({ sources: newSources });
                          }}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">{source}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => handleFilterChange({ dateRange: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Any time</option>
                    <option value="week">Past week</option>
                    <option value="month">Past month</option>
                    <option value="year">Past year</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {searchResult && (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-gray-600">
                      {searchResult.totalCount} {searchResult.totalCount === 1 ? 'form' : 'forms'} found
                    </p>
                  </div>
                </div>

                {/* Results Grid */}
                {searchResult.forms.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {searchResult.forms.map((form, index) => (
                      <motion.div
                        key={form.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
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
                      <Search className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No forms found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search terms or filters
                    </p>
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}

                {/* Pagination */}
                {searchResult.forms.length > 0 && searchResult.totalCount > 20 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                      >
                        Previous
                      </Button>
                      <span className="px-4 py-2 text-sm text-gray-700">
                        Page {currentPage} of {Math.ceil(searchResult.totalCount / 20)}
                      </span>
                      <Button
                        variant="outline"
                        disabled={currentPage >= Math.ceil(searchResult.totalCount / 20)}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}