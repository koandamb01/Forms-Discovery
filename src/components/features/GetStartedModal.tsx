import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  BookOpen, 
  User, 
  ArrowRight, 
  FileText, 
  Zap,
  CheckCircle
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useNavigate } from 'react-router-dom';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();

  const options = [
    {
      id: 'search',
      title: 'Search for Forms',
      description: 'Find specific forms using our AI-powered search',
      icon: Search,
      color: 'blue',
      action: () => {
        onClose();
        navigate('/');
        // Focus on search bar after navigation
        setTimeout(() => {
          const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
          }
        }, 100);
      }
    },
    {
      id: 'browse',
      title: 'Browse Categories',
      description: 'Explore forms organized by topic and purpose',
      icon: BookOpen,
      color: 'green',
      action: () => {
        onClose();
        navigate('/categories');
      }
    },
    {
      id: 'popular',
      title: 'Popular Forms',
      description: 'Start with the most downloaded forms',
      icon: FileText,
      color: 'purple',
      action: () => {
        onClose();
        navigate('/?section=popular');
      }
    },
    {
      id: 'ai',
      title: 'Ask AI Assistant',
      description: 'Get personalized form recommendations',
      icon: Zap,
      color: 'orange',
      action: () => {
        onClose();
        // Trigger AI assistant
        const event = new CustomEvent('openAIAssistant');
        window.dispatchEvent(event);
      }
    }
  ];

  const quickActions = [
    { label: 'Tax Forms', query: 'tax forms' },
    { label: 'Immigration', query: 'immigration forms' },
    { label: 'Business Registration', query: 'business registration' },
    { label: 'Student Aid', query: 'student financial aid' }
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50 hover:bg-blue-100',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      text: 'text-blue-700'
    },
    green: {
      bg: 'bg-green-50 hover:bg-green-100',
      border: 'border-green-200',
      icon: 'text-green-600',
      text: 'text-green-700'
    },
    purple: {
      bg: 'bg-purple-50 hover:bg-purple-100',
      border: 'border-purple-200',
      icon: 'text-purple-600',
      text: 'text-purple-700'
    },
    orange: {
      bg: 'bg-orange-50 hover:bg-orange-100',
      border: 'border-orange-200',
      icon: 'text-orange-600',
      text: 'text-orange-700'
    }
  };

  const handleQuickSearch = (query: string) => {
    onClose();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title="Get Started with Forms Discovery">
      <div className="space-y-8">
        {/* Welcome Message */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-8 h-8 text-primary-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to Forms Discovery!
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Choose how you'd like to start finding the forms you need. 
            We're here to make the process as simple as possible.
          </p>
        </div>

        {/* Main Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option, index) => {
            const Icon = option.icon;
            const colors = colorClasses[option.color as keyof typeof colorClasses];
            
            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={option.action}
                onMouseEnter={() => setSelectedOption(option.id)}
                onMouseLeave={() => setSelectedOption(null)}
                className={`p-6 rounded-xl border-2 transition-all duration-200 text-left group ${colors.bg} ${colors.border}`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors.bg} ${colors.border} border`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-2 group-hover:${colors.text} transition-colors`}>
                      {option.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                  <ArrowRight className={`w-5 h-5 text-gray-400 group-hover:${colors.icon} group-hover:translate-x-1 transition-all duration-200`} />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Quick Search Options */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Or try these popular searches:
          </h3>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                onClick={() => handleQuickSearch(action.query)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                {action.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Need help? Our AI assistant is always available to guide you through the process.
          </p>
        </div>
      </div>
    </Modal>
  );
}