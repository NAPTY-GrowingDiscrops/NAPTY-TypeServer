import { 
  Entity, 
  Column, 
  CreateDateColumn,
  PrimaryGeneratedColumn, 
  BaseEntity 
} from 'typeorm';

@Entity('comment')
export default class Comment extends BaseEntity {

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
  user_id: string;

  @Column({
    length: 255,
    nullable: false,
  })
  user_name: string;

  @Column('text', {
    nullable: false,
  })
  content: string;

  @Column('timestampz')
  @CreateDateColumn()
  created_at: Date;

}