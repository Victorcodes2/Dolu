import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  useEffect(() => {
    // Add visibility change listener to maintain active state
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Reconnect or refresh data if needed when tab becomes visible again
        console.log('Tab is now active');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background font-inter text-text">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;