import {
  Entity,
  Column,
  DeleteDateColumn,
  OneToMany,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '@app/entity/post.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'email', length: 64 })
  email: string;

  @Column({ name: 'password', length: 256 })
  password: string;

  @Column({ name: 'name', length: 32 })
  name: string;

  @Column({ name: 'nickname', length: 32 })
  nickname: string;

  @Column({ name: 'tel', length: 32 })
  tel: string;

  @Column({ name: 'profile_url', length: 256 })
  profileUrl: string;

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
  updatedTime: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(() => Post, (post: Post) => post.userId)
  posts: Post[];
}
