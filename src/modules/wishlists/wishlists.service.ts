import { Injectable } from "@nestjs/common";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { UpdateWishlistDto } from "./dto/update-wishlist.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { Wishlist } from "./entities/wishlist.entity";
import { crudCreate, crudFindOne, crudUpdate, crudDelete } from "src/core/utils/crud";

@Injectable()
export class WishlistsService {
	constructor(
		@InjectRepository(Wishlist)
		private repository: Repository<Wishlist>,
	) {}

	create(dto: CreateWishlistDto) {
		return crudCreate(this.repository, dto);
	}

	findAll() {
		return this.repository.find();
	}

	async findOne(query: FindOneOptions<Wishlist>) {
		return crudFindOne(this.repository, query);
	}

	updateOne(id: number, dto: UpdateWishlistDto) {
		return crudUpdate(this.repository, id, dto);
	}

	removeOne(id: number) {
		return crudDelete(this.repository, id);
	}
}
