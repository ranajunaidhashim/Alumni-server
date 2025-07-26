# Alumni Management System Backend

This repository contains the **Alumni Management System** backend, built with Node.js, Express, and Sequelize (MySQL). It provides a RESTful API for managing alumni, events, forums, careers, courses, gallery, system settings, and user authentication.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Environment Variables](#environment-variables)
  * [Database Setup](#database-setup)
  * [Running the Server](#running-the-server)
* [API Endpoints](#api-endpoints)

  * [Authentication Routes (](#authentication-routes-auth)[`/auth`](#authentication-routes-auth)[)](#authentication-routes-auth)
  * [Admin Routes (](#admin-routes-apiadmin)[`/api/admin`](#admin-routes-apiadmin)[)](#admin-routes-apiadmin)
* [Middleware](#middleware)
* [Error Handling](#error-handling)
* [File Uploads](#file-uploads)
* [License](#license)

---

## Features

* **Authentication**: Signup, login, logout with JWT and HTTP-only cookies
* **Role-based access** (public, alumni, admin)
* **Admin dashboard**: summary counts, manage users, courses, events, forums, gallery, system settings
* **Alumni operations**: register, update profile, view upcoming events, participate in events, forum interaction
* **File uploads**: avatar and gallery images via Multer
* **Sequelize ORM**: models and associations for MySQL database
* **RESTful API**: CRUD operations for all resources

---

## Tech Stack

* **Runtime**: Node.js v20+
* **Framework**: Express.js
* **ORM**: Sequelize
* **Database**: MySQL
* **Authentication**: JSON Web Tokens (JWT)
* **File Uploads**: Multer
* **Environment**: dotenv

---

## Project Structure

```
Alumni-server/
├── config/               # Sequelize config files
├── controllers/          # Request handlers for each resource
├── middlewares/          # Auth and error middleware
├── models/               # Sequelize models and associations
├── routes/               # Express route definitions
├── utils/                # Helpers (db connection, mailer, file uploads)
├── Public/               # Static assets (avatars, images)
├── app.js                # Express app setup
├── index.js              # Server entry point
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

---

## Getting Started

### Prerequisites

* Node.js v20+
* Yarn or npm
* MySQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/Alumni-server.git
   cd Alumni-server
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn
   ```

### Environment Variables

Create a `.env` file in the project root with the following variables:

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=alumni_db
DB_USER=root
DB_PASSWORD=yourpassword
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Database Setup

1. Create the database:

   ```sql
   CREATE DATABASE alumni_db;
   ```
2. Import the SQL dump in `SqlDatabase/alumni_db.sql` into your MySQL server.
3. (Optional) Run Sequelize migrations if configured.

### Running the Server

```bash
npm start
```

The server will start at `http://localhost:3000`.

---

## API Endpoints

### Authentication Routes (`/auth`)

* `POST /auth/signup` — Create an account (alumnus or admin)
* `POST /auth/login`  — Login and receive JWT cookie
* `POST /auth/logout` — Clear the auth cookie

### Admin Routes (`/api/admin`)

All admin routes are prefixed with `/api/admin` and protected by middleware.

#### Dashboard (`/dashboard`)

* `GET /api/admin/dashboard/counts` — Summary counts for forums, jobs, events, upcoming-events, alumni

#### Users (`/users`)

* `GET /api/admin/users`       — List all users
* `PUT /api/admin/users`       — Update user info
* `DELETE /api/admin/users/:id` — Delete a user

#### Careers (`/jobs`)

* `GET /api/admin/jobs`
* `POST /api/admin/jobs`       — Create job post
* `PUT /api/admin/jobs/:id`    — Update job post
* `DELETE /api/admin/jobs/:id` — Remove job post

#### Courses (`/courses`)

* `GET /api/admin/courses`
* `POST /api/admin/courses`       — Add course
* `PUT /api/admin/courses/:id`    — Update course
* `DELETE /api/admin/courses/:id` — Remove course

#### Events (`/events`)

* `GET /api/admin/events`
* `POST /api/admin/events`       — Add event
* `PUT /api/admin/events/:id`    — Update event
* `DELETE /api/admin/events/:id` — Delete event
* `POST /api/admin/events/participate` — Alumni RSVP to event
* `POST /api/admin/eventcommits/check` — Check if participated

#### Forums (`/forums`)

* `GET /api/admin/forums`
* `POST /api/admin/forums`       — Add topic
* `PUT /api/admin/forums/:id`    — Update topic
* `DELETE /api/admin/forums/:id` — Delete topic
* `GET /api/admin/forums/:topicId/comments` — List comments
* `POST /api/admin/forums/:topicId/comments` — Add comment
* `PUT /api/admin/forums/comments/:id`       — Update comment
* `DELETE /api/admin/forums/comments/:id`    — Delete comment

#### Gallery (`/gallery`)

* `GET /api/admin/gallery`
* `POST /api/admin/gallery`       — Upload image
* `DELETE /api/admin/gallery/:id` — Delete image

#### Alumni (`/alumni`)

* `GET /api/admin/alumni`           — List alumni
* `GET /api/admin/alumni/:id`       — Get alumnus details
* `PUT /api/admin/alumni/status`    — Update verification status
* `DELETE /api/admin/alumni/:id`    — Remove alumnus
* `PUT /api/admin/alumni/account`   — Alumni update profile & avatar

#### Settings (`/settings`)

* `GET /api/admin/settings` — System settings (about page, contact info)

---

## Middleware

* **`auth.middleware.js`** — Protects routes and extracts `req.user` from JWT
* **`error.middleware.js`** — Centralized error handler

---

## File Uploads

* **Avatar**: `/utils/file-upload.js` configures Multer to store in `Public/Avatar`
* **Gallery**: stores in `Public/Images`

Access public files via static route:

```js
app.use('/api/admin/public', express.static(path.join(__dirname, 'Public')));
```

---

## License

MIT ©Rana Junaid Hashim
