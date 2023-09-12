import { Board } from 'src/boards/entities/board.entity';
import { Post } from 'src/posts/entities/post.entity';

export class BoardMember {
  id: number;
  ip: string;
  name: string;

  board: Board;
  boardId: number;

  posts: Post[];
  comments: Comment[];
}
