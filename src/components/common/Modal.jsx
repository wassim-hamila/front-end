import { X, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, size = 'medium' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    full: 'max-w-7xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fadeIn">
      {/* Overlay avec blur */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className={`relative bg-white rounded-3xl shadow-2xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-hidden animate-scaleIn border-2 border-gray-100`}>
          {/* Gradient décoratif en haut */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500"></div>
          
          {/* Header premium */}
          <div className="relative bg-gradient-to-r from-gray-50 to-blue-50/30 px-8 py-6 border-b-2 border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent flex items-center">
                  {title}
                  <Sparkles className="ml-2 text-yellow-500 animate-bounce-slow" size={20} />
                </h3>
              </div>
              <button
                onClick={onClose}
                className="group p-2.5 rounded-xl bg-white hover:bg-red-50 border-2 border-gray-200 hover:border-red-300 transition-all duration-300 hover:scale-110 hover:rotate-90 shadow-md"
              >
                <X size={24} className="text-gray-500 group-hover:text-red-500 transition-colors duration-300" />
              </button>
            </div>
          </div>
          
          {/* Body avec scroll personnalisé */}
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)] scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-100">
            {children}
          </div>
          
          {/* Footer décoratif (optionnel) */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500"></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;