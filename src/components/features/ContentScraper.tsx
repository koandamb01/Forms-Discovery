import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Settings,
  Play,
  Pause,
  Eye
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';

interface ContentSource {
  id: string;
  name: string;
  baseUrl: string;
  sourceType: 'government' | 'educational' | 'legal' | 'corporate';
  isActive: boolean;
  lastScraped: string | null;
  nextScrapeScheduled: string | null;
  formsCount: number;
  successRate: number;
  errorCount: number;
  scrapingEnabled: boolean;
}

interface ScrapingJob {
  id: string;
  sourceId: string;
  sourceName: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt: string | null;
  completedAt: string | null;
  formsFound: number;
  formsUpdated: number;
  errors: string[];
}

export function ContentScraper() {
  const [sources, setSources] = useState<ContentSource[]>([]);
  const [jobs, setJobs] = useState<ScrapingJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { success, error } = useToast();

  useEffect(() => {
    // Mock data for content sources
    const mockSources: ContentSource[] = [
      {
        id: 'src_uscis',
        name: 'U.S. Citizenship and Immigration Services',
        baseUrl: 'https://www.uscis.gov',
        sourceType: 'government',
        isActive: true,
        lastScraped: '2024-07-29T10:30:00Z',
        nextScrapeScheduled: '2024-07-30T10:30:00Z',
        formsCount: 25,
        successRate: 0.95,
        errorCount: 2,
        scrapingEnabled: true
      },
      {
        id: 'src_irs',
        name: 'Internal Revenue Service',
        baseUrl: 'https://www.irs.gov',
        sourceType: 'government',
        isActive: true,
        lastScraped: '2024-07-29T08:15:00Z',
        nextScrapeScheduled: '2024-07-30T08:15:00Z',
        formsCount: 30,
        successRate: 0.92,
        errorCount: 5,
        scrapingEnabled: true
      },
      {
        id: 'src_dol',
        name: 'Department of Labor',
        baseUrl: 'https://www.dol.gov',
        sourceType: 'government',
        isActive: false,
        lastScraped: '2024-07-25T14:20:00Z',
        nextScrapeScheduled: null,
        formsCount: 18,
        successRate: 0.88,
        errorCount: 8,
        scrapingEnabled: false
      }
    ];

    const mockJobs: ScrapingJob[] = [
      {
        id: 'job_1',
        sourceId: 'src_uscis',
        sourceName: 'USCIS',
        status: 'completed',
        startedAt: '2024-07-29T10:30:00Z',
        completedAt: '2024-07-29T10:45:00Z',
        formsFound: 25,
        formsUpdated: 3,
        errors: []
      },
      {
        id: 'job_2',
        sourceId: 'src_irs',
        sourceName: 'IRS',
        status: 'running',
        startedAt: '2024-07-29T11:00:00Z',
        completedAt: null,
        formsFound: 0,
        formsUpdated: 0,
        errors: []
      },
      {
        id: 'job_3',
        sourceId: 'src_dol',
        sourceName: 'Department of Labor',
        status: 'failed',
        startedAt: '2024-07-25T14:20:00Z',
        completedAt: '2024-07-25T14:25:00Z',
        formsFound: 0,
        formsUpdated: 0,
        errors: ['Connection timeout', 'Invalid response format']
      }
    ];

    setSources(mockSources);
    setJobs(mockJobs);
    setIsLoading(false);
  }, []);

  const handleStartScraping = async (sourceId: string) => {
    const source = sources.find(s => s.id === sourceId);
    if (!source) return;

    // Create new job
    const newJob: ScrapingJob = {
      id: `job_${Date.now()}`,
      sourceId,
      sourceName: source.name,
      status: 'running',
      startedAt: new Date().toISOString(),
      completedAt: null,
      formsFound: 0,
      formsUpdated: 0,
      errors: []
    };

    setJobs(prev => [newJob, ...prev]);
    success('Scraping started', `Started scraping ${source.name}`);

    // Simulate scraping process
    setTimeout(() => {
      setJobs(prev => prev.map(job => 
        job.id === newJob.id 
          ? {
              ...job,
              status: 'completed',
              completedAt: new Date().toISOString(),
              formsFound: Math.floor(Math.random() * 20) + 10,
              formsUpdated: Math.floor(Math.random() * 5) + 1
            }
          : job
      ));
      success('Scraping completed', `Successfully scraped ${source.name}`);
    }, 5000);
  };

  const handleToggleSource = (sourceId: string) => {
    setSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, scrapingEnabled: !source.scrapingEnabled }
        : source
    ));
  };

  const getStatusIcon = (status: ScrapingJob['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'running':
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Content Scraper</h2>
          <p className="text-gray-600">Manage automated form collection from external sources</p>
        </div>
        <Button variant="primary">
          <Settings className="w-4 h-4 mr-2" />
          Configure Sources
        </Button>
      </div>

      {/* Sources Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Content Sources</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {sources.map((source) => (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{source.name}</h4>
                    <p className="text-sm text-gray-500">{source.baseUrl}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-600">
                        {source.formsCount} forms
                      </span>
                      <span className="text-sm text-gray-600">
                        {(source.successRate * 100).toFixed(1)}% success rate
                      </span>
                      <span className="text-sm text-gray-600">
                        Last scraped: {formatDate(source.lastScraped)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Scraping:</span>
                    <button
                      onClick={() => handleToggleSource(source.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        source.scrapingEnabled ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          source.scrapingEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStartScraping(source.id)}
                    disabled={!source.scrapingEnabled}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Scrape Now
                  </Button>

                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {source.errorCount > 0 && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                    <span className="text-sm text-red-700">
                      {source.errorCount} errors in recent scraping attempts
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Scraping Jobs</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {jobs.map((job) => (
            <div key={job.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(job.status)}
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {job.sourceName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Started: {formatDate(job.startedAt)}
                      {job.completedAt && ` • Completed: ${formatDate(job.completedAt)}`}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-900">
                    {job.formsFound > 0 && `${job.formsFound} forms found`}
                    {job.formsUpdated > 0 && ` • ${job.formsUpdated} updated`}
                  </div>
                  <div className={`text-sm font-medium ${
                    job.status === 'completed' ? 'text-green-600' :
                    job.status === 'running' ? 'text-blue-600' :
                    job.status === 'failed' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </div>
                </div>
              </div>

              {job.errors.length > 0 && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-sm text-red-700">
                    <strong>Errors:</strong>
                    <ul className="mt-1 list-disc list-inside">
                      {job.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}