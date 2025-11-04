import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

class AnalyticsService {
  private isInitialized = false;

  init() {
    this.isInitialized = true;
    console.log('Analytics initialized');
  }

  trackPageView(path: string) {
    if (!this.isInitialized) return;
    
    console.log('Page view:', path);
    // Send to analytics service
  }

  trackEvent(event: AnalyticsEvent) {
    if (!this.isInitialized) return;
    
    console.log('Analytics event:', event);
    // Send to analytics service
  }


trackSearch(query: string, resultCount: number) {
  this.trackEvent({
    category: 'Search',
    action: 'Search Performed',
    label: query || 'empty',
    value: resultCount
  });
}

  trackHerbView(herbId: number, herbName: string) {
    this.trackEvent({
      category: 'Herb',
      action: 'Herb Viewed',
      label: herbName
    });
  }

  trackFavoriteAction(herbId: number, herbName: string, action: 'add' | 'remove') {
    this.trackEvent({
      category: 'User',
      action: `Favorite ${action === 'add' ? 'Added' : 'Removed'}`,
      label: herbName
    });
  }

  trackSearchResultClick(herbId: number, herbName: string, position: number) {
    this.trackEvent({
      category: 'Search',
      action: 'Result Clicked',
      label: herbName,
      value: position
    });
  }
}

export const analyticsService = new AnalyticsService();

// Initialize analytics
analyticsService.init();

// Hook for page view tracking - must be used within Router context
export const usePageViewTracking = () => {
  const location = useLocation();

  useEffect(() => {
    analyticsService.trackPageView(location.pathname + location.search);
  }, [location]);
};

// Hook for custom event tracking
export const useAnalytics = () => {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    analyticsService.trackEvent(event);
  }, []);

  const trackSearch = useCallback((query: string, resultCount: number) => {
    analyticsService.trackSearch(query, resultCount);
  }, []);

  const trackHerbView = useCallback((herbId: number, herbName: string) => {
    analyticsService.trackHerbView(herbId, herbName);
  }, []);

  const trackFavorite = useCallback((herbId: number, herbName: string, action: 'add' | 'remove') => {
    analyticsService.trackFavoriteAction(herbId, herbName, action);
  }, []);

  const trackSearchResultClick = useCallback((herbId: number, herbName: string, position: number) => {
    analyticsService.trackSearchResultClick(herbId, herbName, position);
  }, []);

  return {
    trackEvent,
    trackSearch,
    trackHerbView,
    trackFavorite,
    trackSearchResultClick
  };
};