
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Idea, Post, UserStats } from '../types';
import { MOCK_IDEAS, MOCK_POSTS, MOCK_USER_STATS } from '../constants';

type Theme = 'light' | 'dark' | 'system';

interface AppContextType {
  ideas: Idea[];
  posts: Post[];
  stats: UserStats;
  searchQuery: string;
  theme: Theme;
  setSearchQuery: (query: string) => void;
  setTheme: (theme: Theme) => void;
  addIdea: (idea: Omit<Idea, 'id' | 'createdAt'>) => void;
  updateIdeaStatus: (id: string, status: Idea['status']) => void;
  addPost: (post: Omit<Post, 'id'>) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  filteredIdeas: Idea[];
  filteredPosts: Post[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ideas, setIdeas] = useState<Idea[]>(MOCK_IDEAS);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [stats] = useState<UserStats>(MOCK_USER_STATS);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'system');

  useEffect(() => {
    const root = window.document.documentElement;
    const applyTheme = (t: Theme) => {
      let actualTheme = t;
      if (t === 'system') {
        actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      root.classList.remove('light', 'dark');
      root.classList.add(actualTheme);
      localStorage.setItem('theme', t);
    };

    applyTheme(theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const addIdea = (newIdea: Omit<Idea, 'id' | 'createdAt'>) => {
    const idea: Idea = {
      ...newIdea,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setIdeas([idea, ...ideas]);
  };

  const updateIdeaStatus = (id: string, status: Idea['status']) => {
    setIdeas(ideas.map(i => i.id === id ? { ...i, status } : i));
  };

  const addPost = (newPost: Omit<Post, 'id'>) => {
    const post: Post = {
      ...newPost,
      id: Math.random().toString(36).substr(2, 9),
    };
    setPosts([post, ...posts]);
  };

  const updatePost = (id: string, updates: Partial<Post>) => {
    setPosts(posts.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const filteredIdeas = ideas.filter(idea => 
    idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    idea.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppContext.Provider value={{ 
      ideas, posts, stats, searchQuery, theme, setSearchQuery, setTheme,
      addIdea, updateIdeaStatus, addPost, updatePost,
      filteredIdeas, filteredPosts
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
