import { Role } from "src/role/entity/role.entity";

export class CreateUserDto {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: Role;
}