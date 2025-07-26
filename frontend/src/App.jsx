import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./styles/style.css";
import "react-toastify/dist/ReactToastify.css";
import Home from './components/Home';
import Footer from './components/Footer';
import Header from "./components/Header";
import AlumniList from "./components/AlumniList";
import Gallery from "./components/Gallery";
import Careers from "./components/Careers";
import Forum from "./components/Forum";
import About from "./components/About";
import Login from "./components/Login";;
import Signup from "./components/Signup";
import MyAccount from "./components/MyAccount";
import Dashboard from "./admin/Dashboard";
import AdminHome from "./admin/AdminHome";
import AdminCourses from "./admin/AdminCourses";
import AdminUsers from "./admin/AdminUsers";
import AdminGallery from "./admin/AdminGallery";
import AdminSettings from "./admin/AdminSettings";
import AdminEvents from "./admin/AdminEvents";
import AdminForum from "./admin/AdminForum";
import AdminAlumni from "./admin/AdminAlumni";
import AdminJobs from "./admin/AdminJobs";
import ManageJobs from "./admin/save/ManageJobs";
import View_Event from "./components/view/View_Event";
import ManageEvents from "./admin/save/ManageEvents";
import View_Forum from "./components/view/View_Forum";
import ManageForum from "./admin/save/ManageForum";
import ManageUser from "./admin/save/ManageUser";
import ViewAlumni from "./admin/view/ViewAlumni";
import { AuthProvider, useAuth } from './AuthContext';
import ScrollToTop from "./components/ScrollToTop";
import Manage_Career from "./components/manage/Manage_Career";
import 'react-quill/dist/quill.snow.css';
import { ThemeProvider } from "./ThemeContext";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ScrollToTop />
          <AppRouter />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}


function AppRouter() {
  const { isLoggedIn, isAdmin } = useAuth();
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  // useEffect(() => {
  //   const user = localStorage.getItem('user_type');
  //   // This effect is now handled in AuthProvider
  // }, []);

  // setTimeout(() => {
    
  // }, 1000);

  return (
    <>
      {!isDashboardRoute && <Header />}
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/alumni" element={<AlumniList />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/jobs" element={<Careers />} />
        <Route path="/forums" element={<Forum />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {isLoggedIn && isAdmin && (
          <Route path="/dashboard" element={
            // <PrivateRoute>
            <Dashboard />
            //  {/* </PrivateRoute> */}
          } >
            <Route path="" element={<AdminHome />} />
            <Route path="/dashboard/courses" element={<AdminCourses />} />
            <Route path="/dashboard/users" element={<AdminUsers />} />
            <Route path="/dashboard/gallery" element={<AdminGallery />} />
            <Route path="/dashboard/settings" element={<AdminSettings />} />
            <Route path="/dashboard/events" element={<AdminEvents />} />
            <Route path="/dashboard/forum" element={<AdminForum />} />
            <Route path="/dashboard/alumnilist" element={<AdminAlumni />} />
            <Route path="/dashboard/jobs" element={<AdminJobs />} />
            <Route path="/dashboard/jobs/manage" element={<ManageJobs />} />
            <Route path="/dashboard/events/manage" element={<ManageEvents />} />
            <Route path="/dashboard/forum/manage" element={<ManageForum />} />
            <Route path="/dashboard/users/manage" element={<ManageUser />} />
            <Route path="/dashboard/alumni/view" element={<ViewAlumni />} />
          </Route>
        )}
        <Route path="events/view" element={<View_Event />} />
        {isLoggedIn && <Route path="account" element={<MyAccount />} />}
        <Route path="forum/view" element={<View_Forum />} />
        <Route path="jobs/add" element={<ManageJobs />} />
        {/* <Route path="jobs/add" element={<Manage_Career />} /> */}

      </Routes>
      {!isDashboardRoute && <Footer />}
    </>
  );
}

export default App;