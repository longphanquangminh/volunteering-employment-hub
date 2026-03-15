export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  startDate: string;
  status: 'active' | 'inactive';
  orderIndex: number;
}

export interface User {
  email: string;
}

export interface AuthSession {
  user: User;
  token: string;
}

export type Department = 'Engineering' | 'HR' | 'Marketing' | 'Finance';
