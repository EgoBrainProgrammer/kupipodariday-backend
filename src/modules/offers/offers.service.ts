import { Injectable } from "@nestjs/common";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { UpdateOfferDto } from "./dto/update-offer.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { Offer } from "./entities/offer.entity";
import { crudCreate, crudFindOne, crudUpdate, crudDelete } from "src/core/utils/crud";

@Injectable()
export class OffersService {
	constructor(
		@InjectRepository(Offer)
		private repository: Repository<Offer>,
	) {}

	create(dto: CreateOfferDto) {
		return crudCreate(this.repository, dto);
	}

	findAll() {
		return this.repository.find();
	}

	async findOne(query: FindOneOptions<Offer>) {
		return crudFindOne(this.repository, query);
	}

	updateOne(id: number, dto: UpdateOfferDto) {
		return crudUpdate(this.repository, id, dto);
	}

	removeOne(id: number) {
		return crudDelete(this.repository, id);
	}
}
