import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('post')
export default class Post extends BaseEntity {

  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    length: 255,
    nullable: false,
  })
  user_id: string;

  @Column({
    length: 255,
    nullable: false,
  })
  user_name: string;

  @Column({
    length: 255,
    nullable: false,
  })
  title: string;
  
  @Column({
    length: 255,
    nullable: false,
  })
  content: string;

  @Column({
    nullable: false,
    default: 0,
  })
  view: number;

  @Column('timestampz')
  @CreateDateColumn()
  created_at: Date;

}