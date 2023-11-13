import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BoardCreatorIdentifierMiddleware } from 'src/auth/boardCreatorIdentifier.middleware.ts';
import { BoardMembersService } from 'src/boardmembers/boardmembers.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardMembersService],
})
export class BoardsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BoardCreatorIdentifierMiddleware)
      .forRoutes({ path: "/boards/:id/posts", method: RequestMethod.POST});
  }
}
