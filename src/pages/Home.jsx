import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const Home = () => {
  const [searchError, setSearchError] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements[0].value.trim();
    if (!query) return setSearchError('Please enter a search query.');
    setSearchError('');
    navigate(`/find-work?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      <Navbar />
      <div className="container mx-auto pt-32 pb-28 flex flex-col md:flex-row items-center justify-between px-6 animate-fade-in">
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0 z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 drop-shadow-md bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">We bring projects to life</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl md:text-2xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">Connect clients and freelancers through clear project workflows, proposals, services, messaging, and project management.</motion.p>
          <form onSubmit={handleSearch} className="w-full max-w-xl flex flex-col gap-2"><div className="flex"><input type="text" placeholder="Search for talent or jobs" className="w-full p-4 bg-white border border-gray-200 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg" /><button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-r-full font-medium">Search</button></div>{searchError && <p className="text-red-500 text-sm text-center">{searchError}</p>}</form>
        </div>
        <div className="md:w-1/2 relative mt-8 md:mt-0"><div className="grid grid-cols-2 gap-4"><div className="space-y-6"><motion.img initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" alt="Creative freelancer workspace" className="rounded-xl shadow-lg w-full h-72 object-cover -translate-y-6" /><motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" alt="Freelancer collaborating" className="rounded-xl shadow-lg w-full h-56 object-cover" /></div><div className="space-y-6"><motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="Team collaboration" className="rounded-xl shadow-lg w-full h-56 object-cover translate-y-6" /><motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" alt="Developer workspace" className="rounded-xl shadow-lg w-full h-72 object-cover" /></div></div></div>
      </div>
      <section className="pb-16"><div className="container mx-auto text-center"><p className="text-gray-500 uppercase font-medium text-lg mb-6 tracking-wide">Marketplace Prototype</p><div className="flex flex-wrap justify-center gap-4"><span className="card">Role-based UX</span><span className="card">Project discovery</span><span className="card">Proposal tracking</span><span className="card">Messaging & payments simulation</span></div></div></section>
    </div>
  );
};

export default Home;