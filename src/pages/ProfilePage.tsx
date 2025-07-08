import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Download, Bookmark, LogOut, Edit, Crown, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { mockUser } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'downloads' | 'saved'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'saved', label: 'Saved Forms', icon: Bookmark }
  ];

  const handleSave = () => {
    // In real implementation, this would update the user profile
    setIsEditing(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">{formData.name}</h3>
                <p className="text-gray-600">{formData.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Shield size={12} className="mr-1" />
                    {mockUser.subscriptionType} Account
                  </span>
                  {mockUser.subscriptionType === 'free' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/premium')}
                    >
                      <Crown size={14} className="mr-1" />
                      Upgrade
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button onClick={handleSave} variant="primary">
                    Save Changes
                  </Button>
                  <Button onClick={() => setIsEditing(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-gray-900">{mockUser.totalDownloads}</div>
                    <div className="text-sm text-gray-600">Total Downloads</div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-gray-900">{mockUser.totalSaves}</div>
                    <div className="text-sm text-gray-600">Saved Forms</div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-gray-900">4.9</div>
                    <div className="text-sm text-gray-600">Satisfaction Rating</div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/premium')}>
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      case 'downloads':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Downloads</h3>
            <div className="space-y-3">
              {[
                { name: 'Form I-485: Application to Register Permanent Residence', date: '2024-07-15' },
                { name: 'Form 1040: U.S. Individual Income Tax Return', date: '2024-07-10' },
                { name: 'Form SS-4: Application for Employer Identification Number', date: '2024-07-05' },
                { name: 'FAFSA: Free Application for Federal Student Aid', date: '2024-07-01' },
                { name: 'Residential Lease Agreement', date: '2024-06-28' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-600">Downloaded on {item.date}</div>
                  </div>
                  <Download className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'saved':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Saved Forms</h3>
            <div className="space-y-3">
              {[
                { name: 'Form I-130: Petition for Alien Relative', note: 'For spouse petition' },
                { name: 'Form W-4: Employee\'s Withholding Certificate', note: 'Update for new job' },
                { name: 'FAFSA: Free Application for Federal Student Aid', note: 'Next semester' },
                { name: 'Form 1040: U.S. Individual Income Tax Return', note: 'Tax season prep' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.note}</div>
                  </div>
                  <Bookmark className="w-4 h-4 text-blue-600" />
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My Profile
          </h1>
          <p className="text-xl text-gray-600">
            Manage your account settings and view your activity
          </p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Member since {new Date().getFullYear()}
              </div>
              <Button variant="outline" className="text-red-600 hover:bg-red-50 border-red-200">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}