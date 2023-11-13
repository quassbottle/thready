import { IsUUID } from "class-validator";

export class PostDao {
    @IsUUID()
    id! : string;
}