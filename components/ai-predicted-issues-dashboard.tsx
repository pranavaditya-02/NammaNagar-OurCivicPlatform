import React, { useEffect, useState } from "react";

interface PredictedIssue {
  issueType: string;
  location: string;
  likelihoodScore: number;
  urgencyLevel: string;
  recommendation: string;
}

const urgencyColors: Record<string, string> = {
  Critical: "#d32f2f",
  High: "#f57c00",
  Medium: "#1976d2",
  Low: "#388e3c",
};

const defaultSampleData: PredictedIssue[] = [
  {
    issueType: "Pothole Formation",
    location: "Anna Nagar, Chennai",
    likelihoodScore: 0.87,
    urgencyLevel: "High",
    recommendation:
      "Increase road inspections after heavy rainfall; schedule preventive maintenance in high-traffic areas.",
  },
  {
    issueType: "Garbage Overflow",
    location: "T. Nagar, Chennai",
    likelihoodScore: 0.78,
    urgencyLevel: "Medium",
    recommendation:
      "Increase waste collection frequency during festival seasons; deploy additional bins in market zones.",
  },
  {
    issueType: "Waterlogging",
    location: "Ward 12, Chennai",
    likelihoodScore: 0.91,
    urgencyLevel: "High",
    recommendation: "Clear drains before rainfall.",
  },
  {
    issueType: "Street Light Failure",
    location: "Perambur, Chennai",
    likelihoodScore: 0.65,
    urgencyLevel: "Low",
    recommendation:
      "Schedule routine checks; encourage citizens to report outages via the app.",
  },
  {
    issueType: "Drinking Water Shortage",
    location: "Adyar, Chennai",
    likelihoodScore: 0.72,
    urgencyLevel: "Medium",
    recommendation:
      "Monitor reservoir levels; initiate water conservation awareness campaigns.",
  },
];

export default function PredictedIssuesDashboard() {
  const [issues, setIssues] = useState<PredictedIssue[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/predicted-issues")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setIssues(data);
        setLoading(false);
      })
      .catch(() => {
        setIssues(defaultSampleData);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading predictions...</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 24,
        margin: "32px 0",
      }}
    >
      {(issues || defaultSampleData).map((issue, idx) => (
        <div key={idx} className="card" style={{ minHeight: 220 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 className="section-title" style={{ margin: 0, fontSize: 22 }}>
              {issue.issueType}
            </h2>
            <span
              style={{
                background: urgencyColors[issue.urgencyLevel] || "#888",
                color: "#fff",
                borderRadius: 8,
                padding: "4px 12px",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {issue.urgencyLevel}
            </span>
          </div>
          <div style={{ color: "#555", marginBottom: 8 }}>{issue.location}</div>
          <div style={{ margin: "12px 0 8px 0" }}>
            <div
              style={{
                fontSize: 14,
                color: "#333",
                marginBottom: 2,
              }}
            >
              Likelihood
            </div>
            <div
              style={{
                background: "#eee",
                borderRadius: 6,
                height: 12,
                width: "100%",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${Math.round(issue.likelihoodScore * 100)}%`,
                  background: urgencyColors[issue.urgencyLevel] || "#1976d2",
                  height: "100%",
                  borderRadius: 6,
                  transition: "width 0.5s",
                }}
              />
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#666",
                marginTop: 2,
              }}
            >
              {Math.round(issue.likelihoodScore * 100)}%
            </div>
          </div>
          <div style={{ fontSize: 15, marginTop: 10 }}>
            <b>Recommendation:</b> {issue.recommendation}
          </div>
        </div>
      ))}
    </div>
  );
}
