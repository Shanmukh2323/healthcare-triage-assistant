import { useEffect, useState } from "react";
import api from "../services/api";

function AshaAlerts() {

  const [alerts, setAlerts] =
    useState([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {

    try {

      const response =
        await api.get("/escalations");

      const redCases =
        response.data.filter(
          item =>
            item.triage_level === "RED"
        );

      setAlerts(redCases);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to load emergency alerts"
      );
    }
  };

  return (

    <div>

      <h1 className="page-title">
        🚨 Emergency Alerts
      </h1>

      {alerts.length === 0 && (

        <div className="card">
          No active emergency alerts.
        </div>

      )}

      {alerts.map((item) => (

        <div
          key={item.id}
          className="escalation-card"
        >

          <div className="flex-between">

            <h2>
              Emergency Case #{item.id}
            </h2>

            <span className="badge red">
              RED
            </span>

          </div>

          <hr />

          <p>
            <strong>
              Patient ID:
            </strong>
          </p>

          <p>
            {item.patient_id}
          </p>

          <p>
            <strong>
              Patient Name:
            </strong>
          </p>

          <p>
            {item.patient_name || "Unknown"}
          </p>

          <p>
            <strong>
              Phone:
            </strong>
          </p>

          <p>
            {item.phone_number || "Not available"}
          </p>

          <p>
            <strong>
              Hospital:
            </strong>
          </p>

          <p>
            {item.nearest_hospital || "Not available"}
          </p>

          <br />

          <p>
            <strong>
              Patient Complaint:
            </strong>
          </p>

          <p>
            {item.patient_text}
          </p>

          <br />

          <p>
            <strong>
              Status:
            </strong>
            {" "}
            {item.status}
          </p>

          <p>
            <strong>
              Assigned Doctor:
            </strong>
            {" "}
            {
              item.assigned_doctor ||
              "Not Assigned"
            }
          </p>

          <p>
            <strong>
              Doctor Notes:
            </strong>
            {" "}
            {
              item.doctor_notes ||
              "No notes yet"
            }
          </p>

          <br />

          <a
            href="tel:108"
            className="btn-red"
          >
            📞 Call Emergency 108
          </a>

        </div>

      ))}

    </div>
  );
}

export default AshaAlerts;