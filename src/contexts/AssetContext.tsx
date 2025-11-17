import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { StorageService, STORAGE_KEYS } from '@/lib/storage';

export interface Asset {
  id: string;
  name: string;
  type: 'stock' | 'crypto' | 'savings' | 'investment' | 'real_estate' | 'other';
  value: number;
  currency: string;
  description?: string;
  lastUpdated: string;
  change24h?: number;
  changePercent?: number;
}

interface AssetContextType {
  assets: Asset[];
  addAsset: (asset: Omit<Asset, 'id' | 'lastUpdated'>) => void;
  updateAsset: (id: string, asset: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
  getTotalValue: () => number;
  getTotalChange: () => { change: number; percent: number };
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

const initialAssets: Asset[] = [
  {
    id: '1',
    name: 'AAPL Stock',
    type: 'stock',
    value: 15000,
    currency: 'IDR',
    description: 'Apple Inc. Stock Portfolio',
    lastUpdated: '2025-11-16',
    change24h: 150,
    changePercent: 1.2,
  },
  {
    id: '2',
    name: 'BTC',
    type: 'crypto',
    value: 25000000,
    currency: 'IDR',
    description: 'Bitcoin Holdings',
    lastUpdated: '2025-11-16',
    change24h: 500000,
    changePercent: 2.1,
  },
  {
    id: '3',
    name: 'Savings Account',
    type: 'savings',
    value: 5000000,
    currency: 'IDR',
    description: 'Emergency Fund',
    lastUpdated: '2025-11-15',
  },
  {
    id: '4',
    name: 'RDV Mutual Fund',
    type: 'investment',
    value: 8000000,
    currency: 'IDR',
    description: 'Balanced Growth Fund',
    lastUpdated: '2025-11-14',
    change24h: 80000,
    changePercent: 1.0,
  },
];

export function AssetProvider({ children }: { children: ReactNode }) {
  const [assets, setAssets] = useState<Asset[]>(() => {
// load stuff
    const storedAssets = StorageService.get<Asset[]>(STORAGE_KEYS.ASSETS);
    return storedAssets || initialAssets;
  });

// save when changed
  useEffect(() => {
    StorageService.set(STORAGE_KEYS.ASSETS, assets);
  }, [assets]);

  const addAsset = (assetData: Omit<Asset, 'id' | 'lastUpdated'>) => {
    const newAsset: Asset = {
      ...assetData,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setAssets(prev => [...prev, newAsset]);
  };

  const updateAsset = (id: string, assetData: Partial<Asset>) => {
    setAssets(prev => prev.map(asset =>
      asset.id === id
        ? { ...asset, ...assetData, lastUpdated: new Date().toISOString().split('T')[0] }
        : asset
    ));
  };

  const deleteAsset = (id: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== id));
  };

  const getTotalValue = () => {
    return assets.reduce((sum, asset) => sum + asset.value, 0);
  };

  const getTotalChange = () => {
    const assetsWithChanges = assets.filter(asset => asset.changePercent !== undefined && asset.change24h !== undefined);
    const totalChange = assetsWithChanges.reduce((sum, asset) => sum + (asset.change24h || 0), 0);
    const weightedChangePercent = assetsWithChanges.length > 0 
      ? assetsWithChanges.reduce((sum, asset) => sum + (asset.changePercent || 0) * (asset.value / getTotalValue()), 0)
      : 0;
    
    return {
      change: totalChange,
      percent: weightedChangePercent
    };
  };

  const value: AssetContextType = {
    assets,
    addAsset,
    updateAsset,
    deleteAsset,
    getTotalValue,
    getTotalChange,
  };

  return (
    <AssetContext.Provider value={value}>
      {children}
    </AssetContext.Provider>
  );
}

export function useAssets() {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('useAssets must be used within an AssetProvider');
  }
  return context;
}