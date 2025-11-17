// TODO: maybe fix later
export const STORAGE_KEYS = {
  TRANSACTIONS: 'financetracker_transactions',
  ASSETS: 'financetracker_assets',
  GOALS: 'financetracker_goals',
  THEME: 'financetracker_theme'
} as const;

export class StorageService {
  static get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return null;
    }
  }

  static set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
      return false;
    }
  }

  static remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  }

  static clear(): boolean {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  static exists(key: string): boolean {
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error checking localStorage key "${key}":`, error);
      return false;
    }
  }
}

// This just works okay?
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = React.useState<T>(() => {
    const stored = StorageService.get<T>(key);
    return stored !== null ? stored : defaultValue;
  });

  const updateValue = React.useCallback((newValue: T | ((prev: T) => T)) => {
    setValue(prevValue => {
      const updatedValue = typeof newValue === 'function' 
        ? (newValue as (prev: T) => T)(prevValue)
        : newValue;
      StorageService.set(key, updatedValue);
      return updatedValue;
    });
  }, [key]);

  return [value, updateValue] as const;
}

import React from 'react';