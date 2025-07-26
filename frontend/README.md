# Alumni Management System (Alumni-MERN)

Welcome to the **Alumni Management System** repository! This system is designed to assist universities/colleges in managing their alumni data effectively. The system consists of two main components: frontend and server.

## 🎯 Project Overview

The Alumni Management System has been developed with the following key features:

- **👨‍💼 Admin Side**: 
  - **Login Page**: The page where system admin will submit their system credential to access and manage the system data.
  - **Home Page**: The page where the admin user will be redirected by clicking on the navbar dropdown after logging into the alumni management system admin side. This page displays the summary or total counts of alumni, posted jobs, forum topics, and upcoming events.
  - **Gallery Page**: The page where the admin user will manage the gallery images and data for the website.
  - **Course List**: The page where the admin will populate and manage the university or college school's courses.
  - **Alumni List**: The page where the alumni list in the system are listed and this the page where can the admin verify the alumnus/alumna's account.
  - **Jobs Page**: The page where all posted jobs are listed and can be managed by the admin.
  - **Events Page**: The page where an admin manages or posts an upcoming event of the school where can alumni can participate.
  - **Forum Page**: The page where all forum topics are listed along with the count of comments if this topic is being shown.
  - **User Page**: The page where an admin user manages the system users.
  <!-- - **System Settings Page**: The page where an admin setup or manages the institute information to be shown on the website. -->
  
- **🎓 Alumni Side**:
  - **Home Page**: The default page where the user will be redirected when browsing the website and after logging in. This page shows the list of upcoming events.
  - **Signup Page**: The page where the unregistered alumnus/alumni submit their credentials.
  - **Login Page**: The page where the user submits their system credential in order to access and manage the other feature or functionalities of the system.
  - **Gallery Page**: The page where the images posted by the institute's management is being shown.
  - **About Page**: The page where the page about content is being shown.
  - **Job Page**: The page where all posted job opportunities are listed.
  - **Forum Page**: The page where that forum topics are listed and the user can join or read the comments by selecting and viewing a topic.
  - **Account Management Page**: The page where can the user update his/her system credentials and information.

## 🔄 Flow of the System

1. **User Registration**: Alumni register on the website and await verification from the school management.
2. **Admin Verification**: School management verifies alumni accounts to enlist them as users on the website.
3. **Alumni Interaction**: Verified alumni explore the system's features, including job opportunities, events, and forums.
4. **Admin Management**: The admin oversees account verification, alumni lists, gallery management, and school about content.

## 📂 Folder Structure

- **frontend/**: Contains the frontend code developed in ReactJS.
- **server/**: Contains the backend code developed in Node.js and Express.js.
  - **alumni_db.sql**: SQL database file containing site data.

6. Start the frontend and backend servers with these commands: `npm run dev` in `frontend` and `npm start` in `server` folder.

## 🤝 Contributing

Contributions to the Alumni Management System are welcome! If you have any ideas, bug fixes, or improvements, feel free to open an issue or submit a pull request.

Thank you for using the Alumni Management System! If you have any questions or need assistance, please don't hesitate to contact us.
