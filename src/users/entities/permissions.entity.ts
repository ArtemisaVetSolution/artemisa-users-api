import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

import { UserRole } from "src/common/enums/roles.enum";
import { Path } from "src/common/enums/path.enum";

@Entity('permissions')
export class Permission{
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    role: UserRole

    @Column('text')
    path: Path

    @Column('bool', { name: 'can_create' })
    canCreate: boolean

    @Column('bool', { name: 'can_update' })
    canUpdate: boolean

    @Column('bool', { name: 'can_delete' })
    canDelete: boolean

    @Column('bool', { name: 'can_read' })
    canRead: boolean

    @Column('bool', { name: 'can_read_own' })
    canReadOwn: boolean

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
        select: false,
    })
    createdAt: Date;

    @CreateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
        onUpdate: `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
        select: false,
    })
    updatedAt: Date;

    @CreateDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
        select: false,
    })
    deletedAt: Date;


}