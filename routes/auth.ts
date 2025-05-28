import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { authenticateJWT } from "../middleware/auth";

// Use req, res types from express automatically (no explicit typing in handler args)
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

// Dummy user store for demo
const users = [
  {
    id: "1",
    email: "citizen@example.com",
    password: bcrypt.hashSync("password", 8),
    role: "citizen",
  },
  {
    id: "2",
    email: "official@example.com",
    password: bcrypt.hashSync("password", 8),
    role: "official",
  },
  {
    id: "3",
    email: "rep@example.com",
    password: bcrypt.hashSync("password", 8),
    role: "representative",
  },
  {
    id: "4",
    email: "mod@example.com",
    password: bcrypt.hashSync("password", 8),
    role: "moderator",
  },
];

// POST /login - User login (JWT)
router.post("/login", function (req, res) {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({ token, role: user.role });
});

// POST /signup - User registration (dummy, returns JWT)
router.post("/signup", function (req, res) {
  const { email, password, role } = req.body;
  if (users.find((u) => u.email === email)) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  const id = (users.length + 1).toString();
  const hash = bcrypt.hashSync(password, 8);
  users.push({ id, email, password: hash, role });
  const token = jwt.sign({ id, email, role }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, role });
});

// GET /me - Get current user profile (protected)
router.get("/me", function (req, res, next) {
  authenticateJWT(req, res, function (err) {
    if (err) return next(err);
    const user = (req as any).user;
    res.json({ user });
  });
});

export default router;
