import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  BaseEntity 
} from 'typeorm';

@Entity('comment')
export default class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    length: 255,
    nullable: false,
  })
  post_idx: number;

  @Column({
    length: 255,
    nullable: false,
  })
  comment_idx: number;

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

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

}