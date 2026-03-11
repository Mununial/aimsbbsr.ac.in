import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Eye, MapPin, Microscope, Users2, Award, Building2, Loader2, ImageIcon } from 'lucide-react';
import realCampus1 from '../assets/real_campus1.jpg';
import realCampus2 from '../assets/real_campus2.jpg';
import realLab from '../assets/real_lab.jpg';
import realClassroom from '../assets/real_classroom.jpg';
import realStudents from '../assets/real_students.jpg';
import SEO from '../components/SEO';

const Gallery = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);

    const filters = ['All', 'Campus', 'Laboratories', 'Events', 'Seminars'];

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/gallery`);
                setGallery(res.data);
            } catch (err) {
                console.error("Error fetching gallery", err);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    const staticImages = [
        { id: 's1', title: 'Campus View', category: 'Campus', image_url: realCampus1, description: 'Our state-of-the-art academic building at Shampur.' },
        { id: 's2', title: 'Pharmacy Lab', category: 'Laboratories', image_url: realLab, description: 'Advanced research setup for pharmaceutical chemistry.' },
        { id: 's3', title: 'Student Life', category: 'Events', image_url: realStudents, description: 'Our dedicated students during campus activities.' },
        { id: 's4', title: 'Infrastructure', category: 'Campus', image_url: realCampus2, description: 'Modern facility built for excellence in medical sciences.' },
        { id: 's5', title: 'Classrooms', category: 'Laboratories', image_url: realClassroom, description: 'Spacious and well-maintained teaching environment.' },
        { id: 's6', title: 'Research Center', category: 'Seminars', image_url: realLab, description: 'Center for deep research and innovation in drug discovery.' }
    ];

    const allImages = [...gallery, ...staticImages];
    const filteredImages = activeFilter === 'All' ? allImages : allImages.filter(img => img.category === activeFilter);

    const getImageSource = (url) => {
        if (typeof url === 'string' && url.startsWith('uploads')) {
            return `${API_BASE_URL}/${url}`;
        }
        return url; // It's a local imported asset
    };

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
        <div className="bg-[#fcfdfe] min-h-screen">
            <SEO
                title="Campus Gallery & Life"
                description="Take a visual tour of Ayush Institute of Medical Sciences Bhubaneswar. See our laboratories, classrooms, campus environment, and student events."
                url="/gallery"
            />
            {/* Header */}
            <section className="relative pt-48 pb-32 bg-dark">
                <div className="absolute inset-0 bg-primary/20 blur-[150px] rounded-full scale-150 -translate-x-1/2 -translate-y-1/2" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-none"
                    >
                        Campus <span className="text-primary italic">Gallery</span>
                    </motion.h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        Visual tour of AIMS Institute - Life, Learning, and Beyond at our Bhubaneswar campus.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-6 -mt-16 pb-40 relative z-30">

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-center justify-center gap-4 mb-20 bg-white/5 backdrop-blur-3xl p-6 rounded-[40px] border border-white/10 shadow-2xl"
                >
                    {filters.map((filter) => (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-10 py-5 rounded-[25px] text-[11px] font-black uppercase tracking-widest transition-all ${activeFilter === filter
                                ? 'bg-primary text-white shadow-xl shadow-primary/30 border-transparent translate-y-[-4px]'
                                : 'bg-white/10 text-white/40 hover:text-white border border-white/5'
                                }`}
                        >
                            {filter}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="animate-spin text-primary mb-4" size={40} />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Fetching Gallery...</p>
                    </div>
                )}

                {/* Grid */}
                {!loading && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {filteredImages.map((img, i) => (
                            <motion.div
                                key={img.id}
                                variants={itemVariants}
                                layout
                                className="group bg-white rounded-[50px] overflow-hidden shadow-2xl border border-gray-100 hover:border-primary transition-all duration-700 hover:shadow-primary/10"
                            >
                                <div className="relative h-96 overflow-hidden">
                                    <img
                                        src={getImageSource(img.image_url)}
                                        alt={img.title || 'Campus Image'}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                    />
                                    <div className="absolute top-6 left-6 px-4 py-2 bg-dark/80 backdrop-blur-xl text-primary text-[9px] font-black uppercase tracking-widest rounded-full border border-white/10">
                                        {img.category}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                                        <button className="bg-primary text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl hover:bg-white hover:text-dark transition-all">
                                            <Eye size={24} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-10">
                                    <h4 className="text-xl font-black text-dark uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors leading-none">
                                        {img.title || `${img.category} Photo`}
                                    </h4>
                                    <p className="text-gray-400 font-bold text-xs leading-relaxed uppercase tracking-widest">
                                        {img.description || `Viewing a moment from our ${img.category.toLowerCase()} section.`}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Video Tour Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-40 bg-dark p-16 rounded-[80px] flex flex-col items-center justify-between text-white relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[150px] rounded-full scale-150" />
                    <div className="text-center relative z-10 max-w-2xl mx-auto mb-16">
                        <Camera className="text-primary mx-auto mb-10" size={64} />
                        <h3 className="text-5xl font-black tracking-tighter uppercase mb-8 leading-none">Virtual Campus <span className="text-primary italic">Walkthrough</span></h3>
                        <p className="text-white/40 font-semibold text-lg leading-relaxed uppercase tracking-widest text-sm">Experience our infrastructure and lab culture from anywhere in the world.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full relative z-10">
                        {[
                            { title: "2.5 Acres", label: "Green Campus", icon: <Building2 /> },
                            { title: "16+", label: "Expert Labs", icon: <Microscope /> },
                            { title: "5000+", label: "Global Alumni", icon: <Users2 /> }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[50px] text-center hover:bg-primary transition-all group shadow-2xl">
                                <div className="text-primary group-hover:text-white mb-6 flex justify-center">{stat.icon}</div>
                                <h4 className="text-4xl font-black mb-2">{stat.title}</h4>
                                <p className="text-[10px] font-black uppercase text-white/40 group-hover:text-white tracking-[0.2em]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Gallery;
