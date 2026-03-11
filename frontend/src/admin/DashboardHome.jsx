import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
    Users, BookOpen, Building, Image, Bell, Clock, ArrowUpRight, TrendingUp
} from 'lucide-react';
import API_BASE_URL from '../apiConfig';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
        <div className="flex justify-between items-start mb-6">
            <div className={`p-4 rounded-2xl ${color} text-white shadow-lg`}>
                <Icon size={24} />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">
                <TrendingUp size={12} /> +12%
            </span>
        </div>
        <div>
            <h3 className="text-gray-400 font-medium text-sm mb-1 uppercase tracking-wider">{title}</h3>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-dark tracking-tight">{value}</span>
                <span className="text-xs font-bold text-gray-300">Total counted</span>
            </div>
        </div>
    </div>
);

const DashboardHome = () => {
    const navigate = useNavigate();
    const [counts, setCounts] = useState({
        faculty: 0,
        courses: 0,
        departments: 0,
        notices: 0,
        gallery: 0
    });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Fetch real counts from API
                const [f, c, d, n, g] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/faculty`),
                    axios.get(`${API_BASE_URL}/api/courses`),
                    axios.get(`${API_BASE_URL}/api/departments`),
                    axios.get(`${API_BASE_URL}/api/notices`),
                    axios.get(`${API_BASE_URL}/api/gallery`)
                ]);

                setCounts({
                    faculty: f.data.length,
                    courses: c.data.length,
                    departments: d.data.length,
                    notices: n.data.length,
                    gallery: g.data.length
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchCounts();
    }, []);

    const stats = [
        { title: 'Total Faculty', value: counts.faculty, icon: Users, color: 'bg-blue-500 shadow-blue-500/30' },
        { title: 'Courses', value: counts.courses, icon: BookOpen, color: 'bg-orange-500 shadow-orange-500/30' },
        { title: 'Departments', value: counts.departments, icon: Building, color: 'bg-green-600 shadow-green-600/30' },
        { title: 'Notices', value: counts.notices, icon: Bell, color: 'bg-purple-600 shadow-purple-600/30' },
        { title: 'Gallery Images', value: counts.gallery, icon: Image, color: 'bg-pink-600 shadow-pink-600/30' }
    ];

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {stats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} />
                ))}
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activities */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-dark flex items-center gap-2">
                            <Clock size={20} className="text-primary" />
                            Recent Activities
                        </h2>
                        <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                            View all <ArrowUpRight size={16} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { action: "Added new faculty member: Dr. Rajesh Kumar", date: "2 hours ago", type: "faculty" },
                            { action: "Updated notice: Admissions Open 2026", date: "5 hours ago", type: "notice" },
                            { action: "Uploaded 4 images to Campus Gallery", date: "Yesterday", type: "gallery" },
                            { action: "Created new department: Pharmaceutics", date: "2 days ago", type: "dept" }
                        ].map((act, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100/50 hover:bg-white hover:border-primary/20 transition-all group">
                                <div className="w-2 h-10 bg-primary/20 group-hover:bg-primary rounded-full transition-all" />
                                <div>
                                    <p className="text-sm font-bold text-dark">{act.action}</p>
                                    <span className="text-xs text-gray-400">{act.date}</span>
                                </div>
                                <button className="ml-auto p-2 text-gray-300 hover:text-primary">
                                    <ArrowUpRight size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="bg-[#1e2a3a] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: "Add Faculty", icon: Users, path: "/admin/faculty" },
                                { name: "Post Notice", icon: Bell, path: "/admin/notices" },
                                { name: "Upload Photo", icon: Image, path: "/admin/gallery" },
                                { name: "New Course", icon: BookOpen, path: "/admin/courses" }
                            ].map((q, idx) => (
                                <Link
                                    key={idx}
                                    to={q.path}
                                    className="bg-white/10 hover:bg-primary p-4 rounded-2xl flex flex-col items-center gap-3 transition-all border border-white/5 shadow-xl text-center"
                                >
                                    <q.icon size={20} />
                                    <span className="text-xs font-bold whitespace-nowrap">{q.name}</span>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-10 p-6 bg-primary rounded-2xl shadow-lg border border-white/20">
                            <h4 className="font-bold mb-1">System Status</h4>
                            <p className="text-xs text-blue-100 opacity-80 mb-4">All services are running smoothly.</p>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Active Server</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary rounded-full blur-[80px] opacity-20 pointer-events-none" />
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
