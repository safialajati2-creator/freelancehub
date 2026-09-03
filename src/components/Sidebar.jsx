import { NavLink } from 'react-router-dom';

function Sidebar() {
  const links = [
    ['/saved-jobs', 'Saved Jobs'],
    ['/my-proposals', 'Proposals & Applications'],
    ['/my-service', 'My Service'],
  ];
  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 shadow-md">
      <ul className="space-y-2">
        {links.map(([to, label]) => (
          <li key={to}><NavLink to={to} className={({ isActive }) => `block p-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}>{label}</NavLink></li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;