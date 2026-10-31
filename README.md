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

6. **Sara Laptop Shop & Services (Next Page Feature)**:
   - Extra navbar button (`Our Shop [Next Page →]`) and nav links to seamlessly navigate between the benchmark reviews and the shop service center (`shop.html`).
   - "Welcome to My Shop" hero banner with live status, shop highlights, and trust guarantees.
   - 10 comprehensive service detail cards with filters (Hardware Upgrades, Screen & Battery, Cooling & Thermals, Motherboard & Recovery).
   - Interactive Live Service Cost Estimator with device multipliers, primary service selectors, and optional add-ons.
   - All-in-one popular service maintenance packages (Basic, Pro Overhaul, Extreme Gaming).
   - Interactive diagnostic booking form with instant confirmation ticket generator (`SARA-xxxxx`), `localStorage` persistence, and one-click WhatsApp forwarding.
   - Store location, operating hours, direct hotline, customer testimonials, and shop FAQ accordion.

7. **Testing Methodology & Buyer FAQ**:
   - Standardized testing breakdown: Display spectrophotometer sweeps, automated battery loops, and thermal heatmaps.
   - Expandable interactive accordion FAQ answering common hardware questions.

---

## 🚀 How to Run Locally

You can view the website in two ways:

### Option 1: Open Directly in Any Web Browser
Simply double-click [index.html](file:///T:/saralaptop/laptopreview/index.html) or [shop.html](file:///T:/saralaptop/laptopreview/shop.html) in your file explorer, or right-click and choose **Open with > Chrome / Edge / Firefox**.

### Option 2: Run via the Included Local Server
The local server runs in the background at:
```
http://localhost:4173
```
- Main Reviews: `http://localhost:4173/index.html`
- Shop & Services: `http://localhost:4173/shop.html`

To restart it anytime:
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```
or
```powershell
node server.js
```

---

## 📂 Project Structure

```
T:\saralaptop\laptopreview\
├── index.html            # Main laptop review & benchmark portal
├── shop.html             # "Welcome to My Shop" & comprehensive service details page
├── css\
│   └── styles.css        # Shared responsive styling, design tokens & dark/light theme
├── js\
│   ├── data.js           # Laptop database, specs, scores & quiz questions
│   ├── app.js            # Interactivity, filters, modals, quiz & review state
│   └── shop.js           # Shop logic, cost estimator, booking system & filters
├── assets\
│   └── images\           # High-resolution studio product photographs
│       ├── macbook-pro.jpg
│       ├── gaming-laptop.jpg
│       ├── oled-ultrabook.jpg
│       ├── creator-workstation.jpg
│       ├── student-laptop.jpg
│       └── convertible-laptop.jpg
├── server.js             # Static Node.js HTTP server
├── server.ps1            # Native PowerShell HTTP server
└── README.md             # Documentation & setup instructions
```
