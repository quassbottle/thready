import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardMembersService } from './boardmembers.service';
import { BoardsService } from 'src/boards/boards.service';

@Controller('members')
export class BoardMembersController {
  constructor(private readonly boardmembersService: BoardMembersService,
              private readonly boardsService: BoardsService) {}

  // todo: perchance, here will be methods to get info about people who post, but I guess it is kinda unsafe
}
