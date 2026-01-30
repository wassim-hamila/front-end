import { useContext, useState } from 'react';
import { WorkoutContext } from '../../context/WorkoutContext';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { Clock, Flame, Calendar, Edit2, Trash2, TrendingUp, Zap } from 'lucide-react';
import { formatDate, formatDuration, WORKOUT_ICONS } from '../../utils/helpers';

const WorkoutCard = ({ workout, onEdit }) => {
  const { deleteWorkout } = useContext(WorkoutContext);
  const [deleting, setDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet entraînement ?')) {
      setDeleting(true);
      await deleteWorkout(workout._id);
      setDeleting(false);
    }
  };

  // Couleurs selon le type
  const typeColors = {
    'Cardio': 'from-red-500 to-orange-500',
    'Musculation': 'from-blue-500 to-cyan-500',
    'Yoga': 'from-purple-500 to-pink-500',
    'Course': 'from-green-500 to-emerald-500',
    'Natation': 'from-cyan-500 to-blue-500',
    'Cyclisme': 'from-yellow-500 to-orange-500',
    'Autre': 'from-gray-500 to-slate-500'
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${typeColors[workout.type]} opacity-0 group-hover:opacity-20 rounded-2xl blur-2xl transition-all duration-500 -z-10`}></div>
      
      <div className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-2 border-gray-100 hover:border-primary-200 overflow-hidden">
        {/* Header avec icône animée */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center space-x-4">
            <div className={`relative w-16 h-16 bg-gradient-to-br ${typeColors[workout.type]} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
              <span className="text-4xl animate-bounce-slow">{WORKOUT_ICONS[workout.type] || '⚡'}</span>
              {isHovered && (
                <div className="absolute -inset-1 bg-white/30 rounded-2xl animate-ping"></div>
              )}
            </div>
            
            <div>
              <h3 className="font-black text-xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {workout.type}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-1.5 space-x-2">
                <Calendar size={14} className="text-primary-500" />
                <span className="font-semibold">{formatDate(workout.date || workout.createdAt)}</span>
              </div>
            </div>
          </div>

          <Badge variant="primary" className="animate-pulse">
            <Zap size={12} className="mr-1" />
            Actif
          </Badge>
        </div>

        {/* Stats avec design moderne */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 group/stat">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md group-hover/stat:scale-110 transition-transform duration-300">
                <Clock size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-blue-600 font-bold uppercase">Durée</p>
                <p className="text-lg font-black text-blue-900">{formatDuration(workout.duration)}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 group/stat">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md group-hover/stat:scale-110 transition-transform duration-300">
                <Flame size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-orange-600 font-bold uppercase">Calories</p>
                <p className="text-lg font-black text-orange-900">{workout.caloriesBurned}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notes avec style */}
        {workout.notes && (
          <div className="mb-5 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100 relative overflow-hidden group/notes">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-2xl"></div>
            <p className="text-sm text-gray-700 italic font-medium relative z-10 line-clamp-2">
              💭 "{workout.notes}"
            </p>
          </div>
        )}

        {/* Actions avec effets premium */}
        <div className="flex justify-end space-x-3 pt-5 border-t-2 border-gray-100">
          <Button
            variant="secondary"
            size="small"
            onClick={onEdit}
            icon={<Edit2 size={16} />}
            className="hover:border-blue-400 hover:text-blue-600"
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
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${typeColors[workout.type]} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
      </div>
    </div>
  );
};

export default WorkoutCard;