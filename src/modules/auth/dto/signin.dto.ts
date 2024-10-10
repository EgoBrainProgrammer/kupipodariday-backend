import { IsNotEmpty, IsString, Length } from "class-validator";

export class SigninDto {
	@IsString()
	@IsNotEmpty()
	@Length(2, 30)
	username: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
