# Employee Management CRUD Demo
AI-assisted project using Google Antigravity

This document contains structured prompts to generate a fullstack demo application.

---

# 1. PROJECT CONTEXT

PROMPT:

You are a senior fullstack engineer.

Your task is to generate a demo internal employee management system with the following constraints:

Tech stack:
- Next.js (App Router)
- TypeScript
- React
- TailwindCSS
- Local storage or JSON file database
- No external DB required

Architecture:
- Fullstack inside Next.js
- API routes for backend logic
- Frontend consumes the API

Features required:

Authentication
- simple login
- session stored in cookie or localStorage
- roles: admin only (for demo)

Employee CRUD
- create employee
- edit employee
- delete employee
- view employee list
- employee details

Employee fields:
- id
- name
- email
- department
- role
- salary
- startDate
- status (active / inactive)

UX features:
- table view
- search employees
- filter by department
- drag-and-drop to reorder employees

Technical requirements:

Frontend
- React components
- reusable components
- clean folder structure

Backend
- API routes
- simple validation

Storage
- JSON file in `/data/employees.json`
- fallback to in-memory storage

Other requirements:
- simple but clean UI
- code should be easy to understand
- focus on readability

Output expected:
- Full project structure
- All important files
- Explanation only when necessary

---

# 2. GENERATE PROJECT STRUCTURE

PROMPT:

Generate the full project structure for this employee management system.

Requirements:

Use Next.js App Router.

Suggested structure:

app/
api/
components/
hooks/
lib/
types/
data/

Explain briefly the purpose of each folder.

---

# 3. DEFINE TYPES

PROMPT:

Define TypeScript types for the project.

Types needed:

Employee
User
AuthSession
Department

Employee should include:

id
name
email
department
role
salary
startDate
status
orderIndex

Return the code for `/types/employee.ts`.

---

# 4. CREATE LOCAL DATA LAYER

PROMPT:

Implement a simple data layer.

Requirements:

File location:
`/lib/employeeStore.ts`

Responsibilities:

getEmployees()
getEmployeeById()
createEmployee()
updateEmployee()
deleteEmployee()
reorderEmployees()

Data source:
- JSON file `/data/employees.json`

If file system is unavailable, fallback to in-memory storage.

Ensure functions are simple and readable.

---

# 5. BUILD API ROUTES

PROMPT:

Create Next.js API routes for employees.

Routes:

GET /api/employees
GET /api/employees/[id]
POST /api/employees
PUT /api/employees/[id]
DELETE /api/employees/[id]

Additional route:

POST /api/employees/reorder

Requirements:

- input validation
- return JSON
- simple error handling

Output all route files.

---

# 6. IMPLEMENT AUTH

PROMPT:

Create a simple authentication system.

Requirements:

Hardcoded user:

email: admin@company.com
password: admin123

Routes:

POST /api/login
POST /api/logout
GET /api/session

Session method:
- cookie or localStorage

Protect employee API routes so only logged-in users can access them.

---

# 7. BUILD FRONTEND PAGES

PROMPT:

Create the frontend pages.

Pages required:

/login
/dashboard
/employees
/employees/[id]

Requirements:

Use:

React
TypeScript
TailwindCSS

Components should be separated.

---

# 8. EMPLOYEE TABLE UI

PROMPT:

Create a reusable EmployeeTable component.

Features:

- display employee list
- sortable columns
- search
- filter by department
- edit button
- delete button

Keep it simple and readable.

---

# 9. EMPLOYEE FORM

PROMPT:

Create a reusable EmployeeForm component.

Fields:

name
email
department
role
salary
startDate
status

Features:

- create mode
- edit mode
- form validation

Return clean React code.

---

# 10. DRAG AND DROP FEATURE

PROMPT:

Implement drag-and-drop reordering of employees.

Library allowed:

react-beautiful-dnd or dnd-kit

Requirements:

- drag rows in table
- update orderIndex
- send reorder request to API
- persist order

Return implementation code.

---

# 11. AUTH GUARD

PROMPT:

Create a simple auth guard.

If user is not logged in:

redirect to `/login`.

Implement using:

Next.js middleware or layout check.

---

# 12. SAMPLE DATA

PROMPT:

Generate sample employees JSON.

At least 10 employees.

Departments example:

Engineering
Marketing
HR
Finance

Ensure realistic data.

---

# 13. IMPROVEMENTS (OPTIONAL)

PROMPT:

Suggest improvements for this project.

Focus on:

- performance
- security
- scalability
- real production architecture

Keep explanations concise.

---

# 14. DEMO SCRIPT

PROMPT:

Generate a demo script for presenting this project.

Steps:

1. login
2. view employees
3. search employee
4. edit employee
5. create employee
6. reorder employees
7. delete employee

Keep it short for a 3-minute demo.

---
