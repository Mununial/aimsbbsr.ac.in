import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { FlaskConical, Microscope, Beaker, ShieldCheck, Zap, Building2, HelpCircle, PhoneCall, CheckCircle2, ChevronRight } from 'lucide-react';
import realLab from '../assets/real_lab.jpg';
import realClassroom from '../assets/real_classroom.jpg';
import realCampus1 from '../assets/real_campus1.jpg';
import realCampus2 from '../assets/real_campus2.jpg';
import realStudents from '../assets/real_students.jpg';

import realLabInterior from '../assets/real_lab_interior.jpg';

const realPhotos = [realLab, realLabInterior, realClassroom, realStudents, realCampus1, realCampus2];

const Laboratories = () => {
    const labCategories = [
        {
            title: "Pharmaceutics Laboratory",
            icon: <FlaskConical size={32} />,
            desc: "The experimental hub where drug science meets practical formulation. Students learn to create tablets, capsules, and life-saving emulsions using modern apparatus.",
            tools: ["Tablet Punching Machine", "Hardness Tester", "Dissolution Apparatus", "Friability Tester"]
        },
        {
            title: "Pharmacology & Physiology",
            icon: <Microscope size={32} />,
            desc: "Focus on drug mechanisms, behavior, and effects on bodily functions. A deep dive into how medicines interact with the human system.",
            tools: ["Kymograph", "Student Organ Bath", "Binocular Microscope", "Hemocytometer"]
        },
        {
            title: "Pharmaceutical Chemistry",
            icon: <Beaker size={32} />,
            desc: "Synthesis, identification, and testing of drug molecules. Here, students master the art of purity analysis and molecular identification.",
            tools: ["Refractometer", "Melting Point Apparatus", "Centrifuge", "Analytical Balance"]
        },
        {
            title: "Pharmacognosy (Medicinal Plants)",
            icon: <Building2 size={32} />,
            desc: "Ancient wisdom meeting modern science. Students extract active ingredients from plant and natural sources to study herbal drug components.",
            tools: ["Muffle Furnace", "Soxhlet Extractor", "Heating Mantle", "Moisture Balance"]
        },
        {
            title: "Computer & Soft-Skill Lab",
            icon: <Zap size={32} />,
            desc: "Modern digital facilities for learning pharmaceutical management, digital health records, and research data analysis.",
            tools: ["High-speed LAN", "Core i7 Systems", "E-Library Access", "Statistical Software"]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
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

    return (
        <div className="bg-white min-h-screen text-dark selection:bg-primary selection:text-white overflow-x-hidden">
            <SEO
                title="Laboratories & Research Facilities"
                description="Explore the world-class pharmaceutical laboratories at AIMS Bhubaneswar. From Pharmaceutics to Pharmacology, our labs are equipped with high-end research instrumentation."
                url="/laboratories"
            />
            {/* Dynamic Hero */}
            <section className="relative pt-48 pb-32 bg-dark">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute inset-0 bg-primary/20 blur-[150px] rounded-full scale-150"
                />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl lg:text-9xl font-black text-white mb-12 tracking-tighter uppercase leading-[0.85]"
                        >
                            Advanced <br />
                            <span className="text-primary italic">Laboratories.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-400 text-xl max-w-2xl font-medium leading-relaxed uppercase tracking-tighter"
                        >
                            16+ Research-Grade Labs approved by PCI, providing the backbone of hands-on technical excellence.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* List with Images Design */}
            <div className="container mx-auto px-6 py-40">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-40"
                >
                    {labCategories.map((lab, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className={`flex flex-col lg:flex-row gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="lg:w-1/2 relative group"
                            >
                                <div className="aspect-[16/10] bg-gray-50 rounded-[60px] overflow-hidden shadow-2xl relative">
                                    <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-all duration-700" />
                                    <img
                                        src={realPhotos[i % realPhotos.length]}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                        alt={lab.title}
                                    />
                                    <div className="absolute top-10 right-10 w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-primary shadow-2xl">
                                        {lab.icon}
                                    </div>
                                </div>
                                <div className="absolute -bottom-6 -left-6 bg-primary w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-2xl group-hover:scale-110 transition-transform">0{i + 1}</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="lg:w-1/2 space-y-10 text-left"
                            >
                                <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">{lab.title}</h3>
                                <p className="text-gray-500 font-semibold text-lg leading-relaxed">{lab.desc}</p>

                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    {lab.tools.map((tool, j) => (
                                        <motion.div
                                            key={j}
                                            variants={itemVariants}
                                            className="flex items-center gap-4 text-dark font-black tracking-widest text-[11px] uppercase border-b border-gray-100 pb-3 group cursor-default"
                                        >
                                            <ChevronRight size={14} className="text-primary group-hover:translate-x-2 transition-transform" />
                                            {tool}
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Safety & Compliance */}
            <section className="bg-dark py-40 text-white overflow-hidden relative">
                <motion.div
                    animate={{ scale: [1.5, 1.2, 1.5], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute inset-0 bg-primary/10 blur-[150px] rounded-full scale-150"
                />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col lg:flex-row gap-20 items-center justify-between"
                    >
                        <div className="max-w-2xl text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-8"
                            >
                                <ShieldCheck size={14} /> OSHA Certified Standard
                            </motion.div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-10 italic">
                                Safety & <span className="text-primary">Compliance.</span>
                            </h2>
                            <p className="text-white/40 font-semibold text-lg max-w-xl leading-relaxed">
                                All our laboratories strictly follow PCI safety guidelines. We ensure students work in a secure environment with modern fire-safety and chemical disposal systems.
                            </p>
                        </div>
                        <div className="w-full lg:w-96 p-12 bg-white/5 border border-white/10 rounded-[60px] text-center shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-primary blur-[50px] opacity-20" />
                            <HelpCircle className="mx-auto text-primary mb-8" size={64} />
                            <h4 className="text-2xl font-black uppercase tracking-tight mb-4 leading-none">Need a Live Walkthrough?</h4>
                            <p className="text-white/40 font-bold text-[10px] uppercase tracking-widest mb-10 opacity-60">Visit our Shampur campus any Saturday.</p>
                            <button className="bg-primary hover:bg-white hover:text-dark px-10 py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] transition-all w-full flex items-center justify-center gap-4 group active:scale-95 shadow-2xl shadow-primary/20">
                                <PhoneCall size={18} /> Book Visit
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Laboratories;
