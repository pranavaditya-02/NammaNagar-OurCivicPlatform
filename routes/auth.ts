// Fix: Use require instead of import for express in this file to avoid type conflicts
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { authenticateJWT } = require("../middleware/auth");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

// Enhanced user roles and permissions
export enum UserRole {
  PUBLIC = "public",
  CITIZEN = "citizen",
  STAFF = "staff",
  SUPERVISOR = "supervisor",
  ADMIN = "admin",
  EXECUTIVE = "executive",
  VENDOR = "vendor",
}

export enum Department {
  WATER = "water",
  ELECTRICITY = "electricity",
  ROADS = "roads",
  HEALTH = "health",
  SANITATION = "sanitation",
  TAXATION = "taxation",
  BUILDING = "building",
  TRANSPORT = "transport",
}

interface User {
  id: string;
  email: string;
  phone?: string;
  password: string;
  role: UserRole;
  department?: Department;
  isActive: boolean;
  profile: {
    name: string;
    address?: string;
    ward?: string;
    employeeId?: string;
  };
  permissions: string[];
  lastLogin?: Date;
  createdAt: Date;
}

// Enhanced user store with proper NammaNagar roles
const users: User[] = [
  // Citizens
  {
    id: "1",
    email: "citizen@nammanagar.com",
    phone: "+919876543210",
    password: bcrypt.hashSync("password", 8),
    role: UserRole.CITIZEN,
    isActive: true,
    profile: {
      name: "Rajesh Kumar",
      address: "123 MG Road, Kozhikode",
      ward: "Ward 15",
    },
    permissions: ["view_own_issues", "create_issue", "track_issue"],
    createdAt: new Date(),
  },

  // Department Staff
  {
    id: "2",
    email: "water.staff@nammanagar.gov.in",
    password: bcrypt.hashSync("password", 8),
    role: UserRole.STAFF,
    department: Department.WATER,
    isActive: true,
    profile: {
      name: "Priya Nair",
      employeeId: "WD001",
    },
    permissions: [
      "view_department_issues",
      "update_issue_status",
      "assign_field_work",
    ],
    createdAt: new Date(),
  },

  // Department Supervisor
  {
    id: "3",
    email: "water.supervisor@nammanagar.gov.in",
    password: bcrypt.hashSync("password", 8),
    role: UserRole.SUPERVISOR,
    department: Department.WATER,
    isActive: true,
    profile: {
      name: "Suresh Menon",
      employeeId: "WS001",
    },
    permissions: [
      "view_department_issues",
      "approve_issues",
      "manage_staff",
      "view_department_analytics",
      "escalate_issues",
    ],
    createdAt: new Date(),
  },

  // System Administrator
  {
    id: "4",
    email: "admin@nammanagar.gov.in",
    password: bcrypt.hashSync("admin123", 8),
    role: UserRole.ADMIN,
    isActive: true,
    profile: {
      name: "IT Administrator",
      employeeId: "ADM001",
    },
    permissions: [
      "manage_users",
      "system_config",
      "view_all_data",
      "data_export",
      "system_health",
    ],
    createdAt: new Date(),
  },

  // Executive
  {
    id: "5",
    email: "mayor@nammanagar.gov.in",
    password: bcrypt.hashSync("secure123", 8),
    role: UserRole.EXECUTIVE,
    isActive: true,
    profile: {
      name: "Dr. Lakshmi Devi",
      employeeId: "EXE001",
    },
    permissions: [
      "view_executive_dashboard",
      "city_wide_analytics",
      "policy_decisions",
      "public_announcements",
    ],
    createdAt: new Date(),
  },

  // Vendor
  {
    id: "6",
    email: "vendor@contractorltd.com",
    password: bcrypt.hashSync("vendor123", 8),
    role: UserRole.VENDOR,
    isActive: true,
    profile: {
      name: "ABC Contractors Ltd",
      employeeId: "VEN001",
    },
    permissions: [
      "view_work_orders",
      "update_work_progress",
      "submit_invoices",
    ],
    createdAt: new Date(),
  },
];

// Login with enhanced validation
interface LoginRequestBody {
  email?: string;
  phone?: string;
  password: string;
  loginMethod?: "email" | "phone";
}

interface LoginResponseUser {
  id: string;
  email: string;
  phone?: string;
  role: UserRole;
  department?: Department;
  profile: User["profile"];
  permissions: string[];
}

interface LoginResponse {
  token: string;
  role: UserRole;
  user: LoginResponseUser;
}

