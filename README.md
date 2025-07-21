# Task Manager

A Node.js/Express-based task management system with user authentication, admin controls, and a clean service/controller architecture.

## Features

- User registration and login
- Task CRUD (Create, Read, Update, Delete)
- Commenting on tasks
- Admin dashboard for managing users, tasks, and comments
- Role-based access control (admin vs. regular user)
- Clean separation of business logic (services) and HTTP handling (controllers)

## Project Structure

```
task.manager/
  |-- controllers/   # HTTP request/response logic
  |-- services/      # Business logic and DB operations
  |-- routes/        # Express route definitions
  |-- middleware/    # Auth and other middleware
  |-- model/         # Sequelize models
  |-- config/        # DB and app config
  |-- views/         # Pug templates for rendering
  |-- index.js       # App entry point
  |-- package.json   # Dependencies
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment:**
   - Copy `.env.example` to `.env` and set your environment variables (DB, session secret, etc.)
3. **Run the app:**
   ```bash
   npm start
   ```
   The server will run on the port specified in your `.env` file.

## Usage

- **User routes:** `/api/users`, `/api/tasks`, `/api/tasks/:taskId/comments`, etc.
- **Admin routes:** `/api/admin/users`, `/api/admin/tasks`, `/api/admin/comments`, etc.
- **Auth routes:** `/login`, `/register`, `/logout`

## Middleware

- `isLoggedIn`: Protects routes for authenticated users
- `isAdmin`: Restricts access to admin-only routes

## Architecture

- **Controllers:** Only handle HTTP requests/responses, call service functions
- **Services:** Contain all business logic and database interaction
- **Middleware:** Used for authentication and role-based access

## License

MIT
