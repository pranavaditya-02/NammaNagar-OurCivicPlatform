import React from "react";

export default function ExecutiveDashboard() {
  return (
    <div style={{ maxWidth: 900, margin: "32px auto" }}>
      <h1 className="section-title">Executive Dashboard</h1>
      <div className="card">
        <h2>City Overview</h2>
        <ul>
          <li>Key performance indicators</li>
          <li>
            Critical issues: <b>2</b>
          </li>
          <li>
            Budget vs actual: <b>₹12.4 Cr / ₹11.2 Cr</b>
          </li>
        </ul>
      </div>
      <div className="card">
        <h2>Strategic Insights</h2>
        <ul>
          <li>Long-term trends, policy impact</li>
        </ul>
      </div>
      <div className="card">
        <h2>Decision Support</h2>
        <ul>
          <li>Resource allocation, benchmarking, risk alerts</li>
        </ul>
      </div>
      <div className="card">
        <h2>Public Communication</h2>
        <ul>
          <li>Announcements, media dashboard, transparency</li>
        </ul>
      </div>
    </div>
  );
}
