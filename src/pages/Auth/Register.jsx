import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import { Dumbbell, User, Mail, Lock, Calendar, Scale, Ruler, Sparkles, Zap, Trophy, Star } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register, error } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    weight: '',
    height: ''
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

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      age: formData.age ? parseInt(formData.age) : undefined,
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
      height: formData.height ? parseFloat(formData.height) : undefined
    };

    const result = await register(userData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setLocalError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-purple-600 to-blue-500 flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Particules animées */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-bounce-slow"></div>
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Card principal */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border-2 border-white/50 animate-scaleIn">
          {/* Logo Premium */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur-2xl opacity-75 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-5 transform hover:scale-110 hover:rotate-6 transition-all duration-500">
                <Dumbbell className="text-white" size={40} strokeWidth={2.5} />
                <Star className="absolute -top-2 -right-2 text-yellow-400 animate-bounce-slow" size={20} />
                <Zap className="absolute -bottom-1 -left-1 text-cyan-400 animate-pulse" size={16} />
              </div>
            </div>
            
            <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Rejoignez-nous !
            </h1>
            <p className="text-gray-600 font-semibold flex items-center justify-center">
              <Trophy className="mr-2 text-yellow-500" size={18} />
              Commencez votre transformation aujourd'hui
            </p>
          </div>

          {/* Alertes */}
          {(localError || error) && (
            <Alert type="error" message={localError || error} />
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nom complet"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                icon={<User size={20} />}
                className="md:col-span-2"
              />

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
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

              <Input
                label="Confirmer le mot de passe"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                icon={<Lock size={20} />}
                className="md:col-span-2"
              />

              <div className="md:col-span-2 my-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border-2 border-blue-200">
                  <p className="text-sm text-gray-700 font-semibold mb-2 flex items-center">
                    <Sparkles className="mr-2 text-purple-500" size={16} />
                    Informations optionnelles (pour personnaliser votre expérience)
                  </p>
                </div>
              </div>

              <Input
                label="Âge (optionnel)"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="25"
                min="13"
                max="120"
                icon={<Calendar size={20} />}
              />

              <Input
                label="Poids kg (optionnel)"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="70"
                step="0.1"
                min="20"
                max="300"
                icon={<Scale size={20} />}
              />

              <Input
                label="Taille cm (optionnel)"
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="175"
                min="50"
                max="300"
                icon={<Ruler size={20} />}
                className="md:col-span-2"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-8"
              disabled={loading}
              loading={loading}
            >
              {loading ? 'Création du compte...' : '🚀 Créer mon compte'}
            </Button>
          </form>

          {/* Séparateur */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-bold">DÉJÀ INSCRIT ?</span>
            </div>
          </div>

          {/* Lien connexion */}
          <div className="text-center">
            <Link 
              to="/login" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              ✨ Se connecter
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-white/80 text-sm font-semibold">
          © 2026 Fitness Tracker • Transformez votre vie
        </p>
      </div>
    </div>
  );
};

export default Register;