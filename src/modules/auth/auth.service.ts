import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

	async signup(dto: CreateUserDto) {
		const user = await this.usersService.create(dto);

		return this.auth(user);
	}

	auth(user: User) {
		const payload = { sub: user.id };

		return { access_token: this.jwtService.sign(payload) };
	}
}
