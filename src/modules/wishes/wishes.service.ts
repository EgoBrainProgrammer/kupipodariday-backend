import { Injectable } from "@nestjs/common";
import { CreateWishDto } from "./dto/create-wish.dto";
import { UpdateWishDto } from "./dto/update-wish.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { Wish } from "./entities/wish.entity";
import { crudCreate, crudFindOne, crudUpdate, crudDelete } from "src/core/utils/crud";

@Injectable()
export class WishesService {
	constructor(
		@InjectRepository(Wish)
		private repository: Repository<Wish>,
	) {}

	create(dto: CreateWishDto) {
		return crudCreate(this.repository, dto);
	}

	findAll() {
		return this.repository.find();
	}

	async findOne(query: FindOneOptions<Wish>) {
		return crudFindOne(this.repository, query);
	}

	updateOne(id: number, dto: UpdateWishDto) {
		return crudUpdate(this.repository, id, dto);
	}

	removeOne(id: number) {
		return crudDelete(this.repository, id);
	}
}
