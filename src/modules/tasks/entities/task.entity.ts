import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("tasks")
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  category: string;

  @Column()
  thumbnail: string;
}