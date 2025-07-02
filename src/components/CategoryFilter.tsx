import React from 'react';
import { motion } from 'framer-motion';
import { ExpressionCategory } from '../types';

interface CategoryFilterProps {
  selectedCategory: ExpressionCategory | 'All';
  onCategoryChange: (category: ExpressionCategory | 'All') => void;
  isDarkMode: boolean;
}

const categories: (ExpressionCategory | 'All')[] = [
  'All', 'Animation', 'Position', 'Scale', 'Rotation', 'Color', 'Text', 'Shape', 'Time', 'Math', 'Utility'
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  isDarkMode
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`backdrop-blur-xl border rounded-xl p-4 mb-8 ${
        isDarkMode 
          ? 'bg-gray-900/30 border-gray-700/50' 
          : 'bg-white/30 border-gray-200/50'
      }`}
    >
      <h3 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Categories
      </h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 border ${
              selectedCategory === category
                ? 'bg-purple-500 border-purple-500 text-white shadow-lg shadow-purple-500/25'
                : isDarkMode
                ? 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:border-gray-600'
                : 'bg-white/50 border-gray-300 text-gray-700 hover:bg-gray-50/80 hover:border-gray-400'
            }`}
            aria-pressed={selectedCategory === category}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};