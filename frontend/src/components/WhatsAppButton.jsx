import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
    const phoneNumber = "919556553566";
    const message = "Namaste! 🙏 I'm interested in the Pharmacy courses (B.Pharm/D.Pharm) at AIMS Bhubaneswar. Please provide more details.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-28 md:bottom-12 left-8 z-[80]">
            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="group relative flex items-center justify-center"
            >
                {/* Ping Animation Background */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-40" />

                {/* Main Button */}
                <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(37,211,102,0.4)] relative z-10 hover:shadow-[0_25px_50px_-12px_rgba(37,211,102,0.5)] transition-all">
                    <MessageCircle size={32} className="text-white fill-white/20" />
                </div>

                {/* Tooltip Label */}
                <div className="absolute left-20 bg-white px-6 py-3 rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap">
                    <p className="text-[10px] font-black uppercase text-[#128C7E] tracking-[0.2em] mb-0.5">Direct Admission</p>
                    <p className="text-sm font-bold text-dark italic">Chat on WhatsApp</p>
                </div>
            </motion.a>
        </div>
    );
};

export default WhatsAppButton;
