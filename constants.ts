
import { Idea, Post, UserStats } from './types';

export const MOCK_USER_STATS: UserStats = {
  totalFans: 124500,
  monthlyGrowth: 4200,
  engagementRate: "8.4%",
  totalViews: 890000,
};

export const MOCK_IDEAS: Idea[] = [
  {
    id: '1',
    title: '如何在24小时内构建一个SaaS产品',
    tags: ['技术', '创业'],
    status: 'inbox',
    contentSnippet: '起草MVP开发的路线图。',
    createdAt: '2024-03-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'AI在内容创作中的未来',
    tags: ['AI', '创意'],
    status: 'researched',
    contentSnippet: '收集来自 Gemini 和 GPT-4o 的行业报告。',
    createdAt: '2024-03-18T14:30:00Z',
  },
  {
    id: '3',
    title: 'Tailwind CSS 的10个实用技巧',
    tags: ['设计', '编程'],
    status: 'ready',
    contentSnippet: '准备录制视频并撰写博客文章。',
    createdAt: '2024-03-22T09:15:00Z',
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: '101',
    title: '三月产品更新说明',
    platform: 'WeChat',
    status: 'published',
    publishDate: '2024-03-10T08:00:00Z',
    stats: { views: 4500, likes: 230, comments: 45 },
  },
  {
    id: '102',
    title: '新工作室探秘',
    platform: 'Bilibili',
    status: 'scheduled',
    publishDate: '2024-03-28T18:00:00Z',
  },
  {
    id: '103',
    title: '我的每日高效作息',
    platform: 'TikTok',
    status: 'draft',
    publishDate: '2024-03-25T12:00:00Z',
  },
  {
    id: '104',
    title: '设计系统最佳实践',
    platform: 'RedNote',
    status: 'scheduled',
    publishDate: '2024-03-30T10:00:00Z',
  },
];

export const PLATFORM_NAMES = {
  WeChat: '微信公众号',
  TikTok: '抖音',
  Bilibili: 'Bilibili',
  RedNote: '小红书',
};

export const PLATFORM_COLORS = {
  WeChat: 'bg-green-500/10 text-green-600 dark:text-green-500 border-green-500/20',
  TikTok: 'bg-pink-500/10 text-pink-600 dark:text-pink-500 border-pink-500/20',
  Bilibili: 'bg-blue-400/10 text-blue-600 dark:text-blue-400 border-blue-400/20',
  RedNote: 'bg-red-500/10 text-red-600 dark:text-red-500 border-red-500/20',
};
