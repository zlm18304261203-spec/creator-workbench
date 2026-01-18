
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BentoGrid from './components/BentoGrid';
import IdeaKanban from './components/IdeaKanban';
import RichTextEditor from './components/RichTextEditor';
import CalendarView from './components/CalendarView';
import { AppProvider, useApp } from './store/AppContext';
import { Search, Bell, Menu, X } from 'lucide-react';

const Header = () => {
  const { searchQuery, setSearchQuery } = useApp();
  const navigate = useNavigate();

  return (
    <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 md:px-8 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 w-full max-w-xs md:max-w-md transition-all focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500/20">
        <Search size={16} className="text-zinc-400 dark:text-zinc-500 mr-2" />
        <input 
          placeholder="搜索灵感、文章或关键字..." 
          className="bg-transparent border-none outline-none text-sm w-full text-zinc-900 dark:text-zinc-300 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 md:gap-4 ml-4">
        <button className="relative p-2 text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors hidden md:block">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#09090b]"></span>
        </button>
        <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800 mx-2 hidden md:block"></div>
        <button 
          onClick={() => navigate('/editor')}
          className="bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-700 text-white text-xs font-bold px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all whitespace-nowrap shadow-sm"
        >
          快速草稿
        </button>
      </div>
    </header>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen transition-colors duration-300">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-[#09090b] animate-in slide-in-from-left duration-300 shadow-2xl">
            <button 
              className="absolute top-4 right-4 text-zinc-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center lg:hidden bg-white dark:bg-[#09090b] px-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-zinc-500">
            <Menu size={24} />
          </button>
          <div className="ml-2 font-bold text-lg text-indigo-600">CreatorFlow</div>
        </div>
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<BentoGrid />} />
            <Route path="/ideas" element={<IdeaKanban />} />
            <Route path="/editor" element={<RichTextEditor />} />
            <Route path="/schedule" element={<CalendarView />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;
