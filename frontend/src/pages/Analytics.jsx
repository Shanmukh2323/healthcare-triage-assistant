import { useEffect, useState } from "react";
import api from "../services/api";

function AnalyticsPage() {

  const [data, setData] = useState(null);

  useEffect(() => {

    loadAnalytics();

  }, []);

  const loadAnalytics = async () => {

    try {

      const response = await api.get(
        "/analytics/summary"
    );

      setData(response.data);

    } catch (error) {

      console.error(error);

      alert("Failed to load analytics");
    }
  };

  if (!data) {

    return <h2>Loading Analytics...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>

      <h2>Analytics Dashboard</h2>

      <div style={{
        border: "1px solid gray",
        padding: "15px",
        marginBottom: "10px"
      }}>
        <h3>Total Patients</h3>
        <p>{data.total_patients}</p>
      </div>

      <div style={{
        border: "1px solid gray",
        padding: "15px",
        marginBottom: "10px"
      }}>
        <h3>Total Assessments</h3>
        <p>{data.total_assessments ?? data.total_triages}</p>
      </div>

      <div style={{
        border: "1px solid gray",
        padding: "15px",
        marginBottom: "10px"
      }}>
        <h3>RED Cases</h3>
        <p>{data.red_cases}</p>
      </div>

      <div style={{
        border: "1px solid gray",
        padding: "15px",
        marginBottom: "10px"
      }}>
        <h3>Pending Escalations</h3>
        <p>{data.pending_escalations}</p>
      </div>

      <div style={{
        border: "1px solid gray",
        padding: "15px"
      }}>
        <h3>Resolved Escalations</h3>
        <p>{data.resolved_escalations}</p>
      </div>

    </div>
  );
}

export default AnalyticsPage;
