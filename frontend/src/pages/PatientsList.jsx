import { useEffect, useState } from "react";
import api from "../services/api";

function PatientsList() {

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {

    try {

      const response = await api.get(
        "/patients"
      );

      setPatients(response.data);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to load patients"
      );

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (
      <div>
        <h1 className="page-title">
          Patients
        </h1>

        <div className="card">
          Loading patients...
        </div>
      </div>
    );
  }

  return (

    <div>

      <h1 className="page-title">
        👨‍⚕️ Patients
      </h1>

      {patients.length === 0 ? (

        <div className="card">
          No patients found.
        </div>

      ) : (

        <div className="grid grid-3">

          {patients.map((patient) => (

            <div
              key={patient.id}
              className="card"
            >

              <h2
                style={{
                  marginBottom: "15px",
                  color: "#2563eb"
                }}
              >
                👤 {patient.full_name}
              </h2>

              <p>
                <strong>ID:</strong>
                {" "}
                {patient.id}
              </p>

              <p>
                <strong>Age:</strong>
                {" "}
                {patient.age}
              </p>

              <p>
                <strong>Gender:</strong>
                {" "}
                {patient.gender}
              </p>

              <p>
                <strong>Phone:</strong>
                {" "}
                {patient.phone_number || "N/A"}
              </p>

              <p>
                <strong>Language:</strong>
                {" "}
                {patient.preferred_language}
              </p>

              {patient.created_at && (

                <p>
                  <strong>Registered:</strong>
                  {" "}
                  {new Date(
                    patient.created_at
                  ).toLocaleDateString()}
                </p>

              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default PatientsList;