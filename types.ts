
export type Platform = 'WeChat' | 'TikTok' | 'Bilibili' | 'RedNote';

export interface Idea {
  id: string;
  title: string;
  tags: string[];
  status: 'inbox' | 'researched' | 'ready';
  contentSnippet?: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  platform: Platform;
  status: 'draft' | 'scheduled' | 'published';
  publishDate: string; // ISO Date
  content?: string;
  stats?: {
    views: number;
    likes: number;
    comments: number;
  };
}

export interface UserStats {
  totalFans: number;
  monthlyGrowth: number;
  engagementRate: string;
  totalViews: number;
}
