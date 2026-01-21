#Contract Management Platform (Frontend)

A frontend-based Contract Management Platform built using React+tailwind that allows users to create reusable contract blueprints, generate contracts from those blueprints, and manage contracts through a controlled lifecycle.

---

## Features

###  Blueprint Creation
- Create reusable contract templates (Blueprints)
- Supported field types:
  - Text
  - Date
  - Signature
  - Checkbox
- Each field stores:
  - Type
  - Label
  - Basic position metadata (x, y)
- Blueprints are stored using browser localStorage (mock persistence)

### Contract Creation from Blueprint
- Select an existing blueprint
- Generate a contract from the blueprint
- All fields are inherited from the blueprint
- Users can fill values for each field

###  Contract Lifecycle Management
Each contract follows a strict lifecycle:

CREATED → APPROVED → SENT → SIGNED → LOCKED


- Contracts can be **REVOKED** after CREATED or SENT
- State transitions are strictly controlled (no skipping steps)
- Locked contracts cannot be edited
- Revoked contracts cannot proceed further
- UI clearly shows current status and available next actions

### Contract Dashboard
- Displays all contracts in a table
- Filter by status:
  - Pending
  - Active
  - Signed
- Table shows:
  - Contract Name
  - Blueprint Name
  - Status
  - Created Date
  - Action Button (View / Manage)

---

##  Architecture

###  Tech Stack
- **React** — component-based UI and routing
- **React Router** — page navigation
- **Tailwind CSS** — fast UI development and consistent styling
- **LocalStorage** — mock persistence layer

---
### State Management Approach

The application follows a hybrid state management strategy:

- **Local Component State (React useState):**  
  Used for managing UI-specific and temporary data such as form inputs, modal visibility, selected filters, and field values while editing contracts or blueprints.

- **Centralized Persistent Storage (LocalStorage via StorageService):**  
  All core application data such as Blueprints and Contracts is persisted using a dedicated `StorageService` abstraction over browser localStorage.  
  Components read from and write to this service when creating or updating entities.

This separation ensures:
- UI logic remains simple and focused on rendering
- Persistence logic is centralized and reusable
- The storage layer can be easily replaced with real backend APIs in the future

This approach avoids unnecessary global state libraries (Redux/Context) while maintaining clean data flow suitable for the scale of this application.


### To Run
- Download the zip folder.
- unzip and open in code editor
- commands 1) npm install,
           2) npm run dev
