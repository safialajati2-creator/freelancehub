import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { dispatchStorageUpdate, readJson, writeJson } from '../utils/storage';

function CreateProject() {
  const [formData, setFormData] = useState({ title: '', description: '', budget: '', category: '', image: '', skills: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = readJson('currentUser', null);
    if (!currentUser || currentUser.userType !== 'client') navigate('/login');
  }, [navigate]);

  const handleChange = (event) => setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setError('Please upload a valid image file.');
    const reader = new FileReader();
    reader.onloadend = () => setFormData((previous) => ({ ...previous, image: reader.result }));
    reader.onerror = () => setError('Failed to read image file.');
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    if (!formData.title || !formData.description || !formData.budget || !formData.category) return setError('Please fill in all required fields.');
    if (!/^\d+(\.\d{1,2})?$/.test(formData.budget)) return setError('Please enter a valid budget.');
    const skills = formData.skills.split(',').map((skill) => skill.trim()).filter(Boolean);
    if (!skills.length) return setError('Please provide at least one skill.');
    const currentUser = readJson('currentUser', null);
    if (!currentUser || currentUser.userType !== 'client') return navigate('/login');
    const project = {
      id: Date.now().toString(),
      clientId: currentUser.id,
      clientEmail: currentUser.email,
      title: formData.title,
      description: formData.description,
      budget: `$${Number(formData.budget).toFixed(2)}`,
      category: formData.category,
      image: formData.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
      skills,
      posted: new Date().toLocaleDateString(),
      applications: [],
    };
    writeJson('projects', [...readJson('projects', []), project]);
    dispatchStorageUpdate();
    navigate('/my-projects');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <Navbar />
      <div className="relative w-full h-[360px] bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80)" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-700/80 to-purple-500/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4"><motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-extrabold">Create a New Project</motion.h1><p className="text-lg mt-4">Post a project and start receiving freelancer proposals.</p></div>
      </div>
      <main className="container mx-auto max-w-xl px-4 py-14 flex-grow">
        <div className="bg-white p-8 rounded-3xl shadow-xl"><h2 className="text-3xl font-bold gradient-text text-center mb-8">Project Details</h2>{error && <p className="text-red-500 text-center mb-5">{error}</p>}<form onSubmit={handleSubmit} className="space-y-5">
          <input className="input-field" name="title" value={formData.title} onChange={handleChange} placeholder="Project title" required />
          <textarea className="input-field h-28" name="description" value={formData.description} onChange={handleChange} placeholder="Project description" required />
          <input className="input-field" name="budget" value={formData.budget} onChange={handleChange} placeholder="Budget, e.g. 500" required />
          <select className="input-field" name="category" value={formData.category} onChange={handleChange} required><option value="">Select a category</option><option>Development</option><option>Design</option><option>Video Editing</option><option>Writing</option></select>
          <input className="input-field" name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills, comma-separated" />
          <label className="block"><span className="text-sm font-medium text-gray-600">Project image</span><input type="file" accept="image/*" onChange={handleImageChange} className="mt-2 block w-full text-sm" /></label>
          {formData.image && <img src={formData.image} alt="Project preview" className="w-full h-52 object-cover rounded-xl" />}
          <button type="submit" className="btn-primary w-full">Create Project</button>
        </form><p className="text-center text-gray-600 mt-6">Back to <Link to="/my-projects" className="text-blue-600 font-medium">My Projects</Link></p></div>
      </main>
      <Footer />
    </div>
  );
}

export default CreateProject;