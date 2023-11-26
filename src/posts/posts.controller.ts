import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDao } from './dao/post.dao';
import { CommentDao } from 'src/comments/dao/comment.dao';
import { CommentDto } from 'src/comments/dto/comment.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  
  @Get(':id')
  async getPost(@Param('id', ParseUUIDPipe) id) {
    const candidate = await this.postsService.post({ id: id });
    if (candidate == null) throw new NotFoundException('Post not found');
    return candidate;
  }

  @Post(':id/comments')
  async comment(@Req() req, @Param('id', ParseUUIDPipe) id, @Body() comment: CommentDto) {
    const { message } = comment;

    return await this.postsService.update({
      where: {
        id: id
      },
      data: {
        comments: {
          create: {
            message: message,
            creatorHash: req.member.hash
          }
        }
      },
      include: {
        comments: true
      }
    });
  }

  @Get(':id/comments')
  async getComments(@Param('id', ParseUUIDPipe) id) {
    const candidate = await this.postsService.post({ id: id }, { comments: true });
    if (candidate == null) throw new NotFoundException('Post not found');
    return candidate.comments;
  }
}
