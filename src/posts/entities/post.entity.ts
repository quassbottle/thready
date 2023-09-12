import { BoardMember } from 'src/boardmembers/entities/boardmember.entity';
import { Board } from 'src/boards/entities/board.entity';
import { Comment } from 'src/comments/entities/comment.entity';

export class Post {
  id: number;

  creator: BoardMember;
  creatorId: number;

  board: Board;
  boardId: number;

  message: string;
  published_at: Date;
  comments: Comment[];
}
