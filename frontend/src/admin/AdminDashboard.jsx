import { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard, BookOpen, GraduationCap, Building, Image,
    Bell, LogOut, Menu, X, ChevronRight, UserCircle2, ExternalLink
} from 'lucide-react';

import aimsLogo from '../assets/aims_logo.png';

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Courses', path: '/admin/courses', icon: BookOpen },
        { name: 'Departments', path: '/admin/departments', icon: Building },
        { name: 'Faculty', path: '/admin/faculty', icon: GraduationCap },
        { name: 'Gallery', path: '/admin/gallery', icon: Image },
        { name: 'Notices', path: '/admin/notices', icon: Bell },
        { name: 'Hero Slides', path: '/admin/hero', icon: Image },
    ];

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex overflow-hidden">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1e2a3a] text-white transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
                <div className="h-full flex flex-col p-6">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-2 shadow-2xl overflow-hidden ring-4 ring-white/5">
                            <img src={aimsLogo} alt="AIMS Logo" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-white leading-none">AIMS</h2>
                            <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mt-1.5 leading-none italic">Admin Panel</p>
                        </div>
                        <button className="lg:hidden ml-auto text-gray-400" onClick={() => setSidebarOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex-grow space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all font-medium group"
                            >
                                <item.icon size={20} className="group-hover:text-primary" />
                                <span>{item.name}</span>
                                <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100" />
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-white/10">
                        <div className="flex items-center gap-3 mb-6 p-2">
                            <UserCircle2 className="text-primary" size={40} />
                            <div>
                                <p className="text-sm font-bold text-white mb-0 capitalize">{user?.username || 'Admin'}</p>
                                <span className="text-xs text-secondary/60">Super Admin</span>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all font-medium"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow h-screen overflow-y-auto relative p-6 lg:p-10">
                <header className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden text-dark p-2 bg-white rounded-xl shadow-md"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-dark">Welcome Back!</h1>
                            <p className="text-gray-500">Managing AIMS Bhubaneswar Portal</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/"
                            target="_blank"
                            className="flex items-center gap-2 px-5 py-2.5 bg-white text-dark font-semibold rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-sm"
                        >
                            <ExternalLink size={16} />
                            View Public Website
                        </Link>
                    </div>
                </header>

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[calc(100vh-250px)]">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
