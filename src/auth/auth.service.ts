import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
 constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  
  async login(authDto: AuthDto) {
    const { user, password } = authDto;

    const findUser = await this.usersService.findByUser(user);

    if (!findUser?.password || findUser.password !== password) {
      return { message: 'Credenciales inválidas' };
    }

    const payload = { sub: findUser.id, user: findUser.user };
    const token = await this.jwtService.signAsync(payload);

    return { 
      access_token: token,
      name: findUser.user
     };

    


  }
}
