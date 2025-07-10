import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Key } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

export function ResetPasswordModal({ isOpen, onClose, onBackToLogin }: ResetPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  
  const { resetPassword } = useAuth();
  const { success, error } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await resetPassword(email);
      setIsEmailSent(true);
      success('Reset email sent!', 'Check your email for password reset instructions.');
    } catch (err) {
      error('Reset failed', 'Unable to send reset email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setIsEmailSent(false);
    onClose();
  };

  const handleBackToLogin = () => {
    setEmail('');
    setIsEmailSent(false);
    onBackToLogin();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Reset Password">
      <div className="space-y-6">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Key className="w-8 h-8 text-orange-600" />
          </motion.div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {isEmailSent ? 'Check Your Email' : 'Reset Your Password'}
          </h3>
          <p className="text-gray-600">
            {isEmailSent 
              ? 'We\'ve sent password reset instructions to your email address.'
              : 'Enter your email address and we\'ll send you instructions to reset your password.'
            }
          </p>
        </div>

        {!isEmailSent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="reset-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isSubmitting || !email}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                If an account with that email exists, you'll receive reset instructions shortly.
              </p>
            </div>
            
            <Button
              variant="primary"
              className="w-full"
              onClick={handleBackToLogin}
            >
              Back to Sign In
            </Button>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={handleBackToLogin}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Sign In
          </button>
        </div>
      </div>
    </Modal>
  );
}