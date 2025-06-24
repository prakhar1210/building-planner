# 🏗️ Building Planner L2

A minimal, clean web-based building plan drawing tool built with **Next.js 15**, **TypeScript**, **Zustand** for state management, and native HTML5 **Canvas API**.  
Draw, annotate, and manage lines, rectangles, and circles directly on canvas with optional dimension annotations.

---

## 📸 Preview

![App Screenshot](./screenshots/app-preview.png)


---

## 🚀 Features

- 📏 Draw **lines**, **rectangles**, and **circles**
- ✍️ Display **annotations** (dimensions: length, width, height, radius)
- 🛠️ Simple toolbar to switch tools, toggle annotations, and clear canvas
- ⚡ Real-time live preview while drawing shapes
- 📦 State management with **Zustand**
- 💅 Styled with **TailwindCSS**

---

## 📚 Tech Stack

- **Next.js 15**
- **TypeScript**
- **Zustand**
- **TailwindCSS**
- **Canvas API**

---

## 📦 Installation & Setup

1️⃣ **Clone the repository**
```bash
git clone https://github.com/your-username/building-planner-l2.git
cd building-planner-l2


src/
  ├── app/
  │   └── page.tsx             # Main App Page
  ├── components/
  │   └── CanvasArea.tsx       # Canvas drawing component
  │   └── Toolbar.tsx          # Drawing tool controls
  ├── stores/
  │   └── useDrawingStore.ts   # Zustand state store
  ├── styles/
  │   └── globals.css          # TailwindCSS config

