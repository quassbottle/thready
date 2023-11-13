import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BoardCreatorIdentifierMiddleware } from 'src/auth/boardCreatorIdentifier.middleware.ts';
import { BoardMembersModule } from 'src/boardmembers/boardmembers.module';
import { BoardMembersService } from 'src/boardmembers/boardmembers.service';
import { PostCreatorIdentifierMiddleware } from 'src/auth/postCreatorIdentifier.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { BoardsModule } from 'src/boards/boards.module';
import { BoardsService } from 'src/boards/boards.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PostsController],
  providers: [PostsService, BoardMembersService, BoardsService],
})
export class PostsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PostCreatorIdentifierMiddleware)
      .forRoutes({ path: "/posts/:id/comments", method: RequestMethod.POST});
  }
}
