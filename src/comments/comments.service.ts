import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const user = await this.userRepository.findOneBy({ id: createCommentDto.userId });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${createCommentDto.userId} no encontrado`);
    }

    const newComment = this.commentRepository.create({
      comment: createCommentDto.comment,
      user,
    });

    return this.commentRepository.save(newComment);
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!comment) {
      throw new NotFoundException(`Comentario con ID ${id} no encontrado`);
    }

    return comment;
  }



  async remove(id: number): Promise<void> {
    const comment = await this.findOne(id);
    await this.commentRepository.remove(comment);
  }
}
