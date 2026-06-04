# Demo Script

## Healthcare Triage Assistant – Indian Clinical Context with Voice

### Duration: 5–7 Minutes

---

# Introduction

Good morning/afternoon everyone.

My project is Healthcare Triage Assistant – Indian Clinical Context with Voice.

This system is designed to assist Primary Health Centres (PHCs), ASHA workers, and clinicians by collecting patient symptoms through voice or text, performing AI-assisted triage, and escalating emergency cases for human review.

The solution supports:

* English
* Hindi
* Telugu

and follows a safety-first approach where uncertain or emergency cases are escalated instead of relying solely on AI.

---

# Problem Statement

In many rural and semi-urban healthcare environments:

* Doctors are overloaded
* Patients struggle to describe symptoms
* Language barriers exist
* Emergency cases may not be identified quickly

This project helps address these challenges by providing:

* Voice symptom collection
* Symptom analysis
* Triage classification
* Emergency escalation
* ASHA worker handoff support

---

# Technology Stack

Frontend:

* React.js
* Vite
* CSS
* Axios

Backend:

* FastAPI
* SQLAlchemy
* JWT Authentication

Database:

* PostgreSQL

AI Components:

* Whisper Speech-to-Text
* Medical Symptom Extraction
* Clinical Mapping Engine
* Text-to-Speech Responses

Monitoring:

* Redis Architecture Ready
* Grafana Architecture Ready

---

# Demonstration

## Step 1: User Login

I will first log in as a patient.

The system supports role-based access:

* Patient
* ASHA Worker
* Doctor
* Admin

JWT authentication protects all APIs.

---

## Step 2: Patient Registration

Create a patient record.

Example:

Name: Ravi Kumar

Age: 42

Language: Telugu

Phone Number: 9876543210

Patient information is stored in PostgreSQL.

---

## Step 3: Voice Assessment

Now I demonstrate voice symptom collection.

Patient says:

"I am suffering with severe heart pain."

The system:

1. Records audio
2. Converts speech to text
3. Extracts symptoms
4. Calculates severity
5. Generates triage classification

---

## Step 4: AI Triage Result

The AI extracts:

Symptoms:

* Heart Pain
* Chest Pain

Severity:

* Severe

Confidence:

* 92%

Triage Level:

* RED

Advice:

"Seek immediate medical attention."

---

## Step 5: Emergency Escalation

Because the triage level is RED:

The system automatically:

* Creates an escalation record
* Generates an escalation ID
* Stores the case in the escalation queue

Patient information:

* Patient ID
* Patient Name
* Phone Number
* Nearest Hospital

is attached to the escalation.

---

## Step 6: ASHA Worker Dashboard

Now I switch to the ASHA Worker dashboard.

ASHA workers can view:

* Patient Queue
* Emergency Alerts
* Escalation Summary

Example alert:

Emergency Case #15

Patient Name: Ravi Kumar

Phone Number: 9876543210

Hospital:

Apollo Hospital Hyderabad

Status:

Pending

The ASHA worker can immediately identify emergency cases.

---

## Step 7: Doctor Dashboard

Next, I log in as a doctor.

Doctors can:

* Review escalated cases
* Add clinical notes
* Assign themselves
* Resolve cases

Example:

Assigned Doctor:

Dr. Sharma

Clinical Note:

"Patient advised immediate ECG and cardiology review."

Status:

Resolved

---

## Step 8: Audit Trail

Every critical action is logged.

Examples:

* Login
* Symptom submission
* Escalation creation
* Doctor assignment
* Resolution

This ensures complete traceability and accountability.

---

# Clinical Safety Features

This is a safety-critical project.

Important safeguards include:

* Emergency symptom detection
* RED case escalation
* Human clinician review
* Audit logging
* Role-based access control

The system never replaces a doctor.

It only assists healthcare workflows.

---

# Limitations

Current limitations include:

* Educational prototype
* No laboratory integration
* No ECG integration
* No medical device certification
* Limited regional language coverage

Future versions can integrate:

* IndicWhisper
* IndicTTS
* IndicTrans2
* PM-JAY eligibility checks
* GPS-based hospital routing

---

# Future Enhancements

Planned improvements:

* Redis session management
* Grafana dashboards
* Docker deployment
* Offline PHC mode
* Mobile application
* Real-time clinician notifications

---

# Conclusion

Healthcare Triage Assistant demonstrates how AI can assist frontline healthcare workers through:

* Voice-enabled symptom collection
* Clinical triage
* Emergency escalation
* ASHA worker support
* Doctor review workflows

while maintaining safety, auditability, and human oversight.

Thank you.

I am happy to answer any questions.
