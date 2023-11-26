import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { BoardMembersModule } from './boardmembers/boardmembers.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BoardsModule, BoardMembersModule, PostsModule, CommentsModule, PrismaModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {
}
