import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Trash2, Edit, Plus, X, Check, Search, Calendar } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const AdminNotices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNotice, setEditingNotice] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [status, setStatus] = useState({ message: '', error: false });

    useEffect(() => {
        const q = query(collection(db, "notices"));
        let isMounted = true;
        const fallbackTimer = setTimeout(() => {
            if (isMounted) {
                setLoading(false);
                setStatus({ message: "Firebase connection taking too long. Displaying empty state.", error: true });
                console.warn("Firebase took too long to respond, forcing loading to false.");
            }
        }, 5000);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (snapshot.empty) {
                setNotices([]);
                if (isMounted) setLoading(false);
                clearTimeout(fallbackTimer);
                return;
            }
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                             .sort((a, b) => new Date(b.date) - new Date(a.date));
            setNotices(data);
            if (isMounted) setLoading(false);
            clearTimeout(fallbackTimer);
        }, (error) => {
            console.error("Error fetching notices:", error);
            setNotices([]);
            if (isMounted) setLoading(false);
            clearTimeout(fallbackTimer);
            setStatus({ message: "Error connecting to database", error: true });
        });

        return () => {
            isMounted = false;
            clearTimeout(fallbackTimer);
            unsubscribe();
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingNotice) {
                await updateDoc(doc(db, "notices", editingNotice.id), {
                    title: formData.title,
                    description: formData.description
                });
                setStatus({ message: "Notice updated successfully", error: false });
            } else {
                await addDoc(collection(db, "notices"), {
                    title: formData.title,
                    description: formData.description,
                    date: new Date().toISOString()
                });
                setStatus({ message: "Notice added successfully", error: false });
            }
            setIsModalOpen(false);
            setEditingNotice(null);
            setFormData({ title: '', description: '' });
            setTimeout(() => setStatus({ message: '', error: false }), 3000);
        } catch (err) {
            console.error(err);
            setStatus({ message: "Operation failed", error: true });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this notice?")) return;
        try {
            await deleteDoc(doc(db, "notices", id));
            setStatus({ message: "Notice deleted", error: false });
            setTimeout(() => setStatus({ message: '', error: false }), 3000);
        } catch (err) {
            console.error(err);
            setStatus({ message: "Delete failed", error: true });
        }
    };

    const openEditModal = (notice) => {
        setEditingNotice(notice);
        setFormData({ title: notice.title, description: notice.description });
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-dark">Notice Management</h2>
                    <p className="text-gray-500">Add, edit, or delete official announcements.</p>
                </div>
                <button
                    onClick={() => { setIsModalOpen(true); setEditingNotice(null); setFormData({ title: '', description: '' }); }}
                    className="bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/30 flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-95"
                >
                    <Plus size={20} /> New Notice
                </button>
            </div>

            {/* Status Alerts */}
            <AnimatePresence>
                {status.message && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`p-4 rounded-xl flex items-center gap-3 font-medium ${status.error ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}
                    >
                        {status.error ? <X size={20} /> : <Check size={20} />}
                        {status.message}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content List */}
            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl max-w-md">
                        <Search size={18} className="text-gray-400" />
                        <input type="text" placeholder="Search notices..." className="bg-transparent border-none focus:ring-0 text-sm w-full" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                                <th className="px-8 py-5">Date</th>
                                <th className="px-8 py-5">Notice Title</th>
                                <th className="px-8 py-5">Description</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="4" className="text-center py-20 text-gray-400">Loading records...</td></tr>
                            ) : notices.length > 0 ? (
                                notices.map((n) => (
                                    <tr key={n.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-gray-500 font-medium">
                                                <Calendar size={14} className="text-gray-300" />
                                                {new Date(n.date).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="font-bold text-dark">{n.title}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-gray-500 text-sm truncate max-w-xs">{n.description}</p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(n)}
                                                    className="p-2 border border-gray-100 rounded-lg hover:bg-white hover:shadow-md text-blue-500 transition-all"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(n.id)}
                                                    className="p-2 border border-blue-50/10 rounded-lg hover:bg-red-50 text-red-500 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" className="text-center py-20 text-gray-400">No notices found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-3xl p-8 shadow-2xl relative z-10 w-full max-w-lg"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold flex items-center gap-3">
                                    <div className="bg-primary/10 p-2 rounded-xl text-primary"><Bell size={24} /></div>
                                    {editingNotice ? 'Edit Notice' : 'New Announcement'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                                    <X size={24} className="text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Notice Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="e.g. Admission 2026-27 update"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Description</label>
                                    <textarea
                                        required
                                        rows="5"
                                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                        placeholder="Write full announcement details here..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    ></textarea>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-grow bg-gray-100 text-gray-600 py-3.5 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-grow bg-primary text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all"
                                    >
                                        {editingNotice ? 'Save Changes' : 'Publish Notice'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminNotices;
