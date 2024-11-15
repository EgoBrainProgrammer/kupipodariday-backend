import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req, UseGuards } from "@nestjs/common";
import { WishesService } from "./wishes.service";
import { CreateWishDto } from "./dto/create-wish.dto";
import { UpdateWishDto } from "./dto/update-wish.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("wishes")
export class WishesController {
	constructor(private readonly wishesService: WishesService) {}

	@UseGuards(AuthGuard("jwt"))
	@Post()
	create(@Req() request, @Body() createWishDto: CreateWishDto) {
		return this.wishesService.create(request, createWishDto);
	}

	@UseGuards(AuthGuard("jwt"))
	@Post(":id/copy")
	copy(@Req() request, @Param("id", ParseIntPipe) id: number) {
		return this.wishesService.copy(request, id);
	}

	@UseGuards(AuthGuard("jwt"))
	@Get()
	findAll() {
		return this.wishesService.findAll({
			relations: { owner: true },
		});
	}

	@Get("last")
	findLast() {
		return this.wishesService.findAll({ relations: { owner: true }, order: { id: "DESC" }, take: 40 });
	}

	@Get("top")
	findTop() {
		return this.wishesService.findAll({
			relations: { owner: true },
			order: { id: "DESC" },
			take: 10,
		});
	}

	@UseGuards(AuthGuard("jwt"))
	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.wishesService.findOne({ where: { id } });
	}

	@UseGuards(AuthGuard("jwt"))
	@Patch(":id")
	update(@Req() request, @Param("id", ParseIntPipe) id: number, @Body() updateWishDto: UpdateWishDto) {
		return this.wishesService.updateOne(request.user.id, id, updateWishDto);
	}

	@UseGuards(AuthGuard("jwt"))
	@Delete(":id")
	remove(@Req() request, @Param("id", ParseIntPipe) id: number) {
		return this.wishesService.removeOne(request.user.id, id);
	}
}
