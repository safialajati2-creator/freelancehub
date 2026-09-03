import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [searchError, setSearchError] = useState('');
  const notificationRef = useRef(null);

  const fetchUser = () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      setUser(storedUser);
    } catch (err) {
      console.error('Navbar fetchUser error:', err);
    }
  };

  useEffect(() => {
    fetchUser();
    window.addEventListener('storageUpdated', fetchUser);
    return () => window.removeEventListener('storageUpdated', fetchUser);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) setIsNotificationsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setUser(null);
    window.dispatchEvent(new Event('storageUpdated'));
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value.trim();
    if (!query) return setSearchError('Please enter a search query.');
    setSearchError('');
    navigate(`/find-work?q=${encodeURIComponent(query)}`);
    e.target.reset();
  };

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setIsDropdownOpen(false), 300);
    setTimeoutId(id);
  };

  const handleNotificationClick = (notification) => {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = users.map((u) => u.id === user.id ? { ...u, notifications: (u.notifications || []).map((n) => n.id === notification.id ? { ...n, read: true } : n) } : u);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      const updatedUser = updatedUsers.find((u) => u.id === user.id);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
      if (user.userType === 'freelancer' && notification.status) navigate('/my-proposals');
      else if (user.userType === 'client' && notification.jobId) navigate('/my-projects');
      setIsNotificationsOpen(false);
    } catch (err) { console.error(err); }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/home" className="text-2xl font-bold text-gray-900">FreelanceHub</Link>
          <div className="flex space-x-4">
            <Link to="/find-work" className="text-gray-700 hover:text-blue-600">Find Work</Link>
            <Link to="/saved-jobs" className="text-gray-700 hover:text-blue-600">Saved Jobs</Link>
            {user?.userType === 'freelancer' && <Link to="/my-service" className="text-gray-700 hover:text-blue-600">Your Services</Link>}
            {user?.userType === 'freelancer' && <Link to="/my-proposals" className="text-gray-700 hover:text-blue-600">My Proposals</Link>}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative"><input type="text" name="search" placeholder="Search..." className="border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" /><button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">⌕</button></div>
          </form>
          {searchError && <p className="text-red-500 text-sm absolute top-16 right-4">{searchError}</p>}

          {user && <div className="relative" ref={notificationRef}><button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="relative text-gray-700 hover:text-blue-600">🔔{user.notifications?.filter((n) => !n.read).length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{user.notifications.filter((n) => !n.read).length}</span>}</button>{isNotificationsOpen && <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto">{user.notifications?.length ? user.notifications.map((notification) => <div key={notification.id} className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${notification.read ? 'opacity-75' : 'font-semibold'}`} onClick={() => handleNotificationClick(notification)}><p className="text-sm">{notification.message || `Application for ${notification.jobTitle}`}</p><p className="text-xs text-gray-500">{notification.date}</p></div>) : <p className="px-4 py-2 text-sm">No notifications</p>}</div>}</div>}

          {user ? <div className="relative"><button className="text-gray-700 font-semibold hover:text-blue-600" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{user.name}</button>{isDropdownOpen && <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><Link to="/my-account" className="block px-4 py-2 hover:bg-gray-100">My Account</Link>{user.userType === 'client' && <><Link to="/create-project" className="block px-4 py-2 hover:bg-gray-100">Create a Project</Link><Link to="/my-projects" className="block px-4 py-2 hover:bg-gray-100">My Projects</Link><Link to="/payments" className="block px-4 py-2 hover:bg-gray-100">Payments</Link></>}{user.userType === 'freelancer' && <><Link to="/my-proposals" className="block px-4 py-2 hover:bg-gray-100">My Proposals</Link><Link to="/earnings" className="block px-4 py-2 hover:bg-gray-100">Earnings</Link></>}<button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button></div>}</div> : <><button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-4 py-2 rounded-full">Login</button><button onClick={() => navigate('/signup')} className="bg-blue-600 text-white px-4 py-2 rounded-full">Signup</button></>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;