import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Download, 
  Search, 
  Eye, 
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  totalDownloads: number;
  totalSearches: number;
  totalViews: number;
  popularForms: Array<{
    id: string;
    title: string;
    downloads: number;
    views: number;
  }>;
  searchTrends: Array<{
    query: string;
    count: number;
    trend: 'up' | 'down' | 'stable';
  }>;
  userGrowth: Array<{
    date: string;
    users: number;
    downloads: number;
  }>;
}

export function AdvancedAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch analytics data
    const fetchAnalytics = async () => {
      setIsLoading(true);
      
      // Mock data - in real implementation, this would come from your analytics API
      const mockData: AnalyticsData = {
        totalUsers: 12543,
        totalDownloads: 45678,
        totalSearches: 23456,
        totalViews: 89012,
        popularForms: [
          { id: 'form_1040', title: 'Form 1040: Individual Income Tax Return', downloads: 5432, views: 12345 },
          { id: 'form_i485', title: 'Form I-485: Application to Register Permanent Residence', downloads: 3456, views: 8901 },
          { id: 'form_ss4', title: 'Form SS-4: Application for EIN', downloads: 2345, views: 6789 },
          { id: 'form_fafsa', title: 'FAFSA: Free Application for Federal Student Aid', downloads: 1987, views: 5432 },
          { id: 'form_w4', title: 'Form W-4: Employee Withholding Certificate', downloads: 1654, views: 4321 }
        ],
        searchTrends: [
          { query: 'tax forms', count: 1234, trend: 'up' },
          { query: 'green card application', count: 987, trend: 'up' },
          { query: 'business registration', count: 765, trend: 'stable' },
          { query: 'student aid', count: 543, trend: 'down' },
          { query: 'employment forms', count: 432, trend: 'up' }
        ],
        userGrowth: [
          { date: '2024-07-01', users: 10000, downloads: 35000 },
          { date: '2024-07-08', users: 10500, downloads: 37000 },
          { date: '2024-07-15', users: 11200, downloads: 40000 },
          { date: '2024-07-22', users: 11800, downloads: 42000 },
          { date: '2024-07-29', users: 12543, downloads: 45678 }
        ]
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalyticsData(mockData);
      setIsLoading(false);
    };

    fetchAnalytics();
  }, [timeRange]);

  if (isLoading) {
    return (
      <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  const stats = [
    {
      label: 'Total Users',
      value: analyticsData.totalUsers.toLocaleString(),
      icon: Users,
      change: '+12.5%',
      changeType: 'positive' as const
    },
    {
      label: 'Total Downloads',
      value: analyticsData.totalDownloads.toLocaleString(),
      icon: Download,
      change: '+8.3%',
      changeType: 'positive' as const
    },
    {
      label: 'Total Searches',
      value: analyticsData.totalSearches.toLocaleString(),
      icon: Search,
      change: '+15.7%',
      changeType: 'positive' as const
    },
    {
      label: 'Total Views',
      value: analyticsData.totalViews.toLocaleString(),
      icon: Eye,
      change: '+6.2%',
      changeType: 'positive' as const
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Track platform performance and user engagement</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Forms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center mb-6">
            <BarChart3 className="w-6 h-6 text-primary-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Popular Forms</h3>
          </div>
          
          <div className="space-y-4">
            {analyticsData.popularForms.map((form, index) => (
              <div key={form.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm">
                    {form.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {form.views.toLocaleString()} views
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {form.downloads.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">downloads</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center mb-6">
            <TrendingUp className="w-6 h-6 text-emerald-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Search Trends</h3>
          </div>
          
          <div className="space-y-4">
            {analyticsData.searchTrends.map((trend, index) => (
              <div key={trend.query} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm">
                    "{trend.query}"
                  </div>
                  <div className="text-xs text-gray-500">
                    {trend.count.toLocaleString()} searches
                  </div>
                </div>
                <div className="flex items-center">
                  <Activity 
                    className={`w-4 h-4 mr-1 ${
                      trend.trend === 'up' ? 'text-emerald-500' : 
                      trend.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                    }`} 
                  />
                  <span className={`text-xs font-medium ${
                    trend.trend === 'up' ? 'text-emerald-600' : 
                    trend.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {trend.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* User Growth Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
      >
        <div className="flex items-center mb-6">
          <PieChart className="w-6 h-6 text-accent-600 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">User Growth Over Time</h3>
        </div>
        
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Chart visualization would be implemented here</p>
            <p className="text-sm text-gray-500">Using Chart.js or similar library</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}