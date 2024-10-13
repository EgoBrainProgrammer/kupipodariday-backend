import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Req, UseGuards } from "@nestjs/common";
import { WishlistsService } from "./wishlists.service";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { UpdateWishlistDto } from "./dto/update-wishlist.dto";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard("jwt"))
@Controller("wishlistlists")
export class WishlistsController {
	constructor(private readonly wishlistsService: WishlistsService) {}

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
			where: { id },
			relations: {
				items: {
					owner: true,
				},
				owner: true,
			},
		});
	}

	@Patch(":id")
	update(@Req() request, @Param("id", ParseIntPipe) id: number, @Body() updateWishlistDto: UpdateWishlistDto) {
		return this.wishlistsService.updateOne(request.user.id, id, updateWishlistDto);
	}

	@Delete(":id")
	remove(@Req() request, @Param("id", ParseIntPipe) id: number) {
		return this.wishlistsService.removeOne(request.user.id, id);
	}
}
