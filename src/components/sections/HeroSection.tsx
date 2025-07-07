import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { SearchBar } from '../ui/SearchBar';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const navigate = useNavigate();

  const stats = [
    { label: 'Forms Available', value: '10,000+', icon: FileText },
    { label: 'Happy Users', value: '50,000+', icon: Users },
    { label: 'Average Rating', value: '4.9', icon: Star }
  ];

  const handleAskAI = () => {
    // This will trigger the AI assistant to open
    // We can dispatch a custom event or use a global state management solution
    const event = new CustomEvent('openAIAssistant');
    window.dispatchEvent(event);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-emerald-50 to-green-50 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Cpath d='m0 40 40-40h-20l-20 20v20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-8"
          >
            <Star className="w-4 h-4 mr-2 fill-current" />
            Trusted by 50,000+ users worldwide
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Find the right{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-emerald-600">
              forms
            </span>
            <br />
            in seconds
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Discover and download official forms from government agencies, educational institutions, 
            and legal resources. AI-powered search makes finding the right document effortless.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <SearchBar 
              onSearch={onSearch}
              onAskAI={handleAskAI}
              placeholder="Search for forms... (e.g., 'green card application', 'tax return')"
              className="shadow-xl"
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button variant="primary" size="lg" className="text-lg px-8 py-4" onClick={navigate('/categories')}>
              Browse Categories
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Popular Forms
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-md mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}