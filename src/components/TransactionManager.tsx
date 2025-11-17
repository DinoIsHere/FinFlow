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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTransactions, type Transaction } from "@/contexts/TransactionContext";

const transactionCategories = [
  'Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Salary', 'Investment', 'Other'
];

export function TransactionManager() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    type: 'expense' as Transaction['type'],
    date: new Date().toISOString().split('T')[0],
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.amount || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const transaction = {
      name: formData.name,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      date: formData.date,
    };

    addTransaction(transaction);
    
    toast({
      title: "Success",
      description: `Transaction ${formData.type === 'income' ? 'added' : 'recorded'} successfully`,
    });

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      amount: '',
      category: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleDelete = (id: string) => {
    deleteTransaction(id);
    toast({
      title: "Success",
      description: "Transaction deleted successfully",
    });
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogDescription>
                Record a new income or expense transaction
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Description *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g., Salary, Grocery Shopping"
                  required
                />
              </div>

              <div>
                <Label htmlFor="type">Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData(prev => ({ ...prev, type: value as Transaction['type'] }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, amount: e.target.value }))
                  }
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData(prev => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, date: e.target.value }))
                  }
                />
              </div>

              <Button type="submit" className="w-full">
                Add Transaction
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">Total Income</span>
          </div>
          <p className="text-2xl font-bold text-green-500">
            {formatCurrency(totalIncome)}
          </p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium">Total Expenses</span>
          </div>
          <p className="text-2xl font-bold text-red-500">
            {formatCurrency(totalExpenses)}
          </p>
        </Card>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {recentTransactions.map((transaction) => (
          <Card key={transaction.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{transaction.name}</h4>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      transaction.type === 'income' 
                        ? 'text-green-500 border-green-500' 
                        : 'text-red-500 border-red-500'
                    }`}
                  >
                    {transaction.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {transaction.date} • {transaction.category}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(transaction.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        
        {recentTransactions.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No transactions yet. Add your first transaction!</p>
          </Card>
        )}
      </div>
    </div>
  );
}