import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TariffData {
  country: string;
  product: string;
  rate: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  source: string;
  lastUpdated: string;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  time: string;
  source: string;
  url: string;
}

interface ChartData {
  month: string;
  us: number;
  china: number;
  eu: number;
  mexico: number;
}

interface TariffDataResponse {
  tariffData: TariffData[];
  chartData: ChartData[];
  lastUpdated: string;
  sources: string[];
  status: 'success' | 'fallback';
}

interface NewsDataResponse {
  news: NewsItem[];
  lastUpdated: string;
  sources: string[];
  status: 'success' | 'fallback';
}

export const useTariffData = () => {
  const [data, setData] = useState<TariffDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: response, error: functionError } = await supabase.functions.invoke(
        'fetch-tariff-data',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (response) {
        setData(response);
      } else {
        throw new Error('No data received from API');
      }
    } catch (err) {
      console.error('Error fetching tariff data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      
      // Set fallback data
      setData({
        tariffData: [
          { country: "United States", product: "Steel & Aluminum", rate: "25%", change: "+10%", trend: "up", source: "Fallback", lastUpdated: new Date().toISOString() },
          { country: "China", product: "Technology Products", rate: "15%", change: "+5%", trend: "up", source: "Fallback", lastUpdated: new Date().toISOString() },
          { country: "European Union", product: "Agricultural Products", rate: "8%", change: "-2%", trend: "down", source: "Fallback", lastUpdated: new Date().toISOString() },
          { country: "Mexico", product: "Automotive Parts", rate: "12%", change: "+3%", trend: "up", source: "Fallback", lastUpdated: new Date().toISOString() },
        ],
        chartData: [
          { month: 'Jan', us: 12.5, china: 8.3, eu: 4.2, mexico: 6.1 },
          { month: 'Feb', us: 13.2, china: 9.1, eu: 4.5, mexico: 6.3 },
          { month: 'Mar', us: 15.8, china: 12.4, eu: 5.1, mexico: 7.2 },
          { month: 'Apr', us: 18.3, china: 15.7, eu: 5.8, mexico: 8.1 },
          { month: 'May', us: 21.2, china: 18.9, eu: 6.2, mexico: 8.9 },
          { month: 'Jun', us: 23.1, china: 22.3, eu: 7.1, mexico: 9.5 },
          { month: 'Jul', us: 24.8, china: 25.1, eu: 7.8, mexico: 10.2 },
          { month: 'Aug', us: 25.5, china: 26.8, eu: 8.3, mexico: 10.8 },
          { month: 'Sep', us: 26.2, china: 28.1, eu: 8.9, mexico: 11.3 },
          { month: 'Oct', us: 25.8, china: 27.5, eu: 9.2, mexico: 11.1 },
          { month: 'Nov', us: 24.9, china: 26.8, eu: 9.0, mexico: 10.9 },
          { month: 'Dec', us: 24.2, china: 25.9, eu: 8.7, mexico: 10.5 },
        ],
        lastUpdated: new Date().toISOString(),
        sources: ['Fallback'],
        status: 'fallback'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};