import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { crudCreate, crudDelete, crudFindOne, crudUpdate } from "src/core/utils/crud";
import { HashService } from "../hash/hash.service";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private repository: Repository<User>,
		private readonly hashService: HashService,
	) {}

	async create(dto: CreateUserDto) {
		dto.password = await this.hashService.hash(dto.password);
		return crudCreate(this.repository, dto);
	}

	findMany(query: FindOneOptions<User>) {
		return this.repository.find(query);
	}

	async findOne(query: FindOneOptions<User>): Promise<User> {
		return crudFindOne(this.repository, query);
	}

	async findWishes(username: string) {
		return (
			await this.findOne({
				where: { username },
				relations: {
					wishes: true,
				},
			})
		).wishes;
	}

	async updateOne(id: number, dto: UpdateUserDto) {
		if (dto.password) dto.password = await this.hashService.hash(dto.password);
		return crudUpdate(this.repository, id, dto);
	}

	removeOne(id: number) {
		return crudDelete(this.repository, id);
	}

	async validatePassword(username: string, password: string) {
		try {
			const user = await this.findOne({
				where: { username },
				select: ["id", "password"],
			});

			if (user && this.hashService.compare(password, user.password)) return user;
		} catch {}

		return null;
	}
}
