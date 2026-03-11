import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, BookOpen, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const AdminCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        course_name: '',
        duration: '',
        description: ''
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "courses"), (snapshot) => {
            setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        }, (err) => {
            console.error('Error fetching courses:', err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            if (editingId) {
                await updateDoc(doc(db, "courses", editingId), {
                    course_name: formData.course_name,
                    duration: formData.duration,
                    description: formData.description
                });
            } else {
                await addDoc(collection(db, "courses"), {
                    course_name: formData.course_name,
                    duration: formData.duration,
                    description: formData.description
                });
            }
            resetForm();
        } catch (err) {
            alert('Error: ' + err.message);
        } finally {
            setActionLoading(false);
        }
    };

    const handleEdit = (course) => {
        setFormData({
            course_name: course.course_name,
            duration: course.duration,
            description: course.description
        });
        setEditingId(course.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this course? All associated departments might be affected.')) return;
        try {
            await deleteDoc(doc(db, "courses", id));
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    const resetForm = () => {
        setFormData({ course_name: '', duration: '', description: '' });
        setEditingId(null);
        setShowForm(false);
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 text-dark">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">Academic Courses</h2>
                    <p className="text-sm text-gray-500 font-medium italic">Define programs like B.Pharm, D.Pharm</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                >
                    {showForm ? <><X size={20} /> Close</> : <><Plus size={20} /> Add Course</>}
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/50 animate-in slide-in-from-top duration-300">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Course Name</label>
                                <input
                                    type="text" name="course_name" required
                                    value={formData.course_name} onChange={handleInputChange}
                                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all font-bold"
                                    placeholder="e.g. Bachelor of Pharmacy"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Duration</label>
                                <input
                                    type="text" name="duration" required
                                    value={formData.duration} onChange={handleInputChange}
                                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all font-bold"
                                    placeholder="e.g. 4 Years"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Description</label>
                            <textarea
                                name="description" rows="4"
                                value={formData.description} onChange={handleInputChange}
                                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all font-bold"
                                placeholder="Describe the course details..."
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit" disabled={actionLoading}
                                className="flex-grow bg-dark text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-black/10"
                            >
                                {actionLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                {editingId ? 'Update Program' : 'Save Program'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <BookOpen size={48} className="mx-auto text-gray-200 mb-4" />
                        <p className="text-gray-400 font-bold italic tracking-tighter">No courses defined yet.</p>
                    </div>
                ) : (
                    courses.map((course) => (
                        <div key={course.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative group">
                            <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(course)} className="p-2.5 bg-secondary/10 text-secondary rounded-xl hover:bg-secondary hover:text-white transition-all"><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(course.id)} className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                            </div>
                            <h3 className="text-2xl font-black text-dark mb-1 pr-16">{course.course_name}</h3>
                            <span className="inline-block bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4">
                                Duration: {course.duration}
                            </span>
                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{course.description}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminCourses;
