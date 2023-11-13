import { Module } from '@nestjs/common';
import { BoardMembersService } from './boardmembers.service';
import { BoardMembersController } from './boardmembers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BoardsModule } from 'src/boards/boards.module';
import { BoardsService } from 'src/boards/boards.service';

@Module({
  imports: [PrismaModule, BoardsModule],
  controllers: [BoardMembersController],
  providers: [BoardMembersService, BoardsService],
})
export class BoardMembersModule {}
