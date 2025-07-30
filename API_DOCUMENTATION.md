# Task Manager API Documentation

**Base URL:** `http://localhost:2000`

---

## Authentication

### POST /login

- **Description:** Authenticate a user with email and password.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "Login Successful"
  }
  ```
- **Error Responses:**
  - `404` – Account doesn't exist
  - `403` – Incorrect credentials

---

### POST /register

- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "name": "Abraham",
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "User Successfully created."
  }
  ```
- **Error Responses:**
  - `403` – Invalid input, email exists, or password too short

---

### GET /logout

- **Description:** Logs out the current user and destroys the session.
- **Success Response:**
  ```json
  {
    "message": "Logout successful"
  }
  ```

---

## User

### GET /api/users

- **Description:** Get details of the currently logged-in user.
- **Success Response:**
  ```json
  {
    "user": {
      "id": 123,
      "name": "Abraham",
      "email": "user@example.com"
    }
  }
  ```
- **Error Responses:**
  - `401` – Unauthorized
  - `404` – User not found

---

### POST /api/users/:id/delete

- **Description:** Delete the user account and log out.
- **URL Param:** `id` (User ID)
- **Success Response:**
  ```json
  {
    "message": "Account deleted and logged out"
  }
  ```
- **Error Responses:**
  - `401` – Not authenticated
  - `404` – User not found

---

## Admin

### GET /api/admin/users

- **Description:** List all users (admin only).
- **Success Response:**
  ```json
  {
    "message": "Users retrieved",
    "users": [ { "id": 1, "name": "Abraham" }, ... ]
  }
  ```

### GET /api/admin/tasks

- **Description:** List all tasks (admin only).
- **Success Response:**
  ```json
  {
    "message": "Tasks retrieved",
    "tasks": [ ... ]
  }
  ```

### GET /api/admin/comments

- **Description:** List all comments (admin only).
- **Success Response:**
  ```json
  {
    "comments": [ ... ]
  }
  ```

### GET /api/admin/users/details

- **Description:** Get detailed info about users, their tasks, and comments (admin only).
- **Success Response:**
  ```json
  {
    "users": [ ... ]
  }
  ```

---

## Task

### GET /api/tasks

- **Description:** Get all tasks for the logged-in user.
- **Success Response:**
  ```json
  {
    "tasks": [ ... ]
  }
  ```

### POST /api/tasks

- **Description:** Create a new task.
- **Request Body:**
  ```json
  {
    "title": "Finish assignment",
    "description": "Complete the math assignment",
    "status": "pending",
    "dueDate": "2024-05-01"
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "Task successfully created"
  }
  ```

### GET /api/tasks/:taskId

- **Description:** Get a specific task and its comments.
- **URL Param:** `taskId`
- **Success Response:**
  ```json
  {
    "tasks": { ... }
  }
  ```

### PUT /api/tasks/:taskId

- **Description:** Update a task's status.
- **Request Body:**
  ```json
  {
    "status": "completed"
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "Task updated successfully"
  }
  ```

### DELETE /api/tasks/:taskId

- **Description:** Delete a task.
- **Success Response:**
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

---

## Comment

### GET /api/tasks/:taskId/comments

- **Description:** Get all comments for a specific task.
- **Success Response:**
  ```json
  {
    "comments": [ ... ]
  }
  ```

### POST /api/tasks/:taskId/comments

- **Description:** Add a comment to a task.
- **Request Body:**
  ```json
  {
    "comment": "Great job on this task!"
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "Comment added successfully",
    "comment": { ... }
  }
  ```

### PUT /api/tasks/:taskId/comments/:commentId

- **Description:** Update a comment.
- **Request Body:**
  ```json
  {
    "comment": "Updated comment text"
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "Comment updated successfully"
  }
  ```

### DELETE /api/tasks/:taskId/comments/:commentId

- **Description:** Delete a comment.
- **Success Response:**
  ```json
  {
    "message": "Comment deleted successfully"
  }
  ```
