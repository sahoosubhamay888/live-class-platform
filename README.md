# 🎓 EduSync — Full-Stack Real-Time Virtual Classroom Platform

<p align="center">
  <img src="https://img.shields.io/badge/Status-Live%20in%20Production-success?style=for-the-badge&logo=statuspage&logoColor=white" alt="Status" />
  <img src="https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black" alt="Render" />
  <img src="https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Atlas" />
  <img src="https://img.shields.io/badge/Streaming-WebRTC%20%2F%20ZEGOCLOUD-FF6C37?style=for-the-badge&logo=webrtc&logoColor=white" alt="WebRTC" />
</p>

<p align="center">
  <b>EduSync</b> is an enterprise-grade virtual classroom web application engineered to deliver seamless, low-latency video lectures, screen sharing, and interactive learning directly in browser environments — with zero app installation required.
</p>

<p align="center">
  <a href="https://live-class-platform-xi.vercel.app"><strong>Explore Live Demo »</strong></a>
  &nbsp;•&nbsp;
  <a href="https://live-class-backend-bdm0.onrender.com"><strong>Backend API Endpoint »</strong></a>
  &nbsp;•&nbsp;
  <a href="https://github.com/sahoosubhamay888/live-class-platform"><strong>GitHub Repository »</strong></a>
</p>

---

## ⚡ Quick Recruiter Summary

| Metric / Highlight | Implementation Detail |
| :--- | :--- |
| **Architecture** | Decoupled Client-Server (SPA on Vercel + REST API on Render + WebRTC Mesh) |
| **Video Engine** | Sub-second latency HD video/audio streaming via WebRTC & ZEGOCLOUD Prebuilt |
| **Authentication** | Stateless JWT tokens stored in secure, `SameSite=None` `HTTP-only` cookies |
| **Cross-Device UX** | Custom mobile hardware acceleration handling & front/rear camera switching |
| **Production Resilience** | Express 5 routing, automated preflight CORS handling, reverse-proxy trust |

---

## 🎯 The Problem & The Solution

* **The Problem:** Many virtual classroom tools either require heavy native desktop client downloads or suffer from poor mobile browser support, broken hardware video layers, and rigid host controls.
* **The Solution:** EduSync provides an **instant, zero-install WebRTC classroom experience** accessible on any modern phone, tablet, or desktop browser. Hosts can launch a classroom with 1-click shareable links, while attendees enjoy a dedicated pre-join media lobby to test their camera and microphone before entering.

---

## 🌟 Key Features

### 🎥 Real-Time Interactive Classroom
* **HD Multi-Party Video & Audio:** WebRTC-driven multi-participant video conference with adaptive stream bitrate handling.
* **Integrated Screen Sharing:** Seamless desktop and tab presentation for lectures and live coding demonstrations.
* **Real-Time In-Call Messaging:** Integrated chat stream allowing attendees to ask questions without interrupting the speaker.
* **Front / Rear Camera Toggle:** Mobile-optimized device switcher supporting both self-facing and external camera instruction.

### 🛡️ Host Governance & Session Lifecycle
* **Host vs. Attendee Roles:** Hosts maintain authoritative session control, including the ability to terminate the session for all attendees.
* **Lobby & Pre-Join Device Preview:** Dedicated pre-join stage where users configure camera/mic states and verify network audio input prior to connecting.
* **Dynamic Active Roster:** Real-time polling and participant presence synchronization across all connected clients.

### 🔒 Enterprise-Grade Security
* **Tamper-Proof Authentication:** Passwords hashed using `bcryptjs` with salted rounds.
* **Cross-Site Cookie Security:** Strict production cookie policies (`Secure`, `HttpOnly`, `SameSite=None`) configured for decoupled origins (Vercel $\leftrightarrow$ Render).
* **Reverse Proxy Trust:** Configured `trust proxy` headers to ensure accurate client IP identification through Render edge load balancers.

---

## 🏗️ System Architecture & Data Flow

```text
       ┌───────────────────────────────┐
       │   Browser Client (Vercel)     │
       │   React 18 + Tailwind CSS     │
       └───────┬───────────────▲───────┘
               │               │
  REST (HTTPS) │               │ JWT Cookie / JSON
  Auth & CRUD  │               │
               ▼               │
       ┌───────────────────────┴───────┐
       │     Node.js / Express 5       │
       │      Backend (Render)         │
       └───────┬───────────────▲───────┘
               │               │
      Mongoose │               │ MongoDB Native Driver
               ▼               │
       ┌───────────────────────┴───────┐
       │   MongoDB Atlas (Cloud DB)    │
       │   Users & Sessions Collections│
       └───────────────────────────────┘

  [ WebRTC Media Streaming & Signaling Channel ]
  Client A (Teacher) <============== ZEGOCLOUD WebRTC Network ==============> Client B (Students)
```

