import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('comment')
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    comment: string='';

    @Column()
    created_at: Date = new Date();
    
    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user!: User;

    @Column()
    userId!: number;



    
}
