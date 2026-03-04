import { PartialType } from '@nestjs/mapped-types';

import { CreateTaskDto } from './create-task.dto';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsString()
    @IsNotEmpty({ message: 'El título es obligatorio' })
    @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
    @IsOptional()
    title?: string;

    @IsBoolean()
    @IsOptional()
    completed?: boolean;
}
