import React from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  isDarkMode: boolean;
  showFavorites: boolean;
  hasSearchQuery: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isDarkMode,
  showFavorites,
  hasSearchQuery
}) => {
  const getEmptyStateContent = () => {
    if (showFavorites) {
      return {
        icon: Heart,
        title: 'No Favorites Yet',
        description: 'Start favoriting expressions to build your personal collection.',
        suggestion: 'Click the heart icon on any expression card to add it to your favorites.'
      };
    }
    
    if (hasSearchQuery) {
      return {
        icon: Search,
        title: 'No Results Found',
        description: 'Try adjusting your search terms or browse different categories.',
        suggestion: 'Use keywords like "animation", "wiggle", or "bounce" to find expressions.'
      };
    }
    
    return {
      icon: Sparkles,
      title: 'Welcome to AE Expression Library',
      description: 'Discover professional After Effects expressions to enhance your motion graphics.',
      suggestion: 'Browse categories or use the search to find the perfect expression for your project.'
    };
  };

  const { icon: Icon, title, description, suggestion } = getEmptyStateContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
          isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
        }`}
      >
        <Icon className={`w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`text-base mb-4 max-w-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
      >
        {description}
      </motion.p>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`text-sm max-w-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
      >
        {suggestion}
      </motion.p>
    </motion.div>
  );
};