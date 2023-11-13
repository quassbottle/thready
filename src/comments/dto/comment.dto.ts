import { IsNotEmpty } from "class-validator";

export class CommentDto {
    /* RIP for better times
    @IsUUID()
    @IsOptional()
    parentId?: string;
    */
   
    @IsNotEmpty()
    message: string;
}