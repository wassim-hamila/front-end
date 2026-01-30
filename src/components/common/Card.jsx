const Card = ({ 
  children, 
  title, 
  className = '',
  headerAction,
  noPadding = false,
  gradient = false,
  hover = true
}) => {
  return (
    <div className={`
      ${gradient 
        ? 'bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30' 
        : 'bg-white'
      } 
      rounded-2xl shadow-xl p-6 
      transition-all duration-500 border border-gray-100
      ${hover ? 'hover:shadow-2xl hover:-translate-y-2 hover:border-primary-200' : ''}
      relative overflow-hidden group
      ${className}
    `}>
      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
      
      {/* Bordure gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
      
      {title && (
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gradient-to-r from-primary-200 to-purple-200">
          <h3 className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {title}
          </h3>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={noPadding ? '' : ''}>
        {children}
      </div>
    </div>
  );
};

export default Card;