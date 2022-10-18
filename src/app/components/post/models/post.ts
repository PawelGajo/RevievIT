import { PostActivity } from './post-activity';
import { PostCategory } from './post-category';
import { PostUser } from './post-user';

export type Post = {
  id: number;
  created: string;
  title: string;
  description: string;
  page_url: string;
  repo_url: string;
  rank: number;
  visits: number;
  has_top_answer: boolean;
  author: PostUser;
  author_last_activity: PostActivity;
  post_last_activity: PostActivity;
  answers: number;
  categories: PostCategory[];
};
