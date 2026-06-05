import {
  useState,
  useRef,
  useEffect
} from "react";

import {
  FaMicrophone,
  FaGlobe,
  FaHeartbeat,
  FaCheckCircle,
  FaExclamationTriangle,
  FaShieldAlt,
  FaPhoneAlt,
  FaCheck
} from "react-icons/fa";

import { motion } from "framer-motion";

import api from "../services/api";

import "../styles/patientTriage.css";

const buildApiUrl = (path) => {
  const baseUrl =
    api.defaults.baseURL || "";

  const normalizedPath =
    path.startsWith("/")
      ? path
      : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
};

function PatientTriage() {

  const [recording, setRecording] =
    useState(false);

  const [audioBlob, setAudioBlob] =
    useState(null);

  const [audioUrl, setAudioUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [voiceResponse, setVoiceResponse] =
  useState("");

  const [voiceFile, setVoiceFile] =
    useState("");

  const [language, setLanguage] =
    useState("English");

  const [symptomText, setSymptomText] =
    useState("");

  const mediaRecorderRef =
    useRef(null);

  const chunksRef =
    useRef([]);

  const startRecording =
    async () => {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true
        });

      const recorder =
        new MediaRecorder(stream);

      mediaRecorderRef.current =
        recorder;

      chunksRef.current = [];

      recorder.ondataavailable =
        (event) => {

          if (event.data.size > 0) {

            chunksRef.current.push(
              event.data
            );
          }
        };

      recorder.onstop = () => {

        const blob =
          new Blob(
            chunksRef.current,
            {
              type: "audio/webm"
            }
          );

        setAudioBlob(blob);

        setAudioUrl(
          URL.createObjectURL(blob)
        );
      };

      recorder.start();

      setRecording(true);
    };

  const stopRecording = () => {

    mediaRecorderRef.current.stop();

    setRecording(false);
  };

  const analyzeAudio =
    async () => {

      if (!audioBlob) {

        alert(
          "Please record audio first"
        );

        return;
      }

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "file",
          audioBlob,
          "voice.webm"
        );

        const response =
          await api.post(
            "/analyze-audio",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data"
              }
            }
          );

        console.log(
          "AUDIO RESPONSE:",
          response.data
        );

        setResult({
          transcribed_text:
            response.data.transcribed_text,

          medical_analysis:
            response.data.medical_analysis
        });
        if (
          response.data
            .voice_response_file
        ) {

          setVoiceFile(
            response.data
              .voice_response_file
          );
        }

      } catch (error) {

        console.error(error);

        alert(
          "Analysis failed"
        );

      } finally {

        setLoading(false);
      }
    };

    const analyzeTextSymptoms =
  async () => {

    if (!symptomText.trim()) {

      alert(
        "Please enter symptoms"
      );

      return;
    }

    try {

      setLoading(true);

      const response =
        await api.post(
          "/symptoms/map",
          {
            text: symptomText
          }
        );

      setResult({

        transcribed_text:
          response.data.translated_text
          || symptomText,

        medical_analysis: {
          severity: response.data.severity,
          triage_level: response.data.triage_level,
          confidence_score: response.data.confidence,
          advice: response.data.advice
        }

      });

      setVoiceResponse(
        response.data.voice_response_file
      );

    } catch (error) {

      console.error(error);

      alert(
        "Analysis failed"
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    if(voiceResponse) {
      const audio = new Audio(
        buildApiUrl(voiceResponse)
      );
      audio.play();
    }
  }, [voiceResponse]);

  useEffect(() => {

    if (!voiceFile) return;

    const audio =
      new Audio(
        buildApiUrl(voiceFile)
      );

    audio.play();

  }, [voiceFile]);

  const triage =
    result?.medical_analysis
      ?.triage_level;

  const triageColor =
    triage === "RED"
      ? "#dc2626"
      : triage === "YELLOW"
      ? "#f59e0b"
      : "#16a34a";

  return (

    <div className="patient-container">

      {/* Welcome Banner */}

      <div className="welcome-banner">

        <div className="welcome-content">

          <h1>
            Welcome to Smart Triage
          </h1>

          <p>
            Describe your symptoms in your
            preferred language and receive
            an AI-powered healthcare
            assessment.
          </p>

        </div>

        <div className="welcome-icon">
          🩺
        </div>

      </div>

      {/* Assessment Card */}

      <div className="assessment-card">

        {/* Language */}

        <div className="language-box">

          <div className="section-heading">
            <FaGlobe />
            {" "}Select Language
          </div>

          <select
            className="language-select"
            value={language}
            onChange={(e) =>
              setLanguage(
                e.target.value
              )
            }
          >
            <option>
              English
            </option>

            <option>
              Telugu
            </option>

            <option>
              Hindi
            </option>

          </select>

          <p
            style={{
              marginTop: "15px",
              color: "#64748b"
            }}
          >
            Choose the language you are
            most comfortable with.
          </p>

        </div>

        {/* Symptoms */}
        <div className="symptom-box">

          <div className="section-heading">
            Type Your Symptoms
          </div>

          <textarea
            className="symptom-input"
            placeholder="Describe your symptoms here..."
            value={symptomText}
            onChange={(e) =>
              setSymptomText(
                e.target.value
              )
            }
          />

          <button
            className="primary-btn"
            style={{
              marginTop: "15px"
            }}
            onClick={analyzeTextSymptoms}
          >
            Analyze Symptoms
          </button>

          <p className="helper-text">
            You can still use voice input.
          </p>

        </div>

        {/* Voice */}

        <div className="voice-box">

          <motion.div

            className={
              recording
              ? "mic-circle recording"
              : "mic-circle"
            }

            animate={
              recording
              ? {
                  scale:
                  [1,1.08,1]
                }
              : {}
            }

            transition={{
              duration: 1,
              repeat: Infinity
            }}
          >

            <FaMicrophone />

          </motion.div>

          <h3>
            Voice Assessment
          </h3>

          <p
            style={{
              marginTop: "10px",
              color: "#64748b"
            }}
          >
            Tap microphone and speak.
          </p>

          <button
            className="primary-btn"
            style={{
              marginTop: "20px"
            }}
            onClick={
              recording
              ? stopRecording
              : startRecording
            }
          >
            {recording
              ? "Stop Recording"
              : "Start Recording"}
          </button>

          {audioUrl && (

            <>
              <audio
                controls
                src={audioUrl}
                style={{
                  marginTop: "20px"
                }}
              />

              <button
                className="primary-btn"
                style={{
                  marginTop: "15px"
                }}
                onClick={
                  analyzeAudio
                }
              >
                Analyze Symptoms
              </button>
            </>

          )}

        </div>

      </div>

      {/* How It Works + Tips */}

      <div className="info-section">

        <div className="how-card">

          <h2>
            How It Works
          </h2>

          <div className="steps">

            <div className="step">

              <div
                className="step-circle"
                style={{
                  background:"#2563eb"
                }}
              >
                1
              </div>

              <div className="step-title">
                Speak
              </div>

            </div>

            <div className="step">

              <div
                className="step-circle"
                style={{
                  background:"#8b5cf6"
                }}
              >
                2
              </div>

              <div className="step-title">
                Transcribe
              </div>

            </div>

            <div className="step">

              <div
                className="step-circle"
                style={{
                  background:"#22c55e"
                }}
              >
                3
              </div>

              <div className="step-title">
                Analyze
              </div>

            </div>

            <div className="step">

              <div
                className="step-circle"
                style={{
                  background:"#f59e0b"
                }}
              >
                4
              </div>

              <div className="step-title">
                Triage
              </div>

            </div>

            <div className="step">

              <div
                className="step-circle"
                style={{
                  background:"#ef4444"
                }}
              >
                5
              </div>

              <div className="step-title">
                Doctor
              </div>

            </div>

          </div>

        </div>

        <div className="tips-card">

          <h2>
            Important Tips
          </h2>

          <div className="tip-item">
            <FaCheck className="tip-check"/>
            Speak clearly and slowly
          </div>

          <div className="tip-item">
            <FaCheck className="tip-check"/>
            Explain symptoms in detail
          </div>

          <div className="tip-item">
            <FaCheck className="tip-check"/>
            Mention duration of symptoms
          </div>

          <div className="tip-item">
            <FaCheck className="tip-check"/>
            Seek emergency care when needed
          </div>

        </div>

      </div>

      {/* Emergency Banner */}

      <div className="emergency-banner">

        <div className="emergency-left">

          <FaShieldAlt
            className="emergency-icon"
          />

          <div>

            <h3>
              Emergency?
            </h3>

            <p>
              If you experience severe
              chest pain, breathing
              difficulty or unconsciousness,
              seek immediate help.
            </p>

          </div>

        </div>

        <button className="primary-btn">
          <FaPhoneAlt />
          {" "}Emergency Contacts
        </button>

      </div>

      {/* Loading */}

      {loading && (

        <div className="result-card">

          🤖 AI is analyzing symptoms...

        </div>

      )}

      {/* Results */}

{result && (

  <div className="result-grid">

    <div className="result-card">

      <FaHeartbeat
        size={35}
        color="#2563eb"
      />

      <h3>Severity</h3>

      <p>
        {
          result
          .medical_analysis
          ?.severity
        }
      </p>

    </div>

    <div className="result-card">

      <FaCheckCircle
        size={35}
        color="#22c55e"
      />

      <h3>Confidence</h3>

      <p>
        {
          Math.round(
            (
              result
              .medical_analysis
              ?.confidence_score || 0
            ) * 100
          )
        }%
      </p>

    </div>

    <div
      className="result-card"
      style={{
        borderTop:
        `6px solid ${triageColor}`
      }}
    >

      <FaExclamationTriangle
        size={35}
        color={triageColor}
      />

      <h3>Triage Level</h3>

      <p
        style={{
          color: triageColor,
          fontWeight: "700"
        }}
      >
        {triage}
      </p>

    </div>

    {
      result?.medical_analysis
        ?.escalation_id && (

      <div className="result-card">

        <h3>Escalation ID</h3>

        <p>
          {result.medical_analysis
            .escalation_id}
        </p>

      </div>

      )
    }

    <div className="result-card result-full">

      <h2>Transcript</h2>

      <p
        style={{
          marginTop: "15px"
        }}
      >
        {
          result
          .transcribed_text
        }
      </p>

    </div>

    <div className="result-card result-full">

      <h2>
        AI Recommendation
      </h2>

      <p
        style={{
          marginTop: "15px"
        }}
      >
        {
          result
          .medical_analysis
          ?.advice
        }
      </p>

    </div>

    {
      triage === "RED" && (

      <div className="result-card result-full" style={{ background: "#fee2e2", border: "1px solid #fca5a5" }}>

        <h2>🚨 Emergency Action</h2>

        <p
          style={{
            marginTop: "15px"
          }}
        >
          Please visit the nearest
          hospital immediately or
          contact emergency services.
        </p>

        <p
          style={{
            marginTop: "15px",
            fontWeight: "700"
          }}
        >
          Emergency Number:
          108
        </p>

      </div>

      )
    }

  </div>
  )}

    </div>
  )
}

export default PatientTriage;
