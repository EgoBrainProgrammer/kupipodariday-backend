import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common";
import { WishesService } from "./wishes.service";
import { CreateWishDto } from "./dto/create-wish.dto";
import { UpdateWishDto } from "./dto/update-wish.dto";

@Controller("wishes")
export class WishesController {
	constructor(private readonly wishesService: WishesService) { }

	@Post()
	create(@Body() createWishDto: CreateWishDto) {
		return this.wishesService.create(createWishDto);
	}

	@Get()
	findAll() {
		return this.wishesService.findAll();
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.wishesService.findOne({ where: { id } });
	}

	@Patch(":id")
	update(@Param("id", ParseIntPipe) id: number, @Body() updateWishDto: UpdateWishDto) {
		return this.wishesService.updateOne(id, updateWishDto);
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.wishesService.removeOne(id);
	}
}
