# 🎓 EduSync — Real-Time Virtual Classroom Platform

<p align="center">
  <img src="https://img.shields.io/badge/Status-Live%20in%20Production-success?style=for-the-badge&logo=statuspage&logoColor=white" alt="Status" />
  <img src="https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black" alt="Render" />
  <img src="https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Atlas" />
  <img src="https://img.shields.io/badge/Engine-WebRTC%20%2F%20ZEGOCLOUD-FF6C37?style=for-the-badge&logo=webrtc&logoColor=white" alt="WebRTC" />
</p>

<p align="center">
  <b>EduSync</b> is a full-stack, browser-based virtual classroom application engineered with low-latency WebRTC streaming, multi-party video/audio, and granular real-time host governance — with zero software installation required.
</p>

<p align="center">
  <a href="https://live-class-platform-xi.vercel.app"><strong>Live Application Demo »</strong></a>
  &nbsp;•&nbsp;
  <a href="https://live-class-backend-bdm0.onrender.com"><strong>Backend API Health Check »</strong></a>
  &nbsp;•&nbsp;
  <a href="https://github.com/sahoosubhamay888/live-class-platform"><strong>GitHub Repository »</strong></a>
</p>

---

## ⚡ Recruiter Executive Summary

| Area | Implementation Highlights |
| :--- | :--- |
| **Architecture** | Decoupled Client-Server (React 18 SPA on Vercel + Express 5 REST API on Render) |
| **Streaming Engine** | Low-latency multi-participant WebRTC audio, video & screen sharing via ZEGOCLOUD |
| **Host Governance** | Granular in-call moderation: Temporary Remove, Permanent Block, and Room Lock / Unlock |
| **Security & Auth** | Stateless JWT tokens delivered in `HttpOnly`, `SameSite=None`, `Secure` cookies |
| **Mobile UX** | Automatic hardware acceleration cleanup, front/back camera toggles, pre-join lobby |
| **Reliability** | Express 5 routing, automated preflight CORS origin validator, proxy trust configuration |

---

## 🌟 Core Features

### 🎥 Real-Time Audio & Video Collaboration
* **HD Multi-Party Streaming:** Low-latency video grid built on WebRTC media streams with adaptive bitrates.
* **Screen Sharing & In-Call Chat:** 1-click desktop and window sharing alongside real-time text chat.
* **Pre-Join Media Lobby:** Interactive device preview allowing attendees to test camera feeds and toggle microphones before connecting to the live room.
* **Mobile Optimized:** Camera flip switcher (front/rear) and custom viewport handling for mobile devices.

### 🛡️ Host Governance & Room Moderation
* **Three-Dot Action Menu:** Located directly on the participant roster for intuitive, host-only moderation:
  * **Remove (Kick):** Instantly disconnects a disruptive user with a notification. The user may rejoin later if permitted.
  * **Block Forever:** Evicts the participant from the video room and database roster, permanently barring re-entry via server-side checks.
* **Top-Positioned Confirmation Dialogs:** Slide-down glassmorphic safety popups (Amber for Kick, Crimson for Block) prevent accidental ejections.
* **Session Lock / Unlock:** Hosts can lock an active session from the Session Info Card. Locked rooms immediately reject new entries with clear error feedback, while keeping existing participants uninterrupted.

---

## 🏗️ Architecture & Data Flow

```text
               ┌───────────────────────────────┐
               │    React 18 SPA (Vercel)      │
               │  Tailwind CSS + Context API   │
               └───────┬───────────────▲───────┘
                       │               │
          REST (HTTPS) │               │ JWT Cookie / JSON
                       ▼               │
               ┌───────────────────────┴───────┐
               │     Node.js / Express 5       │
               │       Backend (Render)        │
               └───────┬───────────────▲───────┘
                       │               │
              Mongoose │               │ MongoDB Native Driver
                       ▼               │
               ┌───────────────────────┴───────┐
               │   MongoDB Atlas (Cloud DB)    │
               │   Users & Sessions Collections│
               └───────────────────────────────┘

   [ WebRTC Media Streaming & Signaling Channel ]
   Host Stream <============== ZEGOCLOUD Network ==============> Attendee Streams
```

