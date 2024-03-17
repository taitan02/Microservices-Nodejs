import { IsOptional, Length } from "class-validator";
import { LoginInput } from "./LoginInput";

export class SignupInput extends LoginInput {
    @IsOptional()
    @Length(10, 13)
    phone: string;
}