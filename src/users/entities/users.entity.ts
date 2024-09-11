import { UserRole } from "src/common/enums/roles.enum";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    @Unique(['email'])
    email: string;
    
    @Column('text')
    name: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column('bool',
        {
            default: true
        }
    )
    isActive: boolean;

    @Column('text', {
        default: UserRole.TUTOR
    })
    role: UserRole;

    @Column('text')
    cellphone: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
        select: false,
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
        onUpdate: `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
        select: false,
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
        select: false,
    })
    deletedAt: Date;

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert();
    }

}
