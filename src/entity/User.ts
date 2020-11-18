import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity('user')
export default class User extends BaseEntity {

  @PrimaryColumn({
    length: 255,
    nullable: false
  })
  id: string;

  @Column({
    length: 255,
    nullable: false
  })
  pw: string;

  @Column({
    length:255,
    nullable: false,
    unique: true
  })
  name: string;

  @Column({
    length: 255,
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    default: false,
    nullable: false
  })
  emailReq: Boolean;

}