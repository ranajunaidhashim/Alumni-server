import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from "react-router-dom";


const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const toggleSidebar = () => {
        if (window.innerWidth < 768) {
            setSidebarOpen(!sidebarOpen);
        }
    };

    useEffect(() => {
        // Check viewport width to determine if sidebar should be open
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarOpen(true); // Open sidebar on desktop (viewport width >= 768px)
            } else {
                setSidebarOpen(false); // Close sidebar on mobile (viewport width < 768px)
            }
        };

        handleResize(); // Call once to set initial state

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <main id="main" className={`main ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <Outlet />
                {/* <h1>Hiiiiii</h1> */}
            </main>
        </>
    )
}

export default Dashboard