import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { UpdateWishlistDto } from "./dto/update-wishlist.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, In, Repository } from "typeorm";
import { Wishlist } from "./entities/wishlist.entity";
import { crudCreate, crudFindOne, crudUpdate, crudDelete } from "src/core/utils/crud";
import { User } from "../users/entities/user.entity";
import { WishesService } from "../wishes/wishes.service";

@Injectable()
export class WishlistsService {
	constructor(
		@InjectRepository(Wishlist)
		private readonly repository: Repository<Wishlist>,
		private readonly wishesService: WishesService,
	) {}

	async create(request, dto: CreateWishlistDto) {
		return crudCreate(this.repository, {
			...dto,
			items: await this.wishesService.findAll({
				where: {
					id: In(dto.itemsId),
				},
			}),
			owner: <User>request.user.id,
		});
	}

	findAll(query: FindManyOptions<Wishlist> = null) {
		return this.repository.find(query);
	}

	async findOne(query: FindOneOptions<Wishlist>) {
		return crudFindOne(this.repository, query);
	}

	async updateOne(userId: number, id: number, dto: UpdateWishlistDto) {
		const wishlist = await this.findOne({ where: { id } });
		if (wishlist.owner?.id != userId) throw new ForbiddenException();
		return crudUpdate(this.repository, id, dto);
	}

	async removeOne(userId: number, id: number) {
		const wishlist = await this.findOne({ where: { id } });
		if (wishlist.owner?.id != userId) throw new ForbiddenException();
		return crudDelete(this.repository, id);
	}
}
