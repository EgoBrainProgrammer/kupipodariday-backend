import { IsBoolean, IsInt, IsNumber, IsPositive } from "class-validator";
import { User } from "src/modules/users/entities/user.entity";

export class CreateOfferDto {
	@IsNumber()
	@IsPositive()
	amount: number;

	@IsBoolean()
	hidden: boolean;

	@IsInt()
	@IsPositive()
	itemId: number;

	user: User;
}
