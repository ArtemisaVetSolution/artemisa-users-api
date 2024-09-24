import * as fs from 'fs';
import * as path from 'path';
import {Repository } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Permission } from 'src/users/entities/permissions.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionsSeeder implements Seeder {

    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ) {}

     async run(): Promise<void> {
        const permissionFilePath = path.join(__dirname, 'permissions.json');

        const permissionsData = fs.readFileSync(permissionFilePath, 'utf-8');
        const permissions = JSON.parse(permissionsData)
    
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