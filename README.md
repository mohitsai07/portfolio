# Portfolio v2: Engineering Credibility

> "I design systems that are simple to use and hard to break."

A high-performance, engineering-focused portfolio designed to showcase deep technical expertise, architectural decision-making, and production-grade validation.

<img width="1918" height="977" alt="Screenshot 2026-01-30 102134" src="https://github.com/user-attachments/assets/71c759b5-5e9f-4052-a23b-1e7076788184" />


## 🏗️ Philosophy: Quiet Luxury
This project moves away from generic "flashy" portfolios. Instead, it adopts a **"Quiet Luxury"** aesthetic—prioritizing content, typography, and performance over decorative noise. The goal is to let the engineering speak for itself.
- **Minimalist UI**: Warm charcoal, matte finishes, and subtle "glassmorphism".
- **Content-First**: Projects are presented as **Case Studies**, not just card galleries.
- **Engineering-First**: Deep dives into tradeoffs, critical decisions, and failure modes.

---

## 🚀 Key Features

### 1. Deep Dive Case Studies
Unlike standard portfolios that just list tech stacks, this project features a dedicated **Case Study Engine**. Each project includes:
- **The Challenge**: Context and constraints.
- **The Failure**: What went wrong in initial approaches.
- **The Fix**: The engineering solution.
- **Tradeoffs**: Why specific choices were made (e.g., *SQLite vs Postgres*, *Client-side vs Server-side*).
- **Validation**: How the solution was tested (e.g., *Lighthouse scores*, *Load testing*).

### 2. The "Living Engineer" Layer
A specialized **Working Notes** section (Engineering Log) that mimics a developer's daily scratchpad. It showcases active learning, debugging sessions, and real-time architectural thinking.

### 3. Academic & Industry Credibility
- **Endorsements Layer**: Integrated quotes from industry professionals.
- **Academic Focus**: Highlighting Degree specialization (AI, Distributed Systems) and research-oriented coursework.

---

## 🛠️ Tech Stack

### Core
- **Frontend**: React (Vite), JavaScript (ES6+).
- **Styling**: Vanilla CSS (CSS Variables, Grid, Flexbox) for maximum performance and granular control.
- **Icons**: `lucide-react` for consistent, lightweight iconography.

### Architecture
- **Data-Driven**: All content (Projects, Experience, Certificates) is managed via a central `config.json` for easy updates without code changes.
- **Component-Based**: Modular architecture (`ProjectsCaseLibrary`, `Experience`, `Hero`) for maintainability.
- **Responsive**: Mobile-first design system with fluid typography and adaptive layouts.

---

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/mohitsai07/portfolio.git
    cd portfolio
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm start
    ```
    The app will run at `http://localhost:5173` (or similar).

4.  **Build for Production**
    ```bash
    npm run build
    ```

---

## 📂 Project Structure

```bash
src/
├── components/         # Reusable UI Components
│   ├── ProjectsCaseLibrary.jsx  # The core Case Study engine
│   ├── Experience.jsx           # Timeline & Journey visualization
│   ├── Hero.css                 # Specific styles for the landing
│   └── ...
├── data/
│   └── config.json     # Centralized content source (Resume, Projects, etc.)
├── index.css           # Global Design System (Variables, Typography, Reset)
└── main.jsx            # Application Entry Point
```

---

## 📬 Contact
- **Email**: mohitsai109@gmail.com
- **GitHub**: [github.com/mohitsai07](https://github.com/mohitsai07)
- **LinkedIn**: [linkedin.com/in/mohitsaipittu](https://www.linkedin.com/in/mohitsaipittu/)

---

© 2026 Mohit Sai. Built with React & Engineering Rigor.
