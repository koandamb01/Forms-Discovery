export interface Form {
  id: string;
  title: string;
  slug: string;
  description: string;
  metaDescription: string;
  externalFileUrl: string;
  thumbnailUrl: string;
  sourceUrl: string;
  sourceName: string;
  sourceType: 'government' | 'educational' | 'legal' | 'manual' | 'user_submitted';
  categoryIds: string[];
  tags: string[];
  lastUpdated: string;
  downloadCount: number;
  viewCount: number;
  saveCount: number;
  isActive: boolean;
  isVerified: boolean;
  aiWhenToUse: string;
  aiImportantInfo: string;
  relatedFormIds: string[];
  createdBy: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  formCount: number;
  isActive: boolean;
  isFeatured: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  provider: string;
  subscriptionType: 'free' | 'premium' | 'enterprise';
  totalDownloads: number;
  totalSaves: number;
  favoriteCategories: string[];
  isActive: boolean;
}

export interface SearchResult {
  forms: Form[];
  totalCount: number;
  query: string;
  filters: SearchFilters;
}

export interface SearchFilters {
  categories: string[];
  sources: string[];
  dateRange: string;
  sortBy: 'relevance' | 'popularity' | 'date' | 'downloads';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  viewCount: number;
  createdBy: string;
}