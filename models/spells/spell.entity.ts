import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class Spell {
    @IsNotEmpty()
    @IsString()
    public id: string;

    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    public name: string;
}
