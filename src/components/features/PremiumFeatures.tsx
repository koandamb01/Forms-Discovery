import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Zap, 
  Download, 
  Bookmark, 
  Search,
  MessageCircle,
  Shield,
  Star,
  Check,
  X
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useToast } from '../../hooks/useToast';

interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
}

interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  available: boolean;
}

export function PremiumFeatures() {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');
  const { success, error } = useToast();

  const plans: PremiumPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      interval: 'month',
      features: [
        'Access to basic forms',
        'Standard search',
        '5 downloads per day',
        'Basic AI assistance',
        'Email support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: billingInterval === 'month' ? 9.99 : 99.99,
      interval: billingInterval,
      popular: true,
      features: [
        'Unlimited form downloads',
        'Advanced AI assistance',
        'Priority search results',
        'Form completion guidance',
        'Save unlimited forms',
        'Export to multiple formats',
        'Priority email support',
        'Ad-free experience'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingInterval === 'month' ? 29.99 : 299.99,
      interval: billingInterval,
      features: [
        'Everything in Premium',
        'API access',
        'Custom form requests',
        'Bulk form management',
        'Team collaboration',
        'Advanced analytics',
        'Dedicated support',
        'Custom integrations'
      ]
    }
  ];

  const premiumFeatures: PremiumFeature[] = [
    {
      id: 'unlimited_downloads',
      name: 'Unlimited Downloads',
      description: 'Download as many forms as you need without daily limits',
      icon: Download,
      available: true
    },
    {
      id: 'advanced_ai',
      name: 'Advanced AI Assistant',
      description: 'Get detailed form guidance and completion assistance',
      icon: MessageCircle,
      available: true
    },
    {
      id: 'priority_search',
      name: 'Priority Search',
      description: 'Get faster search results and better recommendations',
      icon: Search,
      available: true
    },
    {
      id: 'unlimited_saves',
      name: 'Unlimited Saves',
      description: 'Save and organize unlimited forms in your library',
      icon: Bookmark,
      available: true
    },
    {
      id: 'ad_free',
      name: 'Ad-Free Experience',
      description: 'Browse and download forms without any advertisements',
      icon: Shield,
      available: true
    },
    {
      id: 'priority_support',
      name: 'Priority Support',
      description: 'Get faster response times for your support requests',
      icon: Star,
      available: true
    }
  ];

  const handleUpgrade = async (planId: string) => {
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      success('Upgrade successful!', `You've been upgraded to ${plans.find(p => p.id === planId)?.name} plan.`);
      setIsUpgradeModalOpen(false);
    } catch (err) {
      error('Upgrade failed', 'Please try again or contact support.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 rounded-full text-sm font-medium mb-6"
        >
          <Crown className="w-4 h-4 mr-2" />
          Unlock Premium Features
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          Supercharge Your Form Discovery
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Get unlimited access to all forms, advanced AI assistance, and premium features 
          to streamline your document workflow.
        </motion.p>
      </div>

      {/* Billing Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex items-center justify-center"
      >
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setBillingInterval('month')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingInterval === 'month'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval('year')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingInterval === 'year'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Yearly
            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
              Save 17%
            </span>
          </button>
        </div>
      </motion.div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            className={`relative bg-white rounded-xl shadow-sm border-2 p-8 ${
              plan.popular 
                ? 'border-blue-500 ring-2 ring-blue-200' 
                : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">
                ${plan.price}
                {plan.price > 0 && (
                  <span className="text-lg font-normal text-gray-600">
                    /{plan.interval}
                  </span>
                )}
              </div>
              {plan.price > 0 && billingInterval === 'year' && (
                <p className="text-sm text-gray-600">
                  ${(plan.price / 12).toFixed(2)}/month billed annually
                </p>
              )}
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={plan.popular ? 'primary' : 'outline'}
              className="w-full"
              onClick={() => {
                setSelectedPlan(plan.id);
                if (plan.id !== 'free') {
                  setIsUpgradeModalOpen(true);
                }
              }}
            >
              {plan.id === 'free' ? 'Current Plan' : 'Upgrade Now'}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Premium Features Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8"
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            What You Get with Premium
          </h2>
          <p className="text-lg text-gray-600">
            Unlock powerful features designed to enhance your form discovery experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {premiumFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.name}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Upgrade Modal */}
      <Modal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)}
        title="Upgrade to Premium"
      >
        <div className="space-y-6">
          <div className="text-center">
            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ready to upgrade?
            </h3>
            <p className="text-gray-600">
              You're about to unlock all premium features and get unlimited access to our platform.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-gray-900">
                {plans.find(p => p.id === selectedPlan)?.name} Plan
              </span>
              <span className="text-2xl font-bold text-gray-900">
                ${plans.find(p => p.id === selectedPlan)?.price}
                <span className="text-sm font-normal text-gray-600">
                  /{plans.find(p => p.id === selectedPlan)?.interval}
                </span>
              </span>
            </div>
            
            <ul className="space-y-2">
              {plans.find(p => p.id === selectedPlan)?.features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setIsUpgradeModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              className="flex-1"
              onClick={() => handleUpgrade(selectedPlan)}
            >
              <Zap className="w-4 h-4 mr-2" />
              Upgrade Now
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}