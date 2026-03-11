import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import {
    CheckCircle, FileText, Download, PhoneCall, Headphones,
    Clock, HelpCircle, ArrowRight, ShieldCheck, Landmark,
    Calendar, UserPlus, Info, CheckCircle2
} from 'lucide-react';

const Admissions = () => {
    return (
        <div className="pb-40 bg-[#fafbfc]">
            <SEO
                title="Admissions 2026-27 - Apply Now"
                description="Secure your future in pharmacy. Apply for B.Pharm and D.Pharm at AIMS Bhubaneswar. Check eligibility, required documents, and simple 3-step admission process."
                url="/admissions"
            />
            {/* Premium Hero Section */}
            <section className="relative pt-48 pb-32 bg-dark overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 blur-[150px] rounded-full scale-150 -translate-x-1/2 -translate-y-1/2" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-8 shadow-2xl backdrop-blur-xl"
                    >
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-white font-black uppercase tracking-[0.3em] text-[10px]">
                            Academic Session 2026-27 Enrollment Open
                        </span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-none"
                    >
                        Join the Future of <br /> <span className="text-primary italic">Pharmacy</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        Secure your seat at Odisha's premier pharmaceutical institute. <br /> Follow our simple 3-step digital admission process.
                    </motion.p>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-16 relative z-30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left Column: Flow & Details */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Admission Progress Grid */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0 },
                                show: { opacity: 1, transition: { staggerChildren: 0.15 } }
                            }}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {[
                                { step: "01", icon: UserPlus, title: "Register", desc: "Fill online form or visit campus for counseling." },
                                { step: "02", icon: FileText, title: "Verify", desc: "Submit 10+2 marksheet & CLC for certificate review." },
                                { step: "03", icon: Landmark, title: "Payment", desc: "Pay the registration fee and secure your seat." }
                            ].map((s, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
                                    }}
                                    className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-50 group hover:border-primary transition-all"
                                >
                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                        <s.icon size={28} />
                                    </div>
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 block">{s.step} Phase</span>
                                    <h4 className="text-xl font-black text-dark mb-2 tracking-tight uppercase leading-none">{s.title}</h4>
                                    <p className="text-gray-400 text-xs font-bold leading-relaxed">{s.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Detailed Enrollment Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-14 rounded-[50px] shadow-3xl border border-gray-100 overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-24 -translate-y-24 blur-3xl" />
                            <h2 className="text-4xl font-black mb-12 text-dark tracking-tighter uppercase">Academic Eligibility <br /> <span className="text-primary">& Requirements</span></h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                                <div className="space-y-8">
                                    <div className="p-8 bg-dark rounded-[40px] text-white">
                                        <div className="flex items-center gap-3 mb-4 uppercase tracking-widest text-[10px] font-black text-primary">
                                            <ShieldCheck size={16} /> B.PHARM (4 YEARS)
                                        </div>
                                        <p className="text-sm font-semibold text-white/70 leading-relaxed mb-6">
                                            Minimum 45% in 10+2 with PCM/PCB. Candidates must have OJEE rank or appear in institute's own entrance.
                                        </p>
                                        <div className="flex items-center gap-2 text-xs font-black text-white/40">
                                            PCI & AICTE APPROVED <div className="w-1 h-1 rounded-full bg-white/40" /> 100 SEATS
                                        </div>
                                    </div>

                                    <div className="p-8 bg-primary text-white rounded-[40px] shadow-2xl shadow-primary/20">
                                        <div className="flex items-center gap-3 mb-4 uppercase tracking-widest text-[10px] font-black">
                                            <ShieldCheck size={16} /> D.PHARM (2 YEARS)
                                        </div>
                                        <p className="text-sm font-semibold text-white leading-relaxed mb-6">
                                            Must have passed 10+2 (Science stream) from a recognized board. No separate rank required for management seats.
                                        </p>
                                        <div className="flex items-center gap-2 text-xs font-black text-white/60">
                                            PCI APPROVED <div className="w-1 h-1 rounded-full bg-white/60" /> 60 SEATS
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <h5 className="text-xs font-black text-dark/40 uppercase tracking-[0.3em]">Mandatory Documents</h5>
                                    <ul className="space-y-4">
                                        {[
                                            "10th & 12th Board Certificates",
                                            "CLC / College Leaving Certificate",
                                            "Recent Conduct Certificate",
                                            "Residential & Caste (If Applicable)",
                                            "6 Passport Sized Photographs",
                                            "Original Aadhar Card Copies"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-4 text-sm font-bold text-gray-500">
                                                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                                    <CheckCircle2 size={12} />
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bank Details section - "Feel Real" data */}
                        <div className="bg-white p-14 rounded-[50px] shadow-3xl border border-primary/10">
                            <h3 className="text-3xl font-black text-dark mb-10 tracking-tight flex items-center gap-4">
                                <Landmark className="text-primary" /> Application Fee Payment
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="p-10 bg-gray-50 rounded-[40px] border border-gray-100">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Online Transfer Details</p>
                                    <div className="space-y-4">
                                        <div className="flex justify-between border-b border-gray-200 pb-3">
                                            <span className="text-xs font-bold text-gray-500">Account Name</span>
                                            <span className="text-xs font-black text-dark uppercase">AYUSH INSTITUTE BBSR</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-200 pb-3">
                                            <span className="text-xs font-bold text-gray-500">Bank Name</span>
                                            <span className="text-xs font-black text-dark uppercase">UNION BANK OF INDIA</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-200 pb-3">
                                            <span className="text-xs font-bold text-gray-500">Account No.</span>
                                            <span className="text-xs font-black text-dark tracking-widest">354201010036640</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs font-bold text-gray-500">IFSC Code</span>
                                            <span className="text-xs font-black text-primary tracking-widest uppercase">UBIN0535427</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center gap-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600">
                                            <Info size={24} />
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-black text-dark uppercase mb-1">Fee Note</h5>
                                            <p className="text-xs font-bold text-gray-400 leading-relaxed">Please share the transaction screenshot on WhatsApp at +91 94370 90875 after successfull payment.</p>
                                        </div>
                                    </div>
                                    <a href="/contact" className="bg-dark text-white p-6 rounded-3xl font-black text-xs uppercase tracking-widest text-center hover:bg-primary transition-all">
                                        Visit Admission Cell
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Actions & Downloads */}
                    <aside className="space-y-10">
                        {/* Call Center Card */}
                        <div className="bg-dark text-white p-12 rounded-[50px] shadow-3xl shadow-primary/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[80px] group-hover:scale-150 transition-transform duration-700" />
                            <h3 className="text-2xl font-black mb-10 flex items-center gap-3 relative z-10">
                                <Headphones className="text-primary" size={28} /> Admission Cell
                            </h3>
                            <div className="space-y-10 relative z-10">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block mb-3">Toll-Free Query</span>
                                    <p className="text-4xl font-black tracking-tighter mb-2">+91 94370 90875</p>
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest italic">Always active for students</p>
                                </div>

                                <div className="p-8 bg-white/5 rounded-[30px] border border-white/10">
                                    <div className="flex items-center gap-3 mb-6 text-xs font-black uppercase tracking-widest text-primary">
                                        <Calendar size={18} /> Schedule
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-[11px] font-bold border-b border-white/5 pb-3">
                                            <span className="text-white/40">Registration</span>
                                            <span className="text-white">Jan - July 2026</span>
                                        </div>
                                        <div className="flex justify-between text-[11px] font-bold">
                                            <span className="text-white/40">Office Hours</span>
                                            <span className="text-white">09:00 AM - 06:00 PM</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full bg-primary py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 active:scale-95 flex items-center justify-center gap-2 transition-all hover:bg-white hover:text-primary">
                                    Instant Help <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Resource Downloads */}
                        <div className="bg-white p-10 rounded-[50px] shadow-3xl border border-gray-100">
                            <h3 className="text-2xl font-black mb-10 text-dark flex items-center gap-3 uppercase tracking-tighter">
                                <Download className="text-primary" size={24} /> Downloads
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { name: "Prospectus 2026-27", size: "4.8 MB" },
                                    { name: "Online Admission Form", size: "1.2 MB" },
                                    { name: "Hostel Fee Matrix", size: "320 KB" }
                                ].map((item, idx) => (
                                    <button key={idx} className="w-full flex items-center gap-5 p-5 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-2xl hover:border-primary/20 border border-transparent transition-all group text-left">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                            <FileText size={20} />
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-[11px] font-black text-dark uppercase tracking-widest leading-none mb-1">{item.name}</p>
                                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">{item.size} • PDF Document</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Admissions;
