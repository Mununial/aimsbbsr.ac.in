import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, X, UserCircle2, Loader2 } from 'lucide-react';
import { db, storage } from '../firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const AdminFaculty = () => {
    const [faculty, setFaculty] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        qualification: '',
        department_id: '',
        photo: null
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        const unsubscribeFac = onSnapshot(collection(db, "faculty"), (snapshot) => {
            setFaculty(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        }, (err) => console.error(err));

        const unsubscribeDept = onSnapshot(collection(db, "departments"), (snapshot) => {
            setDepartments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }, (err) => console.error(err));

        return () => {
            unsubscribeFac();
            unsubscribeDept();
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setActionLoading(true);

        try {
            let photoUrl = formData.photo;
            if (formData.newPhoto) {
                const formDataUpload = new FormData();
                formDataUpload.append('image', formData.newPhoto);
                
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/api/upload`, {
                    method: 'POST',
                    body: formDataUpload
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Upload failed');
                photoUrl = data.url;
            }

            const dept = departments.find(d => d.id === formData.department_id);
            const department_name = dept ? dept.department_name : '';

            if (editingId) {
                await updateDoc(doc(db, "faculty", editingId), {
                    name: formData.name,
                    designation: formData.designation,
                    qualification: formData.qualification,
                    department_id: formData.department_id,
                    department_name: department_name,
                    photo: photoUrl
                });
            } else {
                await addDoc(collection(db, "faculty"), {
                    name: formData.name,
                    designation: formData.designation,
                    qualification: formData.qualification,
                    department_id: formData.department_id,
                    department_name: department_name,
                    photo: photoUrl || null
                });
            }
            setShowForm(false);
            setEditingId(null);
            setFormData({ name: '', designation: '', qualification: '', department_id: '', photo: null, newPhoto: null });
        } catch (err) {
            alert('Error saving faculty: ' + err.message);
        } finally {
            setActionLoading(false);
        }
    };

    const handleEdit = (member) => {
        setFormData({
            name: member.name,
            designation: member.designation,
            qualification: member.qualification,
            department_id: member.department_id,
            photo: member.photo,
            newPhoto: null
        });
        setEditingId(member.id);
        setShowForm(true);
    };

    const handleDelete = async (member) => {
        if (!window.confirm('Are you sure you want to delete this faculty member?')) return;

        try {
            if (member.photo && member.photo.includes('firebase')) {
                try {
                    const fileRef = ref(storage, member.photo);
                    await deleteObject(fileRef);
                } catch (e) { console.error("Could not delete legacy photo", e); }
            }
            await deleteDoc(doc(db, "faculty", member.id));
        } catch (err) {
            alert('Error deleting faculty: ' + err.message);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary mb-4" size={40} />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Faculty Data...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-dark tracking-tight uppercase">Faculty Management</h2>
                    <p className="text-sm text-gray-400 font-medium">Manage and update teaching staff</p>
                </div>
                <button
                    onClick={() => {
                        if (showForm) {
                            setShowForm(false);
                            setEditingId(null);
                            setFormData({ name: '', designation: '', qualification: '', department_id: '', photo: null });
                        } else {
                            setShowForm(true);
                        }
                    }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${showForm ? 'bg-gray-100 text-gray-500' : 'bg-primary text-white shadow-xl shadow-primary/20 hover:scale-105 active:scale-95'}`}
                >
                    {showForm ? <><X size={20} /> Cancel</> : <><Plus size={20} /> Add Faculty</>}
                </button>
            </div>

            {showForm && (
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-inner animate-in slide-in-from-top duration-300">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4 md:col-span-2 text-center mb-4">
                            <h3 className="text-xl font-black uppercase text-dark">
                                {editingId ? 'Edit Faculty Details' : 'Register New Faculty'}
                            </h3>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Full Name</label>
                            <input
                                type="text" name="name" required
                                value={formData.name} onChange={handleInputChange}
                                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold"
                                placeholder="e.g. Dr. Rajesh Kumar"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Designation</label>
                            <input
                                type="text" name="designation" required
                                value={formData.designation} onChange={handleInputChange}
                                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold"
                                placeholder="e.g. Professor & Head"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Qualification</label>
                            <input
                                type="text" name="qualification" required
                                value={formData.qualification} onChange={handleInputChange}
                                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold"
                                placeholder="e.g. M.Pharm, Ph.D"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Department</label>
                            <select
                                name="department_id" required
                                value={formData.department_id} onChange={handleInputChange}
                                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold bg-white"
                            >
                                <option value="">Select Department</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.id}>{dept.department_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-widest ml-1">Photo Upload</label>
                            <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 border-dashed rounded-2xl hover:border-primary transition-all">
                                <input type="file" onChange={(e) => setFormData({ ...formData, newPhoto: e.target.files[0] })} className="text-sm font-bold text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-primary/10 file:text-primary hover:file:bg-primary/20 pointer-cursor" />
                            </div>
                        </div>
                        <div className="md:col-span-2 pt-4">
                            <button
                                type="submit" disabled={actionLoading}
                                className="w-full bg-dark text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-black/10 disabled:opacity-50"
                            >
                                {actionLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                {actionLoading ? 'Saving...' : 'Save Faculty Member'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {faculty.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <UserCircle2 size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-400 font-bold">No faculty members found. Click 'Add Faculty' to get started.</p>
                    </div>
                ) : (
                    faculty.map((member) => (
                        <div key={member.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
                            <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
                                {member.photo ? (
                                    <img
                                        src={member.photo}
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-blue-50">
                                        <UserCircle2 size={64} className="text-primary/20" />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                    <button
                                        onClick={() => handleEdit(member)}
                                        className="p-3 bg-secondary text-white rounded-xl shadow-lg hover:bg-secondary-dark transition-colors"
                                    >
                                        <Edit size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member)}
                                        className="p-3 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-dark mb-1">{member.name}</h3>
                                <p className="text-primary font-black uppercase tracking-widest text-[10px] mb-3">{member.designation}</p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                        <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                        {member.qualification}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 italic">
                                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                                        {member.department_name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminFaculty;
