const Badge = ({ children, variant = 'default', className = '', icon }) => {
  const variants = {
    default: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300',
    success: 'bg-gradient-to-r from-green-100 via-emerald-100 to-green-100 text-green-800 border border-green-300 shadow-sm shadow-green-200',
    warning: 'bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-100 text-orange-800 border border-orange-300 shadow-sm shadow-orange-200',
    danger: 'bg-gradient-to-r from-red-100 via-pink-100 to-red-100 text-red-800 border border-red-300 shadow-sm shadow-red-200',
    info: 'bg-gradient-to-r from-blue-100 via-cyan-100 to-blue-100 text-blue-800 border border-blue-300 shadow-sm shadow-blue-200',
    primary: 'bg-gradient-to-r from-primary-100 via-blue-100 to-primary-100 text-primary-800 border border-primary-300 shadow-sm shadow-primary-200',
    purple: 'bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 text-purple-800 border border-purple-300 shadow-sm shadow-purple-200'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wide transition-all duration-300 hover:scale-110 hover:shadow-md ${variants[variant]} ${className}`}>
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;