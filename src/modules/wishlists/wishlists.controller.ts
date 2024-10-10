import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from "@nestjs/common";
import { WishlistsService } from "./wishlists.service";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { UpdateWishlistDto } from "./dto/update-wishlist.dto";

@Controller("wishlists")
export class WishlistsController {
	constructor(private readonly wishlistsService: WishlistsService) { }

	@Post()
	create(@Body() createWishlistDto: CreateWishlistDto) {
		return this.wishlistsService.create(createWishlistDto);
	}

	@Get()
	findAll() {
		return this.wishlistsService.findAll();
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.wishlistsService.findOne({ where: { id } });
	}

	@Patch(":id")
	update(@Param("id", ParseIntPipe) id: number, @Body() updateWishlistDto: UpdateWishlistDto) {
		return this.wishlistsService.updateOne(id, updateWishlistDto);
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.wishlistsService.removeOne(id);
	}
}
