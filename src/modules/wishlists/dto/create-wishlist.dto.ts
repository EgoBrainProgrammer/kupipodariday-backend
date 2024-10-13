import { IsArray, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, Length } from "class-validator";

export class CreateWishlistDto {
	@IsString()
	@IsNotEmpty()
	@Length(1, 250)
	name: string;

	@IsUrl()
	image: string;

	@IsNotEmpty()
	@IsArray()
	@IsInt({
		each: true,
	})
	@IsPositive({
		each: true,
	})
	itemsId: number[];
}
