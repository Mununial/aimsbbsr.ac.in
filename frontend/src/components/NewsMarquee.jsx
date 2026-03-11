import { useState, useEffect } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';

const NewsMarquee = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/notices`);
                setNotices(res.data);
            } catch (err) {
                console.error("Error fetching notices:", err);
                setNotices([
                    { title: "Admission Open for B.Pharm 2026-27" },
                    { title: "Semester Exam Schedule Announced" },
                    { title: "National Pharmacy Workshop on 20th March" },
                    { title: "New Research Lab Inaugurated by Principal Dr Bn biswal" }
                ]);
            }
        };
        fetchNotices();
    }, []);

    if (notices.length === 0) return null;

    // Create a longer list to ensure smooth scrolling without gaps
    const displayNotices = notices.length > 0 ? [...notices, ...notices, ...notices] : [];

    return (
        <div className="bg-dark/95 backdrop-blur-md text-white py-3 overflow-hidden flex items-center relative z-40 border-b border-white/10 select-none">
            <div className="bg-primary text-white px-5 py-1.5 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 z-20 whitespace-nowrap ml-6 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-white/10 group overflow-hidden relative">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="relative z-10 flex items-center gap-2">
                    <Sparkles size={12} className="text-white animate-pulse" />
                    Latest Updates
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            <div className="flex-grow overflow-hidden relative">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark to-transparent z-10" />

                <div className="marquee-container flex items-center whitespace-nowrap animate-marquee flex-nowrap min-w-full">
                    <div className="flex items-center gap-16 px-12">
                        {displayNotices.map((n, i) => (
                            <Link
                                key={i}
                                to="/notices"
                                className="flex items-center gap-4 hover:text-primary transition-all duration-300 group/item transform hover:scale-105"
                            >
                                <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover/item:scale-150 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                <span className="text-[13px] font-bold tracking-wide text-gray-200">
                                    {n.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsMarquee;
