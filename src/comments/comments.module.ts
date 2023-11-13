import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommentCreatorIdentifierMiddleware } from 'src/auth/commentCreatorIdentifier.middleware';
import { BoardMembersService } from 'src/boardmembers/boardmembers.service';

@Module({
  imports: [PrismaModule],
  controllers: [CommentsController],
  providers: [CommentsService, BoardMembersService],
})
export class CommentsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CommentCreatorIdentifierMiddleware)
      .forRoutes({ path: "/comments/:id", method: RequestMethod.DELETE});
  }
}
