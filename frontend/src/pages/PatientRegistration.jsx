import { useState } from "react";
import api from "../services/api";

function PatientRegistration() {

  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    gender: "",
    phone_number: "",
    preferred_language: ""
  });

  const registerPatient = async () => {

    try {

      const response = await api.post(
        "/patients/register",
        formData
      );

      alert(
        `Patient Registered Successfully\nID: ${response.data.id}`
      );

      setFormData({
        full_name: "",
        age: "",
        gender: "",
        phone_number: "",
        preferred_language: ""
      });

    } catch (error) {

      console.error(error);

      alert("Patient registration failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Patient Registration</h2>

      <input
        placeholder="Full Name"
        value={formData.full_name}
        onChange={(e) =>
          setFormData({
            ...formData,
            full_name: e.target.value
          })
        }
      />

      <br /><br />

      <input
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={(e) =>
          setFormData({
            ...formData,
            age: e.target.value
          })
        }
      />

      <br /><br />

      <input
        placeholder="Gender"
        value={formData.gender}
        onChange={(e) =>
          setFormData({
            ...formData,
            gender: e.target.value
          })
        }
      />

      <br /><br />

      <input
        placeholder="Phone Number"
        value={formData.phone_number}
        onChange={(e) =>
          setFormData({
            ...formData,
            phone_number: e.target.value
          })
        }
      />

      <br /><br />

      <input
        placeholder="Preferred Language"
        value={formData.preferred_language}
        onChange={(e) =>
          setFormData({
            ...formData,
            preferred_language: e.target.value
          })
        }
      />

      <br /><br />

      <button onClick={registerPatient}>
        Register Patient
      </button>

    </div>
  );
}

export default PatientRegistration;