---

## 💡 Key Engineering Challenges & Solutions

### 1. Cross-Origin Cookie Authentication Across Cloud Hosts
* **Challenge:** Hosting the client on Vercel (`*.vercel.app`) and backend on Render (`*.onrender.com`) caused cross-site browsers to drop authentication cookies.
* **Solution:** Configured dynamic origin validation supporting preview branches, enabled `credentials: true`, configured `SameSite=None; Secure`, and set `app.set("trust proxy", 1)` to handle Render load-balancer headers.

### 2. Multi-Tier Room Moderation State Machine
* **Challenge:** Distinguishing between temporary kicks, permanent bans, and room-level locks without corrupting active participant counts or causing phantom disconnections.
* **Solution:** Engineered dedicated array fields (`kickedUsers`, `blockedUsers`, and `isLocked`) in MongoDB. Enforced server-level gating on `/join` so blocked users and locked rooms are rejected with clear status codes before WebRTC stream negotiation begins.

### 3. Mobile WebRTC Hardware Layer Lifecycle
* **Challenge:** On mobile browsers, disconnecting from a WebRTC room left the camera hardware stream frozen on screen instead of cleanly returning to the lobby.
* **Solution:** Implemented a targeted device detector (`isMobileDevice`) that explicitly clears the hardware container DOM (`container.innerHTML = ''`) and restores the clean pre-join state.

---

## 🔌 API Reference

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Create a new user account & set HTTP-only cookie | Public |
| `POST` | `/login` | Authenticate credentials & issue signed JWT | Public |
| `GET` | `/me` | Fetch authenticated user profile | Private |
| `POST` | `/logout` | Clear authentication cookie | Private |

### Session Management Routes (`/api/session`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/create` | Initialize a new live classroom with unique 12-char Room ID | Private |
| `POST` | `/join` | Join room (enforces active status, block list, and room lock) | Private |
| `GET` | `/:roomId` | Retrieve session metadata, lock status, and active participants | Private |
| `GET` | `/list` | Retrieve session history for current user | Private |
| `POST` | `/leave` | Exit active participant roster | Private |
| `POST` | `/kick` | Eject participant temporarily with re-entry allowed | Host Only |
| `POST` | `/block` | Permanently bar participant from room | Host Only |
| `POST` | `/toggle-lock` | Toggle room entry lock / unlock state | Host Only |
| `POST` | `/end/:id` | Terminate classroom and disconnect all streams | Host Only |
| `GET` | `/token` | Generate authenticated ZEGOCLOUD RTC token | Private |

---

## 💻 Tech Stack

* **Frontend:** React 18, Vite, React Router DOM, Tailwind CSS, React Icons, React Hot Toast
* **Backend:** Node.js, Express 5, Mongoose ODM, JSON Web Tokens (`jsonwebtoken`), BcryptJS, Cookie-Parser
* **WebRTC Engine:** `@zegocloud/zego-uikit-prebuilt`
* **Infrastructure:** MongoDB Atlas, Vercel, Render

---

## ⚙️ Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/sahoosubhamay888/live-class-platform.git
cd live-class-platform
```

### 2. Configure & Start Backend
```bash
cd server
npm install
```
Create `server/.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
ZEGO_APP_ID=your_zego_app_id
ZEGO_SERVER_SECRET=your_zego_server_secret
```
```bash
npm run dev
```

### 3. Configure & Start Frontend
```bash
cd ../client
npm install
```
Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_ZEGO_APP_ID=your_zego_app_id
```
```bash
npm run dev
```
Open `http://localhost:5173` to test locally.

---

## 👨‍💻 Author

**Subhamay Sahoo**  
* Full-Stack MERN & WebRTC Developer  
* GitHub: [@sahoosubhamay888](https://github.com/sahoosubhamay888)  
* Repository: [live-class-platform](https://github.com/sahoosubhamay888/live-class-platform)
