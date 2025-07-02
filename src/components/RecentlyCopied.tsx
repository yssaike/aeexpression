import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Copy, X } from 'lucide-react';
import { Expression } from '../types';

interface RecentlyCopiedProps {
  recentExpressions: Expression[];
  isDarkMode: boolean;
  onCopy: (expression: Expression) => Promise<boolean>;
  onClose: () => void;
}

export const RecentlyCopied: React.FC<RecentlyCopiedProps> = ({
  recentExpressions,
  isDarkMode,
  onCopy,
  onClose
}) => {
  if (recentExpressions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed bottom-6 right-6 w-80 backdrop-blur-xl border rounded-xl shadow-2xl z-50 ${
        isDarkMode 
          ? 'bg-gray-900/90 border-gray-700/50' 
          : 'bg-white/90 border-gray-200/50'
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recently Copied
            </h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className={`p-1 rounded-md transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
            aria-label="Close recently copied panel"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
        
        <div className="space-y-2 max-h-60 overflow-y-auto">
          <AnimatePresence>
            {recentExpressions.map((expression, index) => (
              <motion.div
                key={expression.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50'
                    : 'bg-gray-50/50 border-gray-200/50 hover:bg-gray-100/50'
                } group cursor-pointer`}
                onClick={() => onCopy(expression)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {expression.name}
                    </p>
                    <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {expression.category}
                    </p>
                  </div>
                  <Copy className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};