import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, Building, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const AdminDepartments = () => {
    const [departments, setDepartments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        department_name: '',
        course_id: '',
        description: ''
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        const unsubscribeDept = onSnapshot(collection(db, "departments"), (snapshot) => {
            setDepartments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        }, (err) => {
            console.error('Error fetching departments:', err);
            setLoading(false);
        });

        const unsubscribeCourse = onSnapshot(collection(db, "courses"), (snapshot) => {
            setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }, (err) => console.error(err));

        return () => {
            unsubscribeDept();
            unsubscribeCourse();
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setActionLoading(true);

        const course = courses.find(c => c.id === formData.course_id);
        const course_name = course ? course.course_name : '';

        try {
            if (editingId) {
                await updateDoc(doc(db, "departments", editingId), {
                    department_name: formData.department_name,
                    course_id: formData.course_id,
                    course_name: course_name,
                    description: formData.description
                });
            } else {
                await addDoc(collection(db, "departments"), {
                    department_name: formData.department_name,
                    course_id: formData.course_id,
                    course_name: course_name,
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

    const handleEdit = (dept) => {
        setFormData({
            department_name: dept.department_name,
            course_id: dept.course_id || '',
            description: dept.description || ''
        });
        setEditingId(dept.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this department? Faculty in this department will be affected.')) return;
        try {
            await deleteDoc(doc(db, "departments", id));
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    const resetForm = () => {
        setFormData({ department_name: '', course_id: '', description: '' });
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
                    <h2 className="text-2xl font-black uppercase tracking-tight">Academic Departments</h2>
                    <p className="text-sm text-gray-500 font-medium italic">Manage departments and subdivisions</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                >
                    {showForm ? <><X size={20} /> Close</> : <><Plus size={20} /> Add Department</>}
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl animate-in slide-in-from-top duration-300">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Department Name</label>
                                <input
                                    type="text" name="department_name" required
                                    value={formData.department_name} onChange={handleInputChange}
                                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all font-bold"
                                    placeholder="e.g. Pharmaceutics"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Associated Program</label>
                                <select
                                    name="course_id" required
                                    value={formData.course_id} onChange={handleInputChange}
                                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all font-bold"
                                >
                                    <option value="">Select Course</option>
                                    {courses.map(course => (
                                        <option key={course.id} value={course.id}>{course.course_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Description</label>
                            <textarea
                                name="description" rows="3"
                                value={formData.description} onChange={handleInputChange}
                                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all font-bold"
                                placeholder="..."
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit" disabled={actionLoading}
                                className="flex-grow bg-dark text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-black/10"
                            >
                                {actionLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                {editingId ? 'Update Department' : 'Save Department'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {departments.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <Building size={48} className="mx-auto text-gray-200 mb-4" />
                        <p className="text-gray-400 font-bold italic">No departments found.</p>
                    </div>
                ) : (
                    departments.map((dept) => (
                        <div key={dept.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative group flex flex-col justify-between">
                            <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(dept)} className="p-2 bg-secondary/10 text-secondary rounded-xl hover:bg-secondary hover:text-white transition-all"><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(dept.id)} className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-dark mb-1 pr-16">{dept.department_name}</h3>
                                <p className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-4">Under: {dept.course_name || 'N/A'}</p>
                                <p className="text-gray-500 text-sm italic">{dept.description || 'No description provided.'}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminDepartments;
