```markdown
# Alumni Management System

An end‑to‑end MERN‑style application to manage university/college alumni data, events, jobs, forums, galleries, and system settings. The monorepo contains two top‑level projects:

```

Alumni Management System/
├── backend/   # Node.js + Express + Sequelize API
├── frontend/  # ReactJS client
└── README.md  # ← you are here

````

---

## 🚀 Features

- **Authentication & Authorization**  
  - Signup, login, logout with JWT stored in HTTP‑only cookies  
  - Role‑based access: public, alumni, admin

- **Admin Dashboard**  
  - Summary counts (alumni, jobs, forums, events)  
  - CRUD for users, courses, careers (jobs), events, forums, gallery images, system settings  

- **Alumni Portal**  
  - Register and await admin verification  
  - View upcoming events, RSVP to events  
  - Browse/post in forums  
  - View job listings  
  - Gallery & About pages  
  - Manage own account & avatar  

- **File Uploads**  
  - Profile avatars & gallery images via Multer  
  - Served as static assets  

---

## 📁 Folder Structure

```text
.
├── backend/
│   ├── config/             # Sequelize config
│   ├── controllers/        # Express route handlers
│   ├── middlewares/        # Auth & error handling
│   ├── models/             # Sequelize models & associations
│   ├── public/             # Static (avatars, images)
│   ├── routes/             # Express routers
│   ├── utils/              # DB connection, mailer, file-upload
│   ├── app.js              # Express app setup
│   ├── index.js            # Server entry point
│   └── package.json
│
└── frontend/
    ├── public/             # Static HTML, icons
    ├── src/
    │   ├── admin/          # Admin‐only pages/components
    │   ├── components/     # Reusable UI components
    │   ├── utils/          # globalurl, contexts
    │   ├── App.jsx         # Main router & layout
    │   └── main.jsx        # ReactDOM render
    └── package.json
````

---

## ⚙️ Setup & Run

### Prerequisites

* **Node.js** v16+
* **MySQL** database

### 1. Clone & Install

```bash
git clone https://github.com/ranajunaidhashim/Alumni-server.git
cd Alumni-server
```

#### a) Backend

```bash
cd backend
npm install
```

#### b) Frontend

```bash
cd ../frontend
npm install
```

---

### 2. Environment Variables

Create a `.env` in `backend/`:

```dotenv
DB_HOST=localhost
DB_PORT=3306
DB_NAME=alumni_db
DB_USER=root
DB_PASSWORD=your_db_pass
JWT_SECRET=supersecretkey
PORT=3000
```

---

### 3. Database

1. Create database and import the SQL dump:

   ```sql
   CREATE DATABASE alumni_db;
   ```
2. From `backend/SqlDatabase/alumni_db.sql`:

   ```bash
   mysql -u root -p alumni_db < SqlDatabase/alumni_db.sql
   ```

---

### 4. Run Servers

#### Backend API

```bash
cd backend
npm start
```

* Runs on **[http://localhost:3000](http://localhost:3000)**

#### Frontend Client

```bash
cd frontend
npm run dev
```

* Runs on **[http://localhost:5173](http://localhost:5173)** (or as configured)

---

## 📖 API Overview

### Authentication `/auth`

* `POST /auth/signup` — sign up alumnus/admin
* `POST /auth/login`  — log in (sets JWT cookie)
* `POST /auth/logout` — clear auth cookie

### Admin Routes (all under `/api/admin`)

* **Dashboard**

  * `GET /api/admin/dashboard/counts`

* **Users**

  * `GET /api/admin/users`
  * `PUT /api/admin/users`
  * `DELETE /api/admin/users/:id`

* **Careers (Jobs)**

  * `GET /api/admin/jobs`
  * `POST /api/admin/jobs`
  * `PUT /api/admin/jobs/:id`
  * `DELETE /api/admin/jobs/:id`

* **Courses**

  * `GET /api/admin/courses`
  * `POST /api/admin/courses`
  * `PUT /api/admin/courses/:id`
  * `DELETE /api/admin/courses/:id`

* **Events**

  * `GET /api/admin/events`
  * `POST /api/admin/events`
  * `PUT /api/admin/events/:id`
  * `DELETE /api/admin/events/:id`
  * `POST /api/admin/events/participate`
  * `POST /api/admin/eventcommits/check`

* **Forums**

  * `GET /api/admin/forums`
  * `POST /api/admin/forums`
  * `PUT /api/admin/forums/:id`
  * `DELETE /api/admin/forums/:id`
  * `GET /api/admin/forums/:topicId/comments`
  * `POST /api/admin/forums/:topicId/comments`
  * `PUT /api/admin/forums/comments/:id`
  * `DELETE /api/admin/forums/comments/:id`

* **Gallery**

  * `GET /api/admin/gallery`
  * `POST /api/admin/gallery`
  * `DELETE /api/admin/gallery/:id`

* **Alumni**

  * `GET /api/admin/alumni`
  * `GET /api/admin/alumni/:id`
  * `PUT /api/admin/alumni/status`
  * `DELETE /api/admin/alumni/:id`
  * `PUT /api/admin/alumni/account`

* **Settings**

  * `GET /api/admin/settings`

---

## 🎨 Frontend Highlights

* **Public pages**: Home, About, Gallery, Jobs, Forums, Signup, Login
* **Protected**: Alumni account pages, comment posting
* **Admin**: Full dashboard with CRUD operations

---

## 🤝 Contributing

1. Fork & clone
2. Create a branch (`git checkout -b feat/YourFeature`)
3. Commit changes (`git commit -m "feat: ..."`), push, and open a PR

---

## 📄 License

[MIT](LICENSE) © Rana Junaid Hashim
