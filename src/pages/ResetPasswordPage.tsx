import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Key } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

export function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  
  const { resetPassword } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/signin')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Key className="w-8 h-8 text-orange-600" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isEmailSent ? 'Check Your Email' : 'Reset Your Password'}
            </h2>
            <p className="text-gray-600">
              {isEmailSent 
                ? 'We\'ve sent password reset instructions to your email address.'
                : 'Enter your email address and we\'ll send you instructions to reset your password.'
              }
            </p>
          </div>

          {!isEmailSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-green-800 text-sm">
                  If an account with that email exists, you'll receive reset instructions shortly.
                </p>
              </div>
              
              <Button 
                variant="primary" 
                className="w-full"
                onClick={() => navigate('/signin')}
              >
                Back to Sign In
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <Link
              to="/signin"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image (Hidden on mobile) */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Legal forms and documents"
        />
        <div className="absolute inset-0 bg-orange-600 bg-opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h3 className="text-3xl font-bold mb-4">
              Secure Account Recovery
            </h3>
            <p className="text-xl opacity-90">
              We'll help you get back to accessing your forms safely
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}