import { Injectable } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: Prisma.CommentCreateInput): Promise<Comment> {
        return this.prisma.comment.create({
          data: data,
        });
      }
    
    async comment(where: Prisma.CommentWhereUniqueInput, include?: Prisma.CommentInclude) {
      return this.prisma.comment.findUnique({
        where: where,
        include: include
      });
    }
    
    async comments(params: {
      skip? : number,
      take? : number,
      cursor? : Prisma.CommentWhereUniqueInput,
      where? : Prisma.CommentWhereInput,
      orderBy? : Prisma.CommentOrderByWithRelationInput,
      include? : Prisma.CommentInclude
    }) {
      const { skip, take, cursor, where, orderBy, include } = params;
      return this.prisma.comment.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include
      })
    }
    
    async update(params: {
      where: Prisma.CommentWhereUniqueInput,
      data: Prisma.CommentUpdateInput,
      include?: Prisma.CommentInclude
    }) {
      const { data, where, include } = params;
      return this.prisma.comment.update({
        data: data,
        where: where,
        include: include
      });
    }
    
    async delete(where: Prisma.CommentWhereUniqueInput) 
      : Promise<Comment> {
      return this.prisma.comment.delete({
        where: where
      });
    }
}

export { Comment }