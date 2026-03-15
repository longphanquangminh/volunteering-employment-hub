'use client';

import { Employee } from '@/types/employee';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface Props {
  employees: Employee[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899'];

export function SalaryBarChart({ employees }: Props) {
  const departmentStats = employees.reduce((acc: any, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = { name: emp.department, total: 0, count: 0 };
    }
    acc[emp.department].total += emp.salary;
    acc[emp.department].count += 1;
    return acc;
  }, {});

  const data = Object.values(departmentStats).map((dept: any) => ({
    name: dept.name,
    average: Math.round(dept.total / dept.count)
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-[400px]">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Average Salary by Department</h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Avg Salary']}
            />
            <Bar dataKey="average" radius={[8, 8, 0, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
