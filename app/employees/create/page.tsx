'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { EmployeeForm } from '@/components/EmployeeForm';
import { Employee } from '@/types/employee';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateEmployee() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: Partial<Employee>) => {
    setLoading(true);
    try {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/employees');
      } else {
        alert('Failed to create employee');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <Link href="/employees" className="inline-flex items-center text-slate-500 hover:text-slate-800 transition mb-6 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Employees
        </Link>
        
        <EmployeeForm
          onSubmit={handleSubmit}
          onCancel={() => router.push('/employees')}
          isLoading={loading}
        />
      </div>
    </DashboardLayout>
  );
}
