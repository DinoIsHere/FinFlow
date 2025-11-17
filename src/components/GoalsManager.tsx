import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Edit, Trash2, Target, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useGoals, type Goal } from "@/contexts/GoalsContext";

const goalCategories = [
  'Emergency Fund', 'Vacation', 'House Down Payment', 'Car Purchase', 
  'Investment', 'Debt Payoff', 'Education', 'Retirement', 'Other'
];

const categoryLabels = {
  savings: 'Emergency Fund',
  debt: 'Debt Payoff',
  investment: 'Investment',
  emergency: 'Emergency Fund',
  vacation: 'Vacation',
  other: 'Other',
};

export function GoalsManager() {
  const { goals, addGoal, updateGoal, deleteGoal, getActiveGoals, getCompletedGoals } = useGoals();
  const [isOpen, setIsOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '0',
    targetDate: '',
    category: 'savings' as Goal['category'],
    priority: 'medium' as Goal['priority'],
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.targetAmount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const goalData = {
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount) || 0,
      targetDate: formData.targetDate,
      category: formData.category,
      priority: formData.priority,
      status: 'active' as Goal['status'],
    };

    if (editingGoal) {
      updateGoal(editingGoal.id, goalData);
      toast({
        title: "Success",
        description: "Goal updated successfully",
      });
    } else {
      addGoal(goalData);
      toast({
        title: "Success",
        description: "Goal created successfully",
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      targetAmount: '',
      currentAmount: '0',
      targetDate: '',
      category: 'savings',
      priority: 'medium',
    });
    setEditingGoal(null);
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setFormData({
      name: goal.name,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      targetDate: goal.targetDate,
      category: goal.category,
      priority: goal.priority,
    });
  };

  const handleDelete = (id: string) => {
    deleteGoal(id);
    toast({
      title: "Success",
      description: "Goal deleted successfully",
    });
  };

  const handleMarkComplete = (goal: Goal) => {
    updateGoal(goal.id, { status: 'completed' });
    toast({
      title: "Congratulations!",
      description: `Goal "${goal.name}" marked as completed!`,
    });
  };

  const activeGoals = getActiveGoals();
  const completedGoals = getCompletedGoals();
  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Financial Goals</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingGoal ? 'Edit Goal' : 'Create New Goal'}</DialogTitle>
              <DialogDescription>
                Set a financial goal and track your progress
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Goal Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g., Emergency Fund, Vacation to Bali"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData(prev => ({ ...prev, category: value as Goal['category'] }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {goalCategories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase().replace(' ', '_')}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="targetAmount">Target Amount *</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  value={formData.targetAmount}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, targetAmount: e.target.value }))
                  }
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <Label htmlFor="currentAmount">Current Amount</Label>
                <Input
                  id="currentAmount"
                  type="number"
                  value={formData.currentAmount}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, currentAmount: e.target.value }))
                  }
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="targetDate">Target Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={formData.targetDate}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, targetDate: e.target.value }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData(prev => ({ ...prev, priority: value as Goal['priority'] }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingGoal ? 'Update Goal' : 'Create Goal'}
                </Button>
                {editingGoal && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Total Goals</span>
          </div>
          <p className="text-2xl font-bold">{goals.length}</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">Completed</span>
          </div>
          <p className="text-2xl font-bold text-green-500">{completedGoals.length}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">Progress</span>
          </div>
          <p className="text-2xl font-bold">
            {totalTargetAmount > 0 ? Math.round((totalCurrentAmount / totalTargetAmount) * 100) : 0}%
          </p>
        </Card>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activeGoals.map((goal) => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
          const isCompleted = progress >= 100;
          
          return (
            <Card key={goal.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{goal.name}</h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          goal.priority === 'high' ? 'text-red-500 border-red-500' :
                          goal.priority === 'medium' ? 'text-yellow-500 border-yellow-500' :
                          'text-blue-500 border-blue-500'
                        }`}
                      >
                        {goal.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {categoryLabels[goal.category]} • Target: {goal.targetDate || 'No date set'}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {isCompleted ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkComplete(goal)}
                        className="text-green-500"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(goal)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(goal.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{formatCurrency(goal.currentAmount)}</span>
                    <span className="text-muted-foreground">{formatCurrency(goal.targetAmount)}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">
                    {progress.toFixed(1)}% complete
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
        
        {activeGoals.length === 0 && (
          <Card className="p-8 text-center">
            <Target className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">No active goals yet.</p>
            <p className="text-sm text-muted-foreground">Create your first financial goal to get started!</p>
          </Card>
        )}

        {completedGoals.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-green-500">Completed Goals</h4>
            {completedGoals.map((goal) => (
              <Card key={goal.id} className="p-4 opacity-75">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium">{goal.name}</span>
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      Completed
                    </Badge>
                  </div>
                  <span className="text-sm font-medium">
                    {formatCurrency(goal.currentAmount)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}