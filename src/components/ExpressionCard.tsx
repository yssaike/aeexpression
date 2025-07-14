import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Heart, ChevronDown, ChevronUp, Check, Star, Clock } from 'lucide-react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { AnimationPreview } from './AnimationPreview';
import { Expression } from '../types';

interface ExpressionCardProps {
  expression: Expression;
  isDarkMode: boolean;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onCopy: (expression: Expression) => Promise<boolean>;
}

export const ExpressionCard: React.FC<ExpressionCardProps> = ({
  expression,
  isDarkMode,
  isFavorite,
  onToggleFavorite,
  onCopy
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await onCopy(expression);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-500 bg-green-500/10';
      case 'Intermediate': return 'text-yellow-500 bg-yellow-500/10';
      case 'Advanced': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      className={`backdrop-blur-xl border rounded-xl overflow-hidden transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-900/40 border-gray-700/50 hover:bg-gray-900/60' 
          : 'bg-white/40 border-gray-200/50 hover:bg-white/60'
      } hover:shadow-2xl hover:shadow-purple-500/10`}
    >
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          {/* Animation Preview */}
          <AnimationPreview 
            expressionType={expression.category} 
            isDarkMode={isDarkMode} 
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {expression.name}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(expression.difficulty)}`}>
                {expression.difficulty}
              </span>
            </div>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {expression.description}
            </p>
            
            {/* Action Buttons - moved under description */}
            <div className="flex items-center gap-2 mt-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggleFavorite(expression.id)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isFavorite
                  ? 'text-red-500 bg-red-500/10 hover:bg-red-500/20'
                  : isDarkMode
                  ? 'text-gray-400 hover:text-red-400 hover:bg-gray-800/50'
                  : 'text-gray-400 hover:text-red-500 hover:bg-gray-100/50'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              disabled={copied}
              className={`p-2 rounded-lg transition-all duration-300 ${
                copied
                  ? 'text-green-500 bg-green-500/10'
                  : isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
              }`}
              aria-label="Copy expression code"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </motion.button>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {expression.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-md text-xs font-medium ${
                isDarkMode
                  ? 'bg-purple-500/20 text-purple-300'
                  : 'bg-purple-100 text-purple-700'
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Category and Last Modified */}
        <div className="flex items-center justify-between text-xs">
          <div className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Star className="w-3 h-3" />
            <span>{expression.category}</span>
          </div>
          <div className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Clock className="w-3 h-3" />
            <span>Updated {expression.lastModified}</span>
          </div>
        </div>

        {/* Expand Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
          onKeyDown={handleKeyDown}
          className={`w-full mt-4 p-3 rounded-lg border transition-all duration-300 ${
            isDarkMode
              ? 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50'
              : 'bg-white/50 border-gray-300 text-gray-700 hover:bg-gray-50/80'
          } flex items-center justify-center gap-2`}
          aria-expanded={isExpanded}
          aria-controls={`expression-details-${expression.id}`}
        >
          <span className="font-medium">
            {isExpanded ? 'Hide Details' : 'View Code & Examples'}
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </motion.button>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`expression-details-${expression.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`border-t ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}
          >
            <div className="p-6">
              {/* Code Block */}
              <div className="mb-6">
                <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Expression Code
                </h4>
                <div className="relative">
                  <SyntaxHighlighter
                    language="javascript"
                    style={isDarkMode ? atomOneDark : atomOneLight}
                    customStyle={{
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      lineHeight: '1.5'
                    }}
                    showLineNumbers={true}
                  >
                    {expression.code}
                  </SyntaxHighlighter>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="absolute top-3 right-3 p-2 rounded-md bg-black/20 text-white/80 hover:bg-black/30 transition-all duration-200"
                    aria-label="Copy code"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </motion.button>
                </div>
              </div>

              {/* Examples */}
              {expression.examples.length > 0 && (
                <div>
                  <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Use Cases
                  </h4>
                  <ul className="space-y-2">
                    {expression.examples.map((example, index) => (
                      <li key={index} className={`text-sm flex items-start gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};