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

##  Architecture and decision design

###  Tech Stack
- **React** — component-based UI and routing
- **Javascript** - functional logic
- **React Router** — page navigation
- **Tailwind CSS** — fast UI development and consistent styling
- **LocalStorage** — mock persistence layer

### 🔹 Component-Based Architecture
-Pages are separated by responsibility:
  - Dashboard.jsx
  - BlueprintCreator.jsx
  - BlueprintList.jsx
  - ContractCreator.jsx
  - ContractManagement.jsx
-Reusable layout is handled by: layout.jsx


### 🔹 Centralized Persistence Layer
All storage logic is handled by: storages.js
This avoids mixing persistence logic with UI components and allows easy replacement with real APIs in the future.

### 🔹 Controlled State Transitions
Contract lifecycle rules are centralized in: constants.js

This ensures:
- No invalid transitions
- Easy modification of lifecycle rules
- Consistent UI behavior
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



---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/contractFlow.git
cd contractFlow
```
OR Download ZIP

Click on Code → Download ZIP on GitHub

Extract the ZIP file

Open the folder in VS Code

Install dependencies  - npm install

Run development server - npm run dev

Open in browser - http://localhost:5173

