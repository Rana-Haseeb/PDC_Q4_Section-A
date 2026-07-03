# 🕸️ MeshShift — Mesh Circular Q-Shift Visualizer

> Interactive React playground that animates how a **circular q-shift** decomposes into a row shift + column shift across a 2D mesh — and proves why that's cheaper than shifting around a ring.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-Educational-lightgrey)

---

## ✨ What It Does

Give it a total node count **p** (a perfect square) and a shift amount **q**. MeshShift arranges `p` nodes into an `n × n` mesh (`n = √p`), then walks you through the shift step by step:

| Stage | Operation | Amount |
|:---:|---|:---:|
| **1** | Row shift (→) | `q mod n` |
| **2** | Column shift (↓) | `⌊q / n⌋` |

Both stages wrap around (modular arithmetic), and the grid animates through **Before → Row Shift → Column Shift** so you can *see* the data move instead of just reading formulas.

Alongside the animation, a live **Complexity Panel** compares the mesh-decomposed cost (`row shift + column shift`) against a naive **ring shift** (`min(q, p − q)`) — visually demonstrating why the mesh topology wins for parallel/distributed computing (PDC) shift operations.

---

## 🎬 How It Works, Visually

```
p = 16, q = 6  →  n = 4

Row shift  = 6 mod 4 = 2   (shift each row right by 2)
Col shift  = ⌊6 / 4⌋ = 1   (shift each column down by 1)

 Before          After Row Shift      After Col Shift (Final)
 0  1  2  3      2  3  0  1           14 15 12 13
 4  5  6  7  →   6  7  4  5      →     2  3  0  1
 8  9 10 11      10 11 8  9            6  7  4  5
12 13 14 15      14 15 12 13          10 11 8  9
```

---

## 🧱 Tech Stack

- ⚛️ **React 18** — component-driven UI with hooks (`useState`)
- ⚡ **Vite 5** — instant dev server & lightning-fast builds
- 🎨 **Vanilla CSS** — hand-crafted deep-purple / amber-violet theme, no UI framework
- 🔤 **Poppins** (Google Fonts)

No backend, no external state library — everything is computed client-side in pure JS.

---

## 📂 Project Structure

```
├── src/
│   ├── components/
│   │   ├── ControlPanel.jsx     # p/q inputs + Visualize / Reset controls
│   │   ├── MeshGrid.jsx         # Animated grid renderer (value-first cells, hover glow)
│   │   └── ComplexityPanel.jsx  # Live stats: row/col shift, mesh vs. ring bar comparison
│   ├── utils/
│   │   └── shiftLogic.js        # Pure functions: generateInitialGrid, performRowShift, performColumnShift
│   ├── App.jsx                  # Layout, animation timing, stage state machine
│   ├── App.css                  # Full theme (purple/amber)
│   └── main.jsx                 # React entry point
├── public/favicon.svg
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/Rana-Haseeb/PDC_Q4_Section-A.git
cd PDC_Q4_Section-A

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Open **http://localhost:5173** and:
1. Enter a perfect-square `p` (e.g. 16, 25, 36) and a shift value `q`.
2. Click **Visualize** and watch the mesh animate through each shift stage.
3. Read the **Complexity Panel** to compare mesh vs. ring shift cost.

### Production build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

---

## 🧮 The Core Algorithm

`src/utils/shiftLogic.js` exposes three pure, dependency-free functions:

| Function | Purpose |
|---|---|
| `generateInitialGrid(p)` | Builds the initial `0..p-1` node grid |
| `performRowShift(grid, n, rowShift)` | Circularly shifts every row right by `rowShift` |
| `performColumnShift(grid, n, colShift)` | Circularly shifts every column down by `colShift` |

The **Complexity Panel** then derives:
- **Mesh cost** = `(q mod n) + ⌊q / n⌋`
- **Ring cost** = `min(q, p − q)`

...and renders them as comparative bars to make the efficiency gap obvious at a glance.

---

## 🎓 Context

Built for a **Parallel & Distributed Computing (PDC)** course assignment (Q4, Section A) to demonstrate mesh interconnection network shift operations through interactive visualization rather than static diagrams.
