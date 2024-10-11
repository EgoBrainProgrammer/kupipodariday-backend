import { Controller, Get, Post, Body, Param, ParseIntPipe, Req, UseGuards, Inject, forwardRef } from "@nestjs/common";
import { OffersService } from "./offers.service";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { AuthGuard } from "@nestjs/passport";
import { WishesService } from "../wishes/wishes.service";

@Controller("offers")
export class OffersController {
	constructor(
		private readonly offersService: OffersService,
		@Inject(forwardRef(() => WishesService)) private readonly wishesService: WishesService,
	) {}

	@UseGuards(AuthGuard("jwt"))
	@Post()
	create(@Req() request, @Body() dto: CreateOfferDto) {
		return this.wishesService.rais({
			...dto,
			user: <any>request.user.id,
		});
	}

	@Get()
	findAll() {
		return this.offersService.findAll();
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.offersService.findOne({ where: { id }, relations: { user: true, item: true } });
	}
}
