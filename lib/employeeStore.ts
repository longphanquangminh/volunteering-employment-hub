import fs from 'fs';
import path from 'path';
import { Employee } from '../types/employee';

const getFilePath = () => path.join(process.cwd(), 'data', 'employees.json');

// In-memory fallback
let inMemoryStore: Employee[] = [];
let isUsingInMemory = false;

function loadData(): Employee[] {
  if (isUsingInMemory) return inMemoryStore;
  
  try {
    const dataFile = getFilePath();
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf-8');
      return JSON.parse(data) as Employee[];
    }
    
    // If not exists but fs is okay, return empty and we'll save it later
    return [];
  } catch (error) {
    console.warn("File system unavailable, using in-memory fallback.");
    isUsingInMemory = true;
    return inMemoryStore;
  }
}

function saveData(data: Employee[]) {
  if (isUsingInMemory) {
    inMemoryStore = data;
    return;
  }
  
  try {
    const dataFile = getFilePath();
    const dir = path.dirname(dataFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.warn("File system unavailable, switching to in-memory fallback.");
    isUsingInMemory = true;
    inMemoryStore = data;
  }
}

export async function getEmployees(): Promise<Employee[]> {
  return loadData().sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
}

export async function getEmployeeById(id: string): Promise<Employee | undefined> {
  return loadData().find((e) => e.id === id);
}

export async function createEmployee(emp: Omit<Employee, 'id' | 'orderIndex'>): Promise<Employee> {
  const employees = loadData();
  const id = Date.now().toString();
  const maxOrder = employees.reduce((max, e) => Math.max(max, e.orderIndex ?? 0), -1);
  const newEmployee: Employee = {
    ...emp,
    id,
    orderIndex: maxOrder + 1
  };
  employees.push(newEmployee);
  saveData(employees);
  return newEmployee;
}

export async function updateEmployee(id: string, updates: Partial<Employee>): Promise<Employee | null> {
  const employees = loadData();
  const idx = employees.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  employees[idx] = { ...employees[idx], ...updates };
  saveData(employees);
  return employees[idx];
}

export async function deleteEmployee(id: string): Promise<boolean> {
  const employees = loadData();
  const initLength = employees.length;
  const filtered = employees.filter((e) => e.id !== id);
  if (filtered.length === initLength) return false;
  saveData(filtered);
  return true;
}

export async function reorderEmployees(updates: { id: string, orderIndex: number }[]): Promise<void> {
  const employees = loadData();
  const updated = employees.map((emp) => {
    const update = updates.find((u) => u.id === emp.id);
    if (update) {
      return { ...emp, orderIndex: update.orderIndex };
    }
    return emp;
  });
  saveData(updated);
}
