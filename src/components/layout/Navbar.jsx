import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  Dumbbell, 
  Home, 
  Activity, 
  Target, 
  User, 
  Users, 
  LogOut,
  Menu,
  X,
  Sparkles
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
    { name: 'Dashboard', href: '/dashboard', icon: Home, color: 'from-blue-500 to-cyan-500' },
    { name: 'Entraînements', href: '/workouts', icon: Activity, color: 'from-orange-500 to-red-500' },
    { name: 'Objectifs', href: '/goals', icon: Target, color: 'from-purple-500 to-pink-500' },
    { name: 'Social', href: '/social', icon: Users, color: 'from-green-500 to-emerald-500' },
    { name: 'Profil', href: '/profile', icon: User, color: 'from-indigo-500 to-blue-500' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Premium */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-300 animate-pulse-glow"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-primary-600 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <Dumbbell className="text-white" size={28} strokeWidth={2.5} />
                  <Sparkles className="absolute -top-1 -right-1 text-yellow-400 animate-bounce-slow" size={16} />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  Fitness Tracker
                </span>
                <p className="text-xs text-gray-500 font-semibold">Votre coach personnel</p>
              </div>
            </Link>
          </div>

          {/* Navigation desktop avec effets premium */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group relative flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${
                    active
                      ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg scale-105'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {active && (
                    <div className="absolute inset-0 bg-gradient-to-r opacity-50 rounded-xl blur-md -z-10" 
                         style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>
                  )}
                  <Icon size={20} className={active ? 'animate-bounce-slow' : ''} />
                  <span className="font-semibold text-sm">{item.name}</span>
                  {active && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* User menu premium */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-xs text-gray-500 font-medium">Bienvenue,</p>
                <p className="text-sm font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  {user?.name}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
                <span className="text-white font-bold text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
              >
                <LogOut size={18} />
                <span>Déconnexion</span>
              </button>
            </div>

            {/* Mobile menu button premium */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 text-white shadow-lg hover:scale-110 transition-transform duration-300"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu premium */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white shadow-2xl animate-slideInRight">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {/* User info mobile */}
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl mb-4 border border-primary-100">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{user?.name}</p>
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
                  className={`flex items-center space-x-3 px-5 py-4 rounded-xl transition-all duration-300 ${
                    active
                      ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg scale-105'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={22} />
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
              className="w-full flex items-center space-x-3 px-5 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl shadow-lg font-semibold mt-4"
            >
              <LogOut size={22} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;