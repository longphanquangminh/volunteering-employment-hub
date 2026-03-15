'use client';

import { DashboardLayout } from '@/components/DashboardLayout';
import { EmployeeTable } from '@/components/EmployeeTable';
import { useEmployees } from '@/hooks/useEmployees';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function Employees() {
  const { employees, setEmployees, loading, removeEmployee, reorder } = useEmployees();

  const handleReorder = (newEmployees: typeof employees) => {
    // Optimistic UI update
    setEmployees(newEmployees);
    reorder(newEmployees.map(e => ({ id: e.id, orderIndex: e.orderIndex })));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Employees</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your team members and roles.</p>
        </div>
        <Link
          href="/employees/create"
          className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-sm font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>Add Employee</span>
        </Link>
      </div>

      {loading ? (
        <div className="text-slate-500 bg-white p-8 rounded-xl border border-slate-100 shadow-sm text-center">
          Loading employees...
        </div>
      ) : (
        <div className="bg-white rounded-xl">
          <EmployeeTable
            employees={employees}
            onDelete={removeEmployee}
            onReorder={handleReorder}
          />
        </div>
      )}
    </DashboardLayout>
  );
}