---

## 💡 Engineering Challenges & Solutions

Recruiters and hiring managers often ask: *"What was the hardest bug you solved?"* Here are three production challenges engineered during this build:

### 1. Cross-Domain Authentication & Preflight CORS Blockers
* **Challenge:** When hosting frontend on Vercel (`*.vercel.app`) and backend on Render (`*.onrender.com`), the browser blocked login requests due to preflight `OPTIONS` access control checks and cross-site cookie drops.
* **Solution:** Engineered a dynamic origin validator supporting Vercel preview environments, enabled `credentials: true`, configured `SameSite=None; Secure`, and set `app.set("trust proxy", 1)` to allow cross-origin cookie authentication.

### 2. Express 5 Wildcard Routing Compatibility
* **Challenge:** During deployment to Render with Express 5, the server crashed on startup with `PathError [TypeError]: Missing parameter name at index 1: *` due to `path-to-regexp` v8 upgrades.
* **Solution:** Diagnosed the startup stack trace, removed incompatible legacy wildcard route patterns, and leveraged Express 5's top-level middleware pipeline to cleanly intercept all preflight requests.

### 3. Mobile WebRTC Hardware Layer Lifecycle
* **Challenge:** When a mobile user clicked the built-in leave call button, mobile Chromium hardware acceleration kept the last video frame frozen on screen rather than returning to the lobby.
* **Solution:** Created an intelligent device-detection layer (`isMobileDevice`) that detects mobile viewports, clears the hardware container DOM (`container.innerHTML = ''`), and triggers a clean re-mount of the pre-join lobby state while keeping the desktop pipeline untouched.

---

## 🔌 API Endpoint Documentation

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user account & set HTTP-only cookie | Public |
| `POST` | `/api/auth/login` | Authenticate user & issue signed JWT cookie | Public |
| `GET` | `/api/auth/me` | Retrieve authenticated user profile | Private (Bearer/Cookie) |
| `POST` | `/api/auth/logout` | Invalidate session & clear auth cookie | Private |
| `POST` | `/api/session/create` | Initialize a new live classroom session | Private |
| `GET` | `/api/session/token` | Generate secure ZEGOCLOUD kit token | Private |
| `GET` | `/api/session/:roomId` | Fetch session metadata & active participant roster | Private |
| `POST` | `/api/session/end/:id` | Terminate session for all participants (Host only) | Host |
| `POST` | `/api/session/leave/:roomId` | Remove attendee from session roster | Private |

---

## 💻 Tech Stack Summary

* **Frontend:** React 18, Vite, React Router DOM, Tailwind CSS, Lucide / React Icons, React Hot Toast
* **Backend:** Node.js, Express 5, Mongoose ODM, JSON Web Token (`jsonwebtoken`), Cookie-Parser, BcryptJS
* **WebRTC Engine:** `@zegocloud/zego-uikit-prebuilt`
* **Cloud Infrastructure:** MongoDB Atlas, Vercel (CI/CD Frontend), Render (Cloud Web Service)

---

## ⚙️ Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/sahoosubhamay888/live-class-platform.git
cd live-class-platform
```

### 2. Configure Backend (`server/`)
```bash
cd server
npm install
```
Create `server/.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
ZEGO_APP_ID=your_zego_app_id
ZEGO_SERVER_SECRET=your_zego_server_secret
```
Start backend:
```bash
npm run dev
```

### 3. Configure Frontend (`client/`)
```bash
cd ../client
npm install
```
Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_ZEGO_APP_ID=your_zego_app_id
```
Start frontend:
```bash
npm run dev
```
Visit `http://localhost:5173` to test the application locally.

---

## 👨‍💻 Author

**Subhamay Sahoo**  
* Full-Stack MERN & WebRTC Engineer  
* GitHub: [@sahoosubhamay888](https://github.com/sahoosubhamay888)  
* Project Repo: [live-class-platform](https://github.com/sahoosubhamay888/live-class-platform)  

---

<p align="center">
  <sub>Engineered with passion for high-performance, real-time web applications.</sub>
</p>
