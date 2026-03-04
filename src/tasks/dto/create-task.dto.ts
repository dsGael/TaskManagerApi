import { IsString, IsNotEmpty, IsBoolean, IsOptional, MinLength } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty({ message: 'El título es obligatorio' })
    @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
    title!: string;

    @IsBoolean()
    @IsOptional()
    completed?: boolean;
}

