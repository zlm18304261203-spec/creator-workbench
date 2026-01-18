
import React, { useState, useEffect } from 'react';
import { 
  Bold, Italic, List, Image as ImageIcon, Sparkles, ChevronRight, FileText, RefreshCcw, CheckCircle2, Copy, ChevronDown
} from 'lucide-react';
import * as aiService from '../services/geminiService';
import { useApp } from '../store/AppContext';

const TONES = [
  { label: '专业学术', value: 'Professional' },
  { label: '幽默风趣', value: 'Humorous' },
  { label: '爆款引流', value: 'Viral/Hype' },
  { label: '科普教育', value: 'Educational' },
  { label: '极简主义', value: 'Minimalist' }
];

const RichTextEditor: React.FC = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('未命名杰作');
  const [outline, setOutline] = useState<string[]>([]);
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [selectedTone, setSelectedTone] = useState(TONES[0]);
  const [showToneDropdown, setShowToneDropdown] = useState(false);

  const handlePolish = async () => {
    if (!content.trim()) return;
    setIsAiLoading(true);
    try {
      const ai = new (await import("@google/genai")).GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `请使用“${selectedTone.label}”的风格润色以下中文内容，使其更具吸引力且表达清晰，同时保留核心原意：\n\n${content}`,
      });
      if (response.text) setContent(response.text);
      setAiMessage(`已按“${selectedTone.label}”风格润色 ✨`);
      setTimeout(() => setAiMessage(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleGenerateTitles = async () => {
    if (!content.trim()) return;
    setIsAiLoading(true);
    try {
      const titles = await aiService.generateTitle(content);
      setSuggestedTitles(titles);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const updateOutline = async () => {
    if (!content.trim()) return;
    try {
      const result = await aiService.extractOutline(content);
      setOutline(result);
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setAiMessage('已复制到剪贴板！');
    setTimeout(() => setAiMessage(''), 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (content.length > 30) updateOutline();
    }, 2000);
    return () => clearTimeout(timer);
  }, [content]);

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-white dark:bg-zinc-950">
      <div className="w-64 border-r border-zinc-200 dark:border-zinc-800 p-4 hidden lg:block overflow-y-auto">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <List size={14} /> 内容大纲
        </h3>
        <div className="space-y-4">
          {outline.length > 0 ? outline.map((item, idx) => (
            <div key={idx} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white cursor-pointer group transition-colors">
              <span className="text-zinc-300 dark:text-zinc-700 font-mono text-[10px] mt-0.5">{String(idx + 1).padStart(2, '0')}</span>
              <span className="leading-snug">{item}</span>
            </div>
          )) : <p className="text-xs text-zinc-400 italic">开始输入内容，系统将自动生成大纲...</p>}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-md">
              <FileText size={18} className="text-zinc-500 dark:text-zinc-400" />
            </div>
            <input 
              className="bg-transparent text-lg font-semibold outline-none border-none w-80 text-zinc-900 dark:text-white placeholder:text-zinc-300"
              value={title} onChange={(e) => setTitle(e.target.value)} placeholder="文章标题..."
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-400 mr-4 hidden md:inline">草稿已自动保存</span>
            <button className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-200 text-xs font-bold rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">预览</button>
            <button className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">发布</button>
          </div>
        </div>

        <div className="px-6 py-2 border-b border-zinc-100 dark:border-zinc-900 flex items-center gap-4 overflow-x-auto bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="flex items-center gap-1 border-r border-zinc-200 dark:border-zinc-800 pr-4">
            <button className="p-2 text-zinc-400 hover:text-indigo-600 dark:hover:text-white rounded transition-all"><Bold size={16} /></button>
            <button className="p-2 text-zinc-400 hover:text-indigo-600 dark:hover:text-white rounded transition-all"><Italic size={16} /></button>
            <button className="p-2 text-zinc-400 hover:text-indigo-600 dark:hover:text-white rounded transition-all"><List size={16} /></button>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowToneDropdown(!showToneDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 hover:border-indigo-400 transition-all"
            >
              语气: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{selectedTone.label}</span>
              <ChevronDown size={12} />
            </button>
            {showToneDropdown && (
              <div className="absolute top-full left-0 mt-1 w-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl z-20 py-1">
                {TONES.map(tone => (
                  <button 
                    key={tone.value}
                    onClick={() => { setSelectedTone(tone); setShowToneDropdown(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors ${selectedTone.value === tone.value ? 'text-indigo-600 font-bold bg-indigo-50 dark:bg-indigo-500/10' : 'text-zinc-600 dark:text-zinc-400'}`}
                  >
                    {tone.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="ml-auto flex items-center gap-4">
             {aiMessage && <div className="text-[10px] font-bold text-green-600 flex items-center gap-1"><CheckCircle2 size={12}/> {aiMessage}</div>}
             <button onClick={handlePolish} disabled={isAiLoading} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${isAiLoading ? 'bg-zinc-100 text-zinc-400 animate-pulse' : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30 hover:bg-indigo-100'}`}>
               <Sparkles size={14} /> {isAiLoading ? 'AI 处理中...' : 'AI 智能润色'}
             </button>
          </div>
        </div>

        <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
          <textarea 
            className="w-full h-full bg-transparent text-zinc-800 dark:text-zinc-300 resize-none outline-none text-lg leading-relaxed placeholder:text-zinc-200 dark:placeholder:text-zinc-800"
            placeholder="在此开始您的创作..."
            value={content} onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <div className="w-80 border-l border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50/30 dark:bg-zinc-900/30 overflow-y-auto hidden xl:block">
        <h3 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Sparkles size={14} /> AI 助手
        </h3>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">推荐标题</h4>
              <button onClick={handleGenerateTitles} disabled={isAiLoading} className="text-zinc-400 hover:text-indigo-600 disabled:opacity-50">
                <RefreshCcw size={14} className={isAiLoading ? 'animate-spin' : ''} />
              </button>
            </div>
            <div className="space-y-2">
              {suggestedTitles.length > 0 ? suggestedTitles.map((t, idx) => (
                <div key={idx} className="group p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-300 cursor-pointer border border-transparent hover:border-indigo-200 transition-all flex justify-between items-center">
                  <span className="line-clamp-2 flex-1 mr-2">{t}</span>
                  <button onClick={(e) => { e.stopPropagation(); copyToClipboard(t); }} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-zinc-200 rounded transition-all"><Copy size={12} /></button>
                </div>
              )) : <p className="text-[11px] text-zinc-400">点击刷新按钮，根据正文生成吸睛的 SEO 标题。</p>}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase">增强工具</h4>
            <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-400 rounded-xl text-xs group shadow-sm transition-all">
              <div className="flex flex-col text-left">
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">自动插图建议</span>
                <span className="text-[10px] text-zinc-400">基于语义推荐视觉素材</span>
              </div>
              <ChevronRight size={14} className="text-zinc-400 group-hover:text-indigo-600" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-400 rounded-xl text-xs group shadow-sm transition-all">
              <div className="flex flex-col text-left">
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">标签提取</span>
                <span className="text-[10px] text-zinc-400">生成高权重话题标签</span>
              </div>
              <ChevronRight size={14} className="text-zinc-400 group-hover:text-indigo-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
