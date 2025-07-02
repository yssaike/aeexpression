import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { ExpressionCard } from './components/ExpressionCard';
import { RecentlyCopied } from './components/RecentlyCopied';
import { EmptyState } from './components/EmptyState';
import { useExpressionLibrary } from './hooks/useExpressionLibrary';

function App() {
  const {
    filteredExpressions,
    favorites,
    recentlyCopied,
    searchQuery,
    selectedCategory,
    isDarkMode,
    showFavorites,
    expressions,
    toggleFavorite,
    copyExpression,
    setSearchQuery,
    setSelectedCategory,
    toggleDarkMode,
    toggleShowFavorites
  } = useExpressionLibrary();

  const [showRecentPanel, setShowRecentPanel] = useState(false);

  // Get recently copied expressions
  const recentExpressions = recentlyCopied
    .map(id => expressions.find(expr => expr.id === id))
    .filter(Boolean)
    .slice(0, 5);

  // Show recent panel when expressions are copied
  useEffect(() => {
    if (recentlyCopied.length > 0) {
      setShowRecentPanel(true);
      const timer = setTimeout(() => setShowRecentPanel(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [recentlyCopied.length]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + F to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }
      
      // Cmd/Ctrl + D to toggle dark mode
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        toggleDarkMode();
      }
      
      // Cmd/Ctrl + H to toggle favorites
      if ((e.metaKey || e.ctrlKey) && e.key === 'h') {
        e.preventDefault();
        toggleShowFavorites();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleDarkMode, toggleShowFavorites]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-purple-900/20 to-teal-900/20' 
            : 'bg-gradient-to-r from-purple-100/50 to-teal-100/50'
        }`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1)_0%,transparent_50%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Header
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          showFavorites={showFavorites}
          onToggleShowFavorites={toggleShowFavorites}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            isDarkMode={isDarkMode}
          />

          {/* Results Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mb-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            {showFavorites ? (
              <span>Showing {filteredExpressions.length} favorite expression{filteredExpressions.length !== 1 ? 's' : ''}</span>
            ) : (
              <span>
                {searchQuery || selectedCategory !== 'All' 
                  ? `Found ${filteredExpressions.length} expression${filteredExpressions.length !== 1 ? 's' : ''}`
                  : `${expressions.length} professional expressions available`
                }
              </span>
            )}
          </motion.div>

          {/* Expression Grid */}
          <AnimatePresence mode="wait">
            {filteredExpressions.length > 0 ? (
              <motion.div
                key="expressions-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredExpressions.map((expression) => (
                    <ExpressionCard
                      key={expression.id}
                      expression={expression}
                      isDarkMode={isDarkMode}
                      isFavorite={favorites.includes(expression.id)}
                      onToggleFavorite={toggleFavorite}
                      onCopy={copyExpression}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EmptyState
                  isDarkMode={isDarkMode}
                  showFavorites={showFavorites}
                  hasSearchQuery={!!searchQuery}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Recently Copied Panel */}
        <AnimatePresence>
          {showRecentPanel && recentExpressions.length > 0 && (
            <RecentlyCopied
              recentExpressions={recentExpressions}
              isDarkMode={isDarkMode}
              onCopy={copyExpression}
              onClose={() => setShowRecentPanel(false)}
            />
          )}
        </AnimatePresence>

        {/* Keyboard Shortcuts Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className={`fixed bottom-4 left-4 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
        >
          <div className="space-y-1">
            <div>⌘/Ctrl + F: Search</div>
            <div>⌘/Ctrl + D: Dark Mode</div>
            <div>⌘/Ctrl + H: Favorites</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;