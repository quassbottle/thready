import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { BoardMembersModule } from './boardmembers/boardmembers.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { BoardCreatorIdentifierMiddleware } from './auth/boardCreatorIdentifier.middleware.ts';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BoardsModule, BoardMembersModule, PostsModule, CommentsModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
}
