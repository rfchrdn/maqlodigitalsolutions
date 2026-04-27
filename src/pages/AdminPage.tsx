import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, serverTimestamp, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../lib/firebase';
import { Project, ProjectMedia } from '../types';
import { Plus, Trash2, Edit, LogOut, ExternalLink, Github, Loader2, ShieldCheck, Upload, X as CloseIcon, Check } from 'lucide-react';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    link: '',
    github: '',
    techStack: [] as string[],
    media: [] as ProjectMedia[]
  });

  const techStackOptions = [
    'Next.js', 'React', 'Laravel', 'CodeIgniter', 'Shopify', 'WordPress', 
    'Tailwind CSS', 'Node.js', 'PHP', 'MySQL', 'Firebase', 'TypeScript',
    'PostgreSQL', 'Python', 'Django', 'Vue.js', 'Express', 'MongoDB'
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u) fetchProjects();
    });
    return () => unsubscribe();
  }, []);

  enum OperationType {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
    LIST = 'list',
    GET = 'get',
    WRITE = 'write',
  }

  function handleFirestoreError(error: any, operationType: OperationType, path: string | null) {
    const errInfo = {
      error: error instanceof Error ? error.message : String(error),
      authInfo: {
        userId: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        emailVerified: auth.currentUser?.emailVerified,
      },
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
  }

  const fetchProjects = async () => {
    try {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      setProjects(data);
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, 'projects');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      // Username 'admin' mapped to admin@maqlo.com as requested
      await signInWithEmailAndPassword(auth, `${username}@maqlo.com`, password);
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password provider is not enabled in Firebase Console. Please enable it in the Authentication tab.');
      } else if (err.code === 'auth/user-not-found') {
        setError('Admin account not found. Please click "Initialize Admin" below if this is the first time.');
      } else {
        setError('Invalid credentials. Hint: use admin/P4ssword');
      }
    }
  };

  const handleInitializeAdmin = async () => {
    setError('');
    setLoading(true);
    try {
      // 1. Create the Auth User
      // Note: This matches the credentials requested: admin / P4ssword
      const userCredential = await createUserWithEmailAndPassword(auth, 'admin@maqlo.com', 'P4ssword');
      
      // 2. Create the User Document in Firestore with admin role
      // This is required by our security rules to allow writes
      try {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: 'admin@maqlo.com',
          role: 'admin'
        });
      } catch (firestoreErr) {
        handleFirestoreError(firestoreErr, OperationType.CREATE, `users/${userCredential.user.uid}`);
      }
      
      alert('Admin account initialized successfully! You can now login with admin / P4ssword');
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        setError('ERROR: You must enable "Email/Password" in the Authentication tab of your Firebase Console first.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Admin account already exists. Try logging in.');
      } else {
        setError('Error: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingMedia = (index: number) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const toggleTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }));
  };

  const uploadFiles = async (): Promise<ProjectMedia[]> => {
    const uploadedMedia: ProjectMedia[] = [];
    
    for (const file of selectedFiles) {
      const storageRef = ref(storage, `portfolio/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      uploadedMedia.push({
        url,
        type: file.type.startsWith('video/') ? 'video' : 'image'
      });
    }
    
    return uploadedMedia;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0 && formData.media.length === 0) {
      setError('Please upload at least one image or video');
      return;
    }

    setIsUploading(true);
    const path = isEditing ? `projects/${isEditing}` : 'projects';
    
    try {
      // 1. Upload new files if any
      const newMedia = await uploadFiles();
      
      // 2. Combine with existing media
      const finalMedia = [...formData.media, ...newMedia];

      const projectData = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        link: formData.link,
        github: formData.github,
        techStack: formData.techStack,
        media: finalMedia,
        imageUrl: finalMedia.find(m => m.type === 'image')?.url || finalMedia[0]?.url, // Fallback for list view
        updatedAt: serverTimestamp(),
        createdAt: isEditing ? undefined : serverTimestamp()
      };

      // Remove undefined fields for update
      if (isEditing) {
        // @ts-ignore
        delete projectData.createdAt;
        await updateDoc(doc(db, 'projects', isEditing), projectData);
      } else {
        await addDoc(collection(db, 'projects'), projectData);
      }

      setFormData({ 
        title: '', 
        category: '', 
        description: '', 
        link: '', 
        github: '', 
        techStack: [], 
        media: [] 
      });
      setSelectedFiles([]);
      setIsEditing(null);
      fetchProjects();
      alert('Project saved successfully!');
    } catch (err) {
      handleFirestoreError(err, isEditing ? OperationType.UPDATE : OperationType.CREATE, path);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
        fetchProjects();
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `projects/${id}`);
      }
    }
  };

  const handleEdit = (project: Project) => {
    setIsEditing(project.id);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      link: project.link || '',
      github: project.github || '',
      techStack: project.techStack || [],
      media: project.media || (project.imageUrl ? [{ url: project.imageUrl, type: 'image' }] : [])
    });
    setSelectedFiles([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-primary flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-brand-primary flex items-center justify-center p-6">
        <div className="w-full max-w-md glass p-10 space-y-8 bg-brand-primary border border-white/10">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tighter uppercase">Admin <span className="text-accent">Login</span></h1>
            <p className="text-white/40 text-xs mt-2 uppercase tracking-widest leading-relaxed">Maqlo Digital Content Management</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 bg-white/5 border border-white/10 focus:border-accent outline-none transition-all text-sm"
                placeholder="admin"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-white/5 border border-white/10 focus:border-accent outline-none transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-500 text-[10px] uppercase tracking-widest">{error}</p>}
            <button className="w-full py-4 bg-accent text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300">
              Access Dashboard
            </button>
          </form>

          <div className="pt-6 border-t border-white/5 text-center">
            <button 
              onClick={handleInitializeAdmin}
              className="text-[9px] uppercase tracking-widest text-white/20 hover:text-accent transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <ShieldCheck size={12} /> Initialize Default Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-primary pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-12 gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">CMS Dashboard</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mt-2">Manage <span className="text-accent-light">Portfolio</span></h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 border border-white/10 text-[10px] uppercase tracking-widest font-bold hover:border-red-500 hover:text-red-500 transition-all"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-5">
            <div className="glass p-8 bg-brand-primary border border-white/10 sticky top-32">
              <h2 className="text-xl font-bold uppercase tracking-tight mb-8">
                {isEditing ? 'Edit Project' : 'Add New Project'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Title</label>
                    <input 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full p-3 bg-white/5 border border-white/10 outline-none focus:border-accent text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Category</label>
                    <input 
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full p-3 bg-white/5 border border-white/10 outline-none focus:border-accent text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Description</label>
                  <textarea 
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full p-3 bg-white/5 border border-white/10 outline-none focus:border-accent text-sm h-24 resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Media (Images/Videos)</label>
                  <div className="space-y-4">
                    {/* Existing Media */}
                    {formData.media.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {formData.media.map((m, i) => (
                          <div key={i} className="relative aspect-square border border-white/10 group">
                            {m.type === 'image' ? (
                              <img src={m.url} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-white/5 text-[10px]">VIDEO</div>
                            )}
                            <button 
                              type="button"
                              onClick={() => removeExistingMedia(i)}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <CloseIcon size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Selected Files */}
                    {selectedFiles.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {selectedFiles.map((f, i) => (
                          <div key={i} className="relative aspect-square border border-accent/20 bg-accent/5 flex items-center justify-center p-2 text-center">
                            <span className="text-[8px] uppercase break-all line-clamp-2">{f.name}</span>
                            <button 
                              type="button"
                              onClick={() => removeSelectedFile(i)}
                              className="absolute top-1 right-1 p-1 bg-accent text-white rounded-full"
                            >
                              <CloseIcon size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 hover:border-accent/40 transition-all cursor-pointer bg-white/5">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="text-white/20 mb-2" size={24} />
                        <p className="text-[10px] uppercase tracking-widest text-white/40">Drop files or click to upload</p>
                      </div>
                      <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*,video/*" />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Tech Stack</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-4 bg-white/5 border border-white/10 custom-scrollbar">
                    {techStackOptions.map((tech) => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => toggleTech(tech)}
                        className={`flex items-center gap-2 px-3 py-2 text-[9px] uppercase tracking-widest border transition-all ${
                          formData.techStack.includes(tech) 
                            ? 'bg-accent/20 border-accent text-accent' 
                            : 'border-white/5 text-white/40 hover:border-white/20'
                        }`}
                      >
                        {formData.techStack.includes(tech) ? <Check size={10} /> : <div className="w-[10px]" />}
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Live Demo Link</label>
                    <input 
                      value={formData.link}
                      onChange={(e) => setFormData({...formData, link: e.target.value})}
                      className="w-full p-3 bg-white/5 border border-white/10 outline-none focus:border-accent text-sm"
                      placeholder="Optional"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">GitHub Link</label>
                    <input 
                      value={formData.github}
                      onChange={(e) => setFormData({...formData, github: e.target.value})}
                      className="w-full p-3 bg-white/5 border border-white/10 outline-none focus:border-accent text-sm"
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    disabled={isUploading}
                    className="flex-1 py-4 bg-accent text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <><Loader2 size={16} className="animate-spin" /> Uploading...</>
                    ) : (
                      <><Plus size={16} /> {isEditing ? 'Update Project' : 'Publish Project'}</>
                    )}
                  </button>
                  {isEditing && (
                    <button 
                      type="button"
                      disabled={isUploading}
                      onClick={() => {
                        setIsEditing(null);
                        setFormData({ title: '', category: '', description: '', link: '', github: '', techStack: [], media: [] });
                        setSelectedFiles([]);
                      }}
                      className="px-6 py-4 border border-white/10 text-[10px] uppercase tracking-widest font-bold hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-6">
              {projects.length === 0 ? (
                <div className="text-center py-20 bg-white/5 border border-white/10">
                  <p className="text-white/30 uppercase tracking-[0.3em] font-light">No projects uploaded yet</p>
                </div>
              ) : (
                projects.map((project) => (
                  <div key={project.id} className="group glass p-6 flex flex-col md:flex-row gap-8 items-start border border-white/10 hover:border-accent/40 lg:transition-all">
                    <div className="w-full md:w-48 aspect-video md:aspect-square flex-shrink-0 overflow-hidden relative">
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                      <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-accent font-bold">{project.category}</span>
                        <h3 className="text-2xl font-bold uppercase tracking-tighter mt-1">{project.title}</h3>
                        <p className="text-white/40 text-sm mt-2 font-light line-clamp-2">{project.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-4 pt-2">
                        {project.link && <a href={project.link} target="_blank" className="text-white/60 hover:text-white transition-colors"><ExternalLink size={18} /></a>}
                        {project.github && <a href={project.github} target="_blank" className="text-white/60 hover:text-white transition-colors"><Github size={18} /></a>}
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-3 w-full md:w-auto">
                      <button 
                        onClick={() => handleEdit(project)}
                        className="flex-1 md:flex-none p-3 border border-white/10 text-white/40 hover:text-white hover:border-white transition-all"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="flex-1 md:flex-none p-3 border border-white/10 text-white/40 hover:text-red-500 hover:border-red-500 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
