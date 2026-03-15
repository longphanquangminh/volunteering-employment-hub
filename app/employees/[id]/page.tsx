'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { EmployeeForm } from '@/components/EmployeeForm';
import { Employee } from '@/types/employee';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

export default function EditEmployee({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const resolvedParams = use(params);

  useEffect(() => {
    fetch(`/api/employees/${resolvedParams.id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => setEmployee(data))
      .catch(() => {
        alert('Employee not found');
        router.push('/employees');
      })
      .finally(() => setLoading(false));
  }, [resolvedParams.id, router]);

  const handleSubmit = async (data: Partial<Employee>) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/employees/${resolvedParams.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/employees');
      } else {
        alert('Failed to update employee');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto mt-8 text-center text-slate-500">Loading initial data...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <Link href="/employees" className="inline-flex items-center text-slate-500 hover:text-slate-800 transition mb-6 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Employees
        </Link>
        
        {employee && (
          <EmployeeForm
            initialData={employee}
            onSubmit={handleSubmit}
            onCancel={() => router.push('/employees')}
            isLoading={saving}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
