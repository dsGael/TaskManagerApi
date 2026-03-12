import { IsString, IsNotEmpty, IsBoolean, IsOptional, MinLength, IsInt, Min } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty({ message: 'El título es obligatorio' })
    @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
    title!: string;

    @IsBoolean()
    @IsOptional()
    completed?: boolean;

    @IsInt({ message: 'El userId debe ser un numero entero' })
    @Min(1, { message: 'El userId debe ser mayor o igual a 1' })
    userId!: number;
}

