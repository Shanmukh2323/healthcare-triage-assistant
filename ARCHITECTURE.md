# System Architecture

## Project

Healthcare Triage Assistant – Indian Clinical Context with Voice

---

# High-Level Architecture

```text
                    ┌─────────────────────┐
                    │     Patient UI      │
                    │ React + Vite        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      FastAPI        │
                    │ API Gateway Layer   │
                    └──────────┬──────────┘
                               │
      ┌────────────────────────┼────────────────────────┐
      │                        │                        │
      ▼                        ▼                        ▼

┌───────────────┐     ┌─────────────────┐     ┌────────────────┐
│ Speech-to-Text│     │ Triage Engine   │     │ Authentication │
│ IndicWhisper  │     │ MOHFW Rules     │     │ JWT Security   │
└───────┬───────┘     └────────┬────────┘     └────────────────┘
        │                      │
        ▼                      ▼

┌─────────────────┐     ┌─────────────────┐
│ Symptom Mapping │     │ Escalation      │
│ Clinical Terms  │     │ Management      │
└────────┬────────┘     └────────┬────────┘
         │                       │
         ▼                       ▼

┌─────────────────────────────────────┐
│ PostgreSQL Database                 │
│ Patients                            │
│ Triage History                      │
│ Escalations                         │
│ Audit Logs                          │
└─────────────────────────────────────┘

         │
         ▼

┌─────────────────┐
│ Text To Speech  │
│ IndicTTS        │
└─────────────────┘
```

---

# Frontend Architecture

## Technology Stack

* React.js
* Vite
* Axios
* React Router
* Framer Motion
* CSS

---

## Modules

### Patient Portal

Features:

* Voice symptom collection
* Text symptom submission
* Multilingual interface
* AI triage result display
* Voice guidance playback

---

### ASHA Worker Dashboard

Features:

* Patient Queue
* Emergency Alerts
* Escalation Tracking
* Handoff Summary

---

### Doctor Dashboard

Features:

* Escalated Cases
* Clinical Notes
* Case Resolution
* Patient Review

---

### Admin Dashboard

Features:

* Daily Triage Volume
* Escalation Metrics
* System Monitoring
* Audit Review

---

# Backend Architecture

## Technology Stack

* FastAPI
* SQLAlchemy
* PostgreSQL
* JWT Authentication
* Python

---

## Core Modules

### Authentication Service

Responsibilities:

* User login
* JWT generation
* Role management
* Authorization

Supported Roles:

* Patient
* ASHA Worker
* Doctor
* Admin

---

### Symptom Analysis Service

Responsibilities:

* Symptom extraction
* Severity detection
* Clinical term mapping
* Confidence scoring

---

### Triage Engine

Responsibilities:

* RED classification
* YELLOW classification
* GREEN classification
* Emergency escalation

Rules follow MOHFW-inspired triage workflow.

---

### Escalation Service

Responsibilities:

* Create escalation
* Assign doctor
* Update status
* Track resolution

---

### Voice Service

Responsibilities:

* Speech-to-text
* Text-to-speech
* Audio response generation

---

# Database Architecture

## Main Tables

### users

```text
id
name
email
password
role
```

---

### patients

```text
id
name
age
gender
phone_number
language
created_at
```

---

### triage_history

```text
id
patient_id
symptoms
severity
triage_level
advice
created_at
```

---

### escalation_queue

```text
id
patient_id
patient_name
phone_number
nearest_hospital
triage_level
status
assigned_doctor
doctor_notes
created_at
```

---

### audit_logs

```text
id
user
action
endpoint
timestamp
```

---

# Redis Architecture

## Purpose

Redis is used for:

* Session storage
* Active patient sessions
* Temporary symptom context
* Rate limiting
* Caching

---

## Session Flow

```text
Patient Login
      │
      ▼

Redis Session Store

      │
      ▼

Session Validation

      │
      ▼

FastAPI APIs
```

Benefits:

* Faster session retrieval
* Reduced database load
* Horizontal scalability

---

# Grafana Architecture

## Monitoring Metrics

### Safety Metrics

* Triage confidence scores
* Escalation rate
* RED case count
* Doctor review rate

---

### System Metrics

* API response time
* Active users
* CPU usage
* Memory usage

---

### Audit Metrics

* Daily triage volume
* Escalation completion rate
* Missing audit records

---

# Security Architecture

## Authentication

JWT Tokens

```text
User Login
    │
    ▼
JWT Token
    │
    ▼
Protected APIs
```

---

## Authorization

Role-Based Access Control

Patient

* Submit symptoms
* View own results

ASHA

* View patient queue
* View escalations

Doctor

* Review escalations
* Update cases

Admin

* Full access

---

# Deployment Architecture

```text
                Internet
                    │
                    ▼

         ┌─────────────────┐
         │ HTTPS Load      │
         │ Balancer        │
         └───────┬─────────┘
                 │
                 ▼

         ┌─────────────────┐
         │ FastAPI         │
         │ Application     │
         └───────┬─────────┘
                 │
      ┌──────────┼──────────┐
      ▼          ▼          ▼

 PostgreSQL    Redis    AI Services

      │
      ▼

 Grafana Monitoring
```

---

# Scalability Strategy

## Current

Single FastAPI instance

Single PostgreSQL instance

---

## Future Scaling

* Multiple FastAPI workers
* Redis session sharing
* Dedicated AI inference service
* Kubernetes deployment
* Horizontal scaling

---

# Offline PHC Support

Designed for low-connectivity rural environments.

Offline support includes:

* Local triage rules
* Cached symptom mapping
* Local session storage
* Deferred synchronization

---

# Data Sovereignty

Patient health data remains inside Indian cloud regions.

Recommended providers:

* AWS Mumbai
* Azure Central India
* Google Cloud Mumbai

No patient data should leave approved deployment regions.

---

# Architecture Review Status

☑ Frontend Architecture Complete

☑ Backend Architecture Complete

☑ Database Architecture Complete

☑ Security Architecture Complete

☑ Redis Design Complete

☑ Grafana Design Complete

☑ Deployment Architecture Complete

☑ Scalability Design Complete
