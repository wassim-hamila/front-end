const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick, 
  type = 'button',
  disabled = false,
  className = '',
  icon,
  loading = false,
  ...props 
}) => {
  const baseClasses = 'font-bold rounded-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden group';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 hover:from-primary-700 hover:via-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none before:absolute before:inset-0 before:bg-white before:opacity-0 hover:before:opacity-20 before:transition-opacity',
    
    secondary: 'bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-primary-300 shadow-md hover:shadow-xl transform hover:scale-105 disabled:opacity-50',
    
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-2xl transform hover:scale-105',
    
    danger: 'bg-gradient-to-r from-red-500 via-pink-500 to-red-600 hover:from-red-600 hover:via-pink-600 hover:to-red-700 text-white shadow-lg hover:shadow-2xl transform hover:scale-105',
    
    outline: 'border-3 border-primary-600 text-primary-600 hover:bg-gradient-to-r hover:from-primary-600 hover:to-purple-600 hover:text-white shadow-md hover:shadow-xl transform hover:scale-105',
    
    ghost: 'text-gray-700 hover:bg-gray-100 hover:text-primary-600 transform hover:scale-105'
  };
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} disabled:cursor-not-allowed`}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          <span>Chargement...</span>
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;