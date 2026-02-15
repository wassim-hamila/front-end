import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import { Dumbbell, Mail, Lock, Sparkles, Zap, Trophy } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLocalError('');

    const result = await login(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setLocalError(result.error);
    }
    
    setLoading(false);
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Particules animées de fond */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Grille de fond */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>

      <div className="max-w-md w-full relative z-10">
        {/* Card principal */}
<div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
          {/* Logo Premium */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl blur-2xl opacity-75 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-primary-600 via-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-5 transform hover:scale-110 hover:rotate-6 transition-all duration-500">
                <Dumbbell className="text-white" size={40} strokeWidth={2.5} />
                <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-bounce-slow" size={20} />
                <Zap className="absolute -bottom-1 -left-1 text-pink-400 animate-pulse" size={16} />
              </div>
            </div>
            
            <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Fitness Tracker
            </h1>
            <p className="text-gray-600 font-semibold flex items-center justify-center">
              <Trophy className="mr-2 text-yellow-500" size={18} />
              Connectez-vous et dépassez vos limites
            </p>
          </div>

          {/* Alertes */}
          {(localError || error) && (
            <Alert type="error" message={localError || error} />
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Adresse email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              required
              icon={<Mail size={20} />}
            />

            <Input
              label="Mot de passe"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              icon={<Lock size={20} />}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-8"
              disabled={loading}
              loading={loading}
              
            >
              {loading ? 'Connexion...' : '🚀 Se connecter'}
            </Button>
          </form>

          {/* Séparateur */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-bold">OU</span>
            </div>
          </div>

          {/* Lien inscription */}
          <div className="text-center">
            <p className="text-gray-600 font-medium">
              Pas encore de compte ?
            </p>
         <Link 
        to="/register" 
       className="inline-block mt-3 px-6 py-3 bg-black text-[#A6FF00] font-bold rounded-xl border border-[#A6FF00] hover:bg-[#A6FF00] hover:text-black transition-all duration-300"
>
  Créer un compte gratuitement
    </Link>

          </div>
        </div>

        {/* Footer */}
       <p className="text-center mt-8 text-gray-400 text-sm font-semibold">
      © 2026 Fitness Tracker • Votre coach personnel
      </p>
 
      </div>
    </div>
  );
};

export default Login;