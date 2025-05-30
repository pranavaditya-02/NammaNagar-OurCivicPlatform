import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "../routes/auth";
import issueRoutes from "../routes/issues";
import userRoutes from "../routes/users";
import projectRoutes from "../routes/projects";
import commentRoutes from "../routes/comments";
import moderationRoutes from "../routes/moderation";
import { authenticateJWT, requireRole } from "../middleware/auth";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "20mb" }));
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/moderation", moderationRoutes);

app.get("/api/health", function (req, res) {
  res.json({ status: "ok" });
});

// Public route to view all reported issues on a map (dummy data)
app.get("/public", (req: Request, res: Response) => {
  // Return dummy issues for map display
  res.json({
    issues: [
      {
        id: "1",
        title: "Pothole on Main Road",
        category: "Road",
        location: { lat: 13.0827, lng: 80.2707, address: "Main Road, Chennai" },
        status: "open",
        images: [],
      },
      {
        id: "2",
        title: "Broken Street Light",
        category: "Lighting",
        location: {
          lat: 13.0604,
          lng: 80.2496,
          address: "2nd Avenue, Anna Nagar",
        },
        status: "open",
        images: [],
      },
    ],
  });
});

// Example: Role-based dashboard endpoints
// GET /dashboard - Serve dashboard based on user role (protected)
app.get("/api/dashboard", function (req, res, next) {
  authenticateJWT(req, res, function (err) {
    if (err) return next(err);
    const user = (req as any).user;
    // Serve dashboard data based on role
    switch (user.role) {
      case "citizen":
        return res.json({
          dashboard: "Citizen",
          features: ["Report Issue", "My Reports"],
        });
      case "official":
        return res.json({
          dashboard: "Official",
          features: ["Assign Issues", "Project Updates"],
        });
      case "representative":
        return res.json({
          dashboard: "Representative",
          features: ["Ward Overview", "Analytics"],
        });
      case "moderator":
        return res.json({
          dashboard: "Moderator",
          features: ["Content Moderation Tools"],
        });
      default:
        return res.status(403).json({ message: "Unknown role" });
    }
  });
});

// GET /dashboard/citizen - Citizen dashboard (protected)
app.get("/api/dashboard/citizen", function (req, res, next) {
  authenticateJWT(req, res, function (err) {
    if (err) return next(err);
    const user = (req as any).user;
    if (user.role !== "citizen")
      return res.status(403).json({ message: "Forbidden" });
    res.json({
      dashboard: "Citizen",
      features: [
        "Report Issue",
        "My Reports",
        "Upvote",
        "Comment",
        "Leaderboard",
      ],
    });
  });
});

// GET /dashboard/official - Official dashboard (protected)
app.get("/api/dashboard/official", function (req, res, next) {
  authenticateJWT(req, res, function (err) {
    if (err) return next(err);
    const user = (req as any).user;
    if (user.role !== "official")
      return res.status(403).json({ message: "Forbidden" });
    res.json({
      dashboard: "Official",
      features: [
        "Assign Issues",
        "Resolve Issues",
        "Upload After Photo",
        "Project Tracker",
        "PDF Report Generator",
      ],
    });
  });
});

// GET /dashboard/representative - Representative dashboard (protected)
app.get("/api/dashboard/representative", function (req, res, next) {
  authenticateJWT(req, res, function (err) {
    if (err) return next(err);
    const user = (req as any).user;
    if (user.role !== "representative")
      return res.status(403).json({ message: "Forbidden" });
    res.json({
      dashboard: "Representative",
      features: [
        "Ward Issues",
        "Completion Rate",
        "Geo Heatmap",
        "Engagement Score",
        "Analytics",
      ],
    });
  });
});

// GET /dashboard/moderator - Moderator dashboard (protected)
app.get("/api/dashboard/moderator", function (req, res, next) {
  authenticateJWT(req, res, function (err) {
    if (err) return next(err);
    const user = (req as any).user;
    if (user.role !== "moderator")
      return res.status(403).json({ message: "Forbidden" });
    res.json({
      dashboard: "Moderator",
      features: [
        "Spam Detection",
        "Duplicate Resolution",
        "User Trust Scores",
        "Block/Report Users",
      ],
    });
  });
});

// Predictive civic issue analytics endpoint
app.get("/api/predicted-issues", function (req, res) {
  // In a real implementation, fetch and analyze historical issues, weather, and population data here
  // For demo, return static predictions
  const predictions = [
    {
      issueType: "Pothole Formation",
      location: "Anna Nagar, Chennai",
      likelihoodScore: 0.87,
      urgencyLevel: "High",
      recommendation:
        "Increase road inspections after heavy rainfall; schedule preventive maintenance in high-traffic areas.",
    },
    {
      issueType: "Garbage Overflow",
      location: "T. Nagar, Chennai",
      likelihoodScore: 0.78,
      urgencyLevel: "Medium",
      recommendation:
        "Increase waste collection frequency during festival seasons; deploy additional bins in market zones.",
    },
    {
      issueType: "Waterlogging",
      location: "Ward 12, Chennai",
      likelihoodScore: 0.91,
      urgencyLevel: "High",
      recommendation: "Clear drains before rainfall.",
    },
    {
      issueType: "Street Light Failure",
      location: "Perambur, Chennai",
      likelihoodScore: 0.65,
      urgencyLevel: "Low",
      recommendation:
        "Schedule routine checks; encourage citizens to report outages via the app.",
    },
    {
      issueType: "Drinking Water Shortage",
      location: "Adyar, Chennai",
      likelihoodScore: 0.72,
      urgencyLevel: "Medium",
      recommendation:
        "Monitor reservoir levels; initiate water conservation awareness campaigns.",
    },
  ];
  res.json(predictions);
});

export default app;
