import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSpellDto {
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    public name: string;
}
