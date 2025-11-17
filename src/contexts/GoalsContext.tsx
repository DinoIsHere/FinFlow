import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { StorageService, STORAGE_KEYS } from '@/lib/storage';

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: 'savings' | 'debt' | 'investment' | 'emergency' | 'vacation' | 'other';
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
}

interface GoalsContextType {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  getActiveGoals: () => Goal[];
  getCompletedGoals: () => Goal[];
  getTotalProgress: () => number;
  getTotalTargetAmount: () => number;
  getTotalCurrentAmount: () => number;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

const initialGoals: Goal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 10000000,
    currentAmount: 6500000,
    targetDate: '2025-12-31',
    category: 'emergency',
    priority: 'high',
    status: 'active',
  },
  {
    id: '2',
    name: 'Vacation to Japan',
    targetAmount: 15000000,
    currentAmount: 3500000,
    targetDate: '2026-06-01',
    category: 'vacation',
    priority: 'medium',
    status: 'active',
  },
  {
    id: '3',
    name: 'First Car Down Payment',
    targetAmount: 25000000,
    currentAmount: 25000000,
    targetDate: '2025-09-15',
    category: 'savings',
    priority: 'high',
    status: 'completed',
  },
];

export function GoalsProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>(() => {
// load stuff
    const storedGoals = StorageService.get<Goal[]>(STORAGE_KEYS.GOALS);
    return storedGoals || initialGoals;
  });

// save when changed
  useEffect(() => {
    StorageService.set(STORAGE_KEYS.GOALS, goals);
  }, [goals]);

  const addGoal = (goalData: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (id: string, goalData: Partial<Goal>) => {
    setGoals(prev => prev.map(goal =>
      goal.id === id ? { ...goal, ...goalData } : goal
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const getActiveGoals = () => {
    return goals.filter(goal => goal.status === 'active');
  };

  const getCompletedGoals = () => {
    return goals.filter(goal => goal.status === 'completed');
  };

  const getTotalProgress = () => {
    const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
    const totalCurrent = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
    return totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;
  };

  const getTotalTargetAmount = () => {
    return goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  };

  const getTotalCurrentAmount = () => {
    return goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  };

  const value: GoalsContextType = {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    getActiveGoals,
    getCompletedGoals,
    getTotalProgress,
    getTotalTargetAmount,
    getTotalCurrentAmount,
  };

  return (
    <GoalsContext.Provider value={value}>
      {children}
    </GoalsContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
}