import { IsUUID } from "class-validator";

export class BoardDao {
    @IsUUID()
    id! : string;
}