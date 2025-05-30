import React from "react";

export default function AdminDashboard() {
  return (
    <div style={{ maxWidth: 900, margin: "32px auto" }}>
      <h1 className="section-title">Administrative Dashboard</h1>
      <div className="card">
        <h2>System Management</h2>
        <ul>
          <li>User access control</li>
          <li>
            System health: <b>All systems operational</b>
          </li>
        </ul>
      </div>
      <div className="card">
        <h2>City-wide Analytics</h2>
        <ul>
          <li>Cross-department performance</li>
          <li>Resource optimization</li>
        </ul>
      </div>
      <div className="card">
        <h2>Configuration</h2>
        <ul>
          <li>Department setup, SLA config</li>
        </ul>
      </div>
      <div className="card">
        <h2>Data Integration</h2>
        <ul>
          <li>eProcurement, GeM, PFMS, State Tender sync</li>
        </ul>
      </div>
    </div>
  );
}
