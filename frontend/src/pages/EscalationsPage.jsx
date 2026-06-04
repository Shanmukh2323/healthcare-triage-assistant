import { useEffect, useState } from "react";
import api from "../services/api";
import { getUserRole } from "../utils/jwt";

function EscalationsPage() {

  const [escalations, setEscalations] =
    useState([]);

  const [doctorNames, setDoctorNames] =
    useState({});

  const [notes, setNotes] =
    useState({});

  const role = getUserRole();
  const canAssignDoctor = role === "admin";
  const canUpdateCase =
    role === "doctor" || role === "admin";

  useEffect(() => {
    loadEscalations();
  }, []);

  const loadEscalations = async () => {

    try {
      const response = await api.get(
        "/escalations"
      );


      setEscalations(response.data);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to load escalations"
      );
    }
  };

  const resolveEscalation = async (id) => {

    try {

      await api.put(
        `/escalations/${id}/resolve`,
        {}
      );

      loadEscalations();

    } catch (error) {

      console.error(error);
    }
  };

  const assignDoctor = async (id) => {

    try {

      await api.put(
        `/escalations/${id}/assign`,
        {
          doctor_name:
            doctorNames[id]
        },
      );

      loadEscalations();

    } catch (error) {

      console.error(error);
    }
  };

  const saveDoctorNote = async (id) => {

    try {

      await api.put(
        `/escalations/${id}/note`,
        {
          note: notes[id]
        },
      );

      loadEscalations();

    } catch (error) {

      console.error(error);
    }
  };

  const getBadgeClass = (level) => {

    if (level === "RED")
      return "badge red";

    if (level === "YELLOW")
      return "badge yellow";

    return "badge green";
  };

  return (

    <div>

      <h1 className="page-title">
        🚨 Escalation Dashboard
      </h1>

      {escalations.map((item) => (

        <div
          key={item.id}
          className="escalation-card"
        >

          <div className="flex-between">

            <h2>
              Escalation #{item.id}
            </h2>

            <span
              className={
                getBadgeClass(
                  item.triage_level
                )
              }
            >
              {item.triage_level}
            </span>

          </div>

          <hr />

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
            <strong>Status:</strong>
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

          <br />

          {canAssignDoctor && (
            <>
              <div
                className="section-title"
              >
                Doctor Assignment
              </div>

              <input
                className="input"
                placeholder="Enter doctor name"
                value={
                  doctorNames[item.id] || ""
                }
                onChange={(e) =>
                  setDoctorNames({
                    ...doctorNames,
                    [item.id]:
                      e.target.value
                  })
                }
              />

              <br />
              <br />
            </>
          )}

          {canUpdateCase && (
            <>
              <div
                className="section-title"
              >
                Clinical Notes
              </div>

              <textarea
                rows="4"
                className="textarea"
                placeholder="Add doctor notes..."
                value={
                  notes[item.id] || ""
                }
                onChange={(e) =>
                  setNotes({
                    ...notes,
                    [item.id]:
                      e.target.value
                  })
                }
              />
            </>
          )}

          <div className="action-row">

            {canAssignDoctor && (
              <button
                className="btn-blue"
                onClick={() =>
                  assignDoctor(item.id)
                }
              >
                Assign Doctor
              </button>
            )}

            {canUpdateCase && (
              <>
                <button
                  className="btn-orange"
                  onClick={() =>
                    saveDoctorNote(item.id)
                  }
                >
                  Save Note
                </button>

                <button
                  className="btn-green"
                  onClick={() =>
                    resolveEscalation(item.id)
                  }
                >
                  Resolve Case
                </button>
              </>
            )}

          </div>

        </div>

      ))}

    </div>
  );
}

export default EscalationsPage;
