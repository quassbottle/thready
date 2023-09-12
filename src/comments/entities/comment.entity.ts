import { BoardMember } from 'src/boardmembers/entities/boardmember.entity';
import { Post } from 'src/posts/entities/post.entity';

export class Comment {
  id: number;

  creator: BoardMember;
  creatorId: number;

  message: string;
  published_at: Date;

  post: Post;
  postId: number;
}
