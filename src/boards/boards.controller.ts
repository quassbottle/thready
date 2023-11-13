import { Controller, Get, Post, Body, Param, Delete, Query, HttpException, HttpStatus, Req, NotFoundException } from '@nestjs/common';

import { BoardsService } from './boards.service';
import { Board as BoardModel } from './boards.service';
import { BoardDao } from './dao/board.dao';
import { IsUUID } from 'class-validator';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get(':id')
  async getById(@Param() dao : BoardDao) : Promise<BoardModel> {
    const { id } = dao;
    const candidate = await this.boardsService.board({ id: id })
    if (candidate == null) throw new NotFoundException('Board not found');
    return candidate;
  }

  @Get(':id/members')
  async getMembers(@Param() dao: BoardDao) {
    const { id } = dao;
    const candidate = await this.boardsService.board({ id: id }, { members: true });
    if (candidate == null) throw new NotFoundException('Board not found');
    return candidate.members;
  }

  @Get(':id/posts')
  async getPosts(@Param() dao: BoardDao) {
    const { id } = dao;
    const candidate = await this.boardsService.board({ id: id }, { posts: true });
    if (candidate == null) throw new NotFoundException('Board not found');
    return candidate.posts;
  }

  @Post(':id/posts')
  async createPost(@Req() req, @Param() dao: BoardDao, @Body() params: {
    message: string
  }) {
    const { message } = params;
    const { id } = dao;

    return this.boardsService.update({
      where: {
        id: id
      },
      data: {
        posts: {
          create: {
            message: message,
            creatorHash: req.member.hash
          }
        }
      },
      include: {
        posts: true
      }
    });
  }

  @Get()
  async getBoards(@Query('page') page) {
    let pageNum = Number(page);

    if (isNaN(pageNum)) {
      throw new HttpException('Invalid page', HttpStatus.BAD_REQUEST);
    };

    pageNum = Math.max(1, pageNum);

    return this.boardsService.boards({
      take: 10,
      skip: 10 * (pageNum - 1)
    })
  }

  @Post()
  async createBoard(@Body() params: {
      title: string
  }) : Promise<BoardModel> {
    const { title } = params;
    return this.boardsService.create({ title });
  }

  @Delete()
  async deleteBoard(@Param() dao: BoardDao) : Promise<BoardModel> {
    const { id } = dao;
    return this.boardsService.delete({
      id: id
    });
  }
}
