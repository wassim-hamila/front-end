const Spinner = ({ size = 'medium', color = 'primary' }) => {
  const sizeClasses = {
    small: 'w-6 h-6 border-3',
    medium: 'w-12 h-12 border-4',
    large: 'w-16 h-16 border-4'
  };

  const colorClasses = {
    primary: 'border-primary-200 border-t-primary-600',
    white: 'border-white/20 border-t-white',
    success: 'border-green-200 border-t-green-600',
    danger: 'border-red-200 border-t-red-600'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {/* Cercle extérieur qui pulse */}
        <div className={`absolute inset-0 ${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-ping opacity-30`}></div>
        
        {/* Spinner principal */}
        <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}></div>
      </div>
      
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-600 animate-pulse">Chargement en cours...</p>
        <div className="flex space-x-1 justify-center mt-2">
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;