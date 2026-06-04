# API Documentation

## Project

Healthcare Triage Assistant – Indian Clinical Context with Voice

---

# Base URL

Development:

http://127.0.0.1:8000

Production:

https://api.yourdomain.com

---

# Authentication

Authentication uses JWT tokens.

Protected endpoints require:

Authorization: Bearer <token>

---

# User Management APIs

## Register User

POST /register

Request:

{
  "username": "asha_worker",
  "password": "password123",
  "role": "asha"
}

Response:

{
  "message": "User registered successfully"
}

---

## Login

POST /login

Request:

{
  "username": "asha_worker",
  "password": "password123"
}

Response:

{
  "access_token": "jwt_token",
  "token_type": "bearer"
}

---

# Patient APIs

## Create Patient

POST /patients

Request:

{
  "name": "Ravi Kumar",
  "age": 42,
  "gender": "Male",
  "phone_number": "9876543210",
  "language": "Telugu"
}

Response:

{
  "id": 1,
  "name": "Ravi Kumar"
}

---

## Get Patients

GET /patients

Response:

[
  {
    "id": 1,
    "name": "Ravi Kumar"
  }
]

---

# Symptom Analysis APIs

## Analyze Symptoms

POST /symptoms/map

Request:

{
  "text": "I am suffering with severe heart pain"
}

Response:

{
  "clinical_term": "Chest Pain",
  "severity": "severe",
  "triage_level": "RED",
  "confidence": 0.92,
  "advice": "Seek immediate medical attention",
  "escalation_id": 15,
  "nearest_hospital": "Apollo Hospital Hyderabad"
}

---

# Voice Analysis APIs

## Analyze Audio

POST /analyze-audio

Content-Type:

multipart/form-data

Request:

file = voice.webm

Response:

{
  "success": true,
  "transcribed_text": "I am suffering with severe heart pain",
  "medical_analysis": {
    "triage_level": "RED",
    "severity": "severe",
    "confidence_score": 0.92
  },
  "voice_response_file":
  "audio_responses/response.mp3"
}

---

# Escalation APIs

## Get Escalations

GET /escalations

Response:

[
  {
    "id": 15,
    "patient_id": 1,
    "patient_name": "Ravi Kumar",
    "phone_number": "9876543210",
    "nearest_hospital":
    "Apollo Hospital Hyderabad",
    "triage_level": "RED",
    "status": "pending"
  }
]

---

## Assign Doctor

PUT /escalations/{id}/assign

Request:

{
  "doctor_name": "Dr. Sharma"
}

Response:

{
  "message":
  "Doctor assigned successfully"
}

---

## Add Doctor Note

PUT /escalations/{id}/note

Request:

{
  "note":
  "Patient advised immediate ECG"
}

Response:

{
  "message":
  "Note saved successfully"
}

---

## Resolve Escalation

PUT /escalations/{id}/resolve

Response:

{
  "message":
  "Case resolved successfully"
}

---

# Audit APIs

## Get Audit Logs

GET /audit

Response:

[
  {
    "user": "Asha",
    "action": "VIEW_ESCALATION",
    "timestamp":
    "2026-06-04T12:30:00"
  }
]

---

# Error Responses

## Unauthorized

401 Unauthorized

{
  "detail": "Invalid token"
}

---

## Forbidden

403 Forbidden

{
  "detail":
  "Insufficient permissions"
}

---

## Not Found

404 Not Found

{
  "detail":
  "Resource not found"
}

---

## Internal Server Error

500 Internal Server Error

{
  "detail":
  "Unexpected server error"
}

---

# Role Access Matrix

| API | Patient | ASHA | Doctor | Admin |
|------|---------|---------|---------|---------|
| Register | ✅ | ✅ | ✅ | ✅ |
| Login | ✅ | ✅ | ✅ | ✅ |
| Create Patient | ✅ | ✅ | ❌ | ✅ |
| Analyze Symptoms | ✅ | ✅ | ❌ | ✅ |
| Analyze Audio | ✅ | ✅ | ❌ | ✅ |
| View Patients | ❌ | ✅ | ✅ | ✅ |
| View Escalations | ❌ | ✅ | ✅ | ✅ |
| Assign Doctor | ❌ | ❌ | ✅ | ✅ |
| Resolve Escalation | ❌ | ❌ | ✅ | ✅ |
| View Audit Logs | ❌ | ❌ | ❌ | ✅ |

---

# API Status

☑ Authentication APIs Complete

☑ Patient APIs Complete

☑ Symptom APIs Complete

☑ Voice APIs Complete

☑ Escalation APIs Complete

☑ Audit APIs Complete

☑ Internship Submission Ready
