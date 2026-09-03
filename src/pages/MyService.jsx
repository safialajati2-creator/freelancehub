import { useState } from 'react';
import Navbar from '../components/Navbar';
import ServiceDetailsPopup from '../components/ServiceDetailsPopup';
import Footer from '../components/Footer';

const initialServices = [
  { id: 1, title: 'Expert-Crafted Logo Design with Unlimited Revisions', category: 'Design', delivery: '2 day delivery', price: 'From $25', rating: 5.0, reviews: 1989, image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80', description: 'Create a unique and professional logo with revision-based refinement and high-resolution deliverables.' },
  { id: 3, title: 'An Engaging Presentation in PowerPoint/Google Slides/KEYNOTE', category: 'Presentation', delivery: '2 day delivery', price: 'From $50', rating: 4.9, reviews: 5189, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80', description: 'Create a polished presentation for PowerPoint, Google Slides, or Keynote with a strong visual hierarchy.' },
  { id: 7, title: 'Responsive & Professional Websites and Landing Pages', category: 'Development', delivery: '2 day delivery', price: 'From $99', rating: 5.0, reviews: 1999, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80', description: 'Build a responsive website or landing page focused on usability and modern presentation.' },
  { id: 8, title: 'Viral Instagram Reels Video Editor', category: 'Video Editing', delivery: '1 day delivery', price: 'From $19.99', rating: 5.0, reviews: 167, image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80', description: 'Edit short-form content with captions, pacing, sound design, and social-media-ready presentation.' },
];

function MyService() {
  const [selectedService, setSelectedService] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [services, setServices] = useState(initialServices);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const categories = ['All', 'Design', 'Presentation', 'Development', 'Video Editing'];
  const filteredServices = categoryFilter === 'All' ? services : services.filter((service) => service.category === categoryFilter);

  const handleAddService = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get('image');
    const newService = {
      id: `service-${Date.now()}`,
      title: formData.get('title'),
      category: formData.get('category'),
      delivery: `${formData.get('delivery')} day${formData.get('delivery') === '1' ? '' : 's'} delivery`,
      price: `From $${formData.get('price')}`,
      rating: 0,
      reviews: 0,
      image: file?.size ? URL.createObjectURL(file) : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      description: formData.get('description'),
    };
    setServices((previous) => [...previous, newService]);
    setIsAddServiceOpen(false);
    event.currentTarget.reset();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      <main className="pt-28 px-6 max-w-7xl mx-auto w-full flex-grow">
        <section className="relative overflow-hidden rounded-3xl mb-10 bg-white shadow-sm"><div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20" /><div className="relative z-10 text-center py-14 px-4"><h1 className="text-4xl md:text-5xl font-extrabold gradient-text">Freelance Services</h1><p className="text-gray-600 mt-3 max-w-2xl mx-auto">Create and showcase service offerings in a marketplace-style portfolio workflow.</p><button onClick={() => setIsAddServiceOpen(true)} className="btn-primary mt-6">Add New Service</button></div></section>

        <div className="flex justify-center gap-2 flex-wrap mb-8">{categories.map((category) => <button key={category} onClick={() => setCategoryFilter(category)} className={`px-4 py-2 rounded-full text-sm font-semibold ${categoryFilter === category ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 shadow-sm'}`}>{category}</button>)}</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{filteredServices.map((service) => <article key={service.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition cursor-pointer" onClick={() => setSelectedService(service)}><img src={service.image} alt={service.title} className="w-full h-44 object-cover" /><div className="p-5"><span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{service.category}</span><h2 className="font-semibold text-gray-900 mt-3 line-clamp-2">{service.title}</h2><p className="text-sm text-gray-500 mt-2">{service.delivery}</p><div className="flex justify-between items-end mt-4"><p className="font-bold text-blue-600">{service.price}</p><p className="text-sm text-yellow-500">★ {service.rating}</p></div></div></article>)}</div>
      </main>

      {isAddServiceOpen && <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4" onClick={() => setIsAddServiceOpen(false)}><div className="bg-white rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto" onClick={(event) => event.stopPropagation()}><div className="flex justify-between items-center mb-5"><h2 className="text-2xl font-bold">Add New Service</h2><button onClick={() => setIsAddServiceOpen(false)} className="text-2xl">×</button></div><form onSubmit={handleAddService} className="space-y-4"><input className="input-field" name="title" placeholder="Service title" required /><select className="input-field" name="category" required><option value="">Select category</option>{categories.slice(1).map((category) => <option key={category}>{category}</option>)}</select><div className="grid grid-cols-2 gap-3"><input className="input-field" type="number" min="1" name="delivery" placeholder="Delivery days" required /><input className="input-field" type="number" min="0" step="0.01" name="price" placeholder="Starting price" required /></div><input className="input-field" type="file" name="image" accept="image/*" /><textarea className="input-field h-28" name="description" placeholder="Service description" required /><button className="btn-primary w-full" type="submit">Add Service</button></form></div></div>}
      {selectedService && <ServiceDetailsPopup service={selectedService} onClose={() => setSelectedService(null)} onContinue={() => setSelectedService(null)} />}
      <Footer />
    </div>
  );
}

export default MyService;