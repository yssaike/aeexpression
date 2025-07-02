export interface Expression {
  id: string;
  name: string;
  category: ExpressionCategory;
  description: string;
  code: string;
  tags: string[];
  examples: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  previewGif?: string;
  lastModified: string;
}

export type ExpressionCategory = 
  | 'Animation'
  | 'Position'
  | 'Scale'
  | 'Rotation'
  | 'Color'
  | 'Text'
  | 'Shape'
  | 'Time'
  | 'Math'
  | 'Utility';

export interface AppState {
  expressions: Expression[];
  favorites: string[];
  recentlyCopied: string[];
  searchQuery: string;
  selectedCategory: ExpressionCategory | 'All';
  isDarkMode: boolean;
  showFavorites: boolean;
}