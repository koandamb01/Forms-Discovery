import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, BookOpen, Home, Filter, Info, Mail, Crown, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { SearchBar } from '../ui/SearchBar';
import { AdvancedSearch } from '../features/AdvancedSearch';
import { NewsletterSignup } from '../features/NewsletterSignup';
import { AdminPanel } from '../features/AdminPanel';
import { GetStartedModal } from '../features/GetStartedModal';
import { Modal } from '../ui/Modal';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Categories', href: '/categories', icon: BookOpen },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    setIsSearchOpen(false);
    // Navigate to search results page
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  const handleAdvancedSearch = (filters: any) => {
    console.log('Advanced search filters:', filters);
    // Navigate to search results with filters
    const params = new URLSearchParams();
    if (filters.query) params.set('q', filters.query);
    if (filters.categories.length > 0) params.set('categories', filters.categories.join(','));
    if (filters.sourceTypes.length > 0) params.set('sources', filters.sourceTypes.join(','));
    if (filters.dateRange) params.set('date', filters.dateRange);
    if (filters.sortBy) params.set('sort', filters.sortBy);
    
    window.location.href = `/search?${params.toString()}`;
  };

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-sm">FD</span>
            </div>
            <span className="font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors">
              Forms Discovery
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActiveRoute(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
              title="Search"
            >
              <Search size={20} />
            </button>
            
            <button
              onClick={() => setIsAdvancedSearchOpen(true)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
              title="Advanced Search"
            >
              <Filter size={20} />
            </button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsNewsletterOpen(true)}
            >
              Newsletter
            </Button>

            <Link to="/premium">
              <Button variant="outline" size="sm">
                <Crown size={16} className="mr-2" />
                Premium
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/profile')}
            >
              <User size={16} className="mr-2" />
              Profile
            </Button>

            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsAdminPanelOpen(true)}
              title="Admin Panel"
            >
              <Settings size={16} />
            </Button>
            
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => setIsGetStartedOpen(true)}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="pb-4"
            >
              <SearchBar onSearch={handleSearch} className="max-w-2xl mx-auto" />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      isActiveRoute(item.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
              <div className="pt-4 mt-4 border-t border-gray-100 space-y-2">
                <SearchBar onSearch={handleSearch} placeholder="Search forms..." />
                <div className="flex space-x-2 pt-2">
                  <Link to="/premium" className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Crown size={16} className="mr-2" />
                      Premium
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate('/profile')}
                  >
                    Profile
                  </Button>
                  <Button 
                    variant="primary" 
                    className="flex-1"
                    onClick={() => {
                      setIsGetStartedOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AdvancedSearch 
        isOpen={isAdvancedSearchOpen} 
        onClose={() => setIsAdvancedSearchOpen(false)}
        onSearch={handleAdvancedSearch}
      />
      <Modal 
        isOpen={isNewsletterOpen} 
        onClose={() => setIsNewsletterOpen(false)}
        title="Subscribe to Newsletter"
      >
        <NewsletterSignup 
          variant="modal" 
          onSuccess={() => setIsNewsletterOpen(false)} 
        />
      </Modal>
      <AdminPanel 
        isOpen={isAdminPanelOpen} 
        onClose={() => setIsAdminPanelOpen(false)} 
      />
      <GetStartedModal 
        isOpen={isGetStartedOpen} 
        onClose={() => setIsGetStartedOpen(false)} 
      />
    </header>
  );
}