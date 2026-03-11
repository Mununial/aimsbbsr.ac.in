import { useState, useEffect } from 'react';
import { Plus, Trash2, X, Image as ImageIcon, Loader2, UploadCloud } from 'lucide-react';
import { db, storage } from '../firebase';
import { collection, addDoc, doc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const AdminGallery = () => {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        category: 'Campus',
        title: '',
        description: '',
        image: null
    });

    const categories = ['Campus', 'Laboratories', 'Events', 'Seminars'];
    const token = localStorage.getItem('token');

    useEffect(() => {
        const q = query(collection(db, "gallery"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                             .sort((a,b) => new Date(b.created_at || Date.now()) - new Date(a.created_at || Date.now()));
            setGallery(data);
            setLoading(false);
        }, (error) => {
            console.error('Error fetching gallery:', error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image) return alert('Please select an image');

        setActionLoading(true);

        try {
            const formDataUpload = new FormData();
            formDataUpload.append('image', formData.image);
            
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/upload`, {
                method: 'POST',
                body: formDataUpload
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Upload failed');
            const image_url = data.url;

            await addDoc(collection(db, "gallery"), {
                category: formData.category,
                title: formData.title,
                description: formData.description,
                image_url: image_url,
                created_at: new Date().toISOString()
            });

            setShowForm(false);
            setFormData({ category: 'Campus', title: '', description: '', image: null });
        } catch (err) {
            alert('Error: ' + err.message);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async (photo) => {
        if (!window.confirm('Remove this photo from the gallery?')) return;
        try {
            if (photo.image_url && photo.image_url.includes('firebase')) {
                try {
                    const fileRef = ref(storage, photo.image_url);
                    await deleteObject(fileRef);
                } catch(e) { console.error("Could not delete legacy image from storage", e); }
            }
            await deleteDoc(doc(db, "gallery", photo.id));
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
            <p className="text-gray-400 font-bold mt-4 uppercase text-[10px] tracking-widest">AIMS Gallery Loading...</p>
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-700 text-dark">
            <div className="flex justify-between items-center bg-[#1e2a3a] p-8 rounded-3xl text-white shadow-2xl">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Photo Gallery</h2>
                    <p className="text-blue-200/60 text-xs font-bold uppercase tracking-widest mt-1">Campus & Events Memories</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${showForm ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary-hover shadow-xl shadow-primary/20 hover:scale-105 active:scale-95'}`}
                >
                    {showForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Upload Photo</>}
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-10 rounded-3xl border-4 border-dashed border-gray-100 animate-in zoom-in duration-300">
                    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-8">
                        <div className="text-center">
                            <UploadCloud className="mx-auto text-primary/20 mb-4" size={64} />
                            <h3 className="text-xl font-black uppercase tracking-tight">Add New Memory</h3>
                            <p className="text-gray-400 text-xs font-bold uppercase italic">Select category and upload high-res image</p>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-2">Featured Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="E.g. Annual Sports Meet 2026"
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all font-bold text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-2">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all font-bold text-sm"
                                >
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-2">Image File</label>
                                <input
                                    type="file" required onChange={handleFileChange}
                                    className="w-full text-xs font-bold text-gray-400 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] ml-2">Short Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="E.g. Students participating in the annual science exhibition..."
                                rows="3"
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all font-bold text-sm resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit" disabled={actionLoading}
                            className="w-full bg-dark text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 hover:bg-black transition-all shadow-2xl shadow-black/10 disabled:opacity-50"
                        >
                            {actionLoading ? <Loader2 className="animate-spin" size={20} /> : <ImageIcon size={20} />}
                            {actionLoading ? 'Uploading...' : 'Publish to Gallery'}
                        </button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {gallery.length === 0 ? (
                    <div className="col-span-full py-32 text-center bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-100">
                        <ImageIcon size={64} className="mx-auto text-gray-200 mb-6" />
                        <h4 className="text-gray-400 font-black uppercase tracking-widest text-sm">Gallery is empty</h4>
                        <p className="text-gray-300 text-xs font-bold uppercase tracking-tighter mt-2 italic">Start uploading to showcase your institute</p>
                    </div>
                ) : (
                    gallery.map((img) => (
                        <div key={img.id} className="group relative aspect-square rounded-[32px] overflow-hidden shadow-lg border-2 border-white hover:border-primary/30 hover:shadow-2xl transition-all duration-500">
                            <img
                                src={img.image_url}
                                alt={img.title || img.category}
                                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                <span className="bg-primary/90 text-white text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full mb-2 inline-block shadow-lg">
                                    {img.category}
                                </span>
                                <h5 className="text-white font-black uppercase text-[10px] tracking-tight truncate">{img.title || "No Title"}</h5>
                                <p className="text-gray-300 text-[8px] line-clamp-1 italic mt-1 font-bold">{img.description || "No description provided"}</p>
                            </div>
                            <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <button
                                    onClick={() => handleDelete(img)}
                                    className="p-3 bg-red-500/90 text-white rounded-2xl hover:bg-red-600 shadow-xl backdrop-blur-sm transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminGallery;
