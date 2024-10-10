import { Body, Controller, Request, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(AuthGuard("local"))
	@Post("signin")
	signin(@Request() req) {
		return this.authService.auth(req.user);
	}

	@Post("signup")
	signup(@Body() dto: CreateUserDto) {
		return this.authService.signup(dto);
	}
}
