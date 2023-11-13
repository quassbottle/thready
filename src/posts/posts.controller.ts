import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDao } from './dao/post.dao';
import { CommentDao } from 'src/comments/dao/comment.dao';
import { CommentDto } from 'src/comments/dto/comment.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  
  @Get(':id')
  async getPost(@Param() post: PostDao) {
    const { id } = post;
    const candidate = await this.postsService.post({ id: id });
    if (candidate == null) throw new NotFoundException('Post not found');
    return candidate;
  }

  @Post(':id/comments')
  async comment(@Req() req, @Param() post: PostDao, @Body() comment: CommentDto) {
    const { id } = post;
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
  async getComments(@Param() post: PostDao) {
    const { id } = post;
    const candidate = await this.postsService.post({ id: id }, { comments: true });
    if (candidate == null) throw new NotFoundException('Post not found');
    return candidate.comments;
  }
}
