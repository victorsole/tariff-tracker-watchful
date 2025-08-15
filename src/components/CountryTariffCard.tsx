import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface TariffData {
  id: number;
  country: string;
  product: string;
  rate: string;
  change: string;
  trend: "up" | "down" | "stable";
}

interface CountryTariffCardProps {
  tariff: TariffData;
}

export const CountryTariffCard = ({ tariff }: CountryTariffCardProps) => {
  const getTrendIcon = () => {
    switch (tariff.trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-chart-quaternary" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-chart-secondary" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (tariff.trend) {
      case "up":
        return "text-chart-quaternary";
      case "down":
        return "text-chart-secondary";
      default:
        return "text-muted-foreground";
    }
  };

  const getBadgeVariant = () => {
    switch (tariff.trend) {
      case "up":
        return "destructive";
      case "down":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-semibold text-card-foreground">{tariff.country}</h4>
            <p className="text-sm text-muted-foreground">{tariff.product}</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-card-foreground">{tariff.rate}</div>
            <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
              {getTrendIcon()}
              {tariff.change}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Badge variant={getBadgeVariant()} className="text-xs">
            {tariff.trend === "up" ? "Increased" : tariff.trend === "down" ? "Decreased" : "Stable"}
          </Badge>
          <span className="text-xs text-muted-foreground">Updated today</span>
        </div>
      </CardContent>
    </Card>
  );
};