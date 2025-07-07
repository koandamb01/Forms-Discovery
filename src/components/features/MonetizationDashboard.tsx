import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  MousePointer,
  Eye,
  ExternalLink,
  Settings,
  BarChart3,
  PieChart,
  Calendar
} from 'lucide-react';
import { Button } from '../ui/Button';

interface RevenueData {
  totalRevenue: number;
  adRevenue: number;
  affiliateRevenue: number;
  premiumRevenue: number;
  monthlyGrowth: number;
}

interface AdPerformance {
  impressions: number;
  clicks: number;
  ctr: number;
  cpm: number;
  revenue: number;
}

interface AffiliateLink {
  id: string;
  partner: string;
  formId: string;
  formTitle: string;
  clicks: number;
  conversions: number;
  revenue: number;
  conversionRate: number;
}

export function MonetizationDashboard() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  
  const revenueData: RevenueData = {
    totalRevenue: 2847.50,
    adRevenue: 1654.30,
    affiliateRevenue: 892.20,
    premiumRevenue: 301.00,
    monthlyGrowth: 12.5
  };

  const adPerformance: AdPerformance = {
    impressions: 125000,
    clicks: 1875,
    ctr: 1.5,
    cpm: 2.85,
    revenue: 1654.30
  };

  const affiliateLinks: AffiliateLink[] = [
    {
      id: 'aff_1',
      partner: 'LegalZoom',
      formId: 'form_lease',
      formTitle: 'Residential Lease Agreement',
      clicks: 234,
      conversions: 12,
      revenue: 360.00,
      conversionRate: 5.1
    },
    {
      id: 'aff_2',
      partner: 'TaxAct',
      formId: 'form_1040',
      formTitle: 'Form 1040: Individual Income Tax Return',
      clicks: 456,
      conversions: 23,
      revenue: 345.00,
      conversionRate: 5.0
    },
    {
      id: 'aff_3',
      partner: 'Rocket Lawyer',
      formId: 'form_will',
      formTitle: 'Last Will and Testament',
      clicks: 189,
      conversions: 8,
      revenue: 187.20,
      conversionRate: 4.2
    }
  ];

  const revenueStats = [
    {
      label: 'Total Revenue',
      value: `$${revenueData.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: `+${revenueData.monthlyGrowth}%`,
      changeType: 'positive' as const,
      color: 'blue'
    },
    {
      label: 'Ad Revenue',
      value: `$${revenueData.adRevenue.toFixed(2)}`,
      icon: Eye,
      change: '+8.3%',
      changeType: 'positive' as const,
      color: 'green'
    },
    {
      label: 'Affiliate Revenue',
      value: `$${revenueData.affiliateRevenue.toFixed(2)}`,
      icon: ExternalLink,
      change: '+15.7%',
      changeType: 'positive' as const,
      color: 'purple'
    },
    {
      label: 'Premium Revenue',
      value: `$${revenueData.premiumRevenue.toFixed(2)}`,
      icon: Users,
      change: '+22.1%',
      changeType: 'positive' as const,
      color: 'orange'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Monetization Dashboard</h2>
          <p className="text-gray-600">Track revenue streams and optimize monetization</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <Button variant="primary">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {revenueStats.map((stat, index) => {
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
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
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
        {/* Ad Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Ad Performance</h3>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Manage Ads
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {adPerformance.impressions.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Impressions</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {adPerformance.clicks.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Clicks</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {adPerformance.ctr}%
              </div>
              <div className="text-sm text-gray-600">CTR</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                ${adPerformance.cpm}
              </div>
              <div className="text-sm text-gray-600">CPM</div>
            </div>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-green-700 font-medium">Total Ad Revenue</span>
              <span className="text-green-900 font-bold text-lg">
                ${adPerformance.revenue.toFixed(2)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Revenue Breakdown Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center mb-6">
            <PieChart className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Revenue Breakdown</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                <span className="text-gray-700">Ad Revenue</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">
                  ${revenueData.adRevenue.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  {((revenueData.adRevenue / revenueData.totalRevenue) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                <span className="text-gray-700">Affiliate Revenue</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">
                  ${revenueData.affiliateRevenue.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  {((revenueData.affiliateRevenue / revenueData.totalRevenue) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded mr-3"></div>
                <span className="text-gray-700">Premium Revenue</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">
                  ${revenueData.premiumRevenue.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  {((revenueData.premiumRevenue / revenueData.totalRevenue) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 h-32 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Chart visualization</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Affiliate Links Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Affiliate Links Performance</h3>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Manage Links
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Form
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conv. Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {affiliateLinks.map((link) => (
                <tr key={link.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{link.partner}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {link.formTitle}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {link.clicks.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {link.conversions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      link.conversionRate >= 5 
                        ? 'bg-green-100 text-green-800' 
                        : link.conversionRate >= 3
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {link.conversionRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${link.revenue.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}