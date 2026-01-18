
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Lightbulb, 
  PenTool, 
  Calendar, 
  Settings, 
  BarChart3,
  Rocket,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import { useApp } from '../store/AppContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { theme, setTheme } = useApp();

  const navItems = [
    { name: '仪表盘', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: '灵感中心', icon: <Lightbulb size={20} />, path: '/ideas' },
    { name: '创作空间', icon: <PenTool size={20} />, path: '/editor' },
    { name: '发布计划', icon: <Calendar size={20} />, path: '/schedule' },
    { name: '数据分析', icon: <BarChart3 size={20} />, path: '#' },
  ];

  return (
    <div className="w-64 h-screen sticky top-0 bg-white dark:bg-[#09090b] border-r border-zinc-200 dark:border-zinc-800 flex flex-col p-4">
      <div className="flex items-center gap-3 px-3 py-6 mb-4">
        <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
          <Rocket size={24} className="text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">CreatorFlow</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all ${
                isActive 
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-indigo-600 dark:text-white font-semibold' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
        {/* 主题切换按钮 */}
        <div className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <button 
            onClick={() => setTheme('light')}
            className={`flex-1 flex justify-center py-1.5 rounded-md transition-all ${theme === 'light' ? 'bg-white shadow-sm text-indigo-600' : 'text-zinc-500'}`}
            title="浅色模式"
          >
            <Sun size={16} />
          </button>
          <button 
            onClick={() => setTheme('dark')}
            className={`flex-1 flex justify-center py-1.5 rounded-md transition-all ${theme === 'dark' ? 'bg-zinc-800 shadow-sm text-white' : 'text-zinc-500'}`}
            title="深色模式"
          >
            <Moon size={16} />
          </button>
          <button 
            onClick={() => setTheme('system')}
            className={`flex-1 flex justify-center py-1.5 rounded-md transition-all ${theme === 'system' ? 'bg-white dark:bg-zinc-800 shadow-sm text-indigo-600 dark:text-white' : 'text-zinc-500'}`}
            title="跟随系统"
          >
            <Monitor size={16} />
          </button>
        </div>

        <button className="w-full flex items-center gap-3 px-3 py-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-all">
          <Settings size={20} />
          <span className="text-sm font-medium">设置</span>
        </button>
        
        <div className="px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-zinc-700 flex items-center justify-center font-bold text-xs text-indigo-600 dark:text-zinc-300">
              JD
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">珍妮 创作主</p>
              <p className="text-xs text-zinc-500 truncate">高级订阅计划</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
