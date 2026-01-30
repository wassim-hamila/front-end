import { useContext, useState } from 'react';
import { GoalContext } from '../../context/GoalContext';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { 
  Target, 
  Calendar, 
  TrendingUp, 
  Edit2, 
  Trash2,
  CheckCircle2,
  AlertCircle,
  Zap,
  Award,
  Clock
} from 'lucide-react';
import { formatDate } from '../../utils/helpers';

const GoalCard = ({ goal, onEdit }) => {
  const { deleteGoal } = useContext(GoalContext);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet objectif ?')) {
      setDeleting(true);
      await deleteGoal(goal._id);
      setDeleting(false);
    }
  };

  const progress = Math.min(Math.round((goal.currentValue / goal.targetValue) * 100), 100);
  const isExpired = new Date(goal.deadline) < new Date() && !goal.isCompleted;
  const daysRemaining = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));

  // Couleurs selon l'état
  const getStatusColor = () => {
    if (goal.isCompleted) return 'from-green-500 to-emerald-600';
    if (isExpired) return 'from-red-500 to-pink-600';
    if (progress >= 75) return 'from-blue-500 to-cyan-500';
    if (progress >= 50) return 'from-yellow-500 to-orange-500';
    return 'from-purple-500 to-pink-500';
  };

  const statusColor = getStatusColor();

  return (
    <div className="relative group">
      {/* Glow effect de fond */}
      <div className={`absolute inset-0 bg-gradient-to-r ${statusColor} opacity-0 group-hover:opacity-20 rounded-3xl blur-3xl transition-all duration-500 -z-10`}></div>
      
      <div className={`bg-white rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:shadow-3xl hover:-translate-y-1 border-2 ${
        goal.isCompleted ? 'border-green-300' : isExpired ? 'border-red-300' : 'border-gray-200'
      } overflow-hidden relative`}>
        
        {/* Pattern décoratif de fond */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <div className={`w-full h-full bg-gradient-to-br ${statusColor} rounded-full blur-3xl`}></div>
        </div>

        {/* Header premium */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6 relative z-10">
          <div className="flex items-start space-x-4">
            {/* Icône animée selon le statut */}
            <div className={`relative w-20 h-20 bg-gradient-to-br ${statusColor} rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
              {goal.isCompleted ? (
                <>
                  <CheckCircle2 className="text-white animate-bounce-slow" size={40} strokeWidth={2.5} />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Award className="text-yellow-800" size={16} />
                  </div>
                </>
              ) : isExpired ? (
                <AlertCircle className="text-white animate-pulse" size={40} strokeWidth={2.5} />
              ) : (
                <Target className="text-white" size={40} strokeWidth={2.5} />
              )}
              
              {/* Ring animé */}
              {!goal.isCompleted && !isExpired && (
                <div className="absolute inset-0 border-4 border-white/30 rounded-2xl animate-ping"></div>
              )}
            </div>

            {/* Info */}
            <div>
              <h3 className="font-black text-2xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                {goal.type}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {goal.isCompleted && (
                  <Badge variant="success" icon={<CheckCircle2 size={14} />}>
                    ✓ Complété
                  </Badge>
                )}
                {isExpired && !goal.isCompleted && (
                  <Badge variant="danger" icon={<AlertCircle size={14} />}>
                    ⚠ Expiré
                  </Badge>
                )}
                {!goal.isCompleted && !isExpired && daysRemaining <= 7 && (
                  <Badge variant="warning" icon={<Clock size={14} />}>
                    🔔 {daysRemaining}j restants
                  </Badge>
                )}
                {!goal.isCompleted && !isExpired && progress >= 75 && (
                  <Badge variant="primary" icon={<Zap size={14} />}>
                    🔥 Presque !
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Progression circulaire */}
          <div className="relative w-32 h-32 flex-shrink-0">
            {/* Cercle de fond */}
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                className="transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={goal.isCompleted ? '#10b981' : isExpired ? '#ef4444' : '#0ea5e9'} />
                  <stop offset="100%" stopColor={goal.isCompleted ? '#059669' : isExpired ? '#dc2626' : '#8b5cf6'} />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Pourcentage au centre */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-black bg-gradient-to-r ${statusColor} bg-clip-text text-transparent`}>
                {progress}%
              </span>
              <span className="text-xs text-gray-500 font-bold">Progression</span>
            </div>
          </div>
        </div>

        {/* Description */}
        {goal.description && (
          <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-2xl"></div>
            <p className="text-sm text-gray-700 font-medium relative z-10">
              💡 {goal.description}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 group/stat">
            <div className="flex items-center space-x-3">
              <Calendar className="text-purple-600 group-hover/stat:scale-110 transition-transform duration-300" size={24} />
              <div>
                <p className="text-xs text-purple-600 font-bold uppercase">Échéance</p>
                <p className="text-sm font-black text-purple-900">{formatDate(goal.deadline)}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-5 rounded-2xl border-2 border-cyan-100 hover:border-cyan-300 transition-all duration-300 group/stat">
            <div className="flex items-center space-x-3">
              <TrendingUp className="text-cyan-600 group-hover/stat:scale-110 transition-transform duration-300" size={24} />
              <div>
                <p className="text-xs text-cyan-600 font-bold uppercase">Progrès</p>
                <p className="text-sm font-black text-cyan-900">{goal.currentValue} / {goal.targetValue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de progression moderne */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-gray-700">Avancement</span>
            <span className={`text-lg font-black bg-gradient-to-r ${statusColor} bg-clip-text text-transparent`}>
              {progress}%
            </span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner relative">
            {/* Barre de progression avec gradient animé */}
            <div 
              className={`h-full bg-gradient-to-r ${statusColor} transition-all duration-1000 ease-out relative overflow-hidden`}
              style={{ width: `${progress}%` }}
            >
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
            
            {/* Points de repère */}
            <div className="absolute inset-0 flex justify-between px-1">
              {[25, 50, 75].map(point => (
                <div key={point} className="w-0.5 h-full bg-gray-300/50"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t-2 border-gray-100">
          <Button
            variant="secondary"
            size="small"
            onClick={onEdit}
            icon={<Edit2 size={16} />}
          >
            Modifier
          </Button>
          <Button
            variant="danger"
            size="small"
            onClick={handleDelete}
            disabled={deleting}
            loading={deleting}
            icon={!deleting && <Trash2 size={16} />}
          >
            {deleting ? 'Suppression...' : 'Supprimer'}
          </Button>
        </div>

        {/* Ligne décorative animée */}
        <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${statusColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl`}></div>
      </div>
    </div>
  );
};

export default GoalCard;