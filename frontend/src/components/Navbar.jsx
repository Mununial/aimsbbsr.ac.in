import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

import aimsLogo from '../assets/aims_logo.png';
import NewsMarquee from './NewsMarquee';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        {
            name: 'About',
            path: '/about',
            dropdown: [
                { name: 'Our Vision & Mission', path: '/about' },
                { name: 'Principal\'s Message', path: '/about' },
                { name: 'Governance & Board', path: '/about' },
                { name: 'Quality Policy', path: '/about' },
                { name: 'Infrastructure Overview', path: '/laboratories' },
            ]
        },
        {
            name: 'Courses',
            path: '/courses',
            dropdown: [
                { name: 'Bachelor of Pharmacy (B.Pharm)', path: '/courses?type=BPHARM' },
                { name: 'Diploma in Pharmacy (D.Pharm)', path: '/courses?type=DPHARM' },
                { name: 'M.Pharm (Coming Soon)', path: '/courses' },
                { name: 'Admission Eligibility', path: '/admissions' },
                { name: 'Fee Structure', path: '/courses' },
            ]
        },
        {
            name: 'Campus Life',
            path: '/laboratories',
            dropdown: [
                { name: 'Advanced Laboratories', path: '/laboratories' },
                { name: 'Digital Library', path: '/laboratories' },
                { name: 'Medicinal Garden', path: '/gallery' },
                { name: 'Hostel & Mess', path: '/about' },
                { name: 'Computer Center', path: '/laboratories' },
                { name: 'Sports & Cultural', path: '/gallery' },
            ]
        },
        {
            name: 'Placement',
            path: '/courses',
            dropdown: [
                { name: 'Placement Cell', path: '/courses' },
                { name: 'Our Recruiters', path: '/courses' },
                { name: 'Internship Program', path: '/courses' },
                { name: 'Alumni Network', path: '/gallery' },
            ]
        },
        { name: 'Faculty', path: '/faculty' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ];

    const [expandedMenu, setExpandedMenu] = useState(null);
    const isHomePage = location.pathname === '/';
    const isActive = (path) => location.pathname === path;

    const toggleMenu = (name) => {
        setExpandedMenu(expandedMenu === name ? null : name);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-[100]">
            {/* Top Contact Bar & News Bar - Only at the top */}
            <AnimatePresence>
                {!isScrolled && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="relative z-40"
                    >
                        {/* Contact Info Bar - Only on Home */}
                        {isHomePage && (
                            <div className="bg-primary/10 backdrop-blur-md border-b border-white/5 py-2 hidden md:block">
                                <div className="container mx-auto px-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                    <div className="flex gap-8">
                                        <a href="tel:+919437090875" className={`flex items-center gap-2 transition-all ${isHomePage ? 'text-white/80 hover:text-white' : 'text-gray-500 hover:text-primary'}`}>
                                            <Phone size={12} /> +91 94370 90875
                                        </a>
                                        <a href="mailto:aimsbbsr2627@gmail.com" className={`flex items-center gap-2 transition-all ${isHomePage ? 'text-white/80 hover:text-white' : 'text-gray-500 hover:text-primary'}`}>
                                            <Mail size={12} /> aimsbbsr2627@gmail.com
                                        </a>
                                    </div>
                                    <div className={`flex gap-6 ${isHomePage ? 'text-white/60' : 'text-gray-400'}`}>
                                        <span className="flex items-center gap-2"><MapPin size={12} /> Bhubaneswar, Odisha</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* News Ticker */}
                        <div className="bg-dark">
                            <NewsMarquee />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Navbar */}
            <nav className={`transition-all duration-500 border-b ${isScrolled || !isHomePage
                ? 'bg-white border-gray-100 shadow-xl py-2'
                : 'bg-transparent border-transparent py-4'
                }`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-1.5 shadow-xl border border-primary/10 group-hover:scale-110 transition-all">
                            <img src={aimsLogo} alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex flex-col text-left">
                            <h1 className={`font-black tracking-tighter text-xl leading-none ${isScrolled || !isHomePage ? 'text-dark' : 'text-white'}`}>
                                AYUSH <span className="text-primary uppercase">Institute</span>
                            </h1>
                            <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${isScrolled || !isHomePage ? 'text-gray-400' : 'text-white/60'}`}>Bhubaneswar</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group/nav py-4">
                                <Link
                                    to={link.path}
                                    className={`text-[11px] font-black uppercase tracking-widest px-4 py-2 transition-all relative ${isScrolled || !isHomePage
                                        ? isActive(link.path) ? 'text-primary' : 'text-dark hover:text-primary'
                                        : isActive(link.path) ? 'text-white' : 'text-white/80 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                </Link>

                                {link.dropdown && (
                                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 transform translate-y-2 group-hover/nav:translate-y-0 z-[110]">
                                        <div className="bg-dark/95 backdrop-blur-2xl shadow-2xl min-w-[240px] py-4 rounded-2xl border border-white/10">
                                            {link.dropdown.map((sub, i) => (
                                                <Link
                                                    key={i}
                                                    to={sub.path}
                                                    className="block px-8 py-3 text-[11px] font-black text-white/70 hover:text-white hover:bg-primary/20 transition-all border-b border-white/5 last:border-0 uppercase tracking-widest"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <Link to="/admissions" className="ml-4 bg-primary hover:bg-dark text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 transform hover:-translate-y-1">
                            Apply Now
                        </Link>
                    </div>

                    <button
                        className={`lg:hidden p-3 rounded-2xl transition-colors ${isScrolled || !isHomePage ? 'bg-gray-100 text-dark' : 'bg-white/10 text-white'}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-[110] lg:hidden"
                        />
                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 w-[85%] max-w-[360px] h-full bg-white z-[120] lg:hidden shadow-[-20px_0_50px_rgba(0,0,0,0.2)] flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    <img src={aimsLogo} alt="Logo" className="w-8 h-8 object-contain" />
                                    <span className="font-black text-xs uppercase tracking-tighter">Menu</span>
                                </div>
                                <button
                                    className="p-2 hover:bg-gray-200 rounded-xl text-dark transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                {/* Mobile News Ticker */}
                                <div className="border-b border-gray-100">
                                    <NewsMarquee />
                                </div>

                                <div className="px-6 py-8">
                                    <div className="space-y-2">
                                        {navLinks.map((link) => (
                                            <div key={link.name} className="flex flex-col">
                                                <div
                                                    className="flex items-center justify-between group cursor-pointer"
                                                    onClick={() => link.dropdown ? toggleMenu(link.name) : setIsOpen(false)}
                                                >
                                                    {link.dropdown ? (
                                                        <span className={`py-4 text-lg font-black uppercase tracking-tighter transition-colors flex-grow ${expandedMenu === link.name ? 'text-primary' : 'text-dark hover:text-primary'}`}>
                                                            {link.name}
                                                        </span>
                                                    ) : (
                                                        <Link
                                                            to={link.path}
                                                            onClick={() => setIsOpen(false)}
                                                            className={`py-4 text-lg font-black uppercase tracking-tighter transition-colors flex-grow ${isActive(link.path) ? 'text-primary' : 'text-dark hover:text-primary'}`}
                                                        >
                                                            {link.name}
                                                        </Link>
                                                    )}

                                                    {link.dropdown && (
                                                        <motion.span
                                                            animate={{ rotate: expandedMenu === link.name ? 90 : 0 }}
                                                            className={`p-4 ${expandedMenu === link.name ? 'text-primary' : 'text-gray-300'}`}
                                                        >
                                                            <ChevronRight size={16} />
                                                        </motion.span>
                                                    )}
                                                </div>

                                                {link.dropdown && (
                                                    <AnimatePresence>
                                                        {expandedMenu === link.name && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-hidden mb-4 ml-2 space-y-1 bg-gray-50/80 p-3 rounded-2xl border border-gray-100"
                                                            >
                                                                {link.dropdown.map((sub, i) => (
                                                                    <Link
                                                                        key={i}
                                                                        to={sub.path}
                                                                        onClick={() => setIsOpen(false)}
                                                                        className="block py-3 text-[10px] font-black text-gray-400 hover:text-primary transition-all tracking-widest uppercase border-b border-gray-100 last:border-0"
                                                                    >
                                                                        {sub.name}
                                                                    </Link>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                )}
                                            </div>
                                        ))}
                                    </div>


                                    <div className="mt-10 pt-8 border-t border-gray-100 space-y-6">
                                        <a href="tel:+919437090875" className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                                <Phone size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Support Line</p>
                                                <p className="text-xs font-black text-dark">+91 94370 90875</p>
                                            </div>
                                        </a>
                                        <Link
                                            to="/admissions"
                                            onClick={() => setIsOpen(false)}
                                            className="block bg-primary hover:bg-dark text-white text-center py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all"
                                        >
                                            Enroll Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>


    );
};

export default Navbar;
