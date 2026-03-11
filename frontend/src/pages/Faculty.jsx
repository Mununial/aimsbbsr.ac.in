import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, GraduationCap, Loader2, UserCircle2 } from 'lucide-react';
import SEO from '../components/SEO';

const Faculty = () => {
    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/faculty`);
                setFaculty(res.data);
            } catch (err) {
                console.error("Error fetching faculty", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFaculty();
    }, []);

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
    return (
        <section className="pt-32 pb-24 bg-accent/20 min-h-screen selection:bg-primary selection:text-white">
            <SEO
                title="Our Expert Faculty"
                description="Meet the highly experienced and dedicated intellectual assets of AIMS Bhubaneswar. Our faculty members are leaders in pharmaceutical education and research."
                url="/faculty"
            />
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-bold tracking-widest uppercase mb-2 block"
                    >
                        Our Intellectual Assets
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl lg:text-5xl font-bold text-dark"
                    >
                        Meet Our Faculty
                    </motion.h1>
                    <div className="w-20 h-1.5 bg-primary mx-auto mt-6 rounded-full" />
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="animate-spin text-primary mb-4" size={40} />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Loading Faculty...</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {faculty.map((fac, idx) => (
                            <motion.div
                                key={fac.id}
                                variants={itemVariants}
                                whileHover={{ y: -15, scale: 1.02 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-xl group border border-primary/5 transition-all duration-500"
                            >
                                <div className="relative h-64 overflow-hidden bg-gray-100">
                                    {fac.photo ? (
                                        <img
                                            src={`${API_BASE_URL}/${fac.photo}`}
                                            alt={fac.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <UserCircle2 size={64} />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-4">
                                        {[Mail, Linkedin, GraduationCap].map((Icon, i) => (
                                            <button key={i} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                                                <Icon size={18} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-6 text-center">
                                    <span className="text-xs font-bold text-primary mb-2 block uppercase">{fac.department_name || 'Academic'}</span>
                                    <h3 className="text-xl font-bold mb-1">{fac.name}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{fac.designation}</p>
                                    <div className="flex items-center justify-center gap-2 py-2 border-t border-gray-100 text-sm text-gray-400">
                                        <GraduationCap size={16} />
                                        <span>{fac.qualification}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                <div className="text-center mt-16">
                    <p className="text-gray-500 max-w-2xl mx-auto italic">
                        "Investing in pharmaceutical research and education is not just about producing medicines,
                        it's about nurturing the next generation of caregivers and scientists."
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Faculty;
