import { BoardMembersModule } from "src/boardmembers/boardmembers.module";
import { Module } from "@nestjs/common";
import { BoardsModule } from "src/boards/boards.module";
import { BoardMembersService } from "src/boardmembers/boardmembers.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { BoardsService } from "src/boards/boards.service"
import { BoardCreatorIdentifierMiddleware } from "./boardCreatorIdentifier.middleware.ts";
import { CommentsService } from "src/comments/comments.service";

@Module({
  imports: [PrismaModule],
  providers: [BoardCreatorIdentifierMiddleware, BoardMembersService, CommentsService, BoardsService]
})
export class AuthModule {
}
