import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ ConfigModule.forRoot(),TasksModule, UsersModule, AuthModule, TypeOrmModule.forRoot({
    type: 'postgres',
  url: process.env.DB_URL,
  autoLoadEntities: true,
  synchronize: false, 
  ssl: {
    rejectUnauthorized: false,
  },

  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
