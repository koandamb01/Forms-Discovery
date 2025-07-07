import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  TrendingUp, 
  Globe, 
  FileText, 
  Target,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Edit,
  Save
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';

interface SEOData {
  pageTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  schemaMarkup: string;
}

interface SEOScore {
  overall: number;
  titleScore: number;
  descriptionScore: number;
  keywordsScore: number;
  structureScore: number;
  performanceScore: number;
}

interface KeywordData {
  keyword: string;
  volume: number;
  difficulty: number;
  position: number | null;
  trend: 'up' | 'down' | 'stable';
}

export function SEOManager() {
  const [selectedPage, setSelectedPage] = useState<string>('homepage');
  const [seoData, setSeoData] = useState<SEOData>({
    pageTitle: 'Forms Discovery Platform - Find Official Forms Fast',
    metaDescription: 'Discover and download official forms from government agencies, educational institutions, and legal resources. AI-powered search makes finding the right document effortless.',
    keywords: ['forms', 'government forms', 'legal documents', 'tax forms', 'immigration forms'],
    canonicalUrl: 'https://formsplatform.com',
    ogTitle: 'Forms Discovery Platform - Find Official Forms Fast',
    ogDescription: 'Discover and download official forms from government agencies, educational institutions, and legal resources.',
    ogImage: 'https://formsplatform.com/og-image.jpg',
    twitterTitle: 'Forms Discovery Platform',
    twitterDescription: 'Find official forms fast with AI-powered search',
    twitterImage: 'https://formsplatform.com/twitter-image.jpg',
    schemaMarkup: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Forms Discovery Platform",
      "url": "https://formsplatform.com"
    }, null, 2)
  });
  
  const [seoScore] = useState<SEOScore>({
    overall: 85,
    titleScore: 90,
    descriptionScore: 85,
    keywordsScore: 80,
    structureScore: 88,
    performanceScore: 82
  });

  const [keywords] = useState<KeywordData[]>([
    { keyword: 'government forms', volume: 12000, difficulty: 65, position: 3, trend: 'up' },
    { keyword: 'tax forms', volume: 45000, difficulty: 70, position: 5, trend: 'stable' },
    { keyword: 'immigration forms', volume: 8500, difficulty: 60, position: 2, trend: 'up' },
    { keyword: 'legal documents', volume: 15000, difficulty: 75, position: 8, trend: 'down' },
    { keyword: 'form download', volume: 6000, difficulty: 45, position: null, trend: 'stable' }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const { success, error } = useToast();

  const pages = [
    { id: 'homepage', name: 'Homepage', url: '/' },
    { id: 'categories', name: 'Categories', url: '/categories' },
    { id: 'search', name: 'Search Results', url: '/search' },
    { id: 'forms', name: 'Form Pages', url: '/forms/*' },
    { id: 'blog', name: 'Blog', url: '/blog' }
  ];

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      success('SEO settings saved', 'Your SEO configuration has been updated successfully.');
      setIsEditing(false);
    } catch (err) {
      error('Failed to save', 'There was an error saving your SEO settings.');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">SEO Manager</h2>
          <p className="text-gray-600">Optimize your content for search engines</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {pages.map((page) => (
              <option key={page.id} value={page.id}>
                {page.name}
              </option>
            ))}
          </select>
          
          {isEditing ? (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit SEO
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SEO Score Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">SEO Score</h3>
            
            <div className="text-center mb-6">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(seoScore.overall)}`}>
                {seoScore.overall}
              </div>
              <div className="text-sm text-gray-600">Overall Score</div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Title Optimization', score: seoScore.titleScore },
                { label: 'Meta Description', score: seoScore.descriptionScore },
                { label: 'Keywords', score: seoScore.keywordsScore },
                { label: 'Structure', score: seoScore.structureScore },
                { label: 'Performance', score: seoScore.performanceScore }
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.score >= 80 ? 'bg-green-500' :
                      item.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className={`text-sm font-medium ${getScoreColor(item.score)}`}>
                      {item.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Search className="w-4 h-4 mr-2" />
                Analyze Page
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Globe className="w-4 h-4 mr-2" />
                Generate Sitemap
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* SEO Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic SEO */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic SEO Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Title
                </label>
                <input
                  type="text"
                  value={seoData.pageTitle}
                  onChange={(e) => setSeoData(prev => ({ ...prev, pageTitle: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
                <div className="mt-1 text-xs text-gray-500">
                  {seoData.pageTitle.length}/60 characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={seoData.metaDescription}
                  onChange={(e) => setSeoData(prev => ({ ...prev, metaDescription: e.target.value }))}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
                <div className="mt-1 text-xs text-gray-500">
                  {seoData.metaDescription.length}/160 characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords
                </label>
                <input
                  type="text"
                  value={seoData.keywords.join(', ')}
                  onChange={(e) => setSeoData(prev => ({ 
                    ...prev, 
                    keywords: e.target.value.split(',').map(k => k.trim()) 
                  }))}
                  disabled={!isEditing}
                  placeholder="keyword1, keyword2, keyword3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Canonical URL
                </label>
                <input
                  type="url"
                  value={seoData.canonicalUrl}
                  onChange={(e) => setSeoData(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Social Media</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Open Graph */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Open Graph (Facebook)</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="OG Title"
                    value={seoData.ogTitle}
                    onChange={(e) => setSeoData(prev => ({ ...prev, ogTitle: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                  <textarea
                    placeholder="OG Description"
                    value={seoData.ogDescription}
                    onChange={(e) => setSeoData(prev => ({ ...prev, ogDescription: e.target.value }))}
                    disabled={!isEditing}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                  <input
                    type="url"
                    placeholder="OG Image URL"
                    value={seoData.ogImage}
                    onChange={(e) => setSeoData(prev => ({ ...prev, ogImage: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>

              {/* Twitter */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Twitter Cards</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Twitter Title"
                    value={seoData.twitterTitle}
                    onChange={(e) => setSeoData(prev => ({ ...prev, twitterTitle: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                  <textarea
                    placeholder="Twitter Description"
                    value={seoData.twitterDescription}
                    onChange={(e) => setSeoData(prev => ({ ...prev, twitterDescription: e.target.value }))}
                    disabled={!isEditing}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                  <input
                    type="url"
                    placeholder="Twitter Image URL"
                    value={seoData.twitterImage}
                    onChange={(e) => setSeoData(prev => ({ ...prev, twitterImage: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Keywords Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Keywords Performance</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Keyword</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Volume</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Difficulty</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Position</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {keywords.map((keyword, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-900">{keyword.keyword}</td>
                      <td className="py-3 px-4 text-gray-600">{keyword.volume.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          keyword.difficulty >= 70 ? 'bg-red-100 text-red-800' :
                          keyword.difficulty >= 50 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {keyword.difficulty}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {keyword.position ? `#${keyword.position}` : 'Not ranked'}
                      </td>
                      <td className="py-3 px-4">
                        <TrendingUp className={`w-4 h-4 ${
                          keyword.trend === 'up' ? 'text-green-500' :
                          keyword.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                        }`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}