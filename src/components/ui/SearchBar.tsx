import React, { useState, useCallback } from 'react';
import { Search, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchForms } from '../../utils/search';
import { Form } from '../../types';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  showSuggestions?: boolean;
  className?: string;
  onAskAI?: () => void;
}

export function SearchBar({ 
  onSearch, 
  placeholder = "Search forms...", 
  showSuggestions = true,
  className = "",
  onAskAI
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Form[]>([]);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);

  const handleInputChange = useCallback((value: string) => {
    setQuery(value);
    
    if (value.trim() && showSuggestions) {
      const results = searchForms(value, {}, 1, 5);
      setSuggestions(results.forms);
      setShowSuggestionsList(true);
    } else {
      setSuggestions([]);
      setShowSuggestionsList(false);
    }
  }, [showSuggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestionsList(false);
    }
  };

  const handleSuggestionClick = (form: Form) => {
    setQuery(form.title);
    onSearch(form.title);
    setShowSuggestionsList(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestionsList(false);
  };

  const handleAskAI = () => {
    if (onAskAI) {
      onAskAI();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-lg"
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestionsList(true);
              }
            }}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Ask AI Button */}
      {onAskAI && (
        <div className="mt-3 text-center">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={handleAskAI}
            className="inline-flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Can't find it? Ask our AI
          </motion.button>
        </div>
      )}

      <AnimatePresence>
        {showSuggestionsList && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-50 max-h-80 overflow-y-auto"
          >
            {suggestions.map((form) => (
              <button
                key={form.id}
                onClick={() => handleSuggestionClick(form)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="font-medium text-gray-900 truncate">{form.title}</div>
                <div className="text-sm text-gray-500 mt-1 line-clamp-2">{form.description}</div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}