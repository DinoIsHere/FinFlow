import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative";
  icon: LucideIcon;
  className?: string;
}

export function StatCard({ title, value, change, changeType, icon: Icon, className = "" }: StatCardProps) {
  return (
    <Card className={`bg-card border-border hover:border-primary/50 transition-all hover-lift ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {change && (
              <p className={`text-sm font-medium ${
                changeType === "positive" ? "text-success" : "text-destructive"
              }`}>
                {change}
              </p>
            )}
          </div>
          <div className="p-3 rounded-xl bg-gradient-primary float">
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
