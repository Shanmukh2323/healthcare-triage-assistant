# Deployment Guide

## Project

Healthcare Triage Assistant – Indian Clinical Context with Voice

---

# Deployment Overview

This guide explains how to deploy the Healthcare Triage Assistant system in a production-like environment.

Deployment Components:

* Frontend (React + Vite)
* Backend (FastAPI)
* PostgreSQL Database
* Redis Cache
* Grafana Monitoring
* AI Services
* HTTPS Reverse Proxy

---

# Prerequisites

Required Software:

* Git
* Docker
* Docker Compose
* Python 3.11+
* Node.js 20+
* PostgreSQL 15+
* Redis 7+

---

# Project Structure

```text
healthcare-triage-assistant/

├── frontend/
├── backend/
├── docs/
├── docker-compose.yml
├── README.md
├── ARCHITECTURE.md
├── CLINICAL_SAFETY.md
└── DEPLOYMENT_GUIDE.md
```

---

# Environment Variables

## Backend .env

```env
DATABASE_URL=postgresql://postgres:password@postgres:5432/triage_db

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

REDIS_URL=redis://redis:6379

ENVIRONMENT=production
```

---

# Frontend .env

```env
VITE_API_URL=https://api.yourdomain.com
```

---

# PostgreSQL Setup

## Create Database

```sql
CREATE DATABASE triage_db;
```

---

## Create User

```sql
CREATE USER triage_user
WITH PASSWORD 'strong_password';
```

---

## Grant Permissions

```sql
GRANT ALL PRIVILEGES
ON DATABASE triage_db
TO triage_user;
```

---

# Redis Setup

## Start Redis

```bash
redis-server
```

---

## Verify Redis

```bash
redis-cli ping
```

Expected Output:

```text
PONG
```

---

# Docker Deployment

## Build Backend

```bash
docker build -t triage-backend ./backend
```

---

## Build Frontend

```bash
docker build -t triage-frontend ./frontend
```

---

# Docker Compose

Create:

docker-compose.yml

```yaml
version: "3.9"

services:

  backend:
    build: ./backend
    ports:
      - "8000:8000"

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"

  postgres:
    image: postgres:15

  redis:
    image: redis:7

  grafana:
    image: grafana/grafana
```

---

## Start Services

```bash
docker-compose up -d
```

---

## Verify Services

```bash
docker ps
```

Expected:

* FastAPI Running
* PostgreSQL Running
* Redis Running
* Grafana Running

---

# Grafana Monitoring

## Open Dashboard

```text
http://localhost:3000
```

Default Login:

```text
Username: admin
Password: admin
```

---

## Metrics To Monitor

### Clinical Metrics

* RED cases
* YELLOW cases
* GREEN cases

---

### Safety Metrics

* Escalation rate
* Confidence score distribution
* Clinician review rate

---

### System Metrics

* CPU usage
* Memory usage
* Request latency

---

# HTTPS Configuration

Patient health information must always be encrypted.

HTTP is NOT allowed.

---

## Recommended

Nginx Reverse Proxy

```text
Client
  ↓
HTTPS
  ↓
Nginx
  ↓
FastAPI
```

---

## SSL Certificate

Recommended:

* Let's Encrypt

---

# Deployment Targets

## Recommended Indian Regions

### AWS

* Mumbai (ap-south-1)

---

### Azure

* Central India

---

### Google Cloud

* Mumbai

---

# Production Security Checklist

## Authentication

* JWT enabled
* Password hashing enabled

---

## Authorization

* Role-based access control enabled

---

## Database

* PostgreSQL protected
* Backups enabled

---

## API

* Protected routes verified

---

## Logging

* Audit middleware enabled

---

## Transport Security

* HTTPS enabled
* No HTTP fallback

---

# Backup Strategy

## Database Backup

Daily PostgreSQL backup

```bash
pg_dump triage_db > backup.sql
```

---

## Restore Backup

```bash
psql triage_db < backup.sql
```

---

# Deployment Validation Checklist

## Frontend

* [ ] Login works
* [ ] Registration works
* [ ] Patient portal works
* [ ] Voice assessment works

---

## Backend

* [ ] APIs responding
* [ ] JWT authentication works
* [ ] Audit logs created

---

## Clinical Safety

* [ ] RED cases escalate
* [ ] Doctor review works
* [ ] ASHA dashboard works

---

## Infrastructure

* [ ] PostgreSQL connected
* [ ] Redis connected
* [ ] Grafana connected

---

# Demonstration Workflow

1. Register Patient
2. Submit Symptoms
3. Generate Triage Result
4. Trigger RED Escalation
5. View ASHA Dashboard
6. Review Doctor Panel
7. Show Audit Logs
8. Show Grafana Dashboard

---

# GitHub Repository Setup

## Initialize Git

```bash
git init
```

---

## Add Files

```bash
git add .
```

---

## Commit

```bash
git commit -m "Healthcare Triage Assistant Final Submission"
```

---

## Connect GitHub Repository

```bash
git remote add origin https://github.com/USERNAME/healthcare-triage-assistant.git
```

---

## Push

```bash
git push -u origin main
```

---

# Deployment Status

☑ Frontend Deployment Ready

☑ Backend Deployment Ready

☑ PostgreSQL Deployment Ready

☑ Redis Deployment Ready

☑ Grafana Deployment Ready

☑ HTTPS Deployment Ready

☑ Clinical Safety Documentation Ready

☑ Internship Submission Ready
