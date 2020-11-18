import {
  Entity,
  Column, 
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity('view')
export default class View extends BaseEntity {

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
  ip: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

}