import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Clipboard, Package, MessageCircle, Menu, X, LogOut, FileText } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const adminAuth = sessionStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 250, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:block bg-text text-white w-64 flex-shrink-0 z-10"
          >
            <div className="p-4 flex items-center justify-between">
              <Link to="/admin/dashboard" className="flex items-center space-x-2">
                <Package className="h-6 w-6 text-primary-500" />
                <span className="text-lg font-semibold">Dolu Logistics Admin</span>
              </Link>
            </div>

            <nav className="mt-8">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 ${
                    isActive ? 'bg-gray-800 text-primary-500' : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                <Clipboard className="h-5 w-5" />
                <span>Manage Parcels</span>
              </NavLink>

              <NavLink
                to="/admin/dashboard/requests"
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 ${
                    isActive ? 'bg-gray-800 text-primary-500' : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                <FileText className="h-5 w-5" />
                <span>Pickup Requests</span>
              </NavLink>

              <NavLink
                to="/admin/dashboard/messages"
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 ${
                    isActive ? 'bg-gray-800 text-primary-500' : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                <MessageCircle className="h-5 w-5" />
                <span>Customer Messages</span>
              </NavLink>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 text-left"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button onClick={toggleSidebar} className="hidden md:block text-text focus:outline-none">
                <Menu className="h-6 w-6" />
              </button>

              <button onClick={toggleMobileMenu} className="md:hidden text-text focus:outline-none">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              <h1 className="text-xl font-semibold text-text">Dashboard</h1>
            </div>

            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Mobile navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-text text-white overflow-hidden"
              >
                <nav className="p-4 flex flex-col space-y-2">
                  <NavLink
                    to="/admin/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-md ${
                        isActive ? 'bg-gray-800 text-primary-500' : 'text-gray-300 hover:bg-gray-800'
                      }`
                    }
                  >
                    <Clipboard className="h-5 w-5" />
                    <span>Manage Parcels</span>
                  </NavLink>

                  <NavLink
                    to="/admin/dashboard/requests"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-md ${
                        isActive ? 'bg-gray-800 text-primary-500' : 'text-gray-300 hover:bg-gray-800'
                      }`
                    }
                  >
                    <FileText className="h-5 w-5" />
                    <span>Pickup Requests</span>
                  </NavLink>

                  <NavLink
                    to="/admin/dashboard/messages"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-md ${
                        isActive ? 'bg-gray-800 text-primary-500' : 'text-gray-300 hover:bg-gray-800'
                      }`
                    }
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Customer Messages</span>
                  </NavLink>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-md text-gray-300 hover:bg-gray-800 text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
