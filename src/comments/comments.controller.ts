import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException, ForbiddenException, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDao } from './dao/comment.dao';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  async getComment(@Param('id', ParseUUIDPipe) id) {
    const candidate = await this.commentsService.comment({ id: id });
    if (candidate == null) throw new NotFoundException('Comment not found');
    return candidate;
  }

  @Delete(':id')
  async deleteComment(@Req() req, @Param('id', ParseUUIDPipe) id) {
    const candidate = await this.commentsService.comment({ id: id });
    if (candidate == null) {
      throw new NotFoundException('Comment not found');
    }
    if (candidate.creatorHash === req.member.hash) {
      return await this.commentsService.delete({ id: id });
    }
    
    throw new ForbiddenException();
  }
}
