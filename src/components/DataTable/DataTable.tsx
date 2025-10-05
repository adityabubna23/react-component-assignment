import React, { useState, useMemo, useEffect } from 'react';

// Interfaces for the component
interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

// --- State for Sorting ---
type SortConfig<T> = {
  key: keyof T;
  direction: 'ascending' | 'descending';
} | null;

export const DataTable = <T extends { id: number | string }>({ 
  data, 
  columns, 
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) => {
  // --- State Hooks ---
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number | string>>(new Set());

  // --- Sorting Logic ---
  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const handleSort = (key: keyof T) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // --- Selection Logic ---
  const handleSelectRow = (id: number | string) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedRows(newSelection);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      const allIds = new Set(data.map(row => row.id));
      setSelectedRows(allIds);
    }
  };

  // --- Effect to notify parent of selection changes ---
  useEffect(() => {
    if (onRowSelect) {
      const selectedData = data.filter(row => selectedRows.has(row.id));
      onRowSelect(selectedData);
    }
  }, [selectedRows, data, onRowSelect]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (data.length === 0) return <div className="p-4 text-center">No data to display.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            {selectable && (
              <th className="px-6 py-3">
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll}
                  checked={selectedRows.size === data.length && data.length > 0}
                />
              </th>
            )}
            {columns.map((col) => (
              <th 
                key={col.key} 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                onClick={() => col.sortable && handleSort(col.dataIndex)}
                style={col.sortable ? { cursor: 'pointer' } : {}}
              >
                {col.title}
                {col.sortable && sortConfig?.key === col.dataIndex && (
                  <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedData.map((row) => (
            <tr key={row.id} className={selectedRows.has(row.id) ? 'bg-blue-50' : ''}>
              {selectable && (
                <td className="px-6 py-4">
                  <input 
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};