import {
  Entity,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@app/entity/user.entity';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'title', length: 128 })
  title: string;

  @Column({ name: 'content', length: 1024 })
  content: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date | null;

  @ManyToOne(() => User, (user: User) => user.posts)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  userId: number;
}
