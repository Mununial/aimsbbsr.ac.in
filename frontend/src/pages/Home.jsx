import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, GraduationCap, Building2, Beaker, Users, CheckCircle, Bell, Loader2, UserCircle2, Sparkles, BookOpen, Microscope, BookCheck, Telescope, ShieldCheck } from 'lucide-react';
import NewsMarquee from '../components/NewsMarquee';
import SEO from '../components/SEO';

// Assets
import campusHero from '../assets/real_campus1.jpg';
import labStudents from '../assets/real_lab.jpg';
import classroomTeaching from '../assets/real_classroom.jpg';
import realCampus2 from '../assets/real_campus2.jpg';
import realReception from '../assets/real_reception.jpg';
import realEntrance from '../assets/real_entrance.jpg';
import realLabInterior from '../assets/real_lab_interior.jpg';
import realCampusView from '../assets/real_campus_view.jpg';
import chairmanPhoto from '../assets/chairman.jpg';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [heroSlides, setHeroSlides] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    const defaultSlides = [
        { image: campusHero, title: "Ayush Institute of Medical Sciences (AIMS)", subtitle: "Excellence in Pharmaceutical Education", desc: "Admissions Open for B.Pharm & D.Pharm 2026-27", type: 'image' },
        { image: realCampus2, title: "Our Campus — Bhubaneswar", subtitle: "Modern Infrastructure", desc: "A dedicated campus built for the future of pharmacy education", type: 'image' },
        { image: labStudents, title: "Advanced Pharmaceutical Labs", subtitle: "Hands-on Practical Training", desc: "Equipped with state-of-the-art research instrumentation", type: 'image' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [heroRes, facRes, noticeRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/hero`),
                    axios.get(`${API_BASE_URL}/api/faculty`),
                    axios.get(`${API_BASE_URL}/api/notices`)
                ]);

                setHeroSlides(heroRes.data.length > 0 ? heroRes.data.map(s => ({
                    image: `${API_BASE_URL}/${s.image_url}`,
                    title: s.title,
                    subtitle: s.subtitle,
                    desc: s.description,
                    type: s.media_type || 'image'
                })) : defaultSlides);

                setFaculty(facRes.data.slice(0, 4));
                setNotices(noticeRes.data.slice(0, 3));
            } catch (err) {
                console.error("Error fetching homepage data", err);
                setHeroSlides(defaultSlides);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (heroSlides.length === 0) return;

        // If current slide is a video, it will handle its own transition via onEnded
        if (heroSlides[currentSlide]?.type === 'video') return;

        const timer = setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => clearTimeout(timer);
    }, [currentSlide, heroSlides]);

    const stats = [
        { label: "Students Enrolled", count: "500+", icon: Users },
        { label: "Experienced Faculty", count: "25+", icon: GraduationCap },
        { label: "Laboratories", count: "10+", icon: Beaker },
        { label: "Courses Offered", count: "2", icon: CheckCircle }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.9 },
        show: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const slideInLeft = {
        hidden: { opacity: 0, x: -100 },
        show: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const slideInRight = {
        hidden: { opacity: 0, x: 100 },
        show: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-dark">
                <Loader2 className="animate-spin text-primary mb-4" size={64} />
                <p className="text-white font-black uppercase tracking-[0.4em] text-xs">AIMS Bhubaneswar</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-hidden">
            <SEO
                title="Excellence in Pharmaceutical Education"
                description="Welcome to Ayush Institute of Medical Sciences (AIMS) Bhubaneswar. We offer top-tier B.Pharm and D.Pharm courses with state-of-the-art labs and verified 100% placement support."
                url="/"
            />
            {/* HERO SECTION */}
            <section className="relative h-[70vh] sm:h-[80vh] md:h-screen w-full flex flex-col overflow-hidden bg-dark">
                {/* Visual Media Layer */}
                <div className="absolute inset-0 z-0">
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="absolute inset-0 w-full h-full will-change-transform"
                        >
                            {heroSlides[currentSlide]?.type === 'video' ? (
                                <video
                                    src={heroSlides[currentSlide]?.image}
                                    className="w-full h-full object-cover object-center"
                                    autoPlay muted playsInline preload="auto"
                                    onEnded={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                                />
                            ) : (
                                <div
                                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                                    style={{ backgroundImage: `url(${heroSlides[currentSlide]?.image})` }}
                                />
                            )}
                            {/* Persistent Overlays - Lightweight and effective */}
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/40 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent md:via-transparent md:from-dark/60" />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Content Layer */}
                <div className="relative z-10 flex-grow flex items-center pt-16 md:pt-24 pb-10">
                    <div className="container mx-auto px-6 md:px-12">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, ease: "circOut" }}
                                className="max-w-3xl"
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="flex items-center gap-2 md:gap-3 mb-3 md:mb-5"
                                >
                                    <div className="h-0.5 w-8 md:w-12 bg-primary rounded-full" />
                                    <span className="text-primary font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-[9px] md:text-xs">
                                        {heroSlides[currentSlide]?.subtitle}
                                    </span>
                                </motion.div>

                                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-[1] md:leading-[0.9] drop-shadow-2xl">
                                    {heroSlides[currentSlide]?.title}
                                </h1>

                                <p className="text-[13px] md:text-lg text-gray-300 mb-8 md:mb-10 max-w-xl font-medium leading-relaxed opacity-90 border-l-2 border-white/10 pl-4 md:pl-6 line-clamp-3 md:line-clamp-none">
                                    {heroSlides[currentSlide]?.desc}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-8 md:mt-10">
                                    <Link to="/courses" className="bg-primary hover:bg-blue-600 text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-black transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_20px_40px_-10px_rgba(59,130,246,0.3)] uppercase text-[9px] md:text-xs tracking-[0.2em]">
                                        Explore Courses <ArrowRight size={14} className="md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                    <Link to="/admissions" className="glass text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-black transition-all hover:bg-white/10 flex items-center justify-center uppercase text-[9px] md:text-xs tracking-[0.2em] group">
                                        Apply Now <ChevronRight size={14} className="md:w-4 md:h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Slider Indicators */}
                <div className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4 z-20">
                    <div className="flex gap-2">
                        {heroSlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-1.5 rounded-full transition-all duration-700 ${currentSlide === idx ? 'bg-primary w-12' : 'bg-white/20 w-4 hover:bg-white/40'}`}
                            />
                        ))}
                    </div>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] font-mono">
                        {String(currentSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
                    </span>
                </div>
            </section>

            {/* NEWS TICKER (REDUCED HEIGHT) */}
            <div className="bg-primary py-2 relative overflow-hidden z-20 border-y border-white/5 shadow-2xl">
                <div className="flex items-center gap-12 whitespace-nowrap animate-marquee relative z-10 text-white font-black uppercase tracking-[0.2em] text-[9px]">
                    {[1, 2, 3].map(i => (
                        <span key={i} className="flex items-center gap-8">
                            <span>Admissions Open 2026-27</span>
                            <span className="opacity-40">•</span>
                            <span>PCI Approved Institute</span>
                            <span className="opacity-40">•</span>
                            <span>B.Pharm & D.Pharm Courses</span>
                            <span className="opacity-40">•</span>
                            <span>100% Placement Support</span>
                            <span className="opacity-40">•</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* SECTION 1 — ABOUT THE INSTITUTE */}
            <section className="py-32 relative overflow-hidden bg-white">
                <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-20">
                    <motion.div
                        variants={slideInLeft}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="lg:w-1/2 space-y-12"
                    >
                        <div>
                            <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px] bg-primary/5 px-6 py-2 rounded-full border border-primary/10">The Institution</span>
                            <h2 className="text-4xl md:text-6xl font-black mt-8 mb-10 tracking-tighter leading-[0.9] uppercase italic">
                                Redefining <span className="text-primary">Pharmacy</span> <br /> Education.
                            </h2>
                            <p className="text-gray-500 font-semibold text-lg leading-relaxed max-w-xl">
                                Ayush Institute of Medical Sciences (AIMS Bhubaneswar) is at the forefront of pharmaceutical innovation. Since our founding, we have been committed to providing an exceptional learning environment that bridges the gap between academic theory and real-world clinical application.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-12 gap-y-12">
                            {[
                                { title: "Research Excellence", desc: "16+ Innovation Labs", icon: Telescope },
                                { title: "Global Curriculum", desc: "PCI & BPUT Standard", icon: GraduationCap },
                                { title: "Career Catalyst", desc: "100% Placement Reach", icon: Sparkles },
                                { title: "Elite Faculty", desc: "PhD Grade Mentors", icon: ShieldCheck }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 10, scale: 1.02 }}
                                    className="flex items-center gap-5 group cursor-default"
                                >
                                    <div className="bg-primary/10 p-2.5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-lg shadow-primary/5">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-xs uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    <div className="lg:w-1/2 relative w-full">
                        <motion.div
                            variants={scaleIn}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="relative z-10 p-4 bg-white rounded-[50px] shadow-2xl border border-gray-100"
                        >
                            <img src={realReception} className="w-full h-[450px] md:h-[600px] object-cover rounded-[36px]" alt="AIMS Bhubaneswar Campus" />
                        </motion.div>
                        {/* Decorative background circle */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />
                    </div>
                </div>
            </section>

            {/* SECTION 2 — MESSAGE FROM THE CHAIRMAN */}
            <section className="py-32 bg-dark relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full" />
                <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-1/3">
                        <motion.div
                            variants={slideInLeft}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="relative w-80 h-80 md:w-96 md:h-96 rounded-[60px] overflow-hidden border-8 border-white/5 shadow-2xl group"
                        >
                            <img src={chairmanPhoto} className="w-full h-full object-cover grayscale-0 group-hover:scale-110 transition-transform duration-700" alt="Chairman, Alok Ranjan Mallick" />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                        </motion.div>
                    </div>
                    <motion.div
                        variants={slideInRight}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="lg:w-2/3"
                    >
                        <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Leadership Speaks</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-4 mb-10 tracking-tighter leading-tight uppercase italic">
                            Message from the <span className="text-primary">Chairman</span>
                        </h2>
                        <div className="space-y-8">
                            <blockquote className="text-xl md:text-3xl font-medium tracking-tight text-white/90 leading-snug">
                                "At Ayush Institute of Medical Sciences, our vision is to create a powerhouse of pharmaceutical knowledge that transcends traditional boundaries. We are committed to providing an ecosystem where students are challenged to think critically and act ethically."
                            </blockquote>
                            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl font-medium border-l-2 border-primary/20 pl-6 italic">
                                "Academic excellence is our baseline, but student success in life is our ultimate metric. We continuously invest in our infrastructure and faculty to provide a world-class educational experience right here in Bhubaneswar."
                            </p>
                            <div className="pt-6">
                                <h4 className="text-xl font-black tracking-widest uppercase">Shri. Alok Ranjan Mallick</h4>
                                <p className="text-primary font-black text-xs uppercase tracking-[0.3em] mt-2">Chairman, Ayush Group of Institutions</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 3 — COURSES OFFERED */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Academic Programs</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-2 tracking-tighter uppercase">Unlock Your <span className="text-primary italic">Career</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                        {[
                            {
                                title: "Bachelor of Pharmacy (B.Pharm)",
                                duration: "4 Years (8 Semesters)",
                                desc: "A comprehensive undergraduate program covering drug orientation, medicinal chemistry, and clinical pharmacy.",
                                career: "Drug Inspector, QC Manager, Research Associate",
                                icon: GraduationCap
                            },
                            {
                                title: "Diploma in Pharmacy (D.Pharm)",
                                duration: "2 Years (Annual System)",
                                desc: "A foundational program focused on the practical aspects of pharmaceutical science and community pharmacy.",
                                career: "Retail Pharmacist, Lab Assistant, Sales Executive",
                                icon: BookOpen
                            }
                        ].map((course, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="bg-white p-10 rounded-[40px] shadow-2xl shadow-dark/5 border border-gray-100 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                                        <course.icon size={32} />
                                    </div>
                                    <h3 className="text-2xl font-black mb-4 tracking-tight leading-none uppercase">{course.title}</h3>
                                    <div className="inline-block bg-accent px-4 py-1.5 rounded-full text-primary font-black text-[10px] uppercase tracking-widest mb-6">
                                        Duration: {course.duration}
                                    </div>
                                    <p className="text-gray-500 text-sm font-semibold mb-8 italic">{course.desc}</p>
                                    <div className="border-t border-gray-100 pt-6">
                                        <h5 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3 text-left">Career Opportunities:</h5>
                                        <p className="text-dark font-bold text-xs">{course.career}</p>
                                    </div>
                                </div>
                                <Link to="/admissions" className="mt-10 flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest hover:gap-4 transition-all">
                                    Learn More & Apply <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4 — DEPARTMENTS */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Thematic Pillars</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-2 tracking-tighter uppercase">Academic <span className="text-primary italic">Departments</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Pharmaceutics", desc: "Focused on the art and science of formulating and manufacturing medicines.", icon: Molecule },
                            { name: "Pharmaceutical Chemistry", desc: "Exploring the chemical design and synthesis of therapeutic agents.", icon: Beaker },
                            { name: "Pharmacology", desc: "Studying the action of drugs on biological systems and clinical efficacy.", icon: Microscope },
                            { name: "Pharmacognosy", desc: "The study of medicines derived from natural sources and plants.", icon: Telescope },
                            { name: "Pharmacy Practice", desc: "Developing clinical skills for community and hospital healthcare.", icon: ShieldCheck }
                        ].map((dept, i) => (
                            <div key={i} className="p-8 rounded-[36px] bg-gray-50 border border-gray-100 hover:border-primary transition-all group">
                                <h4 className="text-xl font-black mb-4 tracking-tight text-dark uppercase">{dept.name}</h4>
                                <p className="text-gray-400 text-sm font-semibold leading-relaxed mb-6 group-hover:text-gray-500 transition-colors">{dept.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 5 — LABORATORIES */}
            <section className="py-24 bg-dark text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Modern Infrastructure</span>
                        <h2 className="text-4xl md:text-5xl font-black mt-2 mb-8 tracking-tighter uppercase leading-none">High-Precision <span className="text-primary italic">Research</span> Facilities</h2>
                        <div className="space-y-8">
                            {[
                                { name: "Pharmaceutics Lab", desc: "Tablet punching and dissolution apparatus for dosage design.", icon: Beaker },
                                { name: "Pharmacology Lab", desc: "Digital monitors for physiological drug reaction studies.", icon: Microscope },
                                { name: "QC/Chemistry Lab", desc: "High-precision analysis with HPLC and spectrophotometers.", icon: CheckCircle },
                                { name: "Computer Lab", desc: "Enterprise-grade simulation and research network.", icon: Building2 }
                            ].map((lab, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-primary">
                                        <lab.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-black tracking-widest uppercase">{lab.name}</h4>
                                        <p className="text-white/40 text-xs font-medium uppercase tracking-widest mt-1">{lab.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full" />
                        <img src={realLabInterior} className="relative z-10 w-full rounded-[48px] shadow-2xl border border-white/5" alt="AIMS Laboratory" />
                    </div>
                </div>
            </section>

            {/* SECTION 7 — CAMPUS FACILITIES & STUDENT LIFE */}
            <section className="py-32 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-16 lg:gap-32">
                        <div className="md:w-1/2">
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Campus Life</span>
                            <h2 className="text-4xl lg:text-5xl font-black mt-2 mb-8 tracking-tighter uppercase leading-none">A Vibrant <span className="text-primary italic">Learning</span> Ecosystem</h2>
                            <p className="text-gray-500 font-semibold mb-8 leading-relaxed italic">
                                Ayush Institute provides more than just classrooms; we offer a thriving culture where students grow as individuals. From hygienic canteen service to interactive e-libraries, every corner of our campus is built for collaboration.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { title: "Smart Classrooms", sub: "Interactive learning with smart boards" },
                                    { title: "Digital Library", sub: "5000+ volumes and high-speed E-zone" },
                                    { title: "Campus Canteen", sub: "Nutritious and hygienic food and menu" },
                                    { title: "Safe Green Zones", sub: "Student-friendly collaborative spaces" }
                                ].map((f, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <div>
                                            <h4 className="font-black text-xs uppercase tracking-tight text-dark">{f.title}</h4>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{f.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:w-1/2 relative bg-gray-50 rounded-[60px] p-12 overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full" />
                            <h3 className="text-3xl font-black tracking-tighter uppercase mb-6 group-hover:text-primary transition-colors">Career Development</h3>
                            <p className="text-gray-500 text-sm font-semibold mb-10 leading-relaxed">
                                Our industry linkages with global giants like Cipla and Sun Pharma ensure that students get real-world exposure while finishing their degrees.
                            </p>
                            <Link to="/courses" className="bg-dark text-white hover:bg-primary px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Download Brochure</Link>
                            <div className="mt-20">
                                <img src={campusHero} className="w-full rounded-[40px] shadow-2xl" alt="Students" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 10 — NOTICE BOARD (AUTO HOVER) */}
            <section className="py-24 bg-[#fcfdfe] relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <span className="bg-red-50 text-red-600 font-black uppercase text-[10px] px-4 py-2 rounded-full mb-6 inline-block">Institutional Updates</span>
                            <h2 className="text-4xl font-black tracking-tighter uppercase">Official <span className="text-primary italic">Notice</span> Board</h2>
                        </div>
                        <Link to="/notices" className="bg-dark text-white hover:bg-primary px-10 py-4 rounded-2xl font-bold transition-all text-[11px] uppercase tracking-widest shadow-xl">View All Notices</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Admissions Open 2026-27", cat: "Admissions", desc: "Registration for B.Pharm and D.Pharm is now live on our official portal." },
                            { title: "GPAT Coaching Workshop", cat: "Seminars", desc: "Special guest lecture on molecule analysis and drug research on March 25th." },
                            { title: "Placement Drive 2026", cat: "Placements", desc: "Top pharmaceutical recruiters visiting campus for pre-placement talks." }
                        ].map((notice, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="text-[9px] font-black uppercase bg-accent text-primary px-3 py-1.5 rounded-xl w-fit mb-6 tracking-widest">{notice.cat}</div>
                                <h3 className="text-xl font-black mb-6 leading-tight uppercase tracking-tight">{notice.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium italic border-l border-primary/20 pl-4">{notice.desc}</p>
                                <Link to="/notices" className="text-primary font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">Read Detail <ChevronRight size={14} /></Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COUNTERS (REFIND) */}
            <section className="py-24 bg-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
                <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            className="space-y-6 text-center"
                        >
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-3xl border border-white/10 text-primary">
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <h3 className="text-4xl font-black text-white tracking-tighter mb-2">{stat.count}</h3>
                                <div className="h-0.5 w-6 bg-primary mx-auto mb-4" />
                                <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-black">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

const Molecule = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="19" r="3" />
        <circle cx="19" cy="19" r="3" />
        <line x1="12" y1="8" x2="16.5" y2="16.5" />
        <line x1="12" y1="8" x2="7.5" y2="16.5" />
        <line x1="8" y1="19" x2="16" y2="19" />
    </svg>
);

export default Home;
