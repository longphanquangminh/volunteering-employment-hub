'use client';

import { DashboardLayout } from '@/components/DashboardLayout';
import { useEmployees } from '@/hooks/useEmployees';
import { Users, Briefcase, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { DepartmentChart } from '@/components/DepartmentChart';
import { SalaryBarChart } from '@/components/SalaryBarChart';

export default function Dashboard() {
  const { employees, loading } = useEmployees();

  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(e => e.status === 'active').length;
    const avgSalary = total > 0 ? (employees.reduce((acc, e) => acc + e.salary, 0) / total).toFixed(0) : 0;
    return { total, active, avgSalary };
  }, [employees]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-2 font-medium">Welcome to the employee management portal.</p>
        </div>

        {loading ? (
          <div className="text-slate-500">Loading data...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Employees</p>
                  <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
                <div className="p-4 bg-green-50 text-green-600 rounded-xl">
                  <Briefcase className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Active Staff</p>
                  <p className="text-3xl font-bold text-slate-800">{stats.active}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
                <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Avg Salary</p>
                  <p className="text-3xl font-bold text-slate-800">${Number(stats.avgSalary).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DepartmentChart employees={employees} />
              <SalaryBarChart employees={employees} />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
