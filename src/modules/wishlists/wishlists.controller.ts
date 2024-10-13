import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req, UseGuards } from "@nestjs/common";
import { WishlistsService } from "./wishlists.service";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { UpdateWishlistDto } from "./dto/update-wishlist.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("wishlistlists")
export class WishlistsController {
	constructor(private readonly wishlistsService: WishlistsService) { }

	@UseGuards(AuthGuard("jwt"))
	@Post()
	create(@Req() request, @Body() createWishlistDto: CreateWishlistDto) {
		return this.wishlistsService.create(request, createWishlistDto);
	}

	@Get()
	findAll() {
		return this.wishlistsService.findAll();
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.wishlistsService.findOne({
			where: { id }, relations: {
				items: {
					owner: true,
				},
				owner: true,
			},
		});
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
