import { Wallet, TrendingUp, CreditCard, Target, PieChart as PieChartIcon, TrendingDown } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ComposedChart } from "recharts";
import { useAssets } from "@/contexts/AssetContext";
import { TransactionManager } from "@/components/TransactionManager";
import { useTransactions } from "@/contexts/TransactionContext";
import { GoalsManager } from "@/components/GoalsManager";
import { useGoals } from "@/contexts/GoalsContext";

export default function Dashboard() {
  const { getTotalValue, getTotalChange, assets } = useAssets();
  const { getTotalIncome, getTotalExpenses, transactions, getTransactionsByCategory, getNetFlow } = useTransactions();
  const { goals, getTotalCurrentAmount, getTotalTargetAmount, getTotalProgress } = useGoals();
  
  const totalAssetsValue = getTotalValue();
  const totalChange = getTotalChange();
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const netFlow = getNetFlow();
  const goalsCurrent = getTotalCurrentAmount();
  const goalsTarget = getTotalTargetAmount();
  const goalsProgress = getTotalProgress();
  
// only active goals
  const activeGoalsCurrent = goals.filter(goal => goal.status === 'active').reduce((sum, goal) => sum + goal.currentAmount, 0);
  const netWorth = totalAssetsValue + activeGoalsCurrent;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

// spending data
  const getSpendingTrend = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    const trend = [];
    
    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const monthName = months[monthIndex];
      
      // filter month
      const monthTransactions = transactions.filter(t => {
        const txDate = new Date(t.date);
        const currentYear = new Date().getFullYear();
        return txDate.getMonth() === monthIndex && txDate.getFullYear() === currentYear;
      });
      
      const income = monthTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const expenses = monthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      trend.push({
        month: monthName,
        income,
        expenses,
        netFlow: income - expenses,
        cumulative: 0
      });
    }
    
    // calc cumulative
    let cumulative = 0;
    trend.forEach(item => {
      cumulative += item.netFlow;
      item.cumulative = totalAssetsValue + activeGoalsCurrent + cumulative;
    });
    
    return trend;
  };

  // category data
  const getCategoryData = () => {
    const categoryTotals = new Map<string, number>();
    const colors = [
      "hsl(195 100% 50%)", // c1
      "hsl(165 80% 45%)", // c2
      "hsl(280 65% 55%)", // c3
      "hsl(20 80% 50%)", // c4
      "hsl(45 90% 50%)", // c5
      "hsl(220 20% 60%)", // c6
      "hsl(320 70% 50%)", // c7
      "hsl(190 60% 40%)" // c8
    ];
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const current = categoryTotals.get(t.category) || 0;
        categoryTotals.set(t.category, current + Math.abs(t.amount));
      });
    
    return Array.from(categoryTotals.entries()).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length]
    }));
  };

  // asset allocation
  const getAssetAllocation = () => {
    const assetTypes = new Map<string, number>();
    
    assets.forEach(asset => {
      const current = assetTypes.get(asset.type) || 0;
      assetTypes.set(asset.type, current + asset.value);
    });
    
    const colors = [
      "hsl(165 80% 45%)",
      "hsl(195 100% 50%)",
      "hsl(280 65% 55%)",
      "hsl(20 80% 50%)",
      "hsl(45 90% 50%)",
      "hsl(220 20% 60%)"
    ];
    
    return Array.from(assetTypes.entries()).map(([name, value], index) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '),
      value,
      color: colors[index % colors.length]
    }));
  };

  // goals progress
  const getActiveGoalsData = () => {
    return goals.filter(goal => goal.status === 'active').map((goal, index) => ({
      name: goal.name.length > 15 ? goal.name.substring(0, 15) + '...' : goal.name,
      target: goal.targetAmount,
      current: goal.currentAmount,
      progress: (goal.currentAmount / goal.targetAmount) * 100,
      category: goal.category,
      id: goal.id
    }));
  };

  // goals metrics
  const activeGoals = goals.filter(goal => goal.status === 'active');
  const activeGoalsTarget = activeGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const activeGoalsProgress = activeGoalsTarget > 0 ? (activeGoalsCurrent / activeGoalsTarget) * 100 : 0;

  const spendingTrend = getSpendingTrend();
  const categoryData = getCategoryData();
  const assetAllocation = getAssetAllocation();
  const activeGoalsData = getActiveGoalsData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2 gradient-text">Financial Dashboard</h1>
        <p className="text-muted-foreground">Complete overview of your financial health and progress</p>
      </div>

      {/* metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Net Worth"
          value={formatCurrency(netWorth)}
          change={`${totalChange.change >= 0 ? '+' : ''}${totalChange.percent.toFixed(1)}% assets`}
          changeType={totalChange.change >= 0 ? "positive" : "negative"}
          icon={Wallet}
          className="glass-card hover-lift shimmer-border"
        />
        <StatCard
          title="Monthly Flow"
          value={formatCurrency(netFlow)}
          change={`Income: ${formatCurrency(totalIncome)} - Expenses: ${formatCurrency(totalExpenses)}`}
          changeType={netFlow >= 0 ? "positive" : "negative"}
          icon={netFlow >= 0 ? TrendingUp : TrendingDown}
          className="glass-card hover-lift shimmer-border"
        />
        <StatCard
          title="Active Goals"
          value={`${activeGoalsProgress.toFixed(1)}%`}
          change={`${formatCurrency(activeGoalsCurrent)} / ${formatCurrency(activeGoalsTarget)}`}
          changeType="positive"
          icon={Target}
          className="glass-card hover-lift shimmer-border"
        />
        <StatCard
          title="Total Assets"
          value={formatCurrency(totalAssetsValue)}
          change={`${totalChange.change >= 0 ? '+' : ''}${formatCurrency(totalChange.change)} today`}
          changeType={totalChange.change >= 0 ? "positive" : "negative"}
          icon={PieChartIcon}
          className="glass-card hover-lift shimmer-border"
        />
      </div>

      {/* trend charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Net Worth Trend</CardTitle>
            <p className="text-sm text-muted-foreground">Assets + Savings Goals Progress</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={spendingTrend}>
                <defs>
                  <linearGradient id="netWorth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(165 80% 45%)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(165 80% 45%)" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 20%)" />
                <XAxis dataKey="month" stroke="hsl(210 20% 60%)" />
                <YAxis stroke="hsl(210 20% 60%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220 20% 12%)",
                    border: "1px solid hsl(220 20% 20%)",
                    borderRadius: "0.75rem"
                  }}
                  formatter={(value: any) => [formatCurrency(value), 'Net Worth']}
                />
                <Area
                  type="monotone"
                  dataKey="cumulative"
                  stroke="hsl(165 80% 45%)"
                  fillOpacity={1}
                  fill="url(#netWorth)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <p className="text-sm text-muted-foreground">Monthly cash flow breakdown</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={spendingTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 20%)" />
                <XAxis dataKey="month" stroke="hsl(210 20% 60%)" />
                <YAxis stroke="hsl(210 20% 60%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220 20% 12%)",
                    border: "1px solid hsl(220 20% 20%)",
                    borderRadius: "0.75rem"
                  }}
                  formatter={(value: any, name: string) => [
                    formatCurrency(value),
                    name === 'income' ? 'Income' : name === 'expenses' ? 'Expenses' : 'Net Flow'
                  ]}
                />
                <Bar dataKey="income" fill="hsl(165 80% 45%)" />
                <Bar dataKey="expenses" fill="hsl(195 100% 50%)" />
                <Line
                  type="monotone"
                  dataKey="netFlow"
                  stroke="hsl(45 90% 50%)"
                  strokeWidth={3}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* charts area */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <p className="text-sm text-muted-foreground">This month's expenses breakdown</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220 20% 12%)",
                    border: "1px solid hsl(220 20% 20%)",
                    borderRadius: "0.75rem"
                  }}
                  formatter={(value: any) => [formatCurrency(value), 'Amount']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.slice(0, 6).map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span className="text-sm text-muted-foreground">{category.name}</span>
                  </div>
                  <span className="text-sm font-medium">{formatCurrency(category.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <p className="text-sm text-muted-foreground">Your investment portfolio distribution</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {assetAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220 20% 12%)",
                    border: "1px solid hsl(220 20% 20%)",
                    borderRadius: "0.75rem"
                  }}
                  formatter={(value: any) => [formatCurrency(value), 'Value']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {assetAllocation.map((asset, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }} />
                    <span className="text-sm text-muted-foreground">{asset.name}</span>
                  </div>
                  <span className="text-sm font-medium">{formatCurrency(asset.value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* goals and activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Active Goals Progress</CardTitle>
            <p className="text-sm text-muted-foreground">Track your active savings and investment goals</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activeGoalsData.length > 0 ? (
                activeGoalsData.slice(0, 4).map((goal, index) => {
                  const progress = (goal.current / goal.target) * 100;
                  return (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{goal.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{progress.toFixed(1)}% complete</span>
                        <span className="text-xs text-muted-foreground capitalize">{goal.category}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No active goals</p>
              )}
              
              {/* completed goals */}
              {goals.filter(goal => goal.status === 'completed').length > 0 && (
                <div className="mt-6 pt-4 border-t border-border">
                  <h4 className="text-sm font-medium mb-2">Completed Goals</h4>
                  <p className="text-xs text-muted-foreground">
                    {goals.filter(goal => goal.status === 'completed').length} goal(s) completed - funds allocated for spending
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <TransactionManager />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Goals Overview</CardTitle>
          <p className="text-sm text-muted-foreground">Complete view of all your financial goals</p>
        </CardHeader>
        <CardContent>
          <GoalsManager />
        </CardContent>
      </Card>
    </div>
  );
}
