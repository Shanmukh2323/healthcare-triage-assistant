import { useState } from "react";

import EscalationsPage from "./EscalationsPage";
import Analytics from "./Analytics";
import PatientRegistration from "./PatientRegistration";
import PatientsList from "./PatientsList";
import PatientTriage from "./PatientTriage";
import PatientHistory from "./PatientHistory";
import HealthTips from "./HealthTips";
import EmergencyInfo from "./EmergencyInfo";
import AshaAlerts from "./AshaAlerts";

import {
  getUserRole,
  getUsername
} from "../utils/jwt";

function Home({ logout }) {

  const role = getUserRole();

  const username =
    getUsername();

  const defaultPage =
    role === "patient"
      ? "triage"
      : role === "doctor"
      ? "escalations"
      : role === "asha"
      ? "patients-list"
      : "analytics";

  const [activePage, setActivePage] =
    useState(defaultPage);

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f1f5f9"
      }}
    >

      {/* Sidebar */}

      <div
        style={{
          width: "320px",
          background:
            "linear-gradient(180deg,#0f172a,#1e293b)",
          color: "white",
          padding: "30px",
          display: "flex",
          flexDirection: "column"
        }}
      >

        {/* Logo */}

        <div>

          <h1
            style={{
              fontSize: "32px",
              marginBottom: "8px"
            }}
          >
            🏥 Triage AI
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "14px"
            }}
          >
            Smart Healthcare Assistant
          </p>

        </div>

        {/* Profile */}

        <div
          style={{
            marginTop: "30px",
            background:
              "rgba(255,255,255,.08)",
            padding: "20px",
            borderRadius: "18px"
          }}
        >

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "14px"
            }}
          >
            Logged in as
          </p>

          <h3
            style={{
              marginTop: "10px"
            }}
          >
            {username}
          </h3>

          <span
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding:
                "6px 12px",
              borderRadius: "20px",
              background:
                "#2563eb",
              fontSize: "12px"
            }}
          >
            {role?.toUpperCase()}
          </span>

        </div>

        {/* Menu */}

        <div
          style={{
            marginTop: "30px"
          }}
        >

          {role === "patient" && (

            <>

              <button
                className="sidebar-btn"
                onClick={() =>
                  setActivePage(
                    "triage"
                  )
                }
              >
                🎤 AI Assessment
              </button>

              <button
                className="sidebar-btn"
                onClick={() =>
                  setActivePage(
                    "history"
                  )
                }
              >
                📋 My History
              </button>

              <button
                className="sidebar-btn"
                onClick={() =>
                  setActivePage(
                    "tips"
                  )
                }
              >
                ❤️ Health Tips
              </button>

              <button
                className="sidebar-btn"
                onClick={() =>
                  setActivePage(
                    "emergency"
                  )
                }
              >
                🚨 Emergency Info
              </button>

            </>

          )}

          {role === "doctor" && (

            <button
              className="sidebar-btn"
              onClick={() =>
                setActivePage(
                  "escalations"
                )
              }
            >
              🚨 Escalations
            </button>

          )}

          {role === "asha" && (

            <>

              <button
                className="sidebar-btn"
                onClick={() =>
                  setActivePage(
                    "patients-list"
                  )
                }
              >
                👥 Patient Queue
              </button>

              <button
                className="sidebar-btn"
                onClick={() =>
                  setActivePage(
                    "asha-alerts"
                  )
                }
              >
                🚨 Emergency Alerts
              </button>

            </>

          )}

          {role === "admin" && (

            <>

              <button
                className="sidebar-btn"
                onClick={() =>
                  setActivePage(
                    "analytics"
                  )
                }
              >
                📊 Analytics
              </button>

              <button
                className="sidebar-btn"
                onClick={() =>
                  setActivePage(
                    "patients"
                  )
                }
              >
                ➕ Register Patient
              </button>

              <button
                className="sidebar-btn"
                onClick={() =>
                  setActivePage(
                    "patients-list"
                  )
                }
              >
                👥 Patients
              </button>

              <button
                className="sidebar-btn"
                onClick={() =>
                  setActivePage(
                    "escalations"
                  )
                }
              >
                🚨 Escalations
              </button>

            </>

          )}

        </div>

        {/* Health Notice */}

        {role === "patient" && (

          <div
            style={{
              marginTop: "auto",
              background:
                "rgba(59,130,246,.15)",
              padding: "18px",
              borderRadius: "18px",
              marginBottom: "20px"
            }}
          >

            <h4>
              Health Priority
            </h4>

            <p
              style={{
                marginTop: "10px",
                color: "#cbd5e1",
                fontSize: "14px",
                lineHeight: "1.6"
              }}
            >
              For severe chest pain,
              breathing difficulty,
              or unconsciousness,
              seek emergency help.
            </p>

          </div>

        )}

        {/* Logout */}

        <button
          className="logout-btn"
          onClick={logout}
        >
          🚪 Logout
        </button>

      </div>

      {/* Main Content */}

      <div
        style={{
          flex: 1,
          padding: "40px"
        }}
      >

        {activePage ===
          "triage" && (
            <PatientTriage />
        )}

        {activePage ===
          "history" && (
            <PatientHistory />
        )}

        {activePage ===
          "tips" && (
            <HealthTips />
        )}

        {activePage ===
          "emergency" && (
            <EmergencyInfo />
        )}

        {activePage ===
          "patients" && (
            <PatientRegistration />
        )}

        {activePage ===
          "patients-list" && (
            <PatientsList />
        )}

        {activePage ===
          "escalations" && (
            <EscalationsPage />
        )}

        {activePage ===
          "asha-alerts" && (
            <AshaAlerts />
        )}

        {activePage ===
          "analytics" && (
            <Analytics />
        )}

      </div>

    </div>

  );
}

export default Home;