import {
	BadRequestException,
	ForbiddenException,
	Inject,
	Injectable,
	NotFoundException,
	forwardRef,
} from "@nestjs/common";
import { CreateWishDto } from "./dto/create-wish.dto";
import { UpdateWishDto } from "./dto/update-wish.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { Wish } from "./entities/wish.entity";
import { crudCreate, crudFindOne, crudUpdate, crudDelete } from "src/core/utils/crud";
import { CreateOfferDto } from "../offers/dto/create-offer.dto";
import { OffersService } from "../offers/offers.service";

@Injectable()
export class WishesService {
	constructor(
		private readonly dataSource: DataSource,
		@InjectRepository(Wish)
		private readonly repository: Repository<Wish>,
		@Inject(forwardRef(() => OffersService))
		private readonly offersService: OffersService,
	) { }

	create(request, dto: CreateWishDto) {
		return crudCreate(
			this.repository,
			{
				...dto,
				owner: <any>request.user.id,
			},
			{ owner: true },
		);
	}

	async copy(request, id: number) {
		const wish = await this.findOne({ where: { id }, relations: { owner: true } });
		if (wish.owner.id == request.user.id) throw new ForbiddenException();
		delete wish.id;
		return this.create(request, wish);
	}

	findAll(query: FindManyOptions<Wish>) {
		return this.repository.find(query);
	}

	async findOne(query: FindOneOptions<Wish>): Promise<Wish> {
		return crudFindOne(this.repository, query);
	}

	async updateOne(userId: number, id: number, dto: UpdateWishDto) {
		const wish = await this.repository.findOne({
			where: { id },
			relations: {
				offers: true,
				owner: true,
			},
		});

		if (!wish) throw new NotFoundException();

		if (wish.owner?.id != userId) throw new ForbiddenException();

		if (dto.price && wish.offers.length > 0)
			throw new BadRequestException("Нельзя изменить стоимость при наличии оферов!");

		return crudUpdate(this.repository, id, dto);
	}

	async removeOne(userId: number, id: number) {
		const wish = await this.repository.findOne({ where: { id }, relations: { owner: true, offers: true } });
		if (!wish) throw new NotFoundException();
		if (wish.owner?.id != userId) throw new ForbiddenException();
		for (const offer of wish.offers) await this.offersService.removeOne(offer.id);
		return crudDelete(this.repository, id);
	}

	async rais(dto: CreateOfferDto) {
		const wish = await this.findOne({ where: { id: dto.itemId }, relations: { owner: true } });
		if (wish.owner?.id == Number(dto.user)) throw new ForbiddenException();
		if (wish.raised >= wish.price) throw new ForbiddenException("Сборы завершены!");
		if (wish.raised + dto.amount > wish.price)
			throw new BadRequestException(
				`Сумма пожертвования превышает допустимый лимит! Осталось собрать ${wish.price - wish.raised}`,
			);

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			wish.raised += dto.amount;
			await queryRunner.manager.save(wish);
			await this.offersService.create(dto);
			await queryRunner.commitTransaction();
		} catch (err) {
			await queryRunner.rollbackTransaction();
		} finally {
			await queryRunner.release();
		}
	}
}
