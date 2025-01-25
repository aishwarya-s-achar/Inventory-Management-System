import React, { useState } from 'react';
import { InventoryItem, SortDirection } from './types/inventory';
import InventoryTable from './components/InventoryTable';
import InventoryForm from './components/InventoryForm';
import { Package } from 'lucide-react';

const initialItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Laptop',
    category: 'Electronics',
    quantity: 5,
    price: 999.99,
    description: 'High-performance laptop with latest specifications'
  },
  {
    id: '2',
    name: 'Desk Chair',
    category: 'Furniture',
    quantity: 15,
    price: 199.99,
    description: 'office chair'
  }
];

function App() {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | undefined>();
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const categories = Array.from(new Set(items.map(item => item.category)));

  const handleAddItem = (newItem: Omit<InventoryItem, 'id'>) => {
    const item = {
      ...newItem,
      id: Date.now().toString(),
    };
    setItems([...items, item]);
    setShowForm(false);
  };

  const handleEditItem = (updatedItem: Omit<InventoryItem, 'id'>) => {
    if (!editingItem) return;
    setItems(items.map(item => 
      item.id === editingItem.id ? { ...updatedItem, id: item.id } : item
    ));
    setEditingItem(undefined);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const toggleSort = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const filteredAndSortedItems = items
    .filter(item => !categoryFilter || item.category === categoryFilter)
    .sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1;
      return (a.quantity - b.quantity) * modifier;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 transition-colors"
          >
            Add New Item
          </button>
        </div>

        <div className="mb-6">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {(showForm || editingItem) && (
          <div className="mb-8">
            <InventoryForm
              item={editingItem}
              onSubmit={editingItem ? handleEditItem : handleAddItem}
              onCancel={() => {
                setShowForm(false);
                setEditingItem(undefined);
              }}
            />
          </div>
        )}

        <InventoryTable
          items={filteredAndSortedItems}
          onEdit={setEditingItem}
          onDelete={handleDeleteItem}
          sortDirection={sortDirection}
          onSort={toggleSort}
        />
      </div>
    </div>
  );
}

export default App;