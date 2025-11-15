# ⚡ Electron + Vite + React + TypeScript Template  
A clean, minimal, and developer-friendly starter template for building modern Electron applications using:

- Electron
- Vite
- React
- TypeScript
- Context Bridge (secure)
- Isolated TS configs (main + renderer)
- Shared typed API between main & renderer

This template avoids the complexity of boilerplates and gives you a simple, scalable structure you can actually understand.

---

## 📁 Project Structure

```
project/
    assets/                 # build icons and resources
    src/
        main/              # Electron main process
            main.ts
            preload.ts
        renderer/          # React (UI)
            App.tsx
            index.tsx
        electron.d.ts      # Renderer type definitions for preload API
        shared.ts          # Shared types/interfaces/constants
    index.html
    package.json
    tsconfig.json
    tsconfig.main.json
    vite.config.ts
```

---

## 🚀 Getting Started

### 1. Install
```
npm install
```

### 2. Run in development
```
npm run dev
```
This launches:
- Vite dev server (React)
- Electron (auto-reload enabled)

### 3. Build for production
```
npm run build
```

### 4. Preview production build inside Electron
```
npm run preview
```

### 5. Create installer / packaged app
```
npm run package
```

The output will be inside:
```
/release
```

---

## 🔒 Security Notes

This template uses:
- **contextIsolation: true**
- **nodeIntegration: false**
- **A typed and restricted preload API**
- **No `remote` module**

This keeps your Electron app **secure by default**.

---

## 🧩 Extend the IPC API

Add new channels in `shared.ts`, expose them in `preload.ts`, and handle them in `main.ts`.

All types flow automatically from main → preload → renderer.

---

## 👍 Enjoy building!
This project is intentionally simple so you can grow it however you like.
