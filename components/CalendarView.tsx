
import React from 'react';
import { useApp } from '../store/AppContext';
import { PLATFORM_COLORS, PLATFORM_NAMES } from '../constants';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const CalendarView: React.FC = () => {
  const { posts } = useApp();
  
  const daysInMonth = 31;
  const startDay = 5; 
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - startDay + 1;
    return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
  });

  const getPostsForDay = (day: number) => {
    return posts.filter(p => {
      const pDate = new Date(p.publishDate);
      return pDate.getDate() === day && pDate.getMonth() === 2;
    });
  };

  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  return (
    <div className="p-6 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">发布计划</h2>
          <p className="text-sm text-zinc-500">统筹管理多平台的发布节奏</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1 shadow-sm">
             <button className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-all text-zinc-500"><ChevronLeft size={16}/></button>
             <span className="text-sm font-bold px-4 text-zinc-700 dark:text-zinc-200">2024年3月</span>
             <button className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-all text-zinc-500"><ChevronRight size={16}/></button>
           </div>
           <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
              <Plus size={18} /> 新增计划
           </button>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col shadow-sm">
        <div className="grid grid-cols-7 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30">
          {weekDays.map(day => (
            <div key={day} className="py-3 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              {day}
            </div>
          ))}
        </div>
        <div className="flex-1 grid grid-cols-7">
          {calendarDays.map((day, idx) => (
            <div key={idx} className={`border-r border-b border-zinc-100 dark:border-zinc-800 min-h-[100px] p-2 relative group hover:bg-indigo-50/20 dark:hover:bg-zinc-800/20 transition-all ${!day ? 'bg-zinc-50/50 dark:bg-zinc-950/50' : ''}`}>
              {day && (
                <>
                  <span className={`text-xs font-medium ${day === 22 ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-zinc-400 dark:text-zinc-500'}`}>{day}</span>
                  <div className="mt-1 space-y-1">
                    {getPostsForDay(day).map(post => (
                      <div key={post.id} className={`text-[9px] font-bold px-1.5 py-1 rounded border truncate cursor-pointer transition-transform hover:scale-105 shadow-sm ${PLATFORM_COLORS[post.platform]}`}>
                        {post.title}
                      </div>
                    ))}
                  </div>
                  <button className="absolute bottom-2 right-2 p-1 rounded-full bg-white dark:bg-zinc-800 text-zinc-400 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-indigo-600">
                    <Plus size={12} />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-6 overflow-x-auto pb-2">
        {Object.entries(PLATFORM_NAMES).map(([key, name]) => (
           <div key={key} className="flex items-center gap-2 flex-shrink-0">
             <div className={`w-3 h-3 rounded-full border ${PLATFORM_COLORS[key as any]}`}></div>
             <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{name}</span>
           </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
