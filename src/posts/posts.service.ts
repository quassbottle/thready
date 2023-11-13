import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data: data,
    });
  }

  async post(where: Prisma.PostWhereUniqueInput, include?: Prisma.PostInclude) {
    return this.prisma.post.findUnique({
      where: where,
      include: include
    });
  }

  async posts(params: {
    skip? : number,
    take? : number,
    cursor? : Prisma.PostWhereUniqueInput,
    where? : Prisma.PostWhereInput,
    orderBy? : Prisma.PostOrderByWithRelationInput,
    include? : Prisma.PostInclude
  }) {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include
    })
  }

  async update(params: {
    where: Prisma.PostWhereUniqueInput,
    data: Prisma.PostUpdateInput,
    include?: Prisma.PostInclude
  }) {
    const { data, where, include } = params;
    return this.prisma.post.update({
      data: data,
      where: where,
      include: include
    });
  }

  async delete(where: Prisma.PostWhereUniqueInput) 
    : Promise<Post> {
    return this.prisma.post.delete({
      where: where
    });
  }
}

export { Post }