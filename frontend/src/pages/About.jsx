import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { Target, Eye, Building2, ShieldCheck, Sparkles, GraduationCap, Beaker, Users } from 'lucide-react';
import realLab from '../assets/real_lab.jpg';
import realEntrance from '../assets/real_entrance.jpg';
import realReception from '../assets/real_reception.jpg';
import chairmanPhoto from '../assets/chairman.jpg';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    return (
        <div className="bg-white min-h-screen text-dark selection:bg-primary selection:text-white overflow-x-hidden">
            <SEO
                title="About AIMS Bhubaneswar"
                description="Discover the legacy of Ayush Institute of Medical Sciences. We are dedicated to excellence in pharmaceutical education, research, and holistic student development."
                url="/about"
            />
            {/* HERITAGE HERO */}
            <section className="relative pt-48 pb-24 overflow-hidden bg-gray-50">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white -z-10 rounded-l-[150px]" />
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-8"
                        >
                            <Sparkles size={16} /> Estd. 2018 | Bhubaneswar
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-12 uppercase"
                        >
                            Pioneering <br />
                            <span className="text-primary italic">Excellence.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl leading-relaxed italic border-l-4 border-primary/20 pl-8"
                        >
                            Ayush Institute of Medical Sciences (AIMS) stands as a beacon of excellence in pharmaceutical education, nurturing the next generation of healthcare innovators in Odisha.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* THE AIMS NARRATIVE */}
            <section className="py-32 container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] bg-gray-100 rounded-[80px] overflow-hidden shadow-3xl group">
                            <img src={realReception} alt="Pharmacy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                        </div>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            className="absolute -bottom-10 -right-10 bg-dark p-12 rounded-[50px] text-white shadow-2xl hidden md:block"
                        >
                            <p className="text-4xl font-black tracking-tighter text-primary">PCI</p>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Approved Institution</p>
                        </motion.div>
                    </motion.div>

                    <div className="space-y-12">
                        <div>
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Identity</span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6 leading-none">Educational <span className="text-primary italic">Philosophy</span></h2>
                            <div className="space-y-6 text-gray-500 text-lg font-medium leading-relaxed">
                                <p>
                                    At AIMS Bhubaneswar, we believe that pharmaceutical education is not just about earning a degree; it's about cultivating a mindset of lifelong learning and service to humanity. Our mission is to bridge the gap between theoretical knowledge and industry requirements.
                                </p>
                                <p>
                                    Our state-of-the-art campus integrates cutting-edge technology with traditional values of discipline and ethics, providing an ecosystem where students are challenged to think critically and act ethically.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { title: "45+", sub: "Faculty strength" },
                                { title: "16+", sub: "Advanced labs" },
                                { title: "100%", sub: "Placement support" },
                                { title: "5000+", sub: "Library volumes" }
                            ].map((stat, i) => (
                                <div key={i} className="border-l-4 border-primary/20 pl-6 py-2">
                                    <p className="text-3xl font-black tracking-tighter text-dark">{stat.title}</p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400">{stat.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CHAIRMAN'S VISION */}
            <section className="bg-dark py-40 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/3 shrink-0">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="w-80 h-80 md:w-96 md:h-96 rounded-[60px] border-[20px] border-white/5 overflow-hidden shadow-3xl shadow-primary/10 transition-all duration-700"
                            >
                                <img src={chairmanPhoto} alt="Chairman, Alok Ranjan Mallick" className="w-full h-full object-cover transition-all duration-700" />
                            </motion.div>
                        </div>
                        <div>
                            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Leader's Vision</span>
                            <blockquote className="text-3xl md:text-5xl font-black tracking-tighter leading-tight mt-8 mb-12 italic border-l-4 border-primary/20 pl-8">
                                "We don't just teach pharmacy; we shape the ethical backbone of the future healthcare industry."
                            </blockquote>
                            <div>
                                <h4 className="text-2xl font-black uppercase tracking-widest text-white">Shri. Alok Ranjan Mallick</h4>
                                <p className="text-primary font-black uppercase tracking-[0.2em] text-[10px] mt-2">Chairman, Ayush Group of Institutions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE PILLARS */}
            <section className="py-40 bg-[#fbfcfd]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">The Foundation</span>
                        <h2 className="text-5xl font-black tracking-tighter uppercase mb-6">Our Institutional <span className="text-primary italic">Pillars</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { title: "Academic Rigor", icon: GraduationCap, desc: "A curriculum designed to challenge and inspire future leaders." },
                            { title: "Research Culture", icon: Beaker, desc: "Modern molecules study in state-of-the-art high precision labs." },
                            { title: "Industry Linked", icon: Building2, desc: "Direct pipelines to global pharmaceutical giants like Cipla." },
                            { title: "Ethics First", icon: ShieldCheck, desc: "Building compassionate professionals with integrity and values." }
                        ].map((pillar, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="p-8 bg-white rounded-[40px] shadow-2xl shadow-dark/5 border border-gray-100 group text-center"
                            >
                                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    <pillar.icon size={28} />
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight mb-4">{pillar.title}</h3>
                                <p className="text-gray-400 text-sm font-semibold leading-relaxed">{pillar.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GOVERNANCE */}
            <section className="py-40">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-20">
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] block mb-4">The Oversight</span>
                        <h2 className="text-4xl font-black tracking-tighter uppercase mb-4">Executive Council</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {[
                            { role: "Chairman", name: "Shri. Alok Ranjan Mallick" },
                            { role: "Director", name: "Dr. B.N. Biswal" }
                        ].map((m, i) => (
                            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between py-12 group hover:px-10 transition-all duration-500 hover:bg-gray-50 rounded-3xl">
                                <span className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-400 mb-2 md:mb-0">{m.role}</span>
                                <span className="text-2xl font-black text-dark uppercase tracking-tight group-hover:text-primary transition-colors">{m.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
