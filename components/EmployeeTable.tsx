'use client';

import { useState, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Employee, Department } from '@/types/employee';
import { SortableEmployeeRow } from './SortableEmployeeRow';
import { Search, Filter, ChevronUp, ChevronDown } from 'lucide-react';

interface Props {
  employees: Employee[];
  onDelete: (id: string) => void;
  onReorder: (employees: Employee[]) => void;
}

type SortConfig = { key: keyof Employee | null; direction: 'asc' | 'desc' };

export function EmployeeTable({ employees, onDelete, onReorder }: Props) {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState<Department | ''>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'orderIndex', direction: 'asc' });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredEmployees = useMemo(() => {
    let result = [...employees];
    if (search) {
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (department) {
      result = result.filter((e) => e.department === department);
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        // Special case: if we are sorting by orderIndex, and using search/filter,
        // it might be messy, but basically we maintain the original array index mapping logic.
        const aVal = a[sortConfig.key as keyof Employee] ?? '';
        const bVal = b[sortConfig.key as keyof Employee] ?? '';
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [employees, search, department, sortConfig]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      // Find original indices safely
      const oldIndex = employees.findIndex((e) => e.id === active.id);
      const newIndex = employees.findIndex((e) => e.id === over.id);
      
      const newArray = arrayMove(employees, oldIndex, newIndex);
      
      // Compute updates for all elements that changed positions realistically
      const moved = newArray.map((e, idx) => ({ ...e, orderIndex: idx }));
      onReorder(moved);
    }
  };

  const requestSort = (key: keyof Employee) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof Employee }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1 inline" /> : <ChevronDown className="w-4 h-4 ml-1 inline" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col w-full">
      <div className="p-4 border-b border-slate-200 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-slate-50">
        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm outline-none text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative w-full md:w-auto">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
          <select
            className="pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer outline-none appearance-none text-black"
            value={department}
            onChange={(e) => setDepartment(e.target.value as Department | '')}
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm shadow-slate-200/50">
            <tr className="text-slate-500 border-b border-slate-200 text-sm font-medium">
              <th className="p-4 w-10"></th>
              <th className="p-4 cursor-pointer hover:text-slate-800 transition select-none" onClick={() => requestSort('name')}>
                Employee <SortIcon columnKey="name" />
              </th>
              <th className="p-4 cursor-pointer hover:text-slate-800 transition select-none" onClick={() => requestSort('department')}>
                Department <SortIcon columnKey="department" />
              </th>
              <th className="p-4 cursor-pointer hover:text-slate-800 transition select-none" onClick={() => requestSort('role')}>
                Role <SortIcon columnKey="role" />
              </th>
              <th className="p-4 cursor-pointer hover:text-slate-800 transition select-none" onClick={() => requestSort('salary')}>
                Salary <SortIcon columnKey="salary" />
              </th>
              <th className="p-4 cursor-pointer hover:text-slate-800 transition select-none" onClick={() => requestSort('startDate')}>
                Started <SortIcon columnKey="startDate" />
              </th>
              <th className="p-4 cursor-pointer hover:text-slate-800 transition select-none" onClick={() => requestSort('status')}>
                Status <SortIcon columnKey="status" />
              </th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={filteredEmployees.map(e => e.id)} strategy={verticalListSortingStrategy}>
                {filteredEmployees.map((emp) => (
                  <SortableEmployeeRow key={emp.id} employee={emp} onDelete={onDelete} />
                ))}
              </SortableContext>
            </DndContext>
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan={8} className="p-12 text-center text-slate-500 bg-white">
                  No employees found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
