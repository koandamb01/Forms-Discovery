import { Form, SearchResult, SearchFilters } from '../types';
import { mockForms } from '../data/mockData';

export function searchForms(
  query: string,
  filters: Partial<SearchFilters> = {},
  page: number = 1,
  limit: number = 20
): SearchResult {
  let filteredForms = [...mockForms];

  // Text search
  if (query.trim()) {
    const searchTerms = query.toLowerCase().split(' ');
    filteredForms = filteredForms.filter(form => {
      const searchableText = `${form.title} ${form.description} ${form.tags.join(' ')}`.toLowerCase();
      return searchTerms.some(term => searchableText.includes(term));
    });
  }

  // Category filter
  if (filters.categories && filters.categories.length > 0) {
    filteredForms = filteredForms.filter(form =>
      form.categoryIds.some(catId => filters.categories!.includes(catId))
    );
  }

  // Source filter
  if (filters.sources && filters.sources.length > 0) {
    filteredForms = filteredForms.filter(form =>
      filters.sources!.includes(form.sourceType)
    );
  }

  // Sort results
  const sortBy = filters.sortBy || 'relevance';
  filteredForms.sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.downloadCount - a.downloadCount;
      case 'date':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      case 'downloads':
        return b.downloadCount - a.downloadCount;
      default: // relevance
        return b.viewCount - a.viewCount;
    }
  });

  // Pagination
  const startIndex = (page - 1) * limit;
  const paginatedForms = filteredForms.slice(startIndex, startIndex + limit);

  return {
    forms: paginatedForms,
    totalCount: filteredForms.length,
    query,
    filters: {
      categories: filters.categories || [],
      sources: filters.sources || [],
      dateRange: filters.dateRange || '',
      sortBy: filters.sortBy || 'relevance'
    }
  };
}

export function getPopularForms(limit: number = 10): Form[] {
  return [...mockForms]
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, limit);
}

export function getFormsByCategory(categoryId: string): Form[] {
  return mockForms.filter(form => form.categoryIds.includes(categoryId));
}

export function getRelatedForms(formId: string, limit: number = 4): Form[] {
  const form = mockForms.find(f => f.id === formId);
  if (!form) return [];

  // Find forms in the same categories
  const relatedForms = mockForms.filter(f => 
    f.id !== formId && 
    f.categoryIds.some(catId => form.categoryIds.includes(catId))
  );

  return relatedForms.slice(0, limit);
}