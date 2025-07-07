import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Download, 
  Eye, 
  Bookmark, 
  Share2, 
  ExternalLink, 
  Calendar,
  Shield,
  ArrowLeft,
  Info,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { FormCard } from '../components/ui/FormCard';
import { Icon } from '../components/ui/Icon';
import { mockForms, mockCategories } from '../data/mockData';
import { getRelatedForms } from '../utils/search';

export function FormDetailPage() {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  
  const form = mockForms.find(f => f.id === formId);
  const relatedForms = formId ? getRelatedForms(formId) : [];

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Form not found</h1>
          <p className="text-gray-600 mb-6">The form you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const categories = form.categoryIds.map(id => 
    mockCategories.find(cat => cat.id === id)
  ).filter(Boolean);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const handleDownload = () => {
    window.open(form.externalFileUrl, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: form.title,
          text: form.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Form Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    {categories.map((category, index) => (
                      <span
                        key={category?.id}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-2"
                      >
                        <Icon name={category?.icon || 'folder'} size={14} className="mr-1" />
                        {category?.name}
                      </span>
                    ))}
                    {form.isVerified && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <Shield size={14} className="mr-1" />
                        Verified
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {form.title}
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed mb-6">
                    {form.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 space-x-6">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Updated {new Date(form.lastUpdated).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {formatNumber(form.downloadCount)} downloads
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {formatNumber(form.viewCount)} views
                    </div>
                  </div>
                </div>

                <div className="ml-6 flex-shrink-0">
                  <img
                    src={form.thumbnailUrl}
                    alt={form.title}
                    className="w-32 h-40 object-cover rounded-lg shadow-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-32 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon name="file-text" size={32} className="text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleDownload}
                  className="flex-1 sm:flex-none"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Form
                </Button>
                
                <Button variant="outline" size="lg">
                  <Bookmark className="w-5 h-5 mr-2" />
                  Save
                </Button>
                
                <Button variant="outline" size="lg" onClick={handleShare}>
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
                
                <Button variant="outline" size="lg" onClick={() => window.open(form.sourceUrl, '_blank')}>
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Official Source
                </Button>
              </div>
            </motion.div>

            {/* Form Information */}
            <div className="space-y-8">
              {/* When to Use */}
              {form.aiWhenToUse && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-3 text-blue-600" />
                    When to Use This Form
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {form.aiWhenToUse}
                  </p>
                </motion.div>
              )}

              {/* Important Information */}
              {form.aiImportantInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-amber-50 border border-amber-200 rounded-xl p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <AlertCircle className="w-6 h-6 mr-3 text-amber-600" />
                    Important Information
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {form.aiImportantInfo}
                  </p>
                </motion.div>
              )}

              {/* Form Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Form Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Source</h3>
                    <p className="text-gray-700">{form.sourceName}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Source Type</h3>
                    <p className="text-gray-700 capitalize">{form.sourceType}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Last Updated</h3>
                    <p className="text-gray-700">{new Date(form.lastUpdated).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {form.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Downloads</span>
                  <span className="font-semibold text-gray-900">{formatNumber(form.downloadCount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-semibold text-gray-900">{formatNumber(form.viewCount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Saves</span>
                  <span className="font-semibold text-gray-900">{formatNumber(form.saveCount)}</span>
                </div>
              </div>
            </motion.div>

            {/* Related Forms */}
            {relatedForms.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Related Forms</h3>
                <div className="space-y-4">
                  {relatedForms.map((relatedForm) => (
                    <div
                      key={relatedForm.id}
                      onClick={() => navigate(`/forms/${relatedForm.id}`)}
                      className="cursor-pointer group"
                    >
                      <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <img
                          src={relatedForm.thumbnailUrl}
                          alt={relatedForm.title}
                          className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {relatedForm.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatNumber(relatedForm.downloadCount)} downloads
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}