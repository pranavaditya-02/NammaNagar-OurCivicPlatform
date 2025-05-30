# NammaNagar - Our Civic Engagement Platform

## Problem Statement

India's civic infrastructure often suffers from poor maintenance, project delays and lack of transparency. Citizens have little or no awareness of tools to track what was promised in terms of roads, schools, toilets, hospitals vs. what was actually delivered. Corruption, information gaps and unaccountable contractors further widen this trust deficit.

There is a need for a real-time, participatory platform where citizens can report, track and monitor the status of civic infrastructure while holding local bodies accountable.

---

## Solution & Approach

NammaNagar is a civic-tech platform that empowers citizens to report infrastructure issues, track public projects and collaborate with local officials—all in real time. Citizens can upload geotagged images of issues (like potholes, broken streetlights, unfinished schools), compare them against government-sanctioned projects, and get notified of updates. The platform leverages AI for issue classification and sentiment analysis and provides role-based dashboards for all stakeholders.

---

## Unique and Innovative Features

- **Improved Transparency:** Track infrastructure spending and project delivery
- **Increased Citizen Participation:** Engage in local governance and planning
- **Faster Grievance Redressal:** Visibility and public pressure for quick action
- **Data-Driven Decision Making:** For municipalities and smart cities
- **Civic Education:** Encourages digital civic responsibility and awareness
- **Scalability:** Extendable to rural areas, smart villages, or pan-India
- **Participatory Governance:** Empowers citizens as watchdogs with real oversight
- **AI Integration:** Smartly classifies civic issues and auto-suggests categories
- **Public vs Promised:** Compares live citizen reports with government tenders and budgets
- **Hyperlocal Focus:** Tailored for wards/localities—not just big cities
- **Gamified Trust System:** Citizens earn points for verified, helpful contributions
- **Role-Based Dashboards:** Personalized views and actions for every stakeholder
- **Citizen issue reporting with image & location**
- **AI detection of issue type (pothole, garbage, waterlogging, etc.)**
- **Comparison with project tenders/budgets (via scraped data)**
- **Live maps for all reports (public view)**
- **Role-based dashboards for different stakeholders**
- **Commenting, upvoting and community feedback**
- **Moderator tools for spam control and duplicate flagging**
- **Engagement Module:** Users can learn, preach, communicate with others in aspect of civil infrastructures
- **Gamified Reward System**
- **Adopt a Spot:** Citizens can adopt a spot and maintain or do the needful for the spot

---

## Technology Stack

- **Frontend:** Next.js (React), TailwindCSS (i18n)
- **Backend:** Express.js (Node.js), TypeScript, MongoDB
- **Authentication:** JWT + Role-based Access Control
- **AI/ML:** Python microservice for image classification & NLP (sentiment analysis on comments)
- **Mapping:** Leaflet.js / Mapbox with GIS integration for real-time issue plotting
- **Cloud:** Firebase Storage / AWS S3, GitHub Actions for CI/CD
- **Design Tools:** Figma (UI), Postman (API Testing), GitHub (Version Control)

---

## Stakeholder Benefits

NammaNagar benefits a wide range of stakeholders across the civic ecosystem:

- **Citizens:** Empowered to voice concerns, report issues, track resolution status, and actively participate in local governance.
- **Ward Representatives & Officials:** Access to real-time, ground-level data to prioritize problems and allocate resources efficiently.
- **Urban Planners:** Leverage geo-tagged issue reports for data-driven planning, infrastructure upgrades, and optimized budget allocation.
- **Governments:** Streamlined way to reduce complaint backlogs, improve transparency, and build public trust in civic project delivery.
- **Media & NGOs:** Utilize open civic data to monitor accountability, publish insights, and advocate for better infrastructure policies.

---

## Project Structure

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

## Getting Started

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

---

## Predictive Analytics Example

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

## Security & Privacy

- JWT authentication
- Role-based access control
- CAPTCHA (for spam prevention)
- GDPR-compliant data collection

---

## Multi-language

- English and Tamil support via i18n
- Easily extendable to more languages

---

## Demo Link

https://namma-nagar-our-civic-platform.vercel.app/

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mapbox](https://www.mapbox.com/)
- [Leaflet.js](https://leafletjs.com/)
- [Figma](https://figma.com/)
- [Postman](https://postman.com/)
- [GitHub Actions](https://github.com/features/actions)

---

## Authors

- NammaNagar Team (Flames of Purpose)
