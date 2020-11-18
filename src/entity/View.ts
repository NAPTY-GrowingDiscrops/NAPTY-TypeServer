import {
  Entity,
  Column, 
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity('view')
export default class View extends BaseEntity {

  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    nullable: false,
  })
  post_idx: number;

  @Column({
    length: 255,
    nullable: false,
  })
  ip: string;

  @Column('timestampz')
  @CreateDateColumn()
  created_at: Date;

}