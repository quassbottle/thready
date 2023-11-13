import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CommentDao {
    @IsUUID()
    id!: string;
}