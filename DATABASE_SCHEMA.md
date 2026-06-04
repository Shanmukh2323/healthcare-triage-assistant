# Database Schema Documentation

## Project

Healthcare Triage Assistant – Indian Clinical Context with Voice

Version: 1.0

Database: PostgreSQL

---

# Overview

The Healthcare Triage Assistant uses PostgreSQL as its primary database for storing:

* User Accounts
* Patient Records
* Triage History
* Escalation Cases
* Doctor Notes
* Audit Logs

The database is designed to support:

* Role-based access control
* Clinical auditability
* Emergency escalation workflows
* ASHA worker operations
* Doctor review workflows

---

# Entity Relationship Diagram (ERD)

```text
Users
 │
 │
 ├───────────────┐
 │               │
 ▼               ▼

Patients      AuditLogs
 │
 │
 ▼

TriageHistory
 │
 │
 ▼

EscalationQueue
```

---

# Table 1: users

## Purpose

Stores registered users and authentication information.

Supported Roles:

* patient
* asha
* doctor
* admin

---

## Schema

| Column        | Data Type | Constraints          |
| ------------- | --------- | -------------------- |
| id            | Integer   | Primary Key          |
| username      | String    | Unique               |
| password_hash | String    | Not Null             |
| role          | String    | Not Null             |
| created_at    | DateTime  | Default Current Time |

---

## Example Record

```json
{
  "id": 1,
  "username": "asha_worker",
  "role": "asha"
}
```

---

# Table 2: patients

## Purpose

Stores patient demographic information.

---

## Schema

| Column       | Data Type | Constraints          |
| ------------ | --------- | -------------------- |
| id           | Integer   | Primary Key          |
| name         | String    | Not Null             |
| age          | Integer   | Not Null             |
| gender       | String    | Not Null             |
| phone_number | String    | Not Null             |
| language     | String    | Not Null             |
| created_at   | DateTime  | Default Current Time |

---

## Example Record

```json
{
  "id": 101,
  "name": "Ravi Kumar",
  "age": 42,
  "gender": "Male",
  "phone_number": "9876543210",
  "language": "Telugu"
}
```

---

# Table 3: triage_history

## Purpose

Stores symptom analysis results and patient triage history.

Every patient assessment creates one record.

---

## Schema

| Column           | Data Type | Constraints          |
| ---------------- | --------- | -------------------- |
| id               | Integer   | Primary Key          |
| patient_id       | Integer   | Foreign Key          |
| symptoms         | Text      | Not Null             |
| severity         | String    | Not Null             |
| triage_level     | String    | Not Null             |
| advice           | Text      | Not Null             |
| confidence_score | Float     | Nullable             |
| created_at       | DateTime  | Default Current Time |

---

## Example Record

```json
{
  "id": 1,
  "patient_id": 101,
  "symptoms": "severe chest pain",
  "severity": "severe",
  "triage_level": "RED",
  "confidence_score": 0.92
}
```

---

# Table 4: escalation_queue

## Purpose

Stores emergency and clinician-review cases.

RED triage cases are automatically added here.

ASHA workers and doctors review these records.

---

## Schema

| Column             | Data Type | Constraints          |
| ------------------ | --------- | -------------------- |
| id                 | Integer   | Primary Key          |
| patient_id         | Integer   | Foreign Key          |
| patient_name       | String    | Nullable             |
| phone_number       | String    | Nullable             |
| nearest_hospital   | String    | Nullable             |
| patient_text       | Text      | Not Null             |
| triage_level       | String    | Not Null             |
| status             | String    | Default Pending      |
| symptoms           | Text      | Nullable             |
| severity           | String    | Nullable             |
| recommended_action | Text      | Nullable             |
| doctor_notes       | Text      | Nullable             |
| assigned_doctor    | String    | Nullable             |
| created_at         | DateTime  | Default Current Time |

---

## Example Record

```json
{
  "id": 15,
  "patient_id": 101,
  "patient_name": "Ravi Kumar",
  "phone_number": "9876543210",
  "nearest_hospital": "Apollo Hospital Hyderabad",
  "triage_level": "RED",
  "status": "pending",
  "assigned_doctor": null
}
```

---

# Table 5: audit_logs

## Purpose

Stores immutable audit trail records.

Every critical action is recorded.

Examples:

* Login
* Symptom submission
* Escalation creation
* Doctor assignment
* Case resolution

---

## Schema

| Column    | Data Type | Constraints          |
| --------- | --------- | -------------------- |
| id        | Integer   | Primary Key          |
| user      | String    | Not Null             |
| role      | String    | Not Null             |
| endpoint  | String    | Not Null             |
| action    | String    | Not Null             |
| timestamp | DateTime  | Default Current Time |

---

## Example Record

```json
{
  "id": 45,
  "user": "Asha",
  "role": "asha",
  "endpoint": "/escalations",
  "action": "VIEW_ESCALATIONS"
}
```

---

# Relationships

## Patient → Triage History

Relationship Type:

One-to-Many

```text
patients.id
      │
      ▼
triage_history.patient_id
```

One patient can have many triage assessments.

---

## Patient → Escalation Queue

Relationship Type:

One-to-Many

```text
patients.id
      │
      ▼
escalation_queue.patient_id
```

One patient can generate multiple escalations.

---

## User → Audit Logs

Relationship Type:

One-to-Many

```text
users.username
       │
       ▼
audit_logs.user
```

One user can generate many audit entries.

---

# Clinical Workflow Data Flow

```text
Patient
   │
   ▼

Voice/Text Symptoms

   │
   ▼

Symptom Analysis

   │
   ▼

Triage Classification

   │
   ▼

Store Triage History

   │
   ▼

RED Case?

 ┌──────────────┴──────────────┐
 │                             │
 NO                           YES
 │                             │
 ▼                             ▼

Complete                 Escalation Queue

                              │
                              ▼

                        ASHA Review

                              │
                              ▼

                        Doctor Review

                              │
                              ▼

                        Case Resolution
```

---

# Indexing Strategy

Indexes improve performance.

Recommended indexes:

```sql
CREATE INDEX idx_patient_id
ON triage_history(patient_id);

CREATE INDEX idx_escalation_status
ON escalation_queue(status);

CREATE INDEX idx_audit_timestamp
ON audit_logs(timestamp);
```

---

# Data Retention Policy

| Data Type       | Retention Period |
| --------------- | ---------------- |
| Patient Records | 7 Years          |
| Triage History  | 7 Years          |
| Escalations     | 7 Years          |
| Audit Logs      | 1 Year           |

---

# Backup Strategy

## Full Backup

Frequency:

Daily

```bash
pg_dump triage_db > backup.sql
```

---

## Restore

```bash
psql triage_db < backup.sql
```

---

# Security Controls

Implemented Controls:

* JWT Authentication
* Password Hashing
* Role-Based Access Control
* Audit Logging
* HTTPS Transport
* PostgreSQL Access Controls

---

# Compliance Notes

The database design supports:

* Auditability
* Clinical Traceability
* Human Review Workflows
* Safety-Critical Escalation Tracking

This project is an educational prototype and is not intended for production clinical use without regulatory approval.

---

# Database Review Status

☑ User Schema Complete

☑ Patient Schema Complete

☑ Triage History Schema Complete

☑ Escalation Schema Complete

☑ Audit Logging Complete

☑ Security Review Complete

☑ Internship Submission Ready
