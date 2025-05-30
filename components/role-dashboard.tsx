import React, { useEffect } from "react";

export default function RoleDashboard({
  role,
  token,
}: {
  role: string;
  token: string;
}) {
  useEffect(() => {
    if (!role || !token) return;
    if (typeof window !== "undefined") {
      switch (role) {
        case "citizen":
          window.location.href = "/dashboard/citizen";
          break;
        case "staff":
          window.location.href = "/dashboard/staff";
          break;
        case "supervisor":
          window.location.href = "/dashboard/supervisor";
          break;
        case "admin":
          window.location.href = "/dashboard/admin";
          break;
        case "executive":
          window.location.href = "/dashboard/executive";
          break;
        case "vendor":
          window.location.href = "/dashboard/vendor";
          break;
        default:
          window.location.href = "/dashboard/public";
      }
    }
  }, [role, token]);
  return null;
}
