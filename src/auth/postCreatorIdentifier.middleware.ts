import { ArgumentsHost, ExecutionContext, HttpException, HttpStatus, Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { NextFunction } from "express";
import { BoardMembersService } from "src/boardmembers/boardmembers.service";
import { createHash } from 'crypto';
import { PostsService } from "src/posts/posts.service";

@Injectable()
export class PostCreatorIdentifierMiddleware implements NestMiddleware {
    constructor(private readonly membersService: BoardMembersService,
                private readonly postsService: PostsService) {}

    async use(req: any, res: any, next: NextFunction) {    
        const post = await this.postsService.post({ id: req.params.id });
        if (post == null) throw new NotFoundException('Post not found');

        const boardId = post.boardId;
        
        //const hash = createHash('md5').update(req.ip + req.params.id).digest('hex').toString();

        const hash = await this.membersService.generateHash({
            ip: req.ip,
            id: req.params.id
        });

        let candidate = await this.membersService.boardHasMember({
            boardId: boardId,
            hash: hash
        });

        if (candidate == null) {
            candidate = await this.membersService.createForBoard({
                boardId: boardId,
                hash: hash
            });    
        }
        
        req.member = candidate;
        
        next();
    }
}