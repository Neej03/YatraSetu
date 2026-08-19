# 🛕 YatraSetu (यात्रासेतु)

> **AI-Powered Temple & Pilgrimage Crowd Management, Safety & Emergency Response Platform**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?logo=three.js&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

---

## 🌟 Overview

**YatraSetu** is an advanced AI-driven smart tourism and crowd management platform designed to ensure safe, seamless, and dignified pilgrimages at major holy shrines across India. 

Combining real-time computer vision detection, time-series crowd surge prediction, interactive WebGL 3D digital twin models, 8 regional language support, and a role-based emergency command center, YatraSetu closes the loop between pilgrim guidance and temple administration.

---

## ✨ Key Features

### 🛕 Real-Life 3D WebGL Digital Twin Models
- **3D Interactive Shrine Architecture**: Render authentic real-life geometries, materials, finishes, and environments for major shrines:
  - 🌊 **Somnath Mahadev Temple**: Solanki Kailash Mahameru sandstone spire, Baan Stambha (Arrow Pillar facing South Pole), and Arabian ocean waves.
  - 🛕 **Dwarkadhish Temple (Jagat Mandir)**: 5-tiered 170ft limestone spire, waving 52-yard Saffron Dhvajaji flag, Swarga Dvar gateway, and Gomti riverfront.
  - ✨ **Ambaji Temple**: Pure white marble Mandapa, 358 Golden Kalash, glowing divine Viso Yantra sanctum chamber, and Gabbar Hill ropeway.
  - ⛰️ **Mahakali Temple Pavagadh**: Volcanic rock cliff peak, summit shrine, Trishul flag, and cable car ropeway terminal station.
- **Camera Viewpoint Presets**: Quick focus on Sanctum, Aerial Overhead, Main Gate Entry, and CCTV CCTV Match angles.
- **Daylight & Aarti Night Lighting**: Switch between bright daylight and glowing atmospheric evening Aarti illumination.
- **3D Crowd Density Heatmaps & Particle Cloud**: Real-time visual density rings and animated particle streams marking active crowd flow.

### 🌐 8 Indian Regional Language Support
Instant runtime switching across 8 Indian languages:
- 🇮🇳 **English**, **हिंदी (Hindi)**, **ગુજરાતી (Gujarati)**, **मराठी (Marathi)**, **தமிழ் (Tamil)**, **తెలుగు (Telugu)**, **ಕನ್ನಡ (Kannada)**, **বাংলা (Bengali)**.

### 🤖 YatraSetu AI Floating Assistant
- Context-aware AI chatbot available 24/7 at the bottom-right corner.
- Provides real-time queue wait time estimates, parking availability, emergency help desk routing, and slot booking assistance.

### 🔄 The 5-Step AI Safety Cycle
1. **DETECT**: Real-time CCTV camera feed analysis and computer vision crowd counting.
2. **PREDICT**: AI time series models forecasting surge patterns up to 6 hours ahead.
3. **ALERT**: Automated multi-channel alerts for crowd surge, heat stress, and bottleneck risks.
4. **CONTROL**: Remote gate overrides, holding area activations, and barricade adjustments.
5. **GUIDE**: Dynamic rerouting and green channel navigation for emergency medical units and pilgrims.

### 🎫 Darshan Slot Booking & Digital e-Pass
- QR code e-Pass generation for time-slotted Darshan.
- Express VIP passes, senior citizen priority slots, and live queue wait time timers.

### 🛡️ Multi-Role Incident Command Center
Tailored views for:
- 🪔 **Pilgrims**: Live crowd map, route planner, slot booking, weather, and amenities.
- 🏛️ **Temple Authority / Admin**: Full gate control, surge predictions, and resource allocation.
- 👮 **Police Force**: Crowd control, barricade overrides, and perimeter monitoring.
- 🚑 **Medical Teams**: Emergency dispatch, ambulance tracking, and first-aid post telemetry.
- 🤝 **Volunteers**: Station assignments and queue assistance.

### ⚡ Interactive Real-Time Simulation Engine
- Interactive toolbar to simulate peak festival rushes, weather shifts (Heatwave, Rain, Fair), and emergency incidents (Medical, Overcrowding, Lost Child).
- Dynamic footer updating temple trust office names and emergency hotline numbers automatically upon temple selection.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **3D Graphics Engine**: Three.js (WebGL renderer, lighting, custom geometry, raycasting)
- **Styling & UI**: Tailwind CSS, Lucide Icons, Custom CSS glassmorphism & gradient design system
- **State & i18n**: React Context API, custom lightweight translation dictionary

---

## 🚀 Local Setup & Installation

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Neej03/YatraSetu.git
   cd YatraSetu
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
YatraSetu/
├── public/                  # Favicons and static assets
├── src/
│   ├── assets/              # Static images and SVGs
│   ├── components/
│   │   ├── common/          # Reusable components (Navbar, Footer, 3D Viewer, Chatbot, Toolbar)
│   │   └── views/           # Application views (Pilgrim, Map, Booking, Authority, CCTV, etc.)
│   ├── context/             # Simulation & i18n Context Provider
│   ├── data/                # Mock telemetry data & regional language translations
│   ├── types/               # TypeScript interfaces & domain types
│   ├── App.tsx              # Root component & view router
│   ├── index.css            # Custom CSS & Tailwind directives
│   └── main.tsx             # Application entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🔒 Privacy & Ethics

YatraSetu follows strict **Privacy-by-Design** principles:
- **Anonymized Computer Vision**: Video feeds process aggregate headcounts and motion density without storing personal identifiable information (PII) or facial biometric signatures.
- **Data Protection**: Encrypted telemetry data adhering to national digital privacy guidelines.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more details.

---

<p center="align">
  <strong>🔒 Privacy-First Crowd Intelligence • ❤️ Built for Safer Yatras</strong>
</p>
