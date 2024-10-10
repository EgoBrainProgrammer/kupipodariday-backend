import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from "class-validator";

export class CreateUserDto {
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@IsString()
	@IsNotEmpty()
	@Length(2, 30)
	username: string;

	@IsUrl()
	@IsOptional()
	avatar: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	about: string;
}
