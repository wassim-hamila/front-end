import { AlertCircle, CheckCircle, XCircle, Info, X, Zap } from 'lucide-react';

const Alert = ({ type = 'info', message, onClose }) => {
  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-gradient-to-r from-green-50 via-emerald-50 to-green-50',
      borderColor: 'border-green-400',
      textColor: 'text-green-800',
      iconColor: 'text-green-600',
      glowColor: 'shadow-green-200'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-gradient-to-r from-red-50 via-pink-50 to-red-50',
      borderColor: 'border-red-400',
      textColor: 'text-red-800',
      iconColor: 'text-red-600',
      glowColor: 'shadow-red-200'
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-50',
      borderColor: 'border-orange-400',
      textColor: 'text-orange-800',
      iconColor: 'text-orange-600',
      glowColor: 'shadow-orange-200'
    },
    info: {
      icon: Info,
      bgColor: 'bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-600',
      glowColor: 'shadow-blue-200'
    }
  };

  const { icon: Icon, bgColor, borderColor, textColor, iconColor, glowColor } = config[type];

  return (
    <div className={`${bgColor} ${borderColor} border-l-4 rounded-2xl p-5 mb-6 flex items-start shadow-lg ${glowColor} animate-slideInLeft relative overflow-hidden group`}>
      {/* Ligne animée */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <div className={`${iconColor} mr-4 mt-0.5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
      
      <div className="flex-1">
        <p className={`${textColor} font-bold text-sm leading-relaxed`}>{message}</p>
      </div>
      
      {onClose && (
        <button 
          onClick={onClose} 
          className={`ml-3 ${iconColor} hover:scale-125 hover:rotate-90 transition-all duration-300`}
        >
          <X size={20} strokeWidth={3} />
        </button>
      )}
      
      {/* Badge décoratif */}
      <div className="absolute top-2 right-2">
        <Zap className={`${iconColor} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} size={16} />
      </div>
    </div>
  );
};

export default Alert;