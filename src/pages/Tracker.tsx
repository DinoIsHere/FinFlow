import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Plus, Download } from "lucide-react";

const budgetCategories = [
  { name: "Food & Dining", budget: 400, spent: 320, color: "hsl(195 100% 50%)" },
  { name: "Transportation", budget: 200, spent: 150, color: "hsl(165 80% 45%)" },
  { name: "Entertainment", budget: 300, spent: 280, color: "hsl(280 65% 55%)" },
  { name: "Shopping", budget: 250, spent: 200, color: "hsl(220 20% 60%)" },
  { name: "Bills & Utilities", budget: 150, spent: 150, color: "hsl(210 20% 70%)" },
];

export default function Tracker() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Budget Tracker</h1>
          <p className="text-muted-foreground">Monitor your spending and stay on track with your goals</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-primary border-0 md:col-span-3">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-primary-foreground/80 mb-1">Total Budget</p>
                <p className="text-3xl font-bold text-primary-foreground">Rp 20,150,000</p>
              </div>
              <div>
                <p className="text-sm text-primary-foreground/80 mb-1">Total Spent</p>
                <p className="text-3xl font-bold text-primary-foreground">Rp 17,050,000</p>
              </div>
              <div>
                <p className="text-sm text-primary-foreground/80 mb-1">Remaining</p>
                <p className="text-3xl font-bold text-primary-foreground">Rp 3,100,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Add Transaction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="bg-muted border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food & Dining</SelectItem>
                  <SelectItem value="transport">Transportation</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="bills">Bills & Utilities</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="What did you spend on?"
                className="bg-muted border-border"
              />
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {budgetCategories.map((category, index) => {
              const percentage = (category.spent / category.budget) * 100;
              const isOverBudget = percentage > 100;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
                    <span className={`text-sm font-medium ${isOverBudget ? 'text-destructive' : 'text-muted-foreground'}`}>
                      Rp {(category.spent * 15500).toLocaleString()} / Rp {(category.budget * 15500).toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className="h-2"
                    style={{
                      // @ts-ignore
                      '--progress-background': category.color
                    }}
                  />
                  <p className="text-xs text-muted-foreground">
                    {isOverBudget 
                      ? `${(percentage - 100).toFixed(0)}% over budget` 
                      : `${(100 - percentage).toFixed(0)}% remaining`}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
