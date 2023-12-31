import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BoardMember, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { createHash } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardMembersService {
    constructor(private prisma: PrismaService) { }

    async generateHash(params: {
        ip: string,
        id: number
    }) : Promise<string> {
        const { ip, id } = params;
        const hash = createHash('md5').update(ip + "_" + id).digest('hex').toString(); // underscore prevents collisions for specific IPs and boards
        return hash;
    }

    async member(where: Prisma.BoardMemberWhereUniqueInput) {
        return this.prisma.boardMember.findUnique({
            where: where
        })
    }

    async createForBoard(params: {
        boardId: string,
        hash: string
    }) : Promise<BoardMember> {
        const { boardId, hash } = params;

        const board = await this.prisma.board.findFirst({
            where: {
                id: boardId
            }
        });
        if (board == null) throw new NotFoundException('Board not found');

        const created = await this.prisma.board.update({
            where: {
              id: boardId
            },
            data: {
              members: {
                create: {
                  hash: hash
                }
              }
            },
            include: {
                members: true
            } 
        }); 

        return created.members.find(member => member.hash === hash);
    }

    async boardHasMember(params: {
        boardId: string,
        hash: string
    }) : Promise<BoardMember> {
        const { hash, boardId } = params;

        const board = await this.prisma.board.findFirst({
            where: {
                id: boardId
            }
        });
        if (board == null) throw new NotFoundException('Board not found');

        const candidate = await this.prisma.boardMember.findFirst({
            where: {
                hash: hash,
                boardId: boardId
            }
        });

        return candidate;
    }
}
