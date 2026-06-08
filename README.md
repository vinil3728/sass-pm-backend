# SaaS Project Management Platform - Backend

A scalable multi-tenant Project Management Platform built using Node.js, Express.js, TypeScript, MySQL, Sequelize, and JWT Authentication.

The platform supports organizations, teams, projects, sprints, tasks, notifications, and enterprise-grade Role-Based Access Control (RBAC).

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Refresh Token Support
* Secure Password Hashing
* Protected Routes

### Organization Management

* Create Organizations
* Organization Dashboard
* Invite Members
* Member Management
* Organization Authorization

### Team Management

* Create Teams
* Update Teams
* Delete Teams
* Add Team Members
* Remove Team Members
* Team Dashboard

### Project Management

* Create Projects
* Update Projects
* Delete Projects
* Project Dashboard
* Project Authorization
* Project-Team Mapping

### Sprint Management

* Create Sprints
* Sprint Lifecycle Management
* Sprint Dashboard

### Task Management

* Create Tasks
* Update Tasks
* Delete Tasks
* Task Workflow
* Task Assignment
* Task Collaboration
* Task Search and Filters

### Attachments

* Upload Attachments
* Download Attachments
* Task Attachment Management

### Notifications

* Create Notifications
* Notification Retrieval
* Real-Time Notification Ready Architecture

### RBAC (Role-Based Access Control)

#### System Roles

* OWNER
* ADMIN
* PROJECT_MANAGER
* TEAM_LEAD
* DEVELOPER
* TESTER
* VIEWER

#### Permissions

* PROJECT_CREATE
* PROJECT_UPDATE
* PROJECT_DELETE
* SPRINT_CREATE
* SPRINT_UPDATE
* TASK_CREATE
* TASK_UPDATE
* TASK_DELETE
* TEAM_MANAGE
* MEMBER_INVITE
* REPORT_VIEW

#### RBAC Features

* Role Assignment
* Permission Assignment
* Permission Middleware
* Organization Member Roles
* Role-Permission Mapping

---

## Technology Stack

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* MySQL
* Sequelize ORM
* sequelize-typescript

### Authentication

* JWT
* Refresh Tokens
* bcrypt

### Validation

* class-validator
* class-transformer

### File Uploads

* Multer

---

## Project Structure

```text
src
├── modules
│   ├── auth
│   ├── organization
│   ├── project
│   ├── sprint
│   ├── task
│   ├── team
│   ├── notification
│   └── rbac
│
├── shared
│   ├── middleware
│   ├── utils
│   ├── constants
│   └── types
│
├── database
│
├── app.ts
└── server.ts
```

---

## Architecture

The application follows a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

### Responsibilities

#### Controllers

Handle HTTP requests and responses.

#### Services

Contain business logic and validations.

#### Repositories

Handle database interactions.

#### Models

Represent database tables.

#### Middleware

Authentication, authorization, validation, and permissions.

---

## Authentication Flow

```text
User Login
     ↓
Generate Access Token
     ↓
Generate Refresh Token
     ↓
Access Protected APIs
     ↓
Refresh Access Token
```

---

## RBAC Flow

```text
Organization Member
        ↓
Assigned Role
        ↓
Role Permissions
        ↓
Permission Middleware
        ↓
Protected Resource
```

---

## API Modules

| Module             | Status    |
| ------------------ | --------- |
| Authentication     | Completed |
| Organization       | Completed |
| Team Management    | Completed |
| Project Management | Completed |
| Sprint Management  | Completed |
| Task Management    | Completed |
| Attachments        | Completed |
| Notifications      | Completed |
| RBAC               | Completed |

---

## Future Enhancements

* Activity Logs
* Audit Trail
* Dashboard Analytics
* Email Notifications
* WebSocket Integration
* Advanced Reporting
* Custom Roles
* Custom Permissions

---

## Author

**Vinil Sai Manikanta**

- GitHub: https://github.com/vinil3728
- Role: Full-Stack Developer

Built as a scalable SaaS Project Management Platform using modern backend development practices, enterprise-grade RBAC, and multi-tenant architecture.