# 📝 Full-Stack Sticky Notes MERN Application

A responsive digital workspace dashboard built using the MERN stack. This application enables real-time creation, retrieval, modification, and deletion (CRUD) of interactive sticky notes on a dynamic grid board.

---

## 🏗️ Core System Architecture

The application splits its business and rendering logic into independent operational tiers:

* **Frontend (Presentation Tier):** Formulated around **Vite + React.js** (Active on `http://localhost:5173`). Handles client-side view rendering, modern state management, dynamic component generation, and async REST API calls.
* **Backend (Application Logic Tier):** Formulated around **Node.js + Express** (Active on `http://localhost:5000`). Drives backend business routing, CORS security filters, and controllers.
* **Database (Cloud Data Tier):** Document-based persistence tier hosted on a **MongoDB Atlas** cloud cluster, managed seamlessly via **Mongoose Object Data Modeling (ODM)**.

---

## 📂 Active Project Directory Layout

The workspace maps out into separate frontend and backend segments, complete with custom runtime security rules:

```text
Fullstack_StickyNote/
└── sticky-notes-app/
    ├── backend/
    │   ├── models/           # Mongoose schemas for data models (e.g., Note schemas)
    │   ├── node_modules/     # Server environment packages (Ignored by Git)
    │   ├── .env              # Secrets, server connection ports, and database strings
    │   ├── .gitignore        # Rules restricting node_modules/ and backend .env tracking
    │   ├── package-lock.json # Hard locked dependency tree for server environments
    │   ├── package.json      # Node start scripts and backend dependencies manifest
    │   └── server.js         # Entry file initializing the Express app engine
    ├── frontend/
    │   ├── node_modules/     # Client compilation packages (Ignored by Git)
    │   ├── src/
    │   │   ├── App.jsx       # Main interactive user interface and dashboard logic
    │   │   └── main.jsx      # Core global mounting bridge for Vite and React DOM
    │   ├── .env.development  # Local environmental target endpoint declarations
    │   ├── .gitignore        # Rules restricting client node_modules/ tracking
    │   ├── index.html        # Single Page Application core HTML anchor page
    │   ├── package-lock.json # Hard locked dependency tree for client compilation
    │   └── package.json      # Vite automation run scripts and react specifications
    └── README.md             # Project user guide and technical documentation manual