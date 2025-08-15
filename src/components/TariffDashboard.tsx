import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, BarChart3 } from "lucide-react";
import { TariffChart } from "./TariffChart";
import { CountryTariffCard } from "./CountryTariffCard";
import { NewsCard } from "./NewsCard";

const mockTariffData = [
  { id: 1, country: "China", product: "Steel", rate: "25%", change: "+10%", trend: "up" as const },
  { id: 2, country: "Mexico", product: "Automobiles", rate: "15%", change: "-5%", trend: "down" as const },
  { id: 3, country: "Canada", product: "Lumber", rate: "8%", change: "+3%", trend: "up" as const },
  { id: 4, country: "EU", product: "Wine", rate: "12%", change: "0%", trend: "stable" as const },
];

const mockNews = [
  {
    id: 1,
    title: "US Announces New Tariffs on Chinese Electronics",
    summary: "25% tariff on semiconductors and consumer electronics effective next month",
    time: "2 hours ago",
    source: "Trade Weekly"
  },
  {
    id: 2,
    title: "EU Retaliates with Agricultural Tariffs",
    summary: "15% increase on US agricultural imports announced",
    time: "4 hours ago",
    source: "European Trade Journal"
  },
  {
    id: 3,
    title: "USMCA Trade Agreement Under Review",
    summary: "Annual review highlights growing tensions over automotive sector",
    time: "6 hours ago",
    source: "North America Trade"
  }
];

export const TariffDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Tariff Monitor</h1>
          </div>
          <p className="text-primary-foreground/80">Real-time trade war tariff tracking and analysis</p>
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
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                +23 from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-chart-quaternary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.4%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Countries Affected</CardTitle>
              <TrendingDown className="h-4 w-4 text-chart-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">
                -3 from last quarter
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trade Impact</CardTitle>
              <BarChart3 className="h-4 w-4 text-chart-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$247B</div>
              <p className="text-xs text-muted-foreground">
                Estimated annual impact
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
                  Average tariff rates over the past 12 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TariffChart />
              </CardContent>
            </Card>

            {/* Country Tariff Cards */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Recent Tariff Changes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockTariffData.map((tariff) => (
                  <CountryTariffCard key={tariff.id} tariff={tariff} />
                ))}
              </div>
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
                  Trade Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  New automotive tariffs between US and EU expected to be announced this week.
                </p>
                <Badge variant="outline" className="border-warning text-warning">
                  High Impact
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};