import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { AuditableEntity } from "src/common/entities/auditable.entity";
import { User } from "src/users/entities";
import { Tokens } from "src/common/enums";


@Entity('tokens')
export class Token extends AuditableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.tokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User; 

  @Column()
  token: string;

  @Column()
  type: Tokens;  

  @Column()
  expiresAt: Date; 

  @Column({ default: false })
  isUsed: boolean;
}
