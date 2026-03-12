import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty({ message: 'El usuario es obligatorio' })
	@MinLength(3, { message: 'El usuario debe tener al menos 3 caracteres' })
	user!: string;

	@IsString()
	@IsNotEmpty({ message: 'La contraseña es obligatoria' })
	@MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
	password!: string;
}
