import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export enum UserRole {
  PUBLIC = "public",
  CITIZEN = "citizen",
  STAFF = "staff",
  SUPERVISOR = "supervisor",
  ADMIN = "admin",
  EXECUTIVE = "executive",
  VENDOR = "vendor",
}

interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  department?: string;
  permissions: string[];
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

// Basic JWT authentication
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthenticatedUser;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Role-based access control
export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Insufficient permissions for this resource",
      });
    }

    next();
  };
};

// Permission-based access control
export const requirePermission = (requiredPermission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!req.user.permissions.includes(requiredPermission)) {
      return res.status(403).json({
        message: `Permission '${requiredPermission}' required`,
      });
    }

    next();
  };
};

// Department-based access control
export const requireDepartment = (allowedDepartments: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Admins and executives can access all departments
    if ([UserRole.ADMIN, UserRole.EXECUTIVE].includes(req.user.role)) {
      return next();
    }

    if (
      !req.user.department ||
      !allowedDepartments.includes(req.user.department)
    ) {
      return res.status(403).json({
        message: "Department access required",
      });
    }

    next();
  };
};

// Combined middleware for dashboard access
export const dashboardAuth = {
  // Public dashboard - no auth required
  public: (req: Request, res: Response, next: NextFunction) => {
    next();
  },

  // Citizen dashboard
  citizen: [authenticateJWT, requireRole([UserRole.CITIZEN, UserRole.ADMIN])],

  // Staff dashboard
  staff: [
    authenticateJWT,
    requireRole([UserRole.STAFF, UserRole.SUPERVISOR, UserRole.ADMIN]),
  ],

  // Supervisor dashboard
  supervisor: [
    authenticateJWT,
    requireRole([UserRole.SUPERVISOR, UserRole.ADMIN]),
  ],

  // Admin dashboard
  admin: [authenticateJWT, requireRole([UserRole.ADMIN])],

  // Executive dashboard
  executive: [
    authenticateJWT,
    requireRole([UserRole.EXECUTIVE, UserRole.ADMIN]),
  ],

  // Vendor dashboard
  vendor: [authenticateJWT, requireRole([UserRole.VENDOR, UserRole.ADMIN])],
};

// Utility function to check if user can access resource
export const canAccess = (
  user: AuthenticatedUser | undefined,
  resource: string
): boolean => {
  if (!user) return false;

  const resourcePermissions: { [key: string]: UserRole[] } = {
    public_data: [
      UserRole.PUBLIC,
      UserRole.CITIZEN,
      UserRole.STAFF,
      UserRole.SUPERVISOR,
      UserRole.ADMIN,
      UserRole.EXECUTIVE,
      UserRole.VENDOR,
    ],
    citizen_data: [UserRole.CITIZEN, UserRole.ADMIN],
    department_data: [UserRole.STAFF, UserRole.SUPERVISOR, UserRole.ADMIN],
    city_data: [UserRole.SUPERVISOR, UserRole.ADMIN, UserRole.EXECUTIVE],
    system_data: [UserRole.ADMIN],
    executive_data: [UserRole.EXECUTIVE, UserRole.ADMIN],
  };

  const allowedRoles = resourcePermissions[resource] || [];
  return allowedRoles.includes(user.role);
};

// Middleware to log access attempts
export const logAccess = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const user = req.user ? `${req.user.email} (${req.user.role})` : "Anonymous";
  const endpoint = `${req.method} ${req.path}`;

  console.log(`[${timestamp}] Access: ${user} -> ${endpoint}`);
  next();
};

// Rate limiting for sensitive operations
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const rateLimit = (maxAttempts: number, windowMs: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const identifier: string = (req.user && req.user.id) ? req.user.id : req.ip || "";
    const now = Date.now();

    const userLimit = rateLimitStore.get(identifier);

    if (!userLimit || now > userLimit.resetTime) {
      rateLimitStore.set(identifier, {
        count: 1,
        resetTime: now + windowMs,
      });
      return next();
    }

    if (userLimit.count >= maxAttempts) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    userLimit.count++;
    next();
  };
};

// Example usage in routes:
/*
// Public dashboard route
app.get('/api/dashboard/public', dashboardAuth.public, getPublicDashboard);

// Citizen dashboard route
app.get('/api/dashboard/citizen', ...dashboardAuth.citizen, getCitizenDashboard);

// Staff dashboard with department restriction
app.get('/api/dashboard/staff', 
  ...dashboardAuth.staff,
  requireDepartment(['water', 'roads']), // Only water and roads staff
  getStaffDashboard
);

// Admin-only system configuration
app.post('/api/admin/config',
  authenticateJWT,
  requireRole([UserRole.ADMIN]),
  requirePermission('system_config'),
  rateLimit(5, 60000), // 5 attempts per minute
  updateSystemConfig
);
*/

export default {
  authenticateJWT,
  requireRole,
  requirePermission,
  requireDepartment,
  dashboardAuth,
  canAccess,
  logAccess,
  rateLimit,
};
