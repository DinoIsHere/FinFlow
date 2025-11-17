import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";

const newsArticles = [
  {
    title: "Youth Savings Rates Hit 10-Year High",
    category: "Savings",
    summary: "Financial institutions report increased savings activity among young adults, with average balances up 15% compared to last year.",
    time: "2 hours ago",
    trending: "up",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=200&fit=crop",
  },
  {
    title: "New Study: Social Media Fueling Teen Spending",
    category: "Research",
    summary: "Recent research links social media usage to increased impulsive spending among teenagers, highlighting the need for financial education.",
    time: "5 hours ago",
    trending: "up",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
  },
  {
    title: "Student Loan Forgiveness Program Updates",
    category: "Policy",
    summary: "New provisions in student loan forgiveness programs could benefit millions of young borrowers starting next quarter.",
    time: "1 day ago",
    trending: "neutral",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop",
  },
  {
    title: "Cryptocurrency Volatility: What Young Investors Should Know",
    category: "Investing",
    summary: "Financial experts warn young investors about the risks of cryptocurrency investments amid recent market fluctuations.",
    time: "1 day ago",
    trending: "down",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=200&fit=crop",
  },
  {
    title: "Gen Z Leading the Charge in Sustainable Investing",
    category: "Trends",
    summary: "Young investors increasingly prioritize environmental and social factors when making investment decisions.",
    time: "2 days ago",
    trending: "up",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=200&fit=crop",
  },
  {
    title: "Mobile Banking Apps See Record Youth Adoption",
    category: "Technology",
    summary: "Digital banking platforms report 40% increase in users aged 16-24, transforming how young people manage money.",
    time: "3 days ago",
    trending: "up",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=200&fit=crop",
  },
];

export default function News() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Financial News</h1>
        <p className="text-muted-foreground">
          Stay updated with the latest financial news and trends affecting young people
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {newsArticles.map((article, index) => (
          <Card 
            key={index} 
            className="bg-card border-border hover:border-primary/50 transition-all group cursor-pointer overflow-hidden"
          >
            <div className="aspect-video w-full overflow-hidden bg-muted">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {article.category}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {article.time}
                </div>
              </div>
              <CardTitle className="text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground line-clamp-2">
                {article.summary}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {article.trending === "up" && (
                  <div className="flex items-center gap-1 text-success text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    Trending
                  </div>
                )}
                {article.trending === "down" && (
                  <div className="flex items-center gap-1 text-destructive text-sm font-medium">
                    <TrendingDown className="w-4 h-4" />
                    Declining
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
