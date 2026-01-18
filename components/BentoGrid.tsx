
import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Eye, 
  Activity, 
  Plus, 
  ArrowUpRight,
  ChevronRight,
  SearchX
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useApp } from '../store/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { PLATFORM_COLORS, PLATFORM_NAMES } from '../constants';

const data = [
  { name: '周一', views: 4000 },
  { name: '周二', views: 3000 },
  { name: '周三', views: 5000 },
  { name: '周四', views: 2780 },
  { name: '周五', views: 1890 },
  { name: '周六', views: 2390 },
  { name: '周日', views: 3490 },
];

const StatCard = ({ title, value, sub, icon: Icon, trend }: any) => (
  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:border-indigo-300 dark:hover:border-zinc-700 transition-all duration-300 group shadow-sm hover:shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-indigo-50 dark:bg-zinc-800 rounded-lg text-indigo-600 dark:text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
        <Icon size={20} />
      </div>
      {trend && (
        <span className="text-xs font-medium text-green-600 dark:text-green-500 bg-green-500/10 px-2 py-1 rounded-full flex items-center gap-1 border border-green-500/20">
          <ArrowUpRight size={12} /> {trend}
        </span>
      )}
    </div>
    <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{title}</h3>
    <div className="mt-1 flex items-baseline gap-2">
      <span className="text-2xl font-bold text-zinc-900 dark:text-white group-hover:scale-105 transition-transform origin-left">{value}</span>
      <span className="text-xs text-zinc-400">{sub}</span>
    </div>
  </div>
);

const BentoGrid: React.FC = () => {
  const { stats, filteredPosts, searchQuery } = useApp();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="md:col-span-1">
        <StatCard title="粉丝总数" value={stats.totalFans.toLocaleString()} sub="较上月增长 12%" icon={Users} trend="12.5%" />
      </div>
      <div className="md:col-span-1">
        <StatCard title="总播放/阅读" value={stats.totalViews.toLocaleString()} sub="最近30天" icon={Eye} trend="8.1%" />
      </div>
      <div className="md:col-span-1">
        <StatCard title="平均互动率" value={stats.engagementRate} sub="表现稳健" icon={Activity} />
      </div>
      <div className="md:col-span-1">
        <StatCard title="本月增长" value={`+${stats.monthlyGrowth}`} sub="新增关注者" icon={TrendingUp} trend="4.2%" />
      </div>

      <div className="md:col-span-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 min-h-[350px] shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">流量趋势</h3>
            <p className="text-sm text-zinc-500">全平台每日表现概览</p>
          </div>
          <select className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-bold uppercase text-zinc-600 dark:text-zinc-300 rounded-lg px-3 py-1.5 outline-none cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
            <option>最近 7 天</option>
            <option>最近 30 天</option>
          </select>
        </div>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" dark:stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} tickMargin={10} />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} tickMargin={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', borderColor: '#e4e4e7', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#09090b' }}
                cursor={{ stroke: '#6366f1', strokeWidth: 2 }}
              />
              <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="md:col-span-1 flex flex-col gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 flex-1 shadow-sm">
          <h3 className="font-semibold mb-6 text-sm flex items-center gap-2 text-zinc-900 dark:text-white">
            <Plus size={16} className="text-indigo-600" /> 快速操作
          </h3>
          <div className="space-y-3">
            <button onClick={() => navigate('/editor')} className="flex items-center justify-between w-full p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all shadow-md shadow-indigo-200 dark:shadow-indigo-900/20">
              开始撰写草稿 <ChevronRight size={16} />
            </button>
            <button onClick={() => navigate('/ideas')} className="flex items-center justify-between w-full p-3 rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-200 text-sm font-bold transition-all border border-zinc-200 dark:border-zinc-700">
              添加新灵感 <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
            <h4 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">系统集成</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">自动同步</span>
                </div>
                <span className="text-[10px] font-bold text-green-600 dark:text-green-500">已就绪</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Gemini AI</span>
                </div>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-500">连接正常</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/30 dark:bg-zinc-900/50">
          <div>
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">近期内容</h3>
            <p className="text-xs text-zinc-500">管理您的草稿和已计划的发布</p>
          </div>
          <Link to="/schedule" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
            查看完整计划 <ChevronRight size={14} />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500 uppercase text-[10px] font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">标题</th>
                <th className="px-6 py-4">平台</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">传播范围</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filteredPosts.length > 0 ? filteredPosts.slice(0, 5).map((post) => (
                <tr key={post.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all group">
                  <td className="px-6 py-5 font-medium text-zinc-900 dark:text-zinc-200">{post.title}</td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold border ${PLATFORM_COLORS[post.platform]}`}>
                      {PLATFORM_NAMES[post.platform]}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`flex items-center gap-2 text-xs font-medium ${
                      post.status === 'published' ? 'text-green-600 dark:text-green-400' :
                      post.status === 'scheduled' ? 'text-indigo-600 dark:text-indigo-400' :
                      'text-zinc-500'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        post.status === 'published' ? 'bg-green-500' :
                        post.status === 'scheduled' ? 'bg-indigo-500' :
                        'bg-zinc-400'
                      }`} />
                      {post.status === 'published' ? '已发布' : post.status === 'scheduled' ? '已计划' : '草稿'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right font-mono text-zinc-500 text-xs">
                    {post.stats ? `${(post.stats.views/1000).toFixed(1)}k 访问` : <span className="text-zinc-300 italic">尚未上线</span>}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-zinc-400">
                    <div className="flex flex-col items-center">
                       <SearchX size={32} className="mb-2 opacity-20" />
                       <p className="text-sm">未找到与 "{searchQuery}" 相关的结果</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
