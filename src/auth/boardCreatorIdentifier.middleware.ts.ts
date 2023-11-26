import { ArgumentsHost, ExecutionContext, HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { BoardMembersService } from "src/boardmembers/boardmembers.service";
import { createHash } from 'crypto';

@Injectable()
export class BoardCreatorIdentifierMiddleware implements NestMiddleware {
    constructor(private readonly membersService: BoardMembersService) {}

    async use(req: any, res: any, next: NextFunction) {
        //const hash = createHash('md5').update(req.ip + req.params.id).digest('hex').toString();

        const hash = await this.membersService.generateHash({
            ip: req.ip,
            id: req.params.id
        });

        let candidate = await this.membersService.boardHasMember({
            boardId: req.params.id,
            hash: hash
        });

        if (candidate == null) {
            candidate = await this.membersService.createForBoard({
                boardId: req.params.id,
                hash: hash
            });    
        }
        
        req.member = candidate;

        next();
    }
}