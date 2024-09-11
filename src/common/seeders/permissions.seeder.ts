import { DataSource, Repository } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Permission } from 'src/users/entities/permissions.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Path, UserRole } from '../enums';

@Injectable()
export class PermissionsSeeder implements Seeder {

    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ) {}

     async run(): Promise<void> {
        const permissions = [
        { role: UserRole.ADMIN, path: Path.SERVICES, canCreate: true, canUpdate: true, canDelete: true, canReadOwn: true, canRead: true },
        { role: UserRole.APPOINTMENT_MANAGER, path: Path.SERVICES, canCreate: false, canUpdate: false, canDelete: false, canReadOwn: true, canRead: true },
        { role: UserRole.TUTOR, path: Path.SERVICES, canCreate: false, canUpdate: false, canDelete: false, canReadOwn: true, canRead: true },
        { role: UserRole.COLLABORATOR, path: Path.SERVICES, canCreate: false, canUpdate: false, canDelete: false, canReadOwn: true, canRead: true },
        { role: UserRole.ADMIN, path: Path.APPOINTMENTS, canCreate: true, canUpdate: true, canDelete: false, canReadOwn: true, canRead: true },
        { role: UserRole.APPOINTMENT_MANAGER, path: Path.APPOINTMENTS, canCreate: true, canUpdate: true, canDelete: false, canReadOwn: true, canRead: true },
        { role: UserRole.TUTOR, path: Path.APPOINTMENTS, canCreate: true, canUpdate: true, canDelete: false, canReadOwn: true, canRead: false },
        { role: UserRole.COLLABORATOR, path: Path.APPOINTMENTS, canCreate: false, canUpdate: false, canDelete: false, canReadOwn: true, canRead: true },
        { role: UserRole.ADMIN, path: Path.PATIENTS, canCreate: true, canUpdate: true, canDelete: true, canReadOwn: true, canRead: true },
        { role: UserRole.APPOINTMENT_MANAGER, path: Path.PATIENTS, canCreate: true, canUpdate: true, canDelete: true, canReadOwn: true, canRead: true },
        { role: UserRole.TUTOR, path: Path.PATIENTS, canCreate: true, canUpdate: true, canDelete: true, canReadOwn: true, canRead: false },
        { role: UserRole.COLLABORATOR, path: Path.PATIENTS, canCreate: true, canUpdate: true, canDelete: false, canReadOwn: true, canRead: true },
        { role: UserRole.ADMIN, path: Path.TUTORS, canCreate: true, canUpdate: true, canDelete: true, canReadOwn: true, canRead: true },
        { role: UserRole.APPOINTMENT_MANAGER, path: Path.TUTORS, canCreate: true, canUpdate: true, canDelete: false, canReadOwn: true, canRead: true },
        { role: UserRole.TUTOR, path: Path.TUTORS, canCreate: true, canUpdate: true, canDelete: true, canReadOwn: true, canRead: false },
        { role: UserRole.COLLABORATOR, path: Path.TUTORS, canCreate: true, canUpdate: false, canDelete: false, canReadOwn: false, canRead: true },
        { role: UserRole.ADMIN, path: Path.COLLABORATOR, canCreate: true, canUpdate: true, canDelete: true, canReadOwn: true, canRead: true },
        { role: UserRole.APPOINTMENT_MANAGER, path: Path.COLLABORATOR, canCreate: false, canUpdate: false, canDelete: false, canReadOwn: false, canRead: false },
        { role: UserRole.TUTOR, path: Path.COLLABORATOR, canCreate: false, canUpdate: false, canDelete: false, canReadOwn: false, canRead: false },
        { role: UserRole.COLLABORATOR, path: Path.COLLABORATOR, canCreate: false, canUpdate: false, canDelete: false, canReadOwn: false, canRead: false },
        { role: UserRole.ADMIN, path: Path.ORDERS, canCreate: true, canUpdate: true, canDelete: true, canReadOwn: true, canRead: true },
        { role: UserRole.APPOINTMENT_MANAGER, path: Path.ORDERS, canCreate: false, canUpdate: true, canDelete: true, canReadOwn: true, canRead: true },
        { role: UserRole.TUTOR, path: Path.ORDERS, canCreate: true, canUpdate: false, canDelete: false, canReadOwn: true, canRead: false },
        { role: UserRole.COLLABORATOR, path: Path.ORDERS, canCreate: false, canUpdate: false, canDelete: false, canReadOwn: false, canRead: true },
        { role: UserRole.ADMIN, path: Path.DIAGNOSTIC_AIDS, canCreate: true, canUpdate: true, canDelete: true, canReadOwn: true, canRead: true },
        { role: UserRole.APPOINTMENT_MANAGER, path: Path.DIAGNOSTIC_AIDS, canCreate: true, canUpdate: false, canDelete: false, canReadOwn: true, canRead: true },
        { role: UserRole.TUTOR, path: Path.DIAGNOSTIC_AIDS, canCreate: false, canUpdate: false, canDelete: false, canReadOwn: true, canRead: false },
        { role: UserRole.COLLABORATOR, path: Path.DIAGNOSTIC_AIDS, canCreate: true, canUpdate: false, canDelete: false, canReadOwn: true, canRead: true },
        { role: UserRole.ADMIN, path: Path.MEDICAL_HISTORY_RECORD, canCreate: true, canUpdate: true, canDelete: true, canReadOwn: true, canRead: true },
        { role: UserRole.APPOINTMENT_MANAGER, path: Path.MEDICAL_HISTORY_RECORD, canCreate: true, canUpdate: false, canDelete: false, canReadOwn: true, canRead: true },
        { role: UserRole.TUTOR, path: Path.MEDICAL_HISTORY_RECORD, canCreate: false, canUpdate: false, canDelete: false, canReadOwn: true, canRead: false },
        { role: UserRole.COLLABORATOR, path: Path.MEDICAL_HISTORY_RECORD, canCreate: true, canUpdate: true, canDelete: false, canReadOwn: true, canRead: true },
        { role: UserRole.ADMIN, path: Path.PAYMENTS, canCreate: true, canUpdate: true, canDelete: true, canReadOwn: true, canRead: true },
        { role: UserRole.APPOINTMENT_MANAGER, path: Path.PAYMENTS, canCreate: true, canUpdate: true, canDelete: true, canReadOwn: true, canRead: true },
        { role: UserRole.TUTOR, path: Path.PAYMENTS, canCreate: false, canUpdate: false, canDelete: false, canReadOwn: true, canRead: false },
        { role: UserRole.COLLABORATOR, path: Path.PAYMENTS, canCreate: false, canUpdate: false, canDelete: false, canReadOwn: false, canRead: false },
        { role: UserRole.ADMIN, path: Path.IA_SUGGESTIONS, canCreate: true, canUpdate: false, canDelete: true, canReadOwn: true, canRead: true },
        { role: UserRole.APPOINTMENT_MANAGER, path: Path.IA_SUGGESTIONS, canCreate: false, canUpdate: false, canDelete: false, canReadOwn: false, canRead: false },
        { role: UserRole.TUTOR, path: Path.IA_SUGGESTIONS, canCreate: false, canUpdate: false, canDelete: false, canReadOwn: false, canRead: false },
        { role: UserRole.COLLABORATOR, path: Path.IA_SUGGESTIONS, canCreate: true, canUpdate: false, canDelete: false, canReadOwn: true, canRead: true },
        { role: UserRole.ADMIN, path: Path.PRODUCTS, canCreate: true, canUpdate: true, canDelete: true, canReadOwn: true, canRead: true },
        { role: UserRole.APPOINTMENT_MANAGER, path: Path.PRODUCTS, canCreate: false, canUpdate: false, canDelete: false, canReadOwn: true, canRead: true },
        { role: UserRole.TUTOR, path: Path.PRODUCTS, canCreate: false, canUpdate: false, canDelete: false, canReadOwn: true, canRead: true },
        { role: UserRole.COLLABORATOR, path: Path.PRODUCTS, canCreate: false, canUpdate: false, canDelete: false, canReadOwn: true, canRead: true },
        ];
    
        for (const permission of permissions){
            const permissionExists = await this.permissionRepository.findOne({
                where: {
                    role: permission.role,
                    path: permission.path
                }
            });

            if(!permissionExists){
                const newPermission = this.permissionRepository.create(permission);
                await this.permissionRepository.save(newPermission);
                Logger.log(`Seed executed: permission ${permission.role} - ${permission.path} created`);
            }else{
                Logger.log(`Seed executed: permission ${permission.role} - ${permission.path} already exists`);
            }

        }
    
  }
}