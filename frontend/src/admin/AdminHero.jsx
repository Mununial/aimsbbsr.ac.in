import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Save, X, Image as ImageIcon, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const AdminHero = () => {
    const [slides, setSlides] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newSlide, setNewSlide] = useState({ title: '', subtitle: '', description: '', image: null, order_id: 0, media_type: 'image' });
    const { user } = useAuth();
    useEffect(() => {
        // Removed orderBy("order_id", "asc") to prevent missing index errors
        const q = query(collection(db, "hero"));
        let isMounted = true;
        const fallbackTimer = setTimeout(() => {
            if (isMounted) {
                setLoading(false);
                console.warn("Firebase took too long to respond, forcing loading to false.");
            }
        }, 5000);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (snapshot.empty) {
                setSlides([]);
                if (isMounted) setLoading(false);
                clearTimeout(fallbackTimer);
                return;
            }
            // Sort client-side instead
            const heroData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                                 .sort((a, b) => (Number(a.order_id) || 0) - (Number(b.order_id) || 0));
            setSlides(heroData);
            if (isMounted) setLoading(false);
            clearTimeout(fallbackTimer);
        }, (error) => {
            console.error("Error fetching hero slides:", error);
            setSlides([]);
            if (isMounted) setLoading(false);
            clearTimeout(fallbackTimer);
            alert("Error connecting to database. Please check your internet or Firebase configuration.");
        });

        return () => {
            isMounted = false;
            clearTimeout(fallbackTimer);
            unsubscribe();
        };
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            let image_url = null;
            if (newSlide.image) {
                const formData = new FormData();
                formData.append('image', newSlide.image);
                
                try {
                    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                    const response = await fetch(`${API_URL}/api/upload`, {
                        method: 'POST',
                        body: formData
                    });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data.message || 'Upload failed');
                    image_url = data.url;
                } catch (error) {
                    throw new Error("Cloudinary upload failed: " + error.message);
                }
            }

            await addDoc(collection(db, "hero"), {
                title: newSlide.title,
                subtitle: newSlide.subtitle,
                description: newSlide.description,
                order_id: Number(newSlide.order_id) || 0,
                media_type: newSlide.media_type || 'image',
                image_url: image_url
            });

            setIsAdding(false);
            setNewSlide({ title: '', subtitle: '', description: '', image: null, order_id: 0, media_type: 'image' });
        } catch (err) {
            alert("Error adding slide: " + err.message);
        }
    };

    const handleDelete = async (slide) => {
        if (!window.confirm("Delete this hero slide?")) return;
        try {
            if (slide.image_url && slide.image_url.includes('firebase')) {
                try {
                    const fileRef = ref(storage, slide.image_url);
                    await deleteObject(fileRef);
                } catch(e) { console.error("Could not delete legacy image from storage", e); }
            }
            await deleteDoc(doc(db, "hero", slide.id));
        } catch (err) {
            alert("Error deleting slide");
        }
    };

    const handleUpdate = async (id, updatedSlide) => {
        try {
            let image_url = updatedSlide.image_url;
            
            if (updatedSlide.newImage) {
                const formData = new FormData();
                formData.append('image', updatedSlide.newImage);
                
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/api/upload`, {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Upload failed');
                image_url = data.url;
            }

            await updateDoc(doc(db, "hero", id), {
                title: updatedSlide.title,
                subtitle: updatedSlide.subtitle,
                description: updatedSlide.description,
                order_id: Number(updatedSlide.order_id),
                media_type: updatedSlide.media_type,
                image_url: image_url
            });

            setIsEditing(null);
        } catch (err) {
            console.error(err);
            alert("Error updating slide: " + err.message);
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-400 font-bold uppercase tracking-widest">Loading Slides...</div>;

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-center bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                <div>
                    <h2 className="text-3xl font-black text-dark uppercase tracking-tighter mb-1">Hero Slider</h2>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Manage your homepage background images/videos and titles</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-primary hover:bg-dark text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all flex items-center gap-3 shadow-xl shadow-primary/20"
                >
                    <Plus size={18} /> Add New Content
                </button>
            </div>

            {isAdding && (
                <div className="fixed inset-0 bg-dark/80 backdrop-blur-md z-[9999] flex items-center justify-center p-6 text-left">
                    <div className="bg-white w-full max-w-xl rounded-[48px] overflow-hidden shadow-2xl transition-all p-10">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-2xl font-black uppercase tracking-tighter">Add <span className="text-primary italic">New Content</span></h3>
                            <button onClick={() => setIsAdding(false)} className="bg-gray-100 p-3 rounded-2xl hover:bg-dark hover:text-white transition-all"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleAdd} className="space-y-6">
                            <div className="flex bg-gray-100 p-1.5 rounded-2xl">
                                <button
                                    type="button"
                                    onClick={() => setNewSlide({ ...newSlide, media_type: 'image' })}
                                    className={`flex-1 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${newSlide.media_type === 'image' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
                                >
                                    Photo
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setNewSlide({ ...newSlide, media_type: 'video' })}
                                    className={`flex-1 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${newSlide.media_type === 'video' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
                                >
                                    Video
                                </button>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Main Title</label>
                                <input
                                    type="text" required placeholder="Ex: Ayush Institute of Medical Sciences"
                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-dark focus:ring-2 focus:ring-primary transition-all"
                                    onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Subtitle (Mini Tag)</label>
                                <input
                                    type="text" placeholder="Ex: Excellence in Pharmaceutical Education"
                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-dark focus:ring-2 focus:ring-primary transition-all"
                                    onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Description</label>
                                <textarea
                                    placeholder="Ex: Admissions Open for 2026-27..."
                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-dark focus:ring-2 focus:ring-primary transition-all h-32"
                                    onChange={(e) => setNewSlide({ ...newSlide, description: e.target.value })}
                                />
                            </div>
                            <div className="row grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Order ID</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-dark focus:ring-2 focus:ring-primary transition-all"
                                        onChange={(e) => setNewSlide({ ...newSlide, order_id: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Upload {newSlide.media_type}</label>
                                    <div className="relative group overflow-hidden bg-gray-50 rounded-2xl h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 hover:border-primary transition-all cursor-pointer min-h-[50px]">
                                        <input
                                            type="file" required accept={newSlide.media_type === 'image' ? "image/*" : "video/*"}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={(e) => setNewSlide({ ...newSlide, image: e.target.files[0] })}
                                        />
                                        <Upload className={`text-gray-300 group-hover:text-primary transition-colors ${newSlide.image ? 'w-6 h-6' : 'w-8 h-8'}`} />
                                        {!newSlide.image && <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Add File</p>}
                                    </div>
                                </div>
                            </div>
                            <button className="w-full bg-dark text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-dark/10">Publish Content</button>
                        </form>
                    </div>
                </div>
            )}

            {isEditing && (
                <div className="fixed inset-0 bg-dark/80 backdrop-blur-md z-[9999] flex items-center justify-center p-6 text-dark text-left">
                    <div className="bg-white w-full max-w-xl rounded-[48px] overflow-hidden shadow-2xl p-10">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-2xl font-black uppercase tracking-tighter text-dark">Edit <span className="text-primary italic">Hero Content</span></h3>
                            <button onClick={() => setIsEditing(null)} className="bg-gray-100 p-3 rounded-2xl hover:bg-dark hover:text-white transition-all"><X size={20} /></button>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(isEditing.id, isEditing); }} className="space-y-6">
                            <div className="flex bg-gray-100 p-1.5 rounded-2xl">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing({ ...isEditing, media_type: 'image' })}
                                    className={`flex-1 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${isEditing.media_type === 'image' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
                                >
                                    Photo
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing({ ...isEditing, media_type: 'video' })}
                                    className={`flex-1 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${isEditing.media_type === 'video' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
                                >
                                    Video
                                </button>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Main Title</label>
                                <input
                                    type="text" required value={isEditing.title}
                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-dark focus:ring-2 focus:ring-primary transition-all"
                                    onChange={(e) => setIsEditing({ ...isEditing, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Subtitle</label>
                                <input
                                    type="text" value={isEditing.subtitle}
                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-dark focus:ring-2 focus:ring-primary transition-all"
                                    onChange={(e) => setIsEditing({ ...isEditing, subtitle: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Description</label>
                                <textarea
                                    value={isEditing.description}
                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-dark focus:ring-2 focus:ring-primary transition-all h-32"
                                    onChange={(e) => setIsEditing({ ...isEditing, description: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Order</label>
                                    <input
                                        type="number" value={isEditing.order_id}
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-dark focus:ring-2 focus:ring-primary transition-all"
                                        onChange={(e) => setIsEditing({ ...isEditing, order_id: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Update File (Optional)</label>
                                    <div className="relative group overflow-hidden bg-gray-50 rounded-2xl h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 hover:border-primary transition-all cursor-pointer min-h-[50px]">
                                        <input
                                            type="file" accept={isEditing.media_type === 'image' ? "image/*" : "video/*"}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={(e) => setIsEditing({ ...isEditing, newImage: e.target.files[0] })}
                                        />
                                        <Upload className={`text-gray-300 group-hover:text-primary transition-colors ${isEditing.newImage ? 'w-6 h-6' : 'w-8 h-8'}`} />
                                        {!isEditing.newImage && <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Change File</p>}
                                    </div>
                                </div>
                            </div>
                            <button className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-dark transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-3">
                                <Save size={20} /> Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {slides.map((slide) => (
                    <div key={slide.id} className="group overflow-hidden bg-white border border-gray-100 rounded-[48px] shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700">
                        <div className="relative h-64 overflow-hidden">
                            {slide.media_type === 'video' ? (
                                <video
                                    src={slide.image_url}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                    muted loop autoPlay
                                    playsInline
                                />
                            ) : (
                                <img
                                    src={slide.image_url || 'https://via.placeholder.com/800x400?text=No+Image'}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                    alt={slide.title}
                                />
                            )}
                            <div className="absolute top-6 right-6 flex gap-3 z-30">
                                <button onClick={() => handleDelete(slide)} className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-red-500 rounded-2xl flex items-center justify-center transition-all">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent flex items-end p-8">
                                <div className="max-w-md">
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">{slide.subtitle}</span>
                                    <h4 className="text-xl font-black text-white uppercase tracking-tighter leading-none mt-2">{slide.title}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 space-y-4">
                            <p className="text-gray-400 text-xs font-bold leading-relaxed uppercase tracking-widest line-clamp-2">{slide.description}</p>
                            <div className="pt-4 border-t border-gray-50 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <span>Order: {slide.order_id}</span>
                                <button
                                    onClick={() => setIsEditing(slide)}
                                    className="text-primary font-black uppercase tracking-widest italic cursor-pointer hover:underline flex items-center gap-2"
                                >
                                    Edit Slide <Edit3 size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {slides.length === 0 && (
                <div className="py-40 flex flex-col items-center justify-center bg-gray-50 rounded-[80px] border border-dashed border-gray-200 text-center">
                    <ImageIcon className="text-gray-200 mb-8" size={80} />
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-300">No slides found</h3>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2 max-w-xs leading-loose">Add your first hero slide to welcome visitors to AIMS Bhubaneswar.</p>
                </div>
            )}
        </div>
    );
};

export default AdminHero;
