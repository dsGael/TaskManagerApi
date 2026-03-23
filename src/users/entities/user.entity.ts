import { Task } from 'src/tasks/entities/task.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user: string='';

    @Column()
    password: string='';
    
    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[] | undefined;

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[] | undefined;

    
}
