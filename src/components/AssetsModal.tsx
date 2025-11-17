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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, DollarSign, TrendingUp, TrendingDown, Edit, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAssets, type Asset } from "@/contexts/AssetContext";

const assetTypeLabels = {
  stock: 'Stock',
  crypto: 'Cryptocurrency',
  savings: 'Savings',
  investment: 'Investment',
  real_estate: 'Real Estate',
  other: 'Other',
};

export function AssetsModal() {
  const { assets, addAsset, updateAsset, deleteAsset } = useAssets();
  const [isOpen, setIsOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'stock' as Asset['type'],
    value: '',
    currency: 'IDR',
    description: '',
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.value) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const assetData = {
      name: formData.name,
      type: formData.type,
      value: parseFloat(formData.value),
      currency: formData.currency,
      description: formData.description,
    };

    if (editingAsset) {
      updateAsset(editingAsset.id, assetData);
      toast({
        title: "Success",
        description: "Asset updated successfully",
      });
    } else {
      addAsset(assetData);
      toast({
        title: "Success",
        description: "Asset added successfully",
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'stock',
      value: '',
      currency: 'IDR',
      description: '',
    });
    setEditingAsset(null);
  };

  const handleEdit = (asset: Asset) => {
    setEditingAsset(asset);
    setFormData({
      name: asset.name,
      type: asset.type,
      value: asset.value.toString(),
      currency: asset.currency,
      description: asset.description || '',
    });
  };

  const handleDelete = (id: string) => {
    deleteAsset(id);
    toast({
      title: "Success",
      description: "Asset deleted successfully",
    });
  };

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Manage Assets
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Asset Management</DialogTitle>
          <DialogDescription>
            Manage your investment portfolio and assets
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* asset list */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Assets</h3>
              <Badge variant="secondary" className="text-sm">
                {formatCurrency(totalValue)}
              </Badge>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {assets.map((asset) => (
                <Card key={asset.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{asset.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {assetTypeLabels[asset.type]}
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(asset.value)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">
                          Updated: {asset.lastUpdated}
                        </p>
                        {asset.changePercent && (
                          <div className="flex items-center gap-1">
                            {asset.changePercent > 0 ? (
                              <TrendingUp className="w-3 h-3 text-green-500" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-red-500" />
                            )}
                            <span
                              className={`text-xs ${
                                asset.changePercent > 0 ? 'text-green-500' : 'text-red-500'
                              }`}
                            >
                              {asset.changePercent > 0 ? '+' : ''}{asset.changePercent}%
                            </span>
                          </div>
                        )}
                      </div>
                      {asset.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {asset.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(asset)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(asset.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* form area */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {editingAsset ? 'Edit Asset' : 'Add New Asset'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Asset Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g., AAPL Stock, BTC, Savings Account"
                  required
                />
              </div>

              <div>
                <Label htmlFor="type">Asset Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData(prev => ({ ...prev, type: value as Asset['type'] }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(assetTypeLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="value">Current Value *</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, value: e.target.value }))
                  }
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) =>
                    setFormData(prev => ({ ...prev, currency: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IDR">IDR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Optional notes about this asset..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingAsset ? 'Update Asset' : 'Add Asset'}
                </Button>
                {editingAsset && (
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}