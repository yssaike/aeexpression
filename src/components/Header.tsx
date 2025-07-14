import React from 'react';
import { Search, Heart, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { ToggleSwitch } from './ToggleSwitch';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  showFavorites: boolean;
  onToggleShowFavorites: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  onToggleDarkMode,
  showFavorites,
  onToggleShowFavorites,
  searchQuery,
  onSearchChange
}) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-teal-400 flex items-center justify-center"
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
            </div>
            <div>
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                AE Expression Library
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Professional After Effects Expressions
              </p>
            </div>
          </motion.div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search expressions, tags, or categories..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  isDarkMode
                    ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                aria-label="Search expressions"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleShowFavorites}
              className={`p-2 rounded-lg border backdrop-blur-sm transition-all duration-300 ${
                showFavorites
                  ? 'bg-purple-500 border-purple-500 text-white'
                  : isDarkMode
                  ? 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50'
                  : 'bg-white/50 border-gray-300 text-gray-700 hover:bg-gray-50/80'
              }`}
              aria-label={showFavorites ? 'Hide favorites' : 'Show favorites'}
            >
              <Heart className={`w-4 h-4 ${showFavorites ? 'fill-current' : ''}`} />
            </motion.button>

            <ToggleSwitch
              checked={isDarkMode}
              onChange={onToggleDarkMode}
              size="sm"
              label=""
              className="ml-2"
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
};