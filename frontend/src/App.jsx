import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Faculty from './pages/Faculty';
import Admissions from './pages/Admissions';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import DashboardHome from './admin/DashboardHome';
import AdminNotices from './admin/AdminNotices';
import AdminHero from './admin/AdminHero';
import NoticeBoard from './pages/NoticeBoard';
import { useAuth } from './context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

import AdmissionPopup from './components/AdmissionPopup';
import Chatbot from './components/Chatbot';
import WhatsAppButton from './components/WhatsAppButton';

// Page Transition Component
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.02 }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// Simple check for Protected Routes
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/admin/login" />;
  return children;
};

// Placeholder components for other pages
import Courses from './pages/Courses';
import About from './pages/About';
import Laboratories from './pages/Laboratories';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

// Placeholder Departments (can be expanded later if needed)
const Departments = () => <div className="pt-40 pb-24 text-center text-4xl font-bold bg-accent/20 min-h-screen uppercase tracking-tighter">Academic Departments <br /><span className="text-sm font-black text-primary tracking-widest">AIMS BHUBANESWAR</span></div>;

import AdminCourses from './admin/AdminCourses';
import AdminDepartments from './admin/AdminDepartments';
import AdminFaculty from './admin/AdminFaculty';
import AdminGallery from './admin/AdminGallery';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <AdmissionPopup />
      <ConditionalNavbarWrapper />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
            <Route path="/departments" element={<PageTransition><Departments /></PageTransition>} />
            <Route path="/faculty" element={<PageTransition><Faculty /></PageTransition>} />
            <Route path="/laboratories" element={<PageTransition><Laboratories /></PageTransition>} />
            <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
            <Route path="/notices" element={<PageTransition><NoticeBoard /></PageTransition>} />
            <Route path="/admissions" element={<PageTransition><Admissions /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />

            {/* Admin Login */}
            <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />

            {/* Admin Dashboard (Protected) */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardHome />} />
              <Route path="faculty" element={<AdminFaculty />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="departments" element={<AdminDepartments />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="notices" element={<AdminNotices />} />
              <Route path="hero" element={<AdminHero />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </main>
      <ConditionalWhatsAppWrapper />
      <ConditionalChatbotWrapper />
      <ConditionalFooterWrapper />
    </div>
  );
}

// Helper to hide navbar/footer on admin pages
const ConditionalNavbarWrapper = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/admin/login';
  const isAdminDashboard = location.pathname.startsWith('/admin');
  if (isLoginPage || isAdminDashboard) return null;
  return <Navbar />;
};

const ConditionalFooterWrapper = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/admin/login';
  const isAdminDashboard = location.pathname.startsWith('/admin');
  if (isLoginPage || isAdminDashboard) return null;
  return <Footer />;
};

const ConditionalWhatsAppWrapper = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/admin/login';
  const isAdminDashboard = location.pathname.startsWith('/admin');
  if (isLoginPage || isAdminDashboard) return null;
  return <WhatsAppButton />;
};

const ConditionalChatbotWrapper = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/admin/login';
  const isAdminDashboard = location.pathname.startsWith('/admin');
  if (isLoginPage || isAdminDashboard) return null;
  return <Chatbot />;
};

export default App;
