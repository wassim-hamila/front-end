const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = '',
  icon,
  ...props
}) => {
  return (
    <div className={`mb-5 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
          {label} 
          {required && <span className="ml-1 text-red-500 text-lg">*</span>}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors duration-300">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full ${icon ? 'pl-12 pr-4' : 'px-4'} py-3.5
            border-2 ${error ? 'border-red-400' : 'border-gray-200'} 
            rounded-xl 
            focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 
            transition-all duration-300 bg-white 
            hover:border-gray-300 hover:shadow-md
            disabled:bg-gray-100 disabled:cursor-not-allowed
            placeholder:text-gray-400 placeholder:font-medium
            text-gray-900 font-medium
            shadow-sm
          `}
          {...props}
        />
        {/* Ligne décorative */}
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 rounded-full`}></div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 font-semibold flex items-center animate-fadeIn">
          <span className="mr-1">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;