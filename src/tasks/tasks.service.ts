import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const user = await this.userRepository.findOneBy({ id: createTaskDto.userId });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${createTaskDto.userId} no encontrado`);
    }

    const newTask = this.taskRepository.create({
      title: createTaskDto.title,
      completed: createTaskDto.completed ?? false,
      user,
    });

    return await this.taskRepository.save(newTask);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    if (updateTaskDto.title !== undefined) {
      task.title = updateTaskDto.title;
    }

    if (updateTaskDto.completed !== undefined) {
      task.completed = updateTaskDto.completed;
    }

    if (updateTaskDto.userId !== undefined) {
      const user = await this.userRepository.findOneBy({ id: updateTaskDto.userId });
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${updateTaskDto.userId} no encontrado`);
      }
      task.user = user;
    }

    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id); 
    await this.taskRepository.remove(task);
  }

  async findByUserId(userId: number): Promise<Task[]> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }
    return this.taskRepository.find({
      where: { user: { id: userId } },
      relations: {
        user: true,
      },
    });
  }

}