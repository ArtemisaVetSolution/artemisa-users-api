import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { Seeder } from "typeorm-extension";

import * as bcrypt from 'bcryptjs';

import { User } from "src/users/entities/users.entity";
import { UserRole } from "../enums";

@Injectable()
export class UsersSeeder implements Seeder{

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async run(): Promise<void> {
        const users = [
            {email: "artemisa_admin_user@gmail.com", name: "Artemisa Admin", password: "Artemisa.admin.123", cellphone: "+57 3128985580", role: UserRole.ADMIN, isVerified: true},  
            {email: "artemisa_managment_user@gmail.com", name: "Artemisa Managment", password: "Artemisa.managment.123", cellphone: "+57 3128985580", role: UserRole.APPOINTMENT_MANAGER, isVerified: true},
            {email: "artemisa_collaborator_user@gmail.com", name: "Artemisa Collaborator", password: "Artemisa.collaborator.123", cellphone: "+57 3128985580", role: UserRole.COLLABORATOR, isVerified: true},
            {email: "artemisa_tutor_user@gmail.com", name: "Artemisa Tutor", password: "Artemisa.tutor.123", cellphone: "+57 3128985580", isVerified: true},
            {email: "artemisa_pet_shop_user@gmail.com", name: "Artemisa Pet Shop", role: UserRole.PET_SHOP_MANAGER, password: "Artemisa.petshopman.123", cellphone: "+57 3128985580", isVerified: true}
        ];

        for (const user of users) {
            const userExists = await this.userRepository.findOneBy({email: user.email});
            if (!userExists) {
                const salt = bcrypt.genSaltSync();
                const hashedPassword = await bcrypt.hash(user.password, salt);
                const newUser = this.userRepository.create({
                    ...user,
                    password: hashedPassword
                });
                await this.userRepository.save(newUser);
                Logger.log(`User ${user.email} created`);
            }else{
                Logger.log(`User ${user.email} already exists`);
            }
    

        }
        
    }
}