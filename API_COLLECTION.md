# API Collection - SaaS Project Management Platform

## Base URL

```
/api
```

---

# Authentication APIs

## Register User

```
POST /auth/register
```

## Login User

```
POST /auth/login
```

## Refresh Token

```
POST /auth/refresh-token
```

## Logout

```
POST /auth/logout
```

---

# Organization APIs

## Create Organization

```
POST /organizations
```

## Get User Organizations

```
GET /organizations
```

## Get Organization By ID

```
GET /organizations/:organizationId
```

## Invite Member

```
POST /organizations/:organizationId/invite
```

## Get Members

```
GET /organizations/:organizationId/members
```

---

# Team APIs

## Create Team

```
POST /organizations/:organizationId/teams
```

## Get Teams

```
GET /organizations/:organizationId/teams
```

## Get Team

```
GET /teams/:teamId
```

## Update Team

```
PATCH /teams/:teamId
```

## Delete Team

```
DELETE /teams/:teamId
```

## Add Team Member

```
POST /teams/:teamId/members
```

## Remove Team Member

```
DELETE /teams/:teamId/members/:userId
```

---

# Project APIs

## Create Project

```
POST /projects
```

## Get Projects

```
GET /projects
```

## Get Project By ID

```
GET /projects/:projectId
```

## Update Project

```
PATCH /projects/:projectId
```

## Delete Project

```
DELETE /projects/:projectId
```

---

## Project-Team Mapping

## Assign Team to Project

```
POST /projects/:projectId/teams
```

## Get Project Teams

```
GET /projects/:projectId/teams
```

## Remove Team from Project

```
DELETE /projects/:projectId/teams/:teamId
```

---

# Sprint APIs

## Create Sprint

```
POST /projects/:projectId/sprints
```

## Get Sprints

```
GET /projects/:projectId/sprints
```

## Update Sprint

```
PATCH /sprints/:sprintId
```

---

# Task APIs

## Create Task

```
POST /projects/:projectId/tasks
```

## Get Tasks

```
GET /projects/:projectId/tasks
```

## Update Task

```
PATCH /tasks/:taskId
```

## Delete Task

```
DELETE /tasks/:taskId
```

## Assign Task

```
POST /tasks/:taskId/assign
```

---

## Task Collaboration

## Add Comment

```
POST /tasks/:taskId/comments
```

## Get Comments

```
GET /tasks/:taskId/comments
```

## Upload Attachment

```
POST /tasks/:taskId/attachments
```

---

# Notification APIs

## Get Notifications

```
GET /notifications
```

## Mark as Read

```
PATCH /notifications/:notificationId/read
```

---

# RBAC APIs

## Roles

```
POST /rbac/roles
GET /rbac/roles
```

## Permissions

```
GET /rbac/permissions
```

## Assign Permission to Role

```
POST /rbac/roles/:roleId/permissions
```

## Assign Role to Member

```
POST /rbac/members/:organizationMemberId/roles
```

## Get Member Roles

```
GET /rbac/members/:organizationMemberId/roles
```

---

# Summary

This API collection represents a **full enterprise-grade backend system** supporting multi-tenant project management with RBAC security.
