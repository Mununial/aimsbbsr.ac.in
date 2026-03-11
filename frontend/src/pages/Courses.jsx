import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, Users, ArrowRight,
    FlaskConical, Microscope, ChevronDown, Beaker, ShieldCheck,
    Wallet, ClipboardList, Home, FileText, Info, GraduationCap,
    LayoutDashboard, CheckCircle2
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';

const Courses = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [expandedBranch, setExpandedBranch] = useState(null);

    // Sync selectedCourse with URL search params
    useEffect(() => {
        const type = searchParams.get('type');
        if (type && (type === 'BPHARM' || type === 'DPHARM')) {
            setSelectedCourse(type);
        } else {
            setSelectedCourse(null);
        }
    }, [searchParams]);

    const selectCourse = (type) => {
        if (type) {
            setSearchParams({ type });
            setSelectedCourse(type);
        } else {
            setSearchParams({});
            setSelectedCourse(null);
        }
        setExpandedBranch(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const courseData = {
        BPHARM: {
            title: "Bachelor of Pharmacy",
            id: "B.Pharm",
            icon: FlaskConical,
            tagline: "4 Years Comprehensive Degree Program",
            duration: "4 Years (8 Semesters)",
            intake: "100 Seats",
            fees: "₹95,000 / Year",
            eligibility: "10+2 with PCB/PCM (Min 50%)",
            hostel: "Premium Separate Hostels with WiFi",
            documents: ["10th & 12th Marksheet", "CLC / Migration", "Conduct Certificate", "Passport Photos"],
            branches: [
                {
                    name: "Department of Pharmaceutics",
                    desc: "Mastering the art of dosage form design and manufacturing.",
                    details: {
                        labs: ["Advanced Formulation Lab", "Industrial Pharmacy Unit", "Machine Room"],
                        subjects: ["Physical Pharmaceutics", "Novel Drug Delivery", "Quality Assurance"],
                        hiring: ["Sun Pharma", "Cipla", "Dr. Reddy's", "Lupin"]
                    }
                },
                {
                    name: "Department of Pharmacology",
                    desc: "Scientific study of drug action on biological systems.",
                    details: {
                        labs: ["Approved Animal House", "Ex-Pharma Lab", "Clinical Pharmacology"],
                        subjects: ["Anatomy & Physiology", "Pathophysiology", "Clinical Pharmacy"],
                        hiring: ["Research Centers", "Hospitals", "Pharmacovigilance Units"]
                    }
                },
                {
                    name: "Pharmaceutical Chemistry",
                    desc: "Synthesis, design and analysis of life-saving medicines.",
                    details: {
                        labs: ["Modern Synthesis Lab", "Central Instrumental Lab", "Analytical Lab"],
                        subjects: ["Medicinal Chemistry", "Biochemistry", "Organic Chemistry"],
                        hiring: ["Drug Discovery Units", "Chemical Industries", "Testing Labs"]
                    }
                }
            ]
        },
        DPHARM: {
            title: "Diploma in Pharmacy",
            id: "D.Pharm",
            icon: Microscope,
            tagline: "2 Years Fundamental Diploma Course",
            duration: "2 Years (Annual System)",
            intake: "60 Seats",
            fees: "₹75,000 / Year",
            eligibility: "10+2 Pass with Science Stream",
            hostel: "Standard Shared & Single Rooms Available",
            documents: ["10th & 12th Boards Certificate", "School Leaving Certificate", "Aadhar Card Copies"],
            branches: [
                {
                    name: "Pharmacy Practice & Retail",
                    desc: "Community pharmacy operations and hospital management.",
                    details: {
                        labs: ["Model Pharmacy Store", "Patient Counseling Area"],
                        subjects: ["Drug Store Management", "Community Pharmacy", "Jurisprudence"],
                        hiring: ["Retail Chains (Apollo)", "Govt. Hospitals", "Wholesale Units"]
                    }
                },
                {
                    name: "Pharmacognosy & Herbal Tech",
                    desc: "Exploring therapeutic properties of natural/herbal products.",
                    details: {
                        labs: ["Herbal Drug Museum", "Crude Drug Lab", "Botanical Garden"],
                        subjects: ["Herbal Drug Technology", "Plant Physiology", "Phytochemistry"],
                        hiring: ["Ayurvedic Cosmetic Industry", "Natural Product Research", "Himalaya Wellness"]
                    }
                }
            ]
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };
    const currentCourse = selectedCourse ? courseData[selectedCourse] : null;

    return (
        <div className="bg-[#f8fafc] min-h-screen">
            <SEO
                title={selectedCourse ? `Our Courses - ${currentCourse.title}` : "Pharmaceutical Courses We Offer"}
                description="Explore B.Pharm (4 Year) and D.Pharm (2 Year) courses at AIMS Bhubaneswar. PCI approved curriculum with advanced laboratories and industry-focused training."
                url="/courses"
            />
            <AnimatePresence mode="wait">
                {!selectedCourse ? (
                    /* STAGE 1: Full-Screen Selection Gate */
                    <motion.div
                        key="selector"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                        transition={{ duration: 0.8 }}
                        className="min-h-screen flex flex-col items-center justify-center p-6 bg-dark relative overflow-hidden"
                    >
                        {/* Interactive Background Elements */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
                                transition={{ duration: 15, repeat: Infinity }}
                                className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[150px]"
                            />
                            <motion.div
                                animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
                                transition={{ duration: 10, repeat: Infinity }}
                                className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[150px]"
                            />
                        </div>

                        <div className="relative z-10 text-center mb-16 max-w-2xl">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-6 block bg-white/5 px-6 py-2 rounded-full border border-white/10 w-fit mx-auto"
                            >
                                Academic Programs
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-6xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6"
                            >
                                Choose your <br /> <span className="text-primary italic">Expertise</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-gray-400 font-medium text-lg leading-relaxed"
                            >
                                Select a specialization to enter the detailed program dashboard.
                            </motion.p>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full relative z-10"
                        >
                            {Object.keys(courseData).map((key, idx) => {
                                const CourseIcon = courseData[key].icon;
                                return (
                                    <motion.div
                                        key={key}
                                        variants={itemVariants}
                                        whileHover={{ y: -15, scale: 1.02 }}
                                        onClick={() => selectCourse(key)}
                                        className="bg-white/5 backdrop-blur-3xl p-16 rounded-[60px] border border-white/10 cursor-pointer group hover:bg-white transition-all duration-500 shadow-2xl relative overflow-hidden flex flex-col items-center text-center"
                                    >
                                        <div className="w-24 h-24 bg-white/10 rounded-[40px] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-10 shadow-2xl">
                                            <CourseIcon size={44} />
                                        </div>
                                        <h3 className="text-5xl font-black text-white group-hover:text-dark mb-4 tracking-tighter uppercase">{courseData[key].id}</h3>
                                        <p className="text-gray-400 font-black uppercase tracking-widest text-[11px] mb-10 group-hover:text-gray-500">{courseData[key].tagline}</p>
                                        <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                            Enter Dashboard <ArrowRight size={18} />
                                        </div>

                                        {/* Decorative number */}
                                        <span className="absolute bottom-[-20%] right-[-5%] text-[200px] font-black text-white/5 group-hover:text-dark/5 transition-colors leading-none pointer-events-none">
                                            {idx + 1}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                ) : (
                    /* STAGE 2: Detailed Program Dashboard */
                    <motion.div
                        key="details"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="min-h-screen bg-[#fafbfc] pb-40"
                    >
                        {/* Slim Navigation Bar */}
                        <div className="bg-dark pt-40 pb-20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
                            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="text-left">
                                    <button
                                        onClick={() => selectCourse(null)}
                                        className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-4 hover:translate-x-[-4px] transition-transform"
                                    >
                                        <ArrowRight className="rotate-180" size={12} /> Switch Program
                                    </button>
                                    <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none mb-4">
                                        {currentCourse.id} <span className="text-primary italic">Portal</span>
                                    </h2>
                                    <div className="flex gap-10">
                                        <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
                                            <Clock size={14} className="text-primary" /> {currentCourse.duration}
                                        </div>
                                        <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
                                            <Users size={14} className="text-primary" /> {currentCourse.intake} Annual
                                        </div>
                                    </div>
                                </div>

                                {/* Mini Switcher */}
                                <div className="flex bg-white/5 p-2 rounded-3xl border border-white/10 backdrop-blur-xl">
                                    {Object.keys(courseData).map((key) => (
                                        <button
                                            key={key}
                                            onClick={() => selectCourse(key)}
                                            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCourse === key ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                                        >
                                            {courseData[key].id}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="container mx-auto px-6 -mt-10 relative z-20 grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { icon: Wallet, label: "Session Fees", value: currentCourse.fees, color: "text-blue-500" },
                                { icon: ClipboardList, label: "Eligibility", value: currentCourse.eligibility, color: "text-emerald-500" },
                                { icon: Home, label: "Accommodation", value: currentCourse.hostel, color: "text-amber-500" },
                                { icon: FileText, label: "Requirements", value: currentCourse.documents.length + " Essential Docs", color: "text-purple-500" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-8 rounded-[35px] shadow-xl border border-gray-100 flex flex-col gap-4 group hover:border-primary transition-colors cursor-default"
                                >
                                    <div className={`${stat.color} bg-gray-50 w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                                        <stat.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{stat.label}</p>
                                        <p className="text-sm font-black text-dark leading-tight">{stat.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Main Content Sections */}
                        <div className="container mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Departments column */}
                            <div className="lg:col-span-2 space-y-8">
                                <h3 className="text-2xl font-black text-dark tracking-tighter uppercase flex items-center gap-3">
                                    <LayoutDashboard className="text-primary" /> Key Departments
                                </h3>
                                {currentCourse.branches.map((branch, idx) => (
                                    <div key={idx} className="bg-white rounded-[45px] shadow-xl border border-gray-50 overflow-hidden">
                                        <button
                                            onClick={() => setExpandedBranch(expandedBranch === idx ? null : idx)}
                                            className="w-full text-left p-10 flex items-center justify-between group hover:bg-gray-50/30 transition-all"
                                        >
                                            <div className="flex items-center gap-8">
                                                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-all ${expandedBranch === idx ? 'bg-primary text-white shadow-xl' : 'bg-gray-100 text-primary'}`}>
                                                    <Beaker size={26} />
                                                </div>
                                                <div>
                                                    <h4 className="text-2xl font-black text-dark tracking-tight mb-1 group-hover:text-primary transition-colors">{branch.name}</h4>
                                                    <p className="text-gray-400 font-semibold text-sm">{branch.desc}</p>
                                                </div>
                                            </div>
                                            <div className={`p-4 rounded-full transition-all ${expandedBranch === idx ? 'bg-primary text-white rotate-180' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                                                <ChevronDown size={20} />
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {expandedBranch === idx && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="border-t border-gray-100 bg-gray-50/20"
                                                >
                                                    <div className="p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                                                        <div className="space-y-6">
                                                            <h5 className="flex items-center gap-2 text-[10px] font-black text-dark/40 uppercase tracking-widest italic border-b border-dark/10 pb-2">Facility</h5>
                                                            <div className="space-y-3">
                                                                {branch.details.labs.map((lab, i) => (
                                                                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {lab}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="space-y-6">
                                                            <h5 className="flex items-center gap-2 text-[10px] font-black text-dark/40 uppercase tracking-widest italic border-b border-dark/10 pb-2">Learning</h5>
                                                            <div className="space-y-3">
                                                                {branch.details.subjects.map((sub, i) => (
                                                                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                                                                        <ShieldCheck size={14} className="text-primary" /> {sub}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="space-y-6">
                                                            <h5 className="flex items-center gap-2 text-[10px] font-black text-dark/40 uppercase tracking-widest italic border-b border-dark/10 pb-2">Careers</h5>
                                                            <div className="flex flex-wrap gap-2">
                                                                {branch.details.hiring.map((corp, i) => (
                                                                    <span key={i} className="bg-white px-4 py-2 rounded-xl text-[10px] font-black border border-gray-100 uppercase tracking-widest text-primary shadow-sm hover:scale-110 transition-transform cursor-default">
                                                                        {corp}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>

                            {/* Requirements / Checklist Column */}
                            <div className="space-y-10">
                                <div className="bg-dark p-12 rounded-[55px] text-white relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                                    <h4 className="flex items-center gap-3 text-lg font-black uppercase tracking-tighter mb-10 relative z-10">
                                        <Info className="text-primary" /> Admission Papers
                                    </h4>
                                    <ul className="space-y-5 relative z-10">
                                        {currentCourse.documents.map((doc, i) => (
                                            <li key={i} className="flex items-center gap-4 text-sm font-semibold text-white/60">
                                                <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-primary border border-white/5">
                                                    <CheckCircle2 size={14} />
                                                </div>
                                                {doc}
                                            </li>
                                        ))}
                                    </ul>
                                    <a href="/admissions" className="mt-12 w-full bg-primary py-5 rounded-3xl font-black text-xs uppercase tracking-widest text-center hover:bg-white hover:text-primary transition-all inline-block relative z-10 shadow-2xl shadow-primary/20">
                                        Get Admission Now
                                    </a>
                                </div>

                                <div className="p-10 bg-white rounded-[50px] border border-gray-100 shadow-xl overflow-hidden relative">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-dark mb-6">Course USP</h4>
                                    <p className="text-gray-400 font-semibold text-sm leading-relaxed mb-6">
                                        Approved by Pharmacy Council of India (PCI). Structured industrial visits and clinical training included in terminal semesters.
                                    </p>
                                    <div className="flex items-center gap-4 px-6 py-4 bg-gray-50 rounded-3xl">
                                        <GraduationCap size={24} className="text-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-dark opacity-40">Placement Assured</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Courses;
