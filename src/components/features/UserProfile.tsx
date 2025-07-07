import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Download, Bookmark, LogOut, Edit } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { mockUser } from '../../data/mockData';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfile({ isOpen, onClose }: UserProfileProps) {
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{formData.name}</h3>
                <p className="text-gray-600">{formData.email}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                  {mockUser.subscriptionType} Account
                </span>
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
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{mockUser.totalDownloads}</div>
                    <div className="text-sm text-gray-600">Total Downloads</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{mockUser.totalSaves}</div>
                    <div className="text-sm text-gray-600">Saved Forms</div>
                  </div>
                </div>
                <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
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
                { name: 'Form SS-4: Application for Employer Identification Number', date: '2024-07-05' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                { name: 'FAFSA: Free Application for Federal Student Aid', note: 'Next semester' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title="User Profile">
      <div className="flex flex-col h-96">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button variant="outline" className="w-full text-red-600 hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </Modal>
  );
}