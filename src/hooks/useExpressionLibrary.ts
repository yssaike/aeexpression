import { useState, useEffect, useMemo } from 'react';
import { Expression, ExpressionCategory, AppState } from '../types';
import { expressionsData } from '../data/expressions';

export const useExpressionLibrary = () => {
  const [state, setState] = useState<AppState>({
    expressions: expressionsData,
    favorites: JSON.parse(localStorage.getItem('ae-expression-favorites') || '[]'),
    recentlyCopied: JSON.parse(localStorage.getItem('ae-expression-recent') || '[]'),
    searchQuery: '',
    selectedCategory: 'All',
    isDarkMode: JSON.parse(localStorage.getItem('ae-expression-dark-mode') || 'false'),
    showFavorites: false
  });

  // Save to localStorage when favorites or recently copied changes
  useEffect(() => {
    localStorage.setItem('ae-expression-favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  useEffect(() => {
    localStorage.setItem('ae-expression-recent', JSON.stringify(state.recentlyCopied));
  }, [state.recentlyCopied]);

  useEffect(() => {
    localStorage.setItem('ae-expression-dark-mode', JSON.stringify(state.isDarkMode));
  }, [state.isDarkMode]);

  // Filtered expressions based on search and category
  const filteredExpressions = useMemo(() => {
    let filtered = state.showFavorites 
      ? state.expressions.filter(expr => state.favorites.includes(expr.id))
      : state.expressions;

    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(expr =>
        expr.name.toLowerCase().includes(query) ||
        expr.description.toLowerCase().includes(query) ||
        expr.tags.some(tag => tag.toLowerCase().includes(query)) ||
        expr.category.toLowerCase().includes(query)
      );
    }

    if (state.selectedCategory !== 'All') {
      filtered = filtered.filter(expr => expr.category === state.selectedCategory);
    }

    return filtered;
  }, [state.expressions, state.searchQuery, state.selectedCategory, state.showFavorites, state.favorites]);

  const toggleFavorite = (expressionId: string) => {
    setState(prev => ({
      ...prev,
      favorites: prev.favorites.includes(expressionId)
        ? prev.favorites.filter(id => id !== expressionId)
        : [...prev.favorites, expressionId]
    }));
  };

  const copyExpression = async (expression: Expression) => {
    try {
      await navigator.clipboard.writeText(expression.code);
      setState(prev => ({
        ...prev,
        recentlyCopied: [
          expression.id,
          ...prev.recentlyCopied.filter(id => id !== expression.id)
        ].slice(0, 10) // Keep only last 10
      }));
      return true;
    } catch (error) {
      console.error('Failed to copy expression:', error);
      return false;
    }
  };

  const setSearchQuery = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  };

  const setSelectedCategory = (category: ExpressionCategory | 'All') => {
    setState(prev => ({ ...prev, selectedCategory: category }));
  };

  const toggleDarkMode = () => {
    setState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  };

  const toggleShowFavorites = () => {
    setState(prev => ({ ...prev, showFavorites: !prev.showFavorites }));
  };

  return {
    ...state,
    filteredExpressions,
    toggleFavorite,
    copyExpression,
    setSearchQuery,
    setSelectedCategory,
    toggleDarkMode,
    toggleShowFavorites
  };
};