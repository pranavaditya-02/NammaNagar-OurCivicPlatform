# NammaNagar - Civic Infrastructure Monitoring Platform

NammaNagar is a scalable, user-friendly civic-tech platform empowering citizens, officials, and representatives to report, track, and resolve local infrastructure issues. It features predictive analytics, role-based dashboards, multi-language support (English/Tamil), and a modern, accessible UI.

---

## 🚀 Features

- **Role-Based Login:** JWT authentication for Citizens, Officials, Representatives, Moderators
- **Multi-language:** English & Tamil (i18n)
- **Issue Reporting:** Report civic issues (potholes, garbage, etc.) with location, photos, and AI-powered duplicate detection
- **Public Map:** View all reported issues on a map with filters
- **AI & Analytics:**
  - Image classification for issue type
  - Sentiment analysis on comments
  - Predictive analytics for future hotspots
  - Auto-prioritization and duplicate detection
- **Dashboards:**
  - Citizen: Report, track, upvote, comment, leaderboard
  - Official: Assign/resolve, upload after-photos, project tracker
  - Representative: Ward analytics, heatmaps, engagement
  - Moderator: Spam/duplicate detection, user trust, block/report
- **Notifications:** Email/SMS/Push (Twilio/Firebase)
- **Security:** CAPTCHA, GDPR-compliance, RBAC
- **Responsive UI:** Modern, accessible, mobile-first design

---

## 🏗️ Tech Stack

- **Frontend:** Next.js (React), Plain CSS (no Tailwind), Responsive Components
- **Backend:** Node.js (Express), TypeScript
- **Database:** (Pluggable: MongoDB/PostgreSQL, not included in demo)
- **Image Uploads:** (Cloudinary/S3 ready, not included in demo)
- **AI/ML:** Python microservices or API hooks (for production)

---

## 📦 Project Structure

```
app/                # Next.js app routes & pages
components/         # Reusable React components (UI, dashboards, widgets)
hooks/              # Custom React hooks
lib/                # Backend logic, Express app, schema, i18n, AI helpers
middleware/         # Express middleware (auth, RBAC)
routes/             # Express route modules (auth, issues, users, etc.)
public/             # Static assets
styles/             # Global CSS
```

---

## 🛠️ Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Run the development server

```bash
pnpm run dev
```

### 3. Backend API (Express)

- The Express app is in `lib/app.ts` and is auto-mounted in Next.js API routes (or can be run standalone).
- Main endpoints:
  - `/api/auth` (login/signup)
  - `/api/issues` (CRUD)
  - `/api/predicted-issues` (AI predictions)
  - `/public` (public map data)

### 4. Frontend

- Visit `http://localhost:3000` for the Next.js app.
- `/dashboard` shows predictive analytics and role-based features.

---

## 🧠 Predictive Analytics Example

The `/api/predicted-issues` endpoint returns:

```json
[
  {
    "issueType": "Pothole Formation",
    "location": "Anna Nagar, Chennai",
    "likelihoodScore": 0.87,
    "urgencyLevel": "High",
    "recommendation": "Increase road inspections after heavy rainfall; schedule preventive maintenance in high-traffic areas."
  },
  ...
]
```

---

## 🛡️ Security & Privacy

- JWT authentication
- Role-based access control
- CAPTCHA (for spam prevention)
- GDPR-compliant data collection

---

## 🌏 Multi-language

- English and Tamil support via i18n
- Easily extendable to more languages

---

## 📝 Contributing

Pull requests and suggestions are welcome! Please open an issue to discuss major changes.

---

## 📄 License

MIT

---

## 👩‍💻 Authors

- NammaNagar Team

---

## 💡 Notes

- This is a demo/prototype. For production, connect a real database, storage, and AI/ML services.
- For deployment, use Vercel/Netlify (frontend) and Railway/Render (backend) or similar.
