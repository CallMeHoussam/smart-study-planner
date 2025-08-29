# 📚 Smart Study Planner

A simple, responsive React application that helps students organize their study tasks, manage progress, and stay productive.  
Built as part of a **Capstone Project**.

---

## ✨ Features

### 📋 Task Management
- **Organized Task Creation**: Add tasks with titles, subjects, categories, and priorities
- **Smart Categorization**: Organize tasks by custom categories (Study, Work, Personal, etc.)
- **Priority Levels**: Set task priorities (Low, Medium, High) for better organization
- **Progress Tracking**: Visual indicators for completed and pending tasks
- **Search Functionality**: Quickly find tasks with real-time search

### ⏱️ Pomodoro Timer
- **Built-in Timer**: 25-minute focus sessions with 5-minute breaks
- **Session Tracking**: Automatic tracking of completed focus sessions
- **Customizable Durations**: Adjustable session lengths for personalized study intervals
- **Session Completion Alerts**: Visual and audio notifications when sessions end

### 📊 Analytics & Insights
- **Productivity Dashboard**: Comprehensive analytics on study habits
- **Time Analysis**: Breakdown of time spent per task and category
- **Completion Statistics**: Track task completion rates and patterns
- **Focus Goals**: Monitor progress toward study objectives
- **Category-wise Reports**: See time distribution across different subjects

### 🎨 User Experience
- **Dark/Light Mode**: Toggle between comfortable themes for any time of day
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Local Storage**: Data persists between sessions without external dependencies
- **Intuitive Interface**: Clean, modern design with smooth animations
- **Accessibility**: Keyboard navigation and screen reader friendly

---

## 🗂️ Project Structure
```
SmartStudyPlanner/
│
├── public/
│ └── index.html
│
├── src/
│ ├── components/ 
│ │ ├── Navbar.jsx
│ │ ├── TaskList.jsx
│ | ├── Pomodoro.jsx
│ │ ├── Footer.jsx
│ │ ├── ErrorBoundary.jsx
│ │ ├── Header.jsx
│ │ ├── Layout.jsx
│ │ ├── Loading.jsx
│ │ ├── TaskCard.jsx
│ │ ├── TaskForm.jsx
│ │ ├── TaskItem.jsx
│ │ └── TaskList.jsx
│ │
│ ├── pages/
│ │ ├── LandingPage.jsx
│ │ ├── Dashboard.jsx
│ │ ├── About.jsx
│ │ └── Profile.jsx
│ │
│ ├── styles/ 
│ │ ├── global.css
│ │ └── responsive.css
│ │
│ ├── styles/ 
│ │ ├── Validation.js
│ ├── App.jsx 
│ └── index.js 
│
├── package.json
├── package-lock.json
├──tailwind.config.js
├──vite.config.js
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
## 🎯 How to Use

### Creating Tasks
1. Navigate to the Dashboard
2. Fill in the task form with:
   - Task title (required)
   - Subject/description
   - Estimated focus hours
   - Priority level
   - Category
3. Click "Add Task" to save

### Using the Pomodoro Timer
1. Click the "Start" button to begin a focus session
2. Work focused for 25 minutes
3. Take a 5-minute break when the timer completes
4. Repeat for optimal productivity

### Tracking Progress
1. View the Analytics tab for detailed insights
2. Monitor completion rates and time allocation
3. Use the statistics to optimize your study habits

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.2.0
- **Styling**: TailwindCSS 3.3.0
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 🌟 Key Benefits

- **Increased Productivity**: Pomodoro technique helps maintain focus
- **Better Organization**: Categorize and prioritize study materials
- **Progress Visibility**: Clear metrics on study habits and accomplishments
- **Flexible Study Sessions**: Customizable timer for personal preferences
- **Offline Functionality**: Works completely offline after initial load

## 🙏 Acknowledgments

- Pomodoro Technique by Francesco Cirillo
- React community for excellent documentation and resources
- TailwindCSS for the utility-first CSS framework
- All contributors who have helped improve this project

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/CallMeHoussam/smart-study-planner)
![GitHub issues](https://img.shields.io/github/issues/CallMeHoussam/smart-study-planner)
![GitHub pull requests](https://img.shields.io/github/issues-pr/CallMeHoussam/smart-study-planner)

---

**Happy Studying!** 🎓✨

Built with ❤️ by [Evoless](https://github.com/CallMeHoussam)
