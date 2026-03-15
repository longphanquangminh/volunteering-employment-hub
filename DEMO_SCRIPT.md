# Demo Script: Employee Management System (3 Minutes)

**1. Login (0:00 - 0:30)**
*   **Action:** Navigate to `http://localhost:3000`. You will be automatically redirected to the `/login` page by the Next.js middleware since you are unauthenticated.
*   **Action:** Enter the demo credentials (`admin@company.com` / `admin123`) or click “Sign in” (if pre-filled).
*   **Talking Point:** "Here's our custom login page. It uses Next.js middleware to protect all internal routes. We'll log in using the hardcoded administrative credentials."

**2. View Dashboard & Employees (0:30 - 1:00)**
*   **Action:** Upon successful login, you're routed to `/dashboard`. Briefly show the statistics. 
*   **Action:** Click **"Employees"** in the sidebar.
*   **Talking Point:** "The dashboard gives a quick overview. Navigating to the Employees page, we see a clean, sortable table fetching data from our local JSON store via our private API."

**3. Search & Filter Employees (1:00 - 1:30)**
*   **Action:** Type a name or email into the search bar (e.g., "Alice").
*   **Action:** Clear the search and use the Department dropdown to select "Engineering". 
*   **Talking Point:** "We have client-side filtering built-in. You can instantly search by name or email, or drop down to filter by department, making it easy to find specific staff members."

**4. Edit & Create Employee (1:30 - 2:15)**
*   **Action:** Click the Edit (pencil) icon next to an employee. Change their salary or status, then click "Save".
*   **Action:** Click the **"Add Employee"** button. Fill out the form quickly and submit.
*   **Talking Point:** "Editing existing records uses a reusable form component. Adding a new employee goes through the same component, hitting our `POST` API route to update the JSON store dynamically."

**5. Reorder Employees (2:15 - 2:40)**
*   **Action:** Grab the drag handle (grip icon) on the left side of any row. Drag the row up or down and release.
*   **Talking Point:** "We implemented smooth drag-and-drop using `dnd-kit`. Reordering rows optimistically updates the UI and sends a background request to the API to save the new exact order indices."

**6. Delete Employee (2:40 - 3:00)**
*   **Action:** Click the Delete (trash) icon on the employee you just created. Confirm the browser prompt.
*   **Talking Point:** "Finally, deleting an employee is instant. This concludes the CRUD demo of our Next.js App Router and TailwindCSS frontend built around a simple JSON local storage."
