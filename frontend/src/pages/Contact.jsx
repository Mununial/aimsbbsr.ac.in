import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Instagram, Facebook, Globe, Users2, Sparkles, PhoneCall, CheckCircle2 } from 'lucide-react';
import API_BASE_URL from '../apiConfig';
import SEO from '../components/SEO';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        category: 'B.Pharm Admissions',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', msg: '' });

        // Basic trim
        const cleanData = {
            ...formData,
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
        };

        try {
            const res = await fetch(`${API_BASE_URL}/api/inquiry/inquiry`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cleanData)
            });
            const data = await res.json();
            
            if (res.ok && data.success) {
                setStatus({ type: 'success', msg: "Message sent! Check aimsbbsrsupport@gmail.com." });
                setFormData({ name: '', email: '', phone: '', category: 'B.Pharm Admissions', message: '' });
            } else {
                throw new Error(data.message || "Server Error. Check Backend Console.");
            }
        } catch (err) {
            setStatus({
                type: 'error',
                msg: err.message
            });
        } finally {
            setLoading(false);
        }
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
        hidden: { opacity: 0, x: -20 },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
            }
        }
    };

    return (
        <div className="bg-white min-h-screen text-dark selection:bg-primary selection:text-white">
            {/* Dynamic Hero */}
            <section className="relative pt-48 pb-32 bg-dark overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute inset-0 bg-primary/20 blur-[150px] rounded-full scale-150"
                />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-3 rounded-full mb-12 shadow-2xl backdrop-blur-3xl"
                    >
                        <Sparkles className="text-primary" size={16} />
                        <span className="text-white font-black uppercase tracking-[0.4em] text-[12px]">24/7 Admissions Support</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl lg:text-9xl font-black text-white mb-12 tracking-tighter uppercase leading-[0.85]"
                    >
                        Connect With <br />
                        <span className="text-primary italic text-8xl lg:text-[140px]">AIMS.</span>
                    </motion.h1>
                </div>
            </section>

            <div className="container mx-auto px-6 py-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">

                    {/* Information Section */}
                    <div className="space-y-24">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-12 italic">The Direct <br /><span className="text-primary">Line.</span></h2>
                            <p className="text-gray-500 font-semibold text-lg leading-relaxed max-w-xl">
                                We pride ourselves on the most efficient and human-centric admission process in Bhubaneswar. Reach out to our team for any assistance.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="space-y-16"
                        >
                            {[
                                { title: "Admission Desk", value: "+91 94370 90875", icon: Phone, sub: "Mon-Sat (10AM - 5PM)" },
                                { title: "Official Mail", value: "aimsbbsrsupport@gmail.com", icon: Mail, sub: "Response within 2 hours" },
                                { title: "Campus Address", value: "Plot No. 129(P), Shampur", icon: MapPin, sub: "Near SUM Hospital, Bhubaneswar-751003" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    className="flex items-start gap-10 group"
                                >
                                    <div className="w-20 h-20 bg-gray-50 rounded-[30px] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-inner shrink-0 scale-90 group-hover:scale-100 duration-500">
                                        <item.icon size={32} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-[12px] font-black uppercase text-gray-400 tracking-[0.3em] mb-2">{item.title}</h3>
                                        <p className="text-3xl font-black text-dark uppercase tracking-tighter group-hover:text-primary transition-colors">{item.value}</p>
                                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-2">{item.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Minimalist Social Row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="flex gap-4"
                        >
                            {[Instagram, Facebook, Globe].map((Icon, i) => (
                                <button key={i} className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-all shadow-xl group">
                                    <Icon size={24} className="group-hover:scale-110 transition-transform" />
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    {/* Integrated Mail Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-dark p-12 lg:p-20 rounded-[80px] text-white shadow-3xl shadow-primary/20 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary blur-[160px] opacity-20" />
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            <motion.h3 variants={itemVariants} className="text-4xl font-black tracking-tighter uppercase mb-2 italic text-left">Send <span className="text-primary">Inquiry.</span></motion.h3>
                            <motion.p variants={itemVariants} className="text-white/40 font-bold text-[10px] uppercase tracking-widest mb-12 text-left">Direct To: aimsbbsrsupport@gmail.com</motion.p>

                            <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                                <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {[
                                        { label: "Your Name", type: "text", placeholder: "John Doe", value: "name" },
                                        { label: "Email Address", type: "email", placeholder: "john@example.com", value: "email" },
                                        { label: "Phone Number", type: "text", placeholder: "+91 0000 0000 00", value: "phone" }
                                    ].map((field, i) => (
                                        <motion.div key={i} variants={itemVariants} className="space-y-2 border-b border-white/10 pb-4 focus-within:border-primary transition-colors text-left">
                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">{field.label}</label>
                                            <input
                                                type={field.type}
                                                required
                                                value={formData[field.value]}
                                                onChange={(e) => setFormData({ ...formData, [field.value]: e.target.value })}
                                                placeholder={field.placeholder}
                                                className="w-full bg-transparent p-0 text-xl font-black text-white focus:outline-none placeholder:text-white/20"
                                            />
                                        </motion.div>
                                    ))}
                                    <motion.div variants={itemVariants} className="space-y-2 border-b border-white/10 pb-4 focus-within:border-primary transition-colors text-left">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Inquiry Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-transparent p-0 text-xl font-black text-white focus:outline-none appearance-none cursor-pointer"
                                        >
                                            <option className="bg-dark text-white">B.Pharm Admissions</option>
                                            <option className="bg-dark text-white">D.Pharm Admissions</option>
                                            <option className="bg-dark text-white">Fee Queries</option>
                                        </select>
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="md:col-span-2 space-y-2 border-b border-white/10 pb-4 focus-within:border-primary transition-colors text-left">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Message Body</label>
                                        <textarea
                                            rows="2"
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell us more..."
                                            className="w-full bg-transparent p-0 text-xl font-black text-white focus:outline-none placeholder:text-white/20 resize-none"
                                        ></textarea>
                                    </motion.div>
                                </motion.div>

                                {status.msg && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-[12px] font-black uppercase text-center tracking-widest ${status.type === 'success' ? 'text-green-400' : 'text-primary'}`}>
                                        {status.msg}
                                    </motion.p>
                                )}

                                <motion.button
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className="bg-primary hover:bg-white hover:text-dark px-16 py-6 rounded-full text-xs font-black uppercase tracking-[0.3em] transition-all shadow-3xl shadow-primary/30 flex items-center justify-center gap-6 group w-full disabled:opacity-50"
                                >
                                    {loading ? "Sending..." : "Submit Form"} <Send size={20} className="group-hover:translate-x-3 transition-transform" />
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Clean Location Section */}
            <section className="bg-gray-50 py-40">
                <div className="container mx-auto px-6 text-center">
                    <h4 className="text-primary font-black uppercase tracking-[0.4em] text-[12px] mb-8">Plot No. 129(P), Shampur, BBSR</h4>
                    <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-20 leading-none">Find us near <br /><span className="text-primary italic">Sum Hospital.</span></h2>
                    <div className="max-w-6xl mx-auto h-[600px] bg-dark rounded-[100px] overflow-hidden shadow-3xl relative">
                        <div className="absolute inset-0 bg-dark opacity-40 grayscale z-10" />
                        <img src="https://images.unsplash.com/photo-1577083552431-6e5fd019808a?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover scale-150 grayscale" alt="Map" />
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="bg-primary text-white p-12 rounded-full shadow-3xl border-[20px] border-white/5 active:scale-95 transition-all"
                            >
                                <MapPin size={48} />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
