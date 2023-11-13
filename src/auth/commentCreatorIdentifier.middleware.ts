import { ArgumentsHost, ExecutionContext, HttpException, HttpStatus, Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { NextFunction } from "express";
import { BoardMembersService } from "src/boardmembers/boardmembers.service";
import { createHash } from 'crypto';
import { PostsService } from "src/posts/posts.service";
import { CommentsService } from "src/comments/comments.service";

@Injectable()
export class CommentCreatorIdentifierMiddleware implements NestMiddleware {
    constructor(private readonly membersService: BoardMembersService,
                private readonly commentsService: CommentsService) {}

    async use(req: any, res: any, next: NextFunction) {
        const comment = await this.commentsService.comment({ id: req.params.id })
        
        if (comment == null) throw new NotFoundException();
        const creatorHash = comment.creatorHash;

        req.member = await this.membersService.member({ hash: creatorHash })
        
        next();
    }
}