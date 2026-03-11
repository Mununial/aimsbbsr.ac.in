import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, GraduationCap } from 'lucide-react';

const AdmissionPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        if (isHomePage) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isHomePage]);

    const closePopup = () => setIsVisible(false);

    if (!isHomePage) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePopup}
                        className="absolute inset-0 bg-dark/80"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-[500px] aspect-[4/5] bg-primary rounded-[50px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/20"
                    >
                        {/* Interactive Background Elements */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-dark opacity-50" />
                        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

                        {/* Close Banner Button */}
                        <button
                            onClick={closePopup}
                            className="absolute top-8 right-8 z-30 bg-white text-dark w-12 h-12 rounded-full flex items-center justify-center font-black shadow-2xl hover:bg-primary hover:text-white transition-all transform hover:rotate-90"
                        >
                            <X size={24} />
                        </button>

                        <div className="relative h-full flex flex-col items-center text-center p-10 justify-between">
                            {/* Poster Header */}
                            <div className="z-10">
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-yellow-400 text-dark px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.3em] mb-6 inline-block shadow-lg"
                                >
                                    New Session 2026-27
                                </motion.div>
                                <motion.h2
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    className="text-white text-6xl font-black tracking-tighter leading-none mb-4"
                                >
                                    ADMISSION <br /> <span className="text-yellow-400">OPEN</span>
                                </motion.h2>
                                <p className="text-white/70 font-bold uppercase tracking-[0.2em] text-xs">Ayush Institute of Medical Sciences</p>
                            </div>

                            {/* Center Visual */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                                <GraduationCap size={400} className="text-white" />
                            </div>

                            {/* Poster Details */}
                            <div className="z-10 w-full bg-white/10 backdrop-blur-md p-8 rounded-[40px] border border-white/10 shadow-inner">
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center text-left">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                                            <span className="text-white font-black text-sm uppercase tracking-widest">B.Pharm Enrollment</span>
                                        </div>
                                        <span className="text-yellow-400 font-bold text-xs uppercase">13th March</span>
                                    </div>
                                    <div className="h-px bg-white/5 w-full" />
                                    <div className="flex justify-between items-center text-left">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                                            <span className="text-white font-black text-sm uppercase tracking-widest">D.Pharm Enrollment</span>
                                        </div>
                                        <span className="text-yellow-400 font-bold text-xs uppercase">18th March</span>
                                    </div>
                                </div>

                                <motion.a
                                    href="/admissions"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white text-dark w-full py-5 rounded-[25px] flex items-center justify-center gap-3 font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:shadow-yellow-400/20 transition-all group"
                                >
                                    Enroll Now <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                </motion.a>
                            </div>

                            <p className="z-10 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                                * Limited Seats | Contact: +91 94370 90875
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AdmissionPopup;
