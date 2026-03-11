import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ExternalLink, ChevronRight, GraduationCap, Building2, Beaker, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import aimsLogo from '../assets/aims_logo.png';

const Footer = () => {
    const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.662454553232!2d85.73356000000001!3d20.244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1907cb5cf3470b%3A0x6b876ca689622d86!2sSUM%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

    return (
        <footer className="bg-[#0f172a] text-white pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -mr-[300px] -mt-[300px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full -ml-[200px] -mb-[200px]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-10"
                        >
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-2 shadow-2xl shadow-primary/20">
                                <img src={aimsLogo} alt="AIMS Logo" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black tracking-tight text-white leading-none uppercase">AIMS</h2>
                                <p className="text-[10px] font-black text-primary tracking-[0.3em] uppercase mt-2">Bhubaneswar</p>
                            </div>
                        </motion.div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-10 pr-4 font-medium">
                            Ayush Institute of Medical Sciences (AIMS Bhubaneswar) is a premier pharmaceutical institution dedicated to academic excellence,
                            innovation, and shaping future healthcare leaders.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Linkedin].map((Icon, idx) => (
                                <motion.a
                                    key={idx}
                                    href="#"
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    className="w-12 h-12 bg-white/5 hover:bg-primary border border-white/10 rounded-2xl flex items-center justify-center text-white transition-all shadow-xl"
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick & Course Links */}
                    <div className="grid grid-cols-2 lg:col-span-1 gap-10">
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-primary">Quick Links</h3>
                            <ul className="space-y-5">
                                {[
                                    { name: 'Home', path: '/' },
                                    { name: 'About Us', path: '/about' },
                                    { name: 'Contact', path: '/contact' },
                                    { name: 'Notices', path: '/notices' },
                                    { name: 'Gallery', path: '/gallery' }
                                ].map((item, idx) => (
                                    <li key={idx}>
                                        <Link
                                            to={item.path}
                                            className="text-gray-500 hover:text-white transition-all text-[13px] flex items-center gap-3 font-semibold group"
                                        >
                                            <ChevronRight size={14} className="text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-primary">Academic</h3>
                            <ul className="space-y-5">
                                {[
                                    { name: 'B.Pharm Degree', path: '/courses?type=BPHARM' },
                                    { name: 'D.Pharm Diploma', path: '/courses?type=DPHARM' },
                                    { name: 'Laboratories', path: '/laboratories' },
                                    { name: 'Faculty', path: '/faculty' },
                                    { name: 'Admission Help', path: '/admissions' }
                                ].map((item, idx) => (
                                    <li key={idx}>
                                        <Link
                                            to={item.path}
                                            className="text-gray-500 hover:text-white transition-all text-[13px] flex items-center gap-3 font-semibold group"
                                        >
                                            <div className="w-1.5 h-1.5 bg-primary/20 rounded-full group-hover:bg-primary transition-colors" />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Detail Card */}
                    <div className="lg:col-span-1">
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-primary">Reach Us</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-5 p-6 bg-white/5 rounded-[30px] border border-white/10 group hover:bg-white/10 transition-all">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                                    <MapPin size={22} />
                                </div>
                                <p className="text-gray-400 text-[13px] font-semibold leading-relaxed">
                                    Plot No. 129(P), Shampur, <br />
                                    Near SUM Hospital, <br />
                                    Bhubaneswar-751003, Odisha
                                </p>
                            </div>
                            <div className="flex items-center gap-5 p-6 bg-white/5 rounded-[30px] border border-white/10 group hover:bg-white/10 transition-all">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                                    <Phone size={22} />
                                </div>
                                <span className="text-gray-400 font-black text-sm tracking-tight">+91 94370 90875</span>
                            </div>
                            <div className="flex items-center gap-5 p-6 bg-white/5 rounded-[30px] border border-white/10 group hover:bg-white/10 transition-all">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                                    <Mail size={22} />
                                </div>
                                <span className="text-gray-400 text-sm font-semibold truncate uppercase tracking-widest text-[11px]">aimsbbsr@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Official Map */}
                    <div className="lg:col-span-1">
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-primary">Campus Map</h3>
                        <div className="relative group rounded-[40px] overflow-hidden border-4 border-white/5 shadow-3xl h-64 grayscale hover:grayscale-0 transition-all duration-700">
                            <iframe
                                title="Map"
                                src={mapEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:opacity-0 transition-opacity" />
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noreferrer"
                                className="absolute bottom-6 right-6 bg-white text-dark px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 translate-y-20 group-hover:translate-y-0 transition-all duration-500 shadow-2xl"
                            >
                                Get Directions <ExternalLink size={16} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div className="space-y-4">
                        <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.2em]">
                            &copy; {new Date().getFullYear()} <span className="text-white">Ayush Institute of Medical Sciences Bhubaneswar</span>
                        </p>
                        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center md:justify-start gap-2">
                            <span className="w-4 h-[1px] bg-primary/30" />
                            Designed & Developed by <span className="text-primary hover:text-white transition-colors cursor-pointer">Jitendra Nial</span>
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-10">
                        {['Privacy Policy', 'Sitemap', 'Cookie Policy'].map((text, i) => (
                            <a key={i} href="#" className="text-gray-500 hover:text-primary text-[10px] font-black uppercase tracking-widest transition-colors">
                                {text}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
