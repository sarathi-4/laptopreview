# ByteBench — Premium Laptop Review & Benchmark Website

ByteBench is a modern, responsive single-page laptop review and lab benchmark website built with vanilla **HTML5**, **CSS3**, and **JavaScript (ES6+)**.

---

## 🌟 Key Features

1. **Futuristic, High-Aesthetic Design**:
   - Modern glassmorphism (`backdrop-filter: blur(16px)`) and ambient glow backdrops.
   - Curated dark tech theme with electric cyan and neon violet accents.
   - Built-in Dark / Light theme toggle with state persistence in `localStorage`.
   - Polished typography using Google Fonts (**Outfit** & **Plus Jakarta Sans**).
   - Fluid responsiveness across desktops, laptops, tablets, and smartphones.

2. **Interactive Laptop Matchmaker Quiz**:
   - 3-step dynamic quiz assessing workflow needs, budget, and top hardware priorities.
   - Instant recommendation engine with animated score cards and direct links to full reviews.

3. **In-Depth Laptop Reviews Grid**:
   - 6 categorized laptops with real studio product imagery:
     - **Apple MacBook Pro 16 (M4 Max)** — Editor's Choice 2026 (Creator / Workstation)
     - **AORUS Master 16X (RTX 4090)** — Maximum FPS Monster (High-End Gaming)
     - **Zenith XPS 14 OLED** — Best Ultraportable
     - **Forge Carbon Pro 17** — Dual-Display Studio Workstation
     - **AuraBook Horizon 14** — Best Value Champion (Student / Everyday)
     - **Titan 360 Flip Stylus** — Best 2-in-1 Stylus Convertible
   - Category filtering pills (`Gaming`, `Ultraportable`, `Creator`, `Student`, `2-in-1`).
   - Dynamic sorting: Highest Score, Longest Battery Life, CPU Benchmark, Price (Low to High / High to Low).
   - Real-time instant search by brand, model, processor, or graphics card.

4. **In-Depth Review Modal**:
   - **Overview & Verdict**: Editorial summary, "The Good" vs. "The Compromises", and target user recommendations.
   - **Lab Benchmarks**: Visual bar charts for Cinebench 2024 CPU power, 150-nit web battery endurance, and acoustic fan noise levels (dB).
   - **Detailed Specs Sheet**: Complete breakdown of processor, GPU, memory, display, ports, and weight.
   - **Community Reviews**: Interactive form allowing readers to submit star ratings and comments that save to `localStorage`.

5. **Side-by-Side Comparison System**:
   - Floating comparison dock that slides up when laptops are selected.
   - Detailed side-by-side modal highlighting winning metrics with green badges.

6. **Testing Methodology & Buyer FAQ**:
   - Standardized testing breakdown: Display spectrophotometer sweeps, automated battery loops, and thermal heatmaps.
   - Expandable interactive accordion FAQ answering common hardware questions.

---

## 🚀 How to Run Locally

You can view the website in two ways:

### Option 1: Open Directly in Any Web Browser
Simply double-click [index.html](file:///e:/sarathi/index.html) in your file explorer, or right-click and choose **Open with > Chrome / Edge / Firefox**.

### Option 2: Run via the Included Local Node Server
The local server is already running in the background at:
```
http://localhost:4173
```
To restart it anytime:
```powershell
node server.js
```

---

## 📂 Project Structure

```
e:\sarathi\
├── index.html            # Main semantic HTML single-page document
├── css\
│   └── styles.css        # Responsive styling, design tokens & dark/light theme
├── js\
│   ├── data.js           # Laptop database, specs, scores & quiz questions
│   └── app.js            # Interactivity, filters, modals, quiz & state
├── assets\
│   └── images\           # High-resolution studio product photographs
│       ├── macbook-pro.jpg
│       ├── gaming-laptop.jpg
│       ├── oled-ultrabook.jpg
│       ├── creator-workstation.jpg
│       ├── student-laptop.jpg
│       └── convertible-laptop.jpg
├── server.js             # Lightweight zero-dependency static HTTP server
└── README.md             # Documentation & setup instructions
```
