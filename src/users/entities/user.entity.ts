import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Unique(['email'])
    email: string;

    @Column()
    password: string;

    @Column()
    @Unique(['username'])
    username: string;

}
