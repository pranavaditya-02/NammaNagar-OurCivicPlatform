import React, { useEffect, useState } from "react";

type Issue = { id: string; status: string; title: string; };

export default function CitizenDashboard() {
  const [myIssues, setMyIssues] = useState<Issue[]>([]);
  useEffect(() => {
    // Fetch user's issues (demo)
    setMyIssues([
      { id: "C123", status: "Resolved", title: "Pothole near school" },
      { id: "C124", status: "Open", title: "Street light not working" },
    ]);
  }, []);
  return (
    <div style={{ maxWidth: 900, margin: "32px auto" }}>
      <h1 className="section-title">Citizen Portal Dashboard</h1>
      <div className="card">
        <h2>My Issues</h2>
        <ul>
          {myIssues.map((issue) => (
            <li key={issue.id}>
              {issue.title} - <b>{issue.status}</b>
            </li>
          ))}
        </ul>
      </div>
      <div className="card">
        <h2>Quick Actions</h2>
        <button className="btn">Report New Issue</button>
        <button className="btn" style={{ marginLeft: 8 }}>
          Emergency Contacts
        </button>
      </div>
      <div className="card">
        <h2>Notifications</h2>
        <ul>
          <li>Issue C124 assigned to field staff</li>
          <li>Community meeting on Saturday</li>
        </ul>
      </div>
      <div className="card">
        <h2>Community Feed</h2>
        <ul>
          <li>Ward 5: Garbage cleared after 2 days</li>
          <li>Ward 7: New park inaugurated</li>
        </ul>
      </div>
    </div>
  );
}
