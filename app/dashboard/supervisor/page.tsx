import React from "react";

export default function SupervisorDashboard() {
  return (
    <div style={{ maxWidth: 900, margin: "32px auto" }}>
      <h1 className="section-title">Supervisor/Manager Dashboard</h1>
      <div className="card">
        <h2>Department Overview</h2>
        <ul>
          <li>
            All issues: <b>32 open</b>, <b>120 closed</b>
          </li>
          <li>
            Staff performance: <b>See analytics</b>
          </li>
        </ul>
      </div>
      <div className="card">
        <h2>Quality Control</h2>
        <ul>
          <li>Review/approve resolved issues</li>
          <li>
            Citizen feedback: <b>4.2/5</b>
          </li>
        </ul>
      </div>
      <div className="card">
        <h2>Analytics & Reporting</h2>
        <ul>
          <li>Performance reports, trend analysis</li>
        </ul>
      </div>
      <div className="card">
        <h2>Staff Management</h2>
        <ul>
          <li>Assignment, scheduling, evaluation</li>
        </ul>
      </div>
    </div>
  );
}
