import { useState, useEffect, useCallback } from 'react';
import { Employee } from '../types/employee';

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/employees');
    if (res.ok) {
      setEmployees(await res.json());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const removeEmployee = async (id: string) => {
    const res = await fetch(`/api/employees/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setEmployees((prev) => prev.filter(e => e.id !== id));
    }
  };

  const reorder = async (updates: { id: string, orderIndex: number }[]) => {
    await fetch('/api/employees/reorder', {
      method: 'POST',
      body: JSON.stringify(updates),
      headers: { 'Content-Type': 'application/json' }
    });
  };

  return { employees, setEmployees, loading, refetch: fetchEmployees, removeEmployee, reorder };
}
