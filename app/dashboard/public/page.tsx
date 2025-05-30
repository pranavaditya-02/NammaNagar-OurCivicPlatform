import React from "react";

export default function PublicDashboard() {
  return (
    <div style={{ maxWidth: 900, margin: "32px auto" }}>
      <h1 className="section-title">NammaNagar Public Dashboard</h1>
      <div className="card">
        <h2>Live Statistics</h2>
        <ul>
          <li>
            Total issues reported: <b>2,345</b>
          </li>
          <li>
            Resolved issues: <b>1,876</b> (80%)
          </li>
          <li>
            Avg. resolution time: <b>2.3 days</b>
          </li>
          <li>
            Department-wise performance: <b>See chart</b>
          </li>
        </ul>
      </div>
      <div className="card">
        <h2>Track an Issue</h2>
        <input
          placeholder="Enter Complaint ID"
          style={{ width: 240, marginRight: 8 }}
        />
        <button className="btn">Search</button>
        <div style={{ marginTop: 12, color: "#888" }}>
          <i>Demo: Enter any ID to see status</i>
        </div>
      </div>
      <div className="card">
        <h2>Government Transparency</h2>
        <ul>
          <li>
            Public tenders: <b>2,156</b> (State Portal)
          </li>
          <li>
            Budget allocation: <b>₹12.4 Cr</b>
          </li>
          <li>
            Recent announcements: <b>3</b>
          </li>
        </ul>
      </div>
      <div className="card">
        <h2>Service Status</h2>
        <ul>
          <li>
            Water supply: <b>Normal</b>
          </li>
          <li>
            Garbage collection: <b>On schedule</b>
          </li>
          <li>
            Power: <b>Planned outage in Ward 12 (2-4pm)</b>
          </li>
        </ul>
      </div>
    </div>
  );
}
