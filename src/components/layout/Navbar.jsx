import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  Home, 
  Activity, 
  Target, 
  User, 
  Users, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Entraînements', href: '/workouts', icon: Activity },
    { name: 'Objectifs', href: '/goals', icon: Target },
    { name: 'Social', href: '/social', icon: Users },
    { name: 'Profil', href: '/profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-black sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="relative">
                {/* Logo icon pour mobile */}
                <img 
                  src="/logo-icon.png" 
                  alt="FT Logo" 
                  className="h-10 w-10 md:hidden object-contain transition-transform duration-300 group-hover:scale-110"
                />
                {/* Logo complet pour desktop */}
                <img 
                  src="/logo-full.png" 
                  alt="Fitness Training Center" 
                  className="hidden md:block h-10 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    active
                      ? 'bg-[#c5ff00] text-black'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon size={18} className={active ? '' : 'group-hover:scale-110 transition-transform'} />
                  <span className="font-medium text-sm">{item.name}</span>
                  {active && (
                    <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-[#c5ff00]"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* User menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-xs text-gray-500">Bienvenue,</p>
                <p className="text-sm font-semibold text-[#c5ff00]">
                  {user?.name}
                </p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-[#c5ff00] to-[#a0d600] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
                <span className="text-black font-bold text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 font-medium border border-gray-700"
              >
                <LogOut size={16} />
                <span className="text-sm">Déconnexion</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-800 text-[#c5ff00] hover:bg-gray-700 transition-all duration-300"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-black animate-slideInRight">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {/* User info mobile */}
            <div className="flex items-center space-x-3 p-4 bg-gray-900 rounded-xl mb-4 border border-gray-800">
              <div className="w-12 h-12 bg-gradient-to-br from-[#c5ff00] to-[#a0d600] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-black font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>

            {/* Navigation items mobile */}
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-5 py-3 rounded-xl transition-all duration-300 ${
                    active
                      ? 'bg-[#c5ff00] text-black'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-semibold">{item.name}</span>
                </Link>
              );
            })}
            
            {/* Logout button mobile */}
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-5 py-3 bg-gray-800 text-white rounded-xl font-semibold mt-4 border border-gray-700"
            >
              <LogOut size={20} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;