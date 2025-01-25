import React from 'react';
import { InventoryItem, SortDirection } from '../types/inventory';
import { Edit2, Trash2 } from 'lucide-react';

interface InventoryTableProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
  sortDirection: SortDirection;
  onSort: () => void;
}

export default function InventoryTable({
  items,
  onEdit,
  onDelete,
  sortDirection,
  onSort,
}: InventoryTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Category</th>
            <th
              className="px-6 py-4 text-left cursor-pointer"
              onClick={onSort}
            >
              Quantity {sortDirection === 'asc' ? '↑' : '↓'}
            </th>
            <th className="px-6 py-4 text-left">Price</th>
            <th className="px-6 py-4 text-left">Description</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <tr
              key={item.id}
              className={`hover:bg-gray-50 transition-colors ${
                item.quantity < 10 ? 'bg-red-50' : ''
              }`}
            >
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {item.category}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`font-medium ${
                    item.quantity < 10 ? 'text-red-600' : 'text-gray-900'
                  }`}
                >
                  {item.quantity}
                </span>
              </td>
              {/* Updated to display ₹ symbol */}
              <td className="px-6 py-4">
                <span>₹{item.price.toFixed(2)}</span>
              </td>
              <td className="px-6 py-4 truncate max-w-xs">{item.description}</td>
              <td className="px-6 py-4">
                <div className="flex space-x-3">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
