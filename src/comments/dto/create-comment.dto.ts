import { IsInt, IsNotEmpty, Min, MinLength } from 'class-validator';

export class CreateCommentDto {
    
    @IsInt({ message: 'El userId debe ser un numero entero' })
    @Min(1, { message: 'El userId debe ser mayor o igual a 1' })
    userId!: number;

    @IsNotEmpty({message: 'El comentario es obligatorio'})
    @MinLength(1, {message: 'El comentario no puede estar vacio'})
    comment!: string;

    




}