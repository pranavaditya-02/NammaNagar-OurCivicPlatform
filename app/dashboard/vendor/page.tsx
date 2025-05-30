import React from "react";

export default function VendorDashboard() {
  return (
    <div style={{ maxWidth: 900, margin: "32px auto" }}>
      <h1 className="section-title">Vendor/Contractor Dashboard</h1>
      <div className="card">
        <h2>Work Orders</h2>
        <ul>
          <li>
            Assigned projects: <b>3</b>
          </li>
          <li>Progress reporting, photo documentation</li>
        </ul>
      </div>
      <div className="card">
        <h2>Payment Tracking</h2>
        <ul>
          <li>
            Invoices submitted: <b>2</b>
          </li>
          <li>
            Payments received: <b>₹1.2L</b>
          </li>
        </ul>
      </div>
      <div className="card">
        <h2>Performance Metrics</h2>
        <ul>
          <li>
            Quality ratings: <b>4.5/5</b>
          </li>
          <li>
            Completion time: <b>On track</b>
          </li>
        </ul>
      </div>
    </div>
  );
}
