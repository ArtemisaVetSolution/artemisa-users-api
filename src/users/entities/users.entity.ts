import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { AuditableEntity } from "src/common/entities/auditable.entity";
import { UserRole } from "src/common/enums/roles.enum";
import { Token } from "src/tokens/entities/token.entity";


@Entity('users')
export class User extends AuditableEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    email: string;
    
    @Column('text')
    name: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('text', {
        default: UserRole.TUTOR
    })
    role: UserRole;

    @Column('text')
    cellphone: string;

    @Column('bool', {
        default: false,
        select: false,
    })
    isVerified: boolean;

    @OneToMany(() => Token, token => token.user)
    tokens: Token[];

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert();
    }

}
