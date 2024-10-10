import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly usersService: UsersService) {
		super();
	}

	async validate(username: string, password: string) {
		const user = await this.usersService.validatePassword(username, password);

		if (!user) throw new UnauthorizedException();

		return user;
	}
}
