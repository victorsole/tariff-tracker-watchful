import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  time: string;
  source: string;
  url: string;
}

interface NewsDataResponse {
  news: NewsItem[];
  lastUpdated: string;
  sources: string[];
  status: 'success' | 'fallback';
}

interface UseTradeNewsReturn {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const fallbackNews: NewsItem[] = [
  {
    id: 'fallback-1',
    title: 'Global Trade Tensions Continue to Shape Markets',
    summary: 'Ongoing trade policy developments affecting international commerce',
    time: '2 hours ago',
    source: 'Trade Monitor',
    url: 'https://policy.trade.ec.europa.eu/news_en'
  },
  {
    id: 'fallback-2',
    title: 'New Tariff Measures Under WTO Review',
    summary: 'World Trade Organization examining recent bilateral tariff implementations',
    time: '4 hours ago',
    source: 'WTO Updates',
    url: 'https://www.wto.org/english/tratop_e/tariffs_e/tariffs_e.htm'
  },
  {
    id: 'fallback-3',
    title: 'US Trade Data Shows Shifting Import Patterns',
    summary: 'Latest commerce department figures reveal changes in trade flows',
    time: '6 hours ago',
    source: 'Trade Analytics',
    url: 'https://www.trade.gov/data'
  }
];

export const useTradeNews = (): UseTradeNewsReturn => {
  const [news, setNews] = useState<NewsItem[]>(fallbackNews);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching trade news...');
      const { data, error: fetchError } = await supabase.functions.invoke('fetch-trade-news');
      
      if (fetchError) {
        console.error('Error fetching news:', fetchError);
        setError(fetchError.message);
        setNews(fallbackNews);
        return;
      }

      const newsResponse = data as NewsDataResponse;
      
      if (newsResponse && newsResponse.news) {
        setNews(newsResponse.news);
        console.log(`Loaded ${newsResponse.news.length} news items`);
      } else {
        setNews(fallbackNews);
      }
    } catch (err) {
      console.error('Error in fetchNews:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      setNews(fallbackNews);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return {
    news,
    loading,
    error,
    refetch: fetchNews
  };
};