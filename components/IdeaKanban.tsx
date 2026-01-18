
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Idea } from '../types';
import { Plus, MoreVertical, Tag, Clock, SearchX } from 'lucide-react';

const IdeaKanban: React.FC = () => {
  const { filteredIdeas, addIdea, updateIdeaStatus, searchQuery } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTags, setNewTags] = useState('');

  const columns: { id: Idea['status']; title: string }[] = [
    { id: 'inbox', title: '收件箱 / 原始灵感' },
    { id: 'researched', title: '已调研' },
    { id: 'ready', title: '准备创作' },
  ];

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addIdea({
      title: newTitle,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      status: 'inbox',
      contentSnippet: '',
    });
    setNewTitle('');
    setNewTags('');
    setShowAdd(false);
  };

  return (
    <div className="p-4 md:p-6 h-[calc(100vh-4rem)] overflow-hidden flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">灵感中心</h2>
          <p className="text-sm text-zinc-500">捕捉并组织您的每一个奇思妙想</p>
        </div>
        <div className="flex items-center gap-4">
          {searchQuery && (
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium px-2 py-1 bg-indigo-50 dark:bg-indigo-400/10 rounded border border-indigo-200 dark:border-indigo-400/20">
              过滤关键字: {searchQuery}
            </span>
          )}
          <button 
            onClick={() => setShowAdd(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20"
          >
            <Plus size={18} /> 新灵感
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 scroll-smooth">
        {columns.map((col) => {
          const columnIdeas = filteredIdeas.filter(i => i.status === col.id);
          return (
            <div key={col.id} className="w-80 flex-shrink-0 flex flex-col bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-200 dark:border-zinc-800/50">
              <div className="p-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold text-sm flex items-center gap-2 text-zinc-900 dark:text-white">
                  {col.title}
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold">
                    {columnIdeas.length}
                  </span>
                </h3>
                <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"><MoreVertical size={16} /></button>
              </div>
              
              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                {columnIdeas.map((idea) => (
                  <div key={idea.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-lg group hover:border-indigo-400 dark:hover:border-zinc-600 transition-all shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm text-zinc-900 dark:text-zinc-200 line-clamp-2">{idea.title}</h4>
                      <button className="text-zinc-300 group-hover:text-zinc-500 transition-colors"><MoreVertical size={14} /></button>
                    </div>
                    {idea.contentSnippet && <p className="text-xs text-zinc-500 mb-3 line-clamp-2">{idea.contentSnippet}</p>}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {idea.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/50">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-100 dark:border-zinc-800/50">
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-600 flex items-center gap-1">
                        <Clock size={10} /> {new Date(idea.createdAt).toLocaleDateString()}
                      </span>
                      <select 
                        value={idea.status}
                        onChange={(e) => updateIdeaStatus(idea.id, e.target.value as Idea['status'])}
                        className="bg-transparent text-[10px] font-bold text-indigo-600 dark:text-indigo-400 outline-none border-none cursor-pointer"
                      >
                        <option value="inbox">收件箱</option>
                        <option value="researched">已调研</option>
                        <option value="ready">可创作</option>
                      </select>
                    </div>
                  </div>
                ))}
                
                {col.id === 'inbox' && showAdd && (
                  <div className="bg-white dark:bg-zinc-900 border-2 border-dashed border-indigo-200 dark:border-indigo-500/30 p-4 rounded-lg">
                    <input 
                      autoFocus placeholder="灵感标题..." 
                      className="w-full bg-transparent text-sm border-none outline-none mb-2 text-zinc-900 dark:text-zinc-100"
                      value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <input 
                      placeholder="标签 (用逗号分隔)" 
                      className="w-full bg-transparent text-xs border-none outline-none mb-4 text-zinc-500"
                      value={newTags} onChange={(e) => setNewTags(e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                      <button onClick={handleAdd} className="bg-indigo-600 text-white px-3 py-1.5 rounded text-[11px] font-bold">确定</button>
                      <button onClick={() => setShowAdd(false)} className="text-zinc-400 text-[11px] font-bold px-3 py-1.5">取消</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IdeaKanban;
