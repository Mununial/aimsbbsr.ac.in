import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Calendar, ChevronRight, Info, Search, Filter, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import SEO from '../components/SEO';
import aimsLogo from '../assets/aims_logo.png';

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);
    const [filteredNotices, setFilteredNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');

    const categories = ['All', 'Admission', 'Academic', 'Examination', 'Events'];

    useEffect(() => {
        // Removed orderBy("date", "desc") to prevent index error
        const q = query(collection(db, "notices"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if (data.length > 0) {
                setNotices(data);
                setFilteredNotices(data);
            } else {
                const demoData = [
                    { id: 1, title: "Admission Open for B.Pharm 2026-27", description: "The online application portal for B.Pharm and D.Pharm courses for the upcoming academic session 2026-27 is now active. Interested candidates are advised to apply within the specified timeline to ensure their seat.", date: "2026-03-08T10:00:00.000Z", category: "Admission" },
                    { id: 2, title: "Semester Exam Schedule Announced", description: "The even semester examinations for B.Pharm 2nd and 4th years will commence from 15th April. Students can download the detailed timetable from the student portal.", date: "2026-03-05T09:30:00.000Z", category: "Examination" },
                    { id: 3, title: "National Pharmacy Workshop", description: "A two-day workshop on 'Modern Drug Discovery' will be held on 20-21 March 2026. This workshop is mandatory for all final year students.", date: "2026-03-02T14:45:00.000Z", category: "Events" }
                ];
                setNotices(demoData);
                setFilteredNotices(demoData);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching notices:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (activeTab === 'All') {
            setFilteredNotices(notices);
        } else {
            setFilteredNotices(notices.filter(n => n.category === activeTab));
        }
    }, [activeTab, notices]);

    // Pointer hand icon component
    const PointerHand = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-primary flex-shrink-0 animate-pulse">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-4h2v4zm0-6h-2V8h2v2z" opacity=".3" />
            <path d="M13 14h-2v-4h2v4zm0-6h-2V8h2v2zM21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
    );

    return (
        <div className="pt-32 pb-24 min-h-screen bg-[#f8fafc]">
            <SEO
                title="Official Notice Board"
                description="Stay updated with the latest academic notices, exam schedules, and admission alerts from Ayush Institute of Medical Sciences (AIMS) Bhubaneswar."
                url="/notices"
            />
            {/* Professional Header Section */}
            <section className="relative pt-48 pb-20 bg-dark overflow-hidden mb-16">
                <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full scale-150 -translate-x-1/2 -translate-y-1/2" />
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-3xl"
                    >
                        <div>
                            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] bg-primary/10 px-4 py-2 rounded-full mb-4 inline-block border border-primary/20">
                                Updates & Announcements
                            </span>
                            <h1 className="text-5xl lg:text-7xl font-black text-white mb-0 tracking-tight leading-none uppercase">
                                AIMS <span className="text-primary">Notice</span> Board
                            </h1>
                        </div>
                        <p className="text-gray-400 text-xl font-medium leading-relaxed">
                            Complete repository of all official communications, academic notifications, and upcoming event details for AIMS Bhubaneswar.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4">
                {/* News Marquee Filter Bar */}
                <div className="bg-white p-4 rounded-[32px] shadow-2xl shadow-dark/5 border border-gray-100 flex flex-wrap items-center justify-between gap-6 mb-16">
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-2xl overflow-x-auto no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all ${activeTab === cat
                                    ? 'bg-primary text-white shadow-xl shadow-primary/30'
                                    : 'text-gray-400 hover:text-dark hover:bg-gray-100'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 bg-gray-50 px-6 py-2.5 rounded-2xl border border-gray-100 focus-within:border-primary transition-all">
                        <Search size={18} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search notices..."
                            className="bg-transparent border-none outline-none text-sm font-bold text-dark w-full lg:w-48 placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Main Notices List */}
                    <div className="lg:col-span-3 space-y-8">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-32">
                                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
                                <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">Updating Board...</p>
                            </div>
                        ) : filteredNotices.length > 0 ? (
                            <AnimatePresence mode="wait">
                                <motion.div className="space-y-8">
                                    {filteredNotices.map((notice, idx) => (
                                        <motion.div
                                            key={notice.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="group bg-white p-10 rounded-[48px] shadow-sm border border-gray-100 hover:shadow-2xl hover:border-primary/10 transition-all duration-500 relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 p-8">
                                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-primary/10 group-hover:text-primary transition-all rotate-45 group-hover:rotate-0">
                                                    <ArrowUpRight size={24} />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="px-4 py-1.5 rounded-xl bg-accent text-primary text-[10px] font-black uppercase tracking-widest">
                                                        {notice.category || 'Academic'}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                                        <Calendar size={14} className="text-primary" />
                                                        {new Date(notice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </div>
                                                </div>

                                                <div className="flex gap-6 items-start">
                                                    <div className="mt-1">
                                                        <PointerHand />
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h3 className="text-2xl font-black text-dark group-hover:text-primary transition-colors mb-4 pr-12">
                                                            {notice.title}
                                                        </h3>
                                                        <p className="text-gray-500 leading-relaxed font-medium">
                                                            {notice.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white p-24 rounded-[48px] text-center border-4 border-dashed border-gray-100"
                            >
                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <Bell size={40} className="text-gray-200" />
                                </div>
                                <h3 className="text-2xl font-black text-dark mb-2">No Notices Found</h3>
                                <p className="text-gray-400 font-medium">Try changing the category or check back later for updates.</p>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-10">
                        <div className="bg-white p-10 rounded-[48px] shadow-2xl shadow-dark/5 border border-gray-100">
                            <h3 className="text-xl font-black mb-10 flex items-center gap-3">
                                <div className="w-2 h-8 bg-primary rounded-full" /> Important Contacts
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Office</p>
                                        <p className="text-sm font-bold text-dark">+91 94370 90875</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Email</p>
                                        <p className="text-sm font-bold text-dark underline">aimsbbsr@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-dark p-10 rounded-[48px] text-white relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                            <h3 className="text-2xl font-black mb-6 relative z-10">Administrative Support</h3>
                            <p className="text-gray-500 font-medium text-sm mb-10 relative z-10 leading-relaxed">
                                For any departmental queries or official document requests, contact our admin desk.
                            </p>
                            <button className="bg-primary hover:bg-white hover:text-dark w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] relative z-10 transition-all shadow-xl shadow-primary/20">
                                Contact Now
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default NoticeBoard;
