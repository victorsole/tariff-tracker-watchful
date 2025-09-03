import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  time: string;
  source: string;
  url: string;
}

interface NewsCardProps {
  news: NewsItem;
}

export const NewsCard = ({ news }: NewsCardProps) => {
  const handleClick = () => {
    window.open(news.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card 
      className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-200 cursor-pointer group"
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-sm leading-tight text-card-foreground group-hover:text-primary transition-colors">
            {news.title}
          </h4>
          <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
        </div>
        
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
          {news.summary}
        </p>
        
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
            {news.source}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {news.time}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};