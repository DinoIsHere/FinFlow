import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { StorageService, STORAGE_KEYS } from '@/lib/storage';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  type: 'income' | 'expense';
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getNetFlow: () => number;
  getTransactionsByCategory: () => { category: string; total: number; type: 'income' | 'expense' }[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

const initialTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Spotify Subscription',
    amount: 9.99,
    date: '2025-11-17',
    category: 'Entertainment',
    type: 'expense',
  },
  {
    id: '2',
    name: 'Grocery Store',
    amount: 45.20,
    date: '2025-11-16',
    category: 'Food',
    type: 'expense',
  },
  {
    id: '3',
    name: 'Part-time Job',
    amount: 350.00,
    date: '2025-11-15',
    category: 'Salary',
    type: 'income',
  },
  {
    id: '4',
    name: 'Coffee Shop',
    amount: 5.50,
    date: '2025-11-14',
    category: 'Food',
    type: 'expense',
  },
];

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
// load stuff
    const storedTransactions = StorageService.get<Transaction[]>(STORAGE_KEYS.TRANSACTIONS);
    return storedTransactions || initialTransactions;
  });

// save when changed
  useEffect(() => {
    StorageService.set(STORAGE_KEYS.TRANSACTIONS, transactions);
  }, [transactions]);

  const addTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  const getTotalIncome = () => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalExpenses = () => {
    return Math.abs(transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0));
  };

  const getNetFlow = () => {
    return getTotalIncome() - getTotalExpenses();
  };

  const getTransactionsByCategory = () => {
    const categoryTotals = new Map<string, { income: number; expense: number }>();
    
    transactions.forEach(transaction => {
      const existing = categoryTotals.get(transaction.category) || { income: 0, expense: 0 };
      if (transaction.type === 'income') {
        existing.income += transaction.amount;
      } else {
        existing.expense += Math.abs(transaction.amount);
      }
      categoryTotals.set(transaction.category, existing);
    });

    const result: { category: string; total: number; type: 'income' | 'expense' }[] = [];
    
    categoryTotals.forEach((totals, category) => {
      if (totals.income > 0) {
        result.push({ category, total: totals.income, type: 'income' });
      }
      if (totals.expense > 0) {
        result.push({ category, total: totals.expense, type: 'expense' });
      }
    });

    return result;
  };

  const value: TransactionContextType = {
    transactions,
    addTransaction,
    deleteTransaction,
    getTotalIncome,
    getTotalExpenses,
    getNetFlow,
    getTransactionsByCategory,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}