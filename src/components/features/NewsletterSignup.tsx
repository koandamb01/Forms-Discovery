import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';

interface NewsletterSignupProps {
  variant?: 'inline' | 'modal';
  onSuccess?: () => void;
}

export function NewsletterSignup({ variant = 'inline', onSuccess }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { success, error } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isLoading) return;

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success
      setIsSubscribed(true);
      success('Successfully subscribed!', 'You\'ll receive updates about new forms and features.');
      onSuccess?.();
      
      // Reset form after delay
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    } catch (err) {
      error('Subscription failed', 'Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center p-6 bg-green-50 rounded-lg border border-green-200"
      >
        <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
        <div>
          <h3 className="font-semibold text-green-900">Thank you for subscribing!</h3>
          <p className="text-sm text-green-700">Check your email for confirmation.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {variant === 'modal' && (
        <div className="text-center mb-6">
          <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Stay Updated
          </h3>
          <p className="text-gray-600">
            Get notified when we add new forms and features to the platform.
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading || !email.trim()}
          className="whitespace-nowrap"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
}