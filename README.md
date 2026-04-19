# Mesh Circular Shift Visualizer — Version 2

A React web application (Version 2) that visualizes circular q-shift on a 2D mesh.  
This is an independent version with a completely different UI theme and layout from v1.

---

## How It Works

Given `p` total nodes (perfect square) and shift value `q`, where `n = √p`:

| Stage | Operation | Amount |
|---|---|---|
| Stage 1 | Row Shift (right) | `q mod n` |
| Stage 2 | Column Shift (down) | `⌊q / n⌋` |

Both use wrap-around (modular) shifting.

---

## How to Run Locally

```bash
# 1. Navigate to this folder
cd 23F3096

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Build for Production

```bash
npm run build
```

Output folder: `dist/`

---

## Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your repository
4. Framework: **Vite** (auto-detected)
5. Click **Deploy**

### Live URL

> 🔗 _https://your-vercel-url.vercel.app_ ← update after deployment

---

## Project Structure

```
23F3096/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ControlPanel.jsx    # Parameter inputs + run/reset buttons
│   │   ├── MeshGrid.jsx        # Grid display (value-first, hover effects)
│   │   └── ComplexityPanel.jsx # Complexity stats + bar comparison
│   ├── utils/
│   │   └── shiftLogic.js       # Core shift logic
│   ├── App.jsx                 # Layout + animation state
│   ├── App.css                 # All styles (purple/amber theme)
│   ├── index.css               # Global reset
│   └── main.jsx                # React entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## UI Differences from Version 1

| Feature | Version 1 | Version 2 (this) |
|---|---|---|
| Theme | Dark navy / blue+green | Deep purple / amber+violet |
| Font | Inter | Poppins |
| Layout | Controls top-left sidebar | Full fixed left sidebar |
| Buttons | Flat rectangular | Pill-shaped gradient |
| Grid cells | Index on top, value below | **Value** large on top, index small |
| Hover | None | Glow + scale effect |
| Row highlight | Blue | **Amber/orange** |
| Final highlight | Green | **Violet/purple** |
| Complexity panel | Simple bars | Stat boxes + stacked bars |
| Stage indicator | Dots in a row | Pill stepper with numbers |

---

## Tech Stack

- React 18 + Vite 5
- Vanilla CSS — no UI libraries
- Google Fonts: Poppins
