import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaMicrophone,
  FaGlobe,
  FaBell,
  FaArrowRight
} from "react-icons/fa";

function LandingPage({ goToLogin }) {

  const features = [
    {
      icon: <FaHeartbeat />,
      title: "AI Symptom Detection",
      desc: "Advanced LLM-powered symptom understanding and triage."
    },
    {
      icon: <FaMicrophone />,
      title: "Voice Based Triage",
      desc: "Patients simply speak. AI handles transcription and analysis."
    },
    {
      icon: <FaGlobe />,
      title: "Multilingual Support",
      desc: "Supports English, Telugu, Hindi and multiple languages."
    },
    {
      icon: <FaBell />,
      title: "Emergency Escalation",
      desc: "Critical cases automatically alert healthcare staff."
    }
  ];

  return (
    <div
      style={{
        background: "#f8fafc",
        overflowX: "hidden"
      }}
    >

      {/* NAVBAR */}

      <nav
        style={{
          height: "80px",
          background:
            "linear-gradient(135deg,#0f172a,#1e3a8a)",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 80px",
          position: "sticky",
          top: 0,
          zIndex: 1000
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700"
          }}
        >
          🏥 Triage AI
        </h1>

        <button
          onClick={goToLogin}
          style={{
            background: "#14b8a6",
            color: "white",
            border: "none",
            padding: "12px 28px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Sign In
        </button>
      </nav>

      {/* HERO */}

      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px",
          position: "relative",
          background:
            "linear-gradient(135deg,#dbeafe,#ffffff)"
        }}
      >

        {/* Floating Circles */}

        <motion.div
          animate={{
            y: [0, -40, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity
          }}
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background:
              "rgba(20,184,166,.15)",
            position: "absolute",
            top: "120px",
            left: "50px"
          }}
        />

        <motion.div
          animate={{
            y: [0, 30, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity
          }}
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background:
              "rgba(37,99,235,.15)",
            position: "absolute",
            right: "150px",
            bottom: "120px"
          }}
        />

        <motion.div
          initial={{
            opacity: 0,
            x: -80
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            duration: .8
          }}
          style={{
            zIndex: 10,
            maxWidth: "650px"
          }}
        >

          <h1
            style={{
              fontSize: "72px",
              lineHeight: "1.1",
              marginBottom: "20px"
            }}
          >
            AI Powered
            Healthcare
            Triage System
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "#475569",
              marginBottom: "35px"
            }}
          >
            Voice-driven patient assessment,
            multilingual support,
            emergency detection and
            intelligent doctor escalation.
          </p>

          <button
            onClick={goToLogin}
            style={{
              background: "#14b8a6",
              color: "white",
              border: "none",
              padding: "18px 35px",
              borderRadius: "15px",
              cursor: "pointer",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            Get Started
            <FaArrowRight />
          </button>

        </motion.div>

        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
          alt="Healthcare"
          width="550"
          animate={{
            y: [0, -20, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity
          }}
        />

      </section>

      {/* FEATURES */}

      <motion.section
        initial={{
          opacity: 0,
          y: 100
        }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        viewport={{
          once: true
        }}
        style={{
          padding: "100px 80px"
        }}
      >

        <h2
          style={{
            textAlign: "center",
            fontSize: "50px",
            marginBottom: "60px"
          }}
        >
          Platform Features
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "30px"
          }}
        >

          {features.map((feature) => (

            <motion.div
              key={feature.title}
              whileHover={{
                y: -15,
                scale: 1.03
              }}
              style={{
                background:
                  "rgba(255,255,255,.75)",
                backdropFilter:
                  "blur(15px)",
                borderRadius: "24px",
                padding: "35px",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,.08)"
              }}
            >

              <div
                style={{
                  fontSize: "42px",
                  color: "#14b8a6"
                }}
              >
                {feature.icon}
              </div>

              <h3
                style={{
                  marginTop: "20px",
                  marginBottom: "15px"
                }}
              >
                {feature.title}
              </h3>

              <p
                style={{
                  color: "#64748b"
                }}
              >
                {feature.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </motion.section>

      {/* STATS */}

      <section
        style={{
          padding: "100px 80px",
          background: "white"
        }}
      >

        <h2
          style={{
            textAlign: "center",
            fontSize: "50px",
            marginBottom: "60px"
          }}
        >
          Platform Impact
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "30px"
          }}
        >

          {[
            ["1000+", "Patients Screened"],
            ["98%", "AI Accuracy"],
            ["24/7", "Availability"],
            ["15+", "Languages Supported"]
          ].map((item) => (

            <motion.div
              whileHover={{
                scale: 1.05
              }}
              key={item[0]}
              style={{
                background:
                  "linear-gradient(135deg,#0f172a,#1e3a8a)",
                color: "white",
                textAlign: "center",
                padding: "40px",
                borderRadius: "20px"
              }}
            >
              <h1
                style={{
                  fontSize: "52px"
                }}
              >
                {item[0]}
              </h1>

              <p>
                {item[1]}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* TIMELINE */}

      <section
        style={{
          padding: "120px 80px",
          background: "#f8fafc"
        }}
      >

        <h2
          style={{
            textAlign: "center",
            fontSize: "50px",
            marginBottom: "80px"
          }}
        >
          How It Works
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >

          {[
            "Register Patient",
            "Voice Input",
            "AI Analysis",
            "Doctor Escalation"
          ].map((step, index) => (

            <div
              key={step}
              style={{
                textAlign: "center",
                flex: 1
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "#14b8a6",
                  color: "white",
                  fontSize: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto"
                }}
              >
                {index + 1}
              </div>

              <h3
                style={{
                  marginTop: "20px"
                }}
              >
                {step}
              </h3>

            </div>

          ))}

        </div>

      </section>

      {/* CTA */}

      <section
        style={{
          padding: "120px 80px",
          background:
            "linear-gradient(135deg,#0f172a,#1e3a8a)",
          color: "white",
          textAlign: "center"
        }}
      >

        <h1
          style={{
            fontSize: "60px"
          }}
        >
          Ready To Transform
          Healthcare?
        </h1>

        <p
          style={{
            marginTop: "20px",
            fontSize: "22px"
          }}
        >
          AI Powered • Voice Enabled • Doctor Assisted
        </p>

        <button
          onClick={goToLogin}
          style={{
            marginTop: "30px",
            background: "#14b8a6",
            color: "white",
            border: "none",
            padding: "18px 40px",
            borderRadius: "15px",
            cursor: "pointer",
            fontSize: "18px"
          }}
        >
          Launch Platform
        </button>

      </section>

      {/* FOOTER */}

      <footer
        style={{
          background: "#020617",
          color: "white",
          textAlign: "center",
          padding: "25px"
        }}
      >
        Healthcare AI Triage Assistant © 2026
      </footer>

    </div>
  );
}

export default LandingPage;