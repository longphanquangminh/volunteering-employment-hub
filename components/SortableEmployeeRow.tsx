import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Employee } from '@/types/employee';
import { GripVertical, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Props {
  employee: Employee;
  onDelete: (id: string) => void;
}

export function SortableEmployeeRow({ employee, onDelete }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: employee.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-white border-b transition-colors hover:bg-slate-50",
        isDragging ? "opacity-50 z-50 bg-slate-100 shadow-md relative" : ""
      )}
    >
      <td className="p-4 w-10">
        <button {...attributes} {...listeners} className="text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing">
          <GripVertical className="w-5 h-5" />
        </button>
      </td>
      <td className="p-4">
        <div className="font-medium text-slate-800">{employee.name}</div>
        <div className="text-sm text-slate-500">{employee.email}</div>
      </td>
      <td className="p-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {employee.department}
        </span>
      </td>
      <td className="p-4 text-slate-600 text-sm">{employee.role}</td>
      <td className="p-4 text-sm font-medium text-slate-700">
        ${employee.salary.toLocaleString()}
      </td>
      <td className="p-4 text-sm text-slate-600">
        {format(new Date(employee.startDate), 'MMM dd, yyyy')}
      </td>
      <td className="p-4">
        <span className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          employee.status === 'active' ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        )}>
          {employee.status}
        </span>
      </td>
      <td className="p-4 text-right">
        <div className="flex justify-end gap-2">
          <Link
            href={`/employees/${employee.id}`}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this employee?')) {
                onDelete(employee.id);
              }
            }}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
