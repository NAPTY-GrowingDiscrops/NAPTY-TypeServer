import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  BaseEntity 
} from 'typeorm';

@Entity('post_hate')
export default class PostHate extends BaseEntity {

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

}