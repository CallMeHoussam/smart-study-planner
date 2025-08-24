# 📚 Smart Study Planner

A simple, responsive React application that helps students organize their study tasks, manage progress, and stay productive.  
Built as part of a **Capstone Project**.

---

## 🚀 Features

- ✅ Add, complete, and delete study tasks  
- 💾 Local storage support (tasks persist after refresh)  
- 📱 Fully responsive design (desktop & mobile)  
- 🎨 Styled with custom global + responsive CSS  
- 🖥️ Pages included:
  - **Home** – Welcome screen with project overview
  - **Dashboard** – Core planner functionality (task manager)
  - **About** – Project information
  - **Profile** – Placeholder for future user details

---

## 🗂️ Project Structure
```
SmartStudyPlanner/
│
├── public/ # Static files
│ └── index.html
│
├── src/
│ ├── components/ # Reusable components
│ │ ├── Navbar.jsx
│ │ ├── Footer.jsx
│ │ └── TaskList.jsx
│ │
│ ├── pages/ # Main application pages
│ │ ├── Home.jsx
│ │ ├── Dashboard.jsx
│ │ ├── About.jsx
│ │ └── Profile.jsx
│ │
│ ├── styles/ # CSS files
│ │ ├── global.css
│ │ └── responsive.css
│ │
│ ├── App.jsx # Main app container
│ └── index.js # Entry point
│
├── package.json
└── README.md
```
---

## ⚙️ Installation & Setup

1. Clone the repository:
```bash
   git clone https://github.com/your-username/smart-study-planner.git
   cd smart-study-planner
```
2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```