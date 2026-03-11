import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, AlertCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import aimsLogo from '../assets/aims_logo.png';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoggingIn(true);
        const success = await login(email, password);
        if (success) {
            navigate('/admin/dashboard');
        } else {
            setError("Invalid credentials. Please try again.");
        }
        setIsLoggingIn(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-accent/20 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-primary/10"
            >
                <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 p-3 shadow-2xl border border-primary/10 overflow-hidden ring-8 ring-primary/5">
                        <img src={aimsLogo} alt="AIMS Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-3xl font-bold text-dark">Admin Access</h1>
                    <p className="text-gray-500 mt-2">Sign in to manage AIMS campus portal</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Admin Email</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-accent/30 border border-transparent focus:border-primary rounded-xl outline-none transition-all"
                                placeholder="Enter admin email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="password"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-accent/30 border border-transparent focus:border-primary rounded-xl outline-none transition-all"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2"
                    >
                        {isLoggingIn ? <Loader className="animate-spin" /> : "Login now"}
                    </button>
                    <div className="text-center">
                        <a href="/" className="text-sm text-primary hover:underline">Return to Home</a>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