router.post("/login", (req: any, res: any, next: any) => {
  try {
    const { email, phone, password, loginMethod } = req.body;
    let user;
    // Support both email and phone login, but require at least one
    if ((loginMethod === "email" || !loginMethod) && email) {
      user = users.find((u) => u.email === email);
    } else if (loginMethod === "phone" && phone) {
      user = users.find((u) => u.phone === phone);
    } else {
      res.status(400).json({
        message: "Please provide valid login credentials",
      });
      return;
    }
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }
    if (!user.isActive) {
      res.status(403).json({
        message: "Account is deactivated. Please contact administrator.",
      });
      return;
    }
    // Update last login
    user.lastLogin = new Date();
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        department: user.department,
        permissions: user.permissions,
      },
      JWT_SECRET,
      { expiresIn: "8h" }
    );
    res.json({
      token,
      role: user.role, // Add role at top level for frontend compatibility
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        role: user.role,
        department: user.department,
        profile: user.profile,
        permissions: user.permissions,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Enhanced signup with proper validation
router.post("/signup", (req: any, res: any) => {
  try {
    const { email, phone, password, name, address, ward, role } = req.body;

    // Basic validation
    if (!email || !password || !name) {
      res.status(400).json({
        message: "Email, password, and name are required",
      });
      return;
    }

    // Check if user already exists
    if (users.find((u) => u.email === email || u.phone === phone)) {
      res.status(400).json({
        message: "User with this email or phone already exists",
      });
      return;
    }

    // Only allow citizen registration through public signup
    // Staff and other roles should be created by admin
    if (role && role !== UserRole.CITIZEN) {
      res.status(403).json({
        message: "Only citizen registration is allowed through public signup",
      });
      return;
    }

    const id = (users.length + 1).toString();
    const hashedPassword = bcrypt.hashSync(password, 12);

    const newUser = {
      id,
      email,
      phone,
      password: hashedPassword,
      role: UserRole.CITIZEN,
      isActive: true,
      profile: { name, address, ward },
      permissions: ["view_own_issues", "create_issue", "track_issue"],
      createdAt: new Date(),
    };

    users.push(newUser);

    const token = jwt.sign(
      {
        id,
        email,
        role: UserRole.CITIZEN,
        permissions: newUser.permissions,
      },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.status(201).json({
      token,
      user: {
        id,
        email,
        phone,
        role: UserRole.CITIZEN,
        profile: newUser.profile,
        permissions: newUser.permissions,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
});

// Get current user profile with enhanced data
router.get("/me", authenticateJWT, (req: any, res: any) => {
  if (!req.user) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }
  const fullUser = users.find((u) => u.id === req.user.id);
  if (!fullUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.json({
    user: {
      id: fullUser.id,
      email: fullUser.email,
      phone: fullUser.phone,
      role: fullUser.role,
      department: fullUser.department,
      profile: fullUser.profile,
      permissions: fullUser.permissions,
      lastLogin: fullUser.lastLogin,
    },
  });
});

// Dashboard access control endpoint
router.get("/dashboard-access", authenticateJWT, (req: any, res: any) => {
  if (!req.user) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }
  const dashboardAccess = {
    citizen: {
      allowed: ["citizen", "public"],
      defaultRedirect: "/citizen-dashboard",
    },
    staff: {
      allowed: ["staff", "public"],
      defaultRedirect: "/staff-dashboard",
    },
    supervisor: {
      allowed: ["supervisor", "staff", "public"],
      defaultRedirect: "/supervisor-dashboard",
    },
    admin: {
      allowed: ["admin", "supervisor", "staff", "public"],
      defaultRedirect: "/admin-dashboard",
    },
    executive: {
      allowed: ["executive", "admin", "public"],
      defaultRedirect: "/executive-dashboard",
    },
    vendor: {
      allowed: ["vendor", "public"],
      defaultRedirect: "/vendor-dashboard",
    },
  };

  const userRole = ((req.user.role || "citizen") as string).toLowerCase() as keyof typeof dashboardAccess;
  const access = dashboardAccess[userRole] || dashboardAccess["citizen"];
  res.json({ access, user: req.user });
});

// Password reset request (basic implementation)
router.post("/forgot-password", (req: any, res: any) => {
  res.json({
    message:
      "If the account exists, password reset instructions have been sent.",
  });
});

// Logout (for token blacklisting in production)
router.post("/logout", authenticateJWT, (req: any, res: any) => {
  res.json({ message: "Logged out successfully" });
});

// Admin: Create new user (staff, supervisor, etc.)
router.post("/admin/create-user", authenticateJWT, (req: any, res: any) => {
  const currentUser = req.user;

  if (currentUser.role !== UserRole.ADMIN) {
    return res.status(403).json({ message: "Admin access required" });
  }

  const { email, password, role, department, profile } = req.body;

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const id = (users.length + 1).toString();
  const hashedPassword = bcrypt.hashSync(password, 12);

  const permissions = getPermissionsByRole(role as UserRole);

  const newUser: User = {
    id,
    email,
    password: hashedPassword,
    role: role as UserRole,
    department: department as Department,
    isActive: true,
    profile,
    permissions,
    createdAt: new Date(),
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: {
      id,
      email,
      role,
      department,
      profile,
    },
  });
});

// Helper function to get permissions by role
function getPermissionsByRole(role: UserRole): string[] {
  type PermittedRoles =
    | UserRole.CITIZEN
    | UserRole.STAFF
    | UserRole.SUPERVISOR
    | UserRole.ADMIN
    | UserRole.EXECUTIVE
    | UserRole.VENDOR;

  const rolePermissions: Record<PermittedRoles, string[]> = {
    [UserRole.CITIZEN]: ["view_own_issues", "create_issue", "track_issue"],
    [UserRole.STAFF]: [
      "view_department_issues",
      "update_issue_status",
      "assign_field_work",
    ],
    [UserRole.SUPERVISOR]: [
      "view_department_issues",
      "approve_issues",
      "manage_staff",
      "view_department_analytics",
      "escalate_issues",
    ],
    [UserRole.ADMIN]: [
      "manage_users",
      "system_config",
      "view_all_data",
      "data_export",
      "system_health",
    ],
    [UserRole.EXECUTIVE]: [
      "view_executive_dashboard",
      "city_wide_analytics",
      "policy_decisions",
      "public_announcements",
    ],
    [UserRole.VENDOR]: [
      "view_work_orders",
      "update_work_progress",
      "submit_invoices",
    ],
  };

  if (
    role === UserRole.CITIZEN ||
    role === UserRole.STAFF ||
    role === UserRole.SUPERVISOR ||
    role === UserRole.ADMIN ||
    role === UserRole.EXECUTIVE ||
    role === UserRole.VENDOR
  ) {
    return rolePermissions[role];
  }
  return [];
}

export default router;
