# System Architecture - SaaS Project Management Platform

## Overview

This backend is a **multi-tenant SaaS Project Management System** designed using a modular, scalable, and enterprise-ready architecture.

It supports organizations, teams, projects, sprints, tasks, notifications, and RBAC (Role-Based Access Control).

---

## Architecture Style

The system follows a **Layered Modular Architecture**:

```text
Controller Layer
      ↓
Service Layer
      ↓
Repository Layer
      ↓
Database Layer
```

---

## Module-Based Structure

Each feature is implemented as an independent module:

```text
src/modules
│
├── auth
├── organization
├── project
├── sprint
├── task
├── team
├── notification
└── rbac
```

Each module contains:

* controllers
* services
* repositories
* models
* dto
* routes

---

## Core Design Principles

### 1. Separation of Concerns

Each layer has a single responsibility:

* Controller → API handling
* Service → Business logic
* Repository → Database operations
* Model → Schema definition

---

### 2. Multi-Tenant Architecture

Each data entity is scoped by:

* organizationId

This ensures data isolation between organizations.

---

### 3. RBAC Security Model

Access is controlled using:

```text
User → OrganizationMember → Role → Permissions
```

Permission check flow:

```text
Request → Middleware → Role → Permission Validation → Access Granted/Denied
```

---

### 4. Database Design

Uses MySQL with Sequelize ORM.

Key design patterns:

* UUID primary keys
* Soft deletes (paranoid tables)
* Foreign key relationships
* Many-to-many relationships

---

## Key Relationships

### Organization Structure

```text
Organization
   ├── Members
   ├── Teams
   ├── Projects
```

### Project Structure

```text
Project
   ├── Sprints
   ├── Tasks
   ├── Teams (many-to-many)
```

### Team Structure

```text
Team
   ├── Members
   ├── Assigned Projects
```

### Task Structure

```text
Task
   ├── Assignee
   ├── Comments
   ├── Attachments
```

---

## Authentication Flow

```text
User Login
   ↓
JWT Access Token Generated
   ↓
Refresh Token Stored
   ↓
API Requests Authenticated via Middleware
```

---

## RBAC Flow

```text
User
  ↓
OrganizationMember
  ↓
Role Assignment
  ↓
Role Permissions
  ↓
Permission Middleware
  ↓
API Access Granted/Denied
```

---

## Technologies Used

* Node.js
* Express.js
* TypeScript
* MySQL
* Sequelize ORM
* JWT Authentication
* bcrypt
* class-validator

---

## Scalability Features

* Modular architecture
* Stateless authentication
* Role-based access control
* Multi-tenant data isolation
* Service-repository separation

---

## Future Enhancements

* Activity Logs
* Audit Trails
* WebSocket real-time updates
* Email Notification system
* Analytics dashboard
* Advanced reporting system

---

## Summary

This backend is designed to support **enterprise-level project management workflows**, ensuring scalability, security, and maintainability.
