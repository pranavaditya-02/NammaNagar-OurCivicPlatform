import React from "react";

export default function StaffDashboard() {
  return (
    <div style={{ maxWidth: 900, margin: "32px auto" }}>
      <h1 className="section-title">Department Staff Dashboard</h1>
      <div className="card">
        <h2>Assigned Issues</h2>
        <ul>
          <li>
            Pothole near market - <b>High Priority</b>
          </li>
          <li>
            Water leak in Ward 3 - <b>Medium Priority</b>
          </li>
        </ul>
      </div>
      <div className="card">
        <h2>Workflow Management</h2>
        <ul>
          <li>Status update, photo upload, escalation</li>
        </ul>
      </div>
      <div className="card">
        <h2>Performance Metrics</h2>
        <ul>
          <li>
            Issues resolved this month: <b>14</b>
          </li>
          <li>
            Avg. resolution time: <b>2.1 days</b>
          </li>
        </ul>
      </div>
      <div className="card">
        <h2>Resource Management</h2>
        <ul>
          <li>
            Equipment requests: <b>2 pending</b>
          </li>
        </ul>
      </div>
    </div>
  );
}
