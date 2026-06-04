import { useEffect, useState } from "react";
import api from "../services/api";

function PatientHistory() {

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadHistory();

  }, []);

  const loadHistory =
    async () => {

      try {

        const response =
          await api.get("/history");

        setHistory(
          response.data
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to load history"
        );

      } finally {

        setLoading(false);
      }
    };

  const playVoice =
    (audioPath) => {

      if (!audioPath) {

        alert(
          "Voice response not available"
        );

        return;
      }

      const audio =
        new Audio(
          `http://127.0.0.1:8000/${audioPath}`
        );

      audio.play();
    };

  if (loading) {

    return (

      <div>

        <h1 className="page-title">
          📋 My History
        </h1>

        <div className="card">
          Loading history...
        </div>

      </div>

    );
  }

  return (

    <div>

      <h1 className="page-title">
        📋 My History
      </h1>

      {history.length === 0 ? (

        <div className="card">

          <h2>
            No Assessment History Found
          </h2>

        </div>

      ) : (

        <div className="grid">

          {history.map((item) => (

            <div
              key={item.id}
              className="history-card"
            >

              <h2>
                {item.symptoms}
              </h2>

              <br />

              <p>
                <strong>
                  History ID:
                </strong>
                {" "}
                {item.id}
              </p>

              {item.escalation_id && (

                <p>

                  <strong>
                    Escalation ID:
                  </strong>
                  {" "}
                  #{item.escalation_id}

                </p>

              )}

              <div
                className={`triage-badge ${
                  item.triage_level === "RED"
                    ? "triage-red"
                    : item.triage_level === "YELLOW"
                    ? "triage-yellow"
                    : "triage-green"
                }`}
              >
                {item.triage_level}
              </div>

              <p>

                <strong>
                  Severity:
                </strong>

                {" "}
                {item.severity}

              </p>

              <p>

                <strong>
                  Confidence:
                </strong>

                {" "}
                {
                  Math.round(
                    (
                      item.confidence_score || 0
                    ) * 100
                  )
                }%

              </p>

              <p>

                <strong>
                  Language:
                </strong>

                {" "}
                {item.language}

              </p>

              <p>

                <strong>
                  Emergency:
                </strong>

                {" "}

                {
                  item.requires_emergency ||
                  item.triage_level === "RED"
                    ? "YES 🚨"
                    : "NO"
                }

              </p>

              {item.assigned_doctor && (

                <p>

                  <strong>
                    Assigned Doctor:
                  </strong>

                  {" "}
                  {item.assigned_doctor}

                </p>

              )}

              {item.nearest_hospital && (

                <p>

                  <strong>
                    Nearest Hospital:
                  </strong>

                  {" "}
                  {item.nearest_hospital}

                </p>

              )}

              <br />

              <p>

                <strong>
                  Advice:
                </strong>

              </p>

              <p>
                {item.advice}
              </p>

              <br />

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap"
                }}
              >

                {item.voice_response_file && (

                  <button
                    className="btn-blue"
                    onClick={() =>
                      playVoice(
                        item.voice_response_file
                      )
                    }
                  >
                    ▶ Play Voice
                  </button>

                )}

                {(item.requires_emergency ||
                  item.triage_level === "RED") && (

                  <a
                    href="tel:108"
                    className="btn-orange"
                    style={{
                      textDecoration:
                        "none"
                    }}
                  >
                    📞 Call 108
                  </a>

                )}

              </div>

              <br />

              <p className="history-date">

                {
                  item.created_at &&
                  new Date(
                    item.created_at
                  ).toLocaleString()
                }

              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default PatientHistory;