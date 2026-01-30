const StatCard = ({ icon: Icon, title, value, subtitle, color, trend, trendValue }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    orange: 'from-orange-500 to-red-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500',
    red: 'from-red-500 to-pink-500',
    indigo: 'from-indigo-500 to-blue-500'
  };

  const bgColorClasses = {
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    indigo: 'bg-indigo-500'
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-xl p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 overflow-hidden">
      {/* Background gradient animé */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      {/* Particules flottantes */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-20 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700" 
           style={{ background: `linear-gradient(135deg, ${bgColorClasses[color]} 0%, transparent 100%)` }}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-14 h-14 bg-gradient-to-br ${colorClasses[color]} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
            <Icon className="text-white" size={28} strokeWidth={2.5} />
          </div>
          
          {trend && (
            <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-bold ${
              trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              <span>{trend === 'up' ? '↑' : '↓'}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{title}</p>
          <p className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
            {value}
          </p>
          <p className="text-xs text-gray-500 font-medium">{subtitle}</p>
        </div>
      </div>

      {/* Ligne décorative */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClasses[color]} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
    </div>
  );
};

export default StatCard;