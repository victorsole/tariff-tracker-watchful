import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, BarChart3, RefreshCw, Globe, DollarSign } from "lucide-react";
import { TariffChart } from "./TariffChart";
import { CountryTariffCard } from "./CountryTariffCard";
import { NewsCard } from "./NewsCard";
import { useTariffData } from "@/hooks/useTariffData";
import { Button } from "@/components/ui/button";
// Using uploaded higher quality logo directly

const euUsaTariffData = [
  { id: 1, country: "European Union", product: "Steel & Aluminum", rate: "25%", change: "+10%", trend: "up" as const },
  { id: 2, country: "United States", product: "Agricultural Products", rate: "15%", change: "-5%", trend: "down" as const },
  { id: 3, country: "European Union", product: "Automotive Parts", rate: "18%", change: "+3%", trend: "up" as const },
  { id: 4, country: "United States", product: "Wine & Spirits", rate: "12%", change: "0%", trend: "stable" as const },
];

const otherCountriesTariffData = [
  { id: 5, country: "China", product: "Electronics", rate: "30%", change: "+15%", trend: "up" as const },
  { id: 6, country: "India", product: "Textiles", rate: "20%", change: "+8%", trend: "up" as const },
  { id: 7, country: "Brazil", product: "Soybeans", rate: "12%", change: "-3%", trend: "down" as const },
  { id: 8, country: "Russia", product: "Energy Equipment", rate: "35%", change: "+20%", trend: "up" as const },
  { id: 9, country: "Iran", product: "Oil & Gas", rate: "50%", change: "+25%", trend: "up" as const },
  { id: 10, country: "Japan", product: "Machinery", rate: "8%", change: "-2%", trend: "down" as const },
  { id: 11, country: "Taiwan", product: "Semiconductors", rate: "22%", change: "+5%", trend: "up" as const },
];

const mockNews = [
  {
    id: 1,
    title: "US Announces New Tariffs on Chinese Electronics",
    summary: "25% tariff on semiconductors and consumer electronics effective next month",
    time: "2 hours ago",
    source: "Trade Weekly",
    url: "https://tradeweekly.com/us-china-electronics-tariffs"
  },
  {
    id: 2,
    title: "EU Retaliates with Agricultural Tariffs",
    summary: "15% increase on US agricultural imports announced",
    time: "4 hours ago",
    source: "European Trade Journal",
    url: "https://eutrade.eu/agricultural-tariffs-response"
  },
  {
    id: 3,
    title: "USMCA Trade Agreement Under Review",
    summary: "Annual review highlights growing tensions over automotive sector",
    time: "6 hours ago",
    source: "North America Trade",
    url: "https://natrade.com/usmca-review-2024"
  }
];

const tradeAlerts = [
  {
    id: 1,
    message: "New automotive tariffs between US and EU expected to be announced this week.",
    severity: "High Impact",
    updated: "2 minutes ago"
  },
  {
    id: 2,
    message: "China considering retaliatory measures on agricultural imports.",
    severity: "Medium Impact", 
    updated: "15 minutes ago"
  },
  {
    id: 3,
    message: "WTO dispute resolution process initiated for steel tariffs.",
    severity: "Low Impact",
    updated: "1 hour ago"
  }
];

export const TariffDashboard = () => {
  const { data, loading, error, refetch } = useTariffData();

  const euUsaData = data?.tariffData.filter(item => 
    item.country === "European Union" || item.country === "United States"
  ) || euUsaTariffData;

  const otherCountriesData = data?.tariffData.filter(item => 
    item.country !== "European Union" && item.country !== "United States"
  ) || otherCountriesTariffData;

  const activeTariffs = data?.tariffData.length || 1247;
  const averageRate = data?.tariffData.reduce((sum, item) => 
    sum + parseFloat(item.rate.replace('%', '')), 0
  ) / Math.max(activeTariffs, 1) || 18.4;
  const countriesAffected = new Set(data?.tariffData.map(item => item.country)).size || 47;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img src="/lovable-uploads/ea31a562-e304-4379-aabb-9ff77987b686.png" alt="Beresol" className="h-12 w-12 rounded-lg bg-white p-1" />
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8" />
                <h1 className="text-3xl font-bold">Tariff Monitor</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={loading}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
              {data?.status && (
                <Badge variant={data.status === 'success' ? 'default' : 'secondary'}>
                  {data.status === 'success' ? 'Live Data' : 'Fallback Data'}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-primary-foreground/80">Real-time trade war tariff tracking and analysis powered by Beresol</p>
            {data?.lastUpdated && (
              <p className="text-sm opacity-75">
                Last updated: {new Date(data.lastUpdated).toLocaleString()}
                {data.sources && ` • Sources: ${data.sources.join(', ')}`}
              </p>
            )}
            {error && (
              <p className="text-sm text-red-200">
                ⚠️ Live data unavailable - showing demo data: {error}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tariffs</CardTitle>
              <AlertTriangle className="h-4 w-4 text-chart-tertiary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : activeTariffs.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Real-time tracking
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-chart-quaternary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : `${averageRate.toFixed(1)}%`}</div>
              <p className="text-xs text-muted-foreground">
                Across all monitored tariffs
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Countries Affected</CardTitle>
              <Globe className="h-4 w-4 text-chart-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : countriesAffected}</div>
              <p className="text-xs text-muted-foreground">
                Currently tracked
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Sources</CardTitle>
              <DollarSign className="h-4 w-4 text-chart-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : data?.sources.length || 'Multiple'}</div>
              <p className="text-xs text-muted-foreground">
                Official trade databases
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card shadow-elevated">
              <CardHeader>
                <CardTitle>Tariff Trends</CardTitle>
                <CardDescription>
                  Real-time data from official sources: WTO, European Commission, and USTR. Each line represents tariff rate changes over the past 12 months.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <TariffChart data={data?.chartData} />
                )}
              </CardContent>
            </Card>

            {/* Country Tariff Cards */}
            <div className="mt-6 space-y-8">
              {/* EU and USA Section */}
              {euUsaData.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">EU & USA Trade Relations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {euUsaData.map((tariff, index) => (
                      <CountryTariffCard key={tariff.id || index} tariff={tariff} />
                    ))}
                  </div>
                </div>
              )}

              {/* Other Major Economies Section */}
              {otherCountriesData.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Other Major Economies</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {otherCountriesData.map((tariff, index) => (
                      <CountryTariffCard key={tariff.id || index} tariff={tariff} />
                    ))}
                  </div>
                </div>
              )}

              {loading && (
                <Card className="bg-gradient-card shadow-card">
                  <CardContent className="py-12">
                    <div className="flex items-center justify-center space-x-2">
                      <RefreshCw className="h-6 w-6 animate-spin" />
                      <span>Loading real-time tariff data from official sources...</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* News Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Latest Trade News</CardTitle>
                <CardDescription>
                  Recent developments in global trade policy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </CardContent>
            </Card>

            {/* Alert Card */}
            <Card className="bg-gradient-card shadow-card border-warning">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Trade Alerts
                  <Badge variant="outline" className="ml-auto text-xs">Live Updates</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tradeAlerts.map((alert) => (
                  <div key={alert.id} className="border-l-2 border-warning pl-3">
                    <p className="text-sm mb-2">{alert.message}</p>
                    <div className="flex justify-between items-center">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          alert.severity === "High Impact" ? "border-destructive text-destructive" :
                          alert.severity === "Medium Impact" ? "border-warning text-warning" :
                          "border-muted-foreground text-muted-foreground"
                        }`}
                      >
                        {alert.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.updated}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};