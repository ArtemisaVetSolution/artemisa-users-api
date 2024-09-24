import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

import { UserRole } from "src/common/enums/roles.enum";
import { Path } from "src/common/enums/path.enum";
import { AuditableEntity } from "src/common/entities/auditable.entity";

@Entity('permissions')
export class Permission extends AuditableEntity {
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


}