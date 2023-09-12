import { BoardMember } from 'src/boardmembers/entities/boardmember.entity';
import { Post } from 'src/posts/entities/post.entity';

export class Board {
  id: number;
  title: string;
  posts: Post[];
  members: BoardMember[];
}
