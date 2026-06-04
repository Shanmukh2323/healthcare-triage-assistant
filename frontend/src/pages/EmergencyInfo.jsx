function EmergencyInfo() {

  return (

    <div>

      <h1 className="page-title">
        🚨 Emergency Information
      </h1>

      <div
        className="card"
        style={{
          borderLeft:
          "6px solid #dc2626"
        }}
      >

        <h2>
          Emergency Contacts
        </h2>

        <p
          style={{
            marginTop:"15px"
          }}
        >
          Ambulance: 108
        </p>

        <p>
          Police: 100
        </p>

        <p>
          Fire: 101
        </p>

      </div>

    </div>

  );
}

export default EmergencyInfo;