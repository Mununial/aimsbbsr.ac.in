import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Phone, MapPin, GraduationCap, Sparkles, Building2, BookCheck, Users2, Trophy, ChevronRight, Languages } from 'lucide-react';
import aimsLogo from '../assets/aims_logo.png';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState('en'); // 'en' or 'hi'
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "Hello! Welcome to Ayush Institute of Medical Sciences (AIMS) Bhubaneswar. 🙏\n\nHow can I help you with admissions today?",
            suggestions: ["Courses Offered", "Admission 2026-27", "Campus Facilities", "Contact Us", "हिंदी में बात करें"]
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const knowledgeBase = {
        en: {
            "Courses Offered": {
                reply: "We offer top-tier pharmacy programs:\n\n• **B.Pharm** (4 Years Degree)\n• **D.Pharm** (2 Years Diploma)\n\nThese courses prepare students for successful careers in the pharmaceutical and healthcare sectors. Which one would you like to know more about?",
                suggestions: ["B.Pharm Details", "D.Pharm Details", "Main Menu"]
            },
            "Admission 2026-27": {
                reply: "Admissions are **OPEN** for B.Pharm and D.Pharm at AIMS Bhubaneswar! 🚀\n\nOur programs offer quality pharmaceutical education and practical training. Would you like to know about the admission process or eligibility?",
                suggestions: ["Admission Process", "Eligibility", "Main Menu"]
            },
            "Campus Facilities": {
                reply: "AIMS provides a world-class learning environment:\n\n• Modern Specialized Laboratories\n• Fully Stocked Library\n• Advanced Smart Classrooms\n• Vibrant Campus Canteen\n• Student-Friendly Environment\n\nWould you like to see our lab details?",
                suggestions: ["Laboratories", "Hostel Info", "Main Menu"]
            },
            "Laboratories": {
                reply: "Our research-grade labs include:\n\n• Pharmaceutics Lab\n• Pharmacology Lab\n• Pharmaceutical Chemistry Lab\n• Pharmacognosy Lab\n• Computer Lab\n\nPractical learning is our priority!",
                suggestions: ["Main Menu"]
            },
            "Contact Us": {
                reply: "We are here to help! reach us at:\n\n📍 **Location:** Bhatakhuri, Gangapada, Bhubaneswar – 752054\n📞 **Phone:** +91 94370 90875\n📧 **Email:** aimsbbsr2627@gmail.com",
                suggestions: ["Main Menu"]
            },
            "Main Menu": {
                reply: "How else can I assist you in starting your pharmacy journey?",
                suggestions: ["Courses Offered", "Admission 2026-27", "Campus Facilities", "Contact Us", "हिंदी में बात करें"]
            }
        },
        hi: {
            "Courses Offered": {
                reply: "हम बेहतरीन फार्मेसी प्रोग्राम पेश करते हैं:\n\n• **B.Pharm** (4 साल की डिग्री)\n• **D.Pharm** (2 साल का डिप्लोमा)\n\nये कोर्स छात्रों को फार्मास्युटिकल और स्वास्थ्य सेवा क्षेत्र में सफल करियर के लिए तैयार करते हैं। आप किसके बारे में अधिक जानना चाहेंगे?",
                suggestions: ["B.Pharm विवरण", "D.Pharm विवरण", "मुख्य मेनू"]
            },
            "Admission 2026-27": {
                reply: "AIMS भुवनेश्वर में B.Pharm और D.Pharm के लिए प्रवेश **खुले** हैं! 🚀\n\nहमारे प्रोग्राम गुणवत्तापूर्ण शिक्षा और व्यावहारिक प्रशिक्षण प्रदान करते हैं। क्या आप प्रवेश प्रक्रिया या पात्रता के बारे में जानना चाहेंगे?",
                suggestions: ["प्रवेश प्रक्रिया", "पात्रता", "मुख्य मेनू"]
            },
            "Campus Facilities": {
                reply: "AIMS विश्व स्तरीय सीखने का माहौल प्रदान करता है:\n\n• आधुनिक प्रयोगशालाएं (Labs)\n• बड़ी लाइब्रेरी\n• स्मार्ट क्लासरूम\n• कैंपस कैंटीन\n• छात्र-अनुकूल वातावरण\n\nक्या आप हमारी लैब का विवरण देखना चाहेंगे?",
                suggestions: ["प्रयोगशालाएं", "मुख्य मेनू"]
            },
            "Contact Us": {
                reply: "हम आपकी सहायता के लिए तैयार हैं:\n\n📍 **पता:** भाताखुरी, गंगापाड़ा, भुवनेश्वर – 752054\n📞 **फोन:** +91 94370 90875\n📧 **ईमेल:** aimsbbsr2627@gmail.com",
                suggestions: ["मुख्य मेनू"]
            },
            "मुख्य मेनू": {
                reply: "मै आपकी और किस प्रकार सहायता कर सकता हूँ?",
                suggestions: ["कोर्स की जानकारी", "प्रवेश 2026-27", "कैंपस सुविधाएं", "संपर्क करें", "Talk in English"]
            }
        }
    };

    const handleAction = (userText) => {
        const userMsg = { id: Date.now(), type: 'user', text: userText };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // Language Switch Logic
        if (userText === "हिंदी में बात करें" || userText.toLowerCase().includes("hindi")) {
            setLanguage('hi');
            setTimeout(() => {
                const botMsg = {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: "नमस्ते! मैं AIMS एडमिशन असिस्टेंट हूँ। मैं प्रवेश के बारे में आपकी कैसे मदद कर सकता हूँ?",
                    suggestions: ["कोर्स की जानकारी", "प्रवेश 2026-27", "कैंपस सुविधाएं", "संपर्क करें", "Talk in English"]
                };
                setMessages(prev => [...prev, botMsg]);
                setIsTyping(false);
            }, 800);
            return;
        }

        if (userText === "Talk in English" || userText.toLowerCase().includes("english")) {
            setLanguage('en');
            setTimeout(() => {
                const botMsg = {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: "Hello! I am back in English mode. How can I help you today?",
                    suggestions: ["Courses Offered", "Admission 2026-27", "Campus Facilities", "Contact Us", "हिंदी में बात करें"]
                };
                setMessages(prev => [...prev, botMsg]);
                setIsTyping(false);
            }, 800);
            return;
        }

        setTimeout(() => {
            const currentKB = knowledgeBase[language];
            let data = currentKB[userText];

            // Basic Keyword Search if not a direct button match
            if (!data) {
                const q = userText.toLowerCase();
                const isHi = language === 'hi';

                if (q.includes('admission') || q.includes('प्रवेश')) data = currentKB[isHi ? "प्रवेश 2026-27" : "Admission 2026-27"];
                else if (q.includes('course') || q.includes('कोर्स')) data = currentKB[isHi ? "कोर्स की जानकारी" : "Courses Offered"];
                else if (q.includes('facility') || q.includes('सुविधा')) data = currentKB[isHi ? "कैंपस सुविधाएं" : "Campus Facilities"];
                else if (q.includes('lab') || q.includes('प्रयोगशाला')) data = currentKB[isHi ? "प्रयोगशालाएं" : "Laboratories"];
                else if (q.includes('contact') || q.includes('संपर्क')) data = currentKB[isHi ? "संपर्क करें" : "Contact Us"];
            }

            const botMsg = {
                id: Date.now() + 1,
                type: 'bot',
                text: data ? data.reply : (language === 'en'
                    ? "I'm here to help with information about Ayush Institute of Medical Sciences Bhubaneswar. Please pick an option below:"
                    : "मैं आयुष इंस्टीट्यूट ऑफ मेडिकल साइंसेज भुवनेश्वर के बारे में जानकारी देने के लिए यहाँ हूँ। कृपया नीचे दिए गए विकल्पों में से चुनें:"),
                suggestions: data ? data.suggestions : (language === 'en' ? ["Admission 2026-27", "Main Menu"] : ["प्रवेश 2026-27", "मुख्य मेनू"])
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 800);
    };

    const onSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        handleAction(input);
        setInput('');
    };

    return (
        <div className="fixed bottom-28 md:bottom-12 right-8 z-[80]">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 relative ${isOpen ? 'bg-dark' : 'bg-primary'}`}
            >
                {isOpen ? <X size={28} className="text-white" /> : (
                    <>
                        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                        <MessageSquare size={28} className="text-white" />
                    </>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        className="absolute bottom-24 right-0 w-[360px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-140px)] bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.2)] border border-gray-100 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-dark p-6 pb-12 relative shrink-0">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full" />
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-16 h-16 bg-white rounded-[24px] p-2.5 shadow-2xl flex items-center justify-center border border-white/10 ring-4 ring-white/5">
                                    <img src={aimsLogo} alt="Logo" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-white font-black text-[13px] uppercase tracking-[0.2em] mb-0.5">AIMS Assistant</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-primary text-[10px] font-black uppercase tracking-widest">Counselor Online</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                                    className="ml-auto bg-white/10 hover:bg-white/20 p-2 rounded-xl text-white transition-all flex items-center gap-2"
                                >
                                    <Languages size={16} />
                                    <span className="text-[9px] font-black uppercase">{language === 'en' ? 'HI' : 'EN'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-8 bg-gray-50/20 -mt-8 rounded-t-[40px] relative z-20">
                            {messages.map((msg) => (
                                <div key={msg.id} className="space-y-4">
                                    <div className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] p-5 rounded-[30px] text-[13px] font-semibold leading-relaxed shadow-sm whitespace-pre-line ${msg.type === 'user'
                                            ? 'bg-primary text-white rounded-tr-none'
                                            : 'bg-white text-dark border border-gray-100 rounded-tl-none shadow-dark/5'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                    {msg.type === 'bot' && msg.suggestions && (
                                        <div className="grid grid-cols-1 gap-2 pl-4 max-w-[90%]">
                                            {msg.suggestions.map((s, i) => (
                                                <motion.button
                                                    key={i}
                                                    whileHover={{ x: 5 }}
                                                    onClick={() => handleAction(s)}
                                                    className="flex items-center justify-between px-6 py-4 bg-white border border-gray-100 rounded-2xl text-[11px] font-black text-gray-500 uppercase tracking-widest hover:border-primary hover:text-primary shadow-sm hover:shadow-md transition-all text-left"
                                                >
                                                    {s} <ChevronRight size={14} className="text-primary opacity-40 group-hover:opacity-100" />
                                                </motion.button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-5 rounded-[30px] rounded-tl-none border border-gray-100 flex gap-2">
                                        <div className="w-1.5 h-1.5 bg-primary/30 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1.5 h-1.5 bg-primary/90 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-8 bg-white border-t border-gray-50 pt-6">
                            <form onSubmit={onSend} className="flex gap-3">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={language === 'en' ? "Type your message..." : "अपना संदेश लिखें..."}
                                    className="flex-grow bg-gray-50 border border-gray-100 px-8 py-5 rounded-[25px] text-[13px] font-bold focus:outline-none focus:border-primary transition-all shadow-inner"
                                />
                                <button type="submit" className="bg-primary text-white w-14 h-14 rounded-[25px] flex items-center justify-center hover:bg-dark transition-all shadow-lg shadow-primary/20">
                                    <Send size={20} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chatbot;
