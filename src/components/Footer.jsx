import { Link } from 'react-router-dom';

function Footer() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-blue-400">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/find-work" className="hover:text-blue-300 transition-colors">Find Work</Link></li>
            <li><Link to="/saved-jobs" className="hover:text-blue-300 transition-colors">Saved Jobs</Link></li>
            {user?.userType === 'freelancer' && <li><Link to="/my-service" className="hover:text-blue-300 transition-colors">Your Services</Link></li>}
            <li><Link to="/my-account" className="hover:text-blue-300 transition-colors">My Account</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-blue-400">About FreelanceHub</h3>
          <p className="text-gray-300 text-sm leading-6">A portfolio marketplace prototype demonstrating client and freelancer workflows, proposals, services, messaging, and project management.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-blue-400">Project Scope</h3>
          <p className="text-gray-300 text-sm leading-6">Frontend prototype built with React and browser localStorage. No real backend or payment gateway is connected.</p>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400"><p>© {new Date().getFullYear()} FreelanceHub. Portfolio project.</p></div>
    </footer>
  );
}

export default Footer;