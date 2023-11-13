import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Board } from '@prisma/client';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.BoardCreateInput): Promise<Board> {
    return this.prisma.board.create({
      data: data,
    });
  }

  async board(where: Prisma.BoardWhereUniqueInput, include?: Prisma.BoardInclude) {
    return this.prisma.board.findUnique({
      where: where,
      include: include
    });
  }

  async boards(params: {
    skip? : number,
    take? : number,
    cursor? : Prisma.BoardWhereUniqueInput,
    where? : Prisma.BoardWhereInput,
    orderBy? : Prisma.BoardOrderByWithRelationInput,
    include? : Prisma.BoardInclude
  }) {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.board.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include
    })
  }

  async update(params: {
    where: Prisma.BoardWhereUniqueInput,
    data: Prisma.BoardUpdateInput,
    include?: Prisma.BoardInclude
  }) {
    const { data, where, include } = params;
    return this.prisma.board.update({
      data: data,
      where: where,
      include: include
    });
  }

  async delete(where: Prisma.BoardWhereUniqueInput) 
    : Promise<Board> {
    return this.prisma.board.delete({
      where: where
    });
  }
}

export { Board };
