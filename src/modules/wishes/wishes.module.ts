import { Module, forwardRef } from "@nestjs/common";
import { WishesService } from "./wishes.service";
import { WishesController } from "./wishes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wish } from "./entities/wish.entity";
import { OffersModule } from "../offers/offers.module";

@Module({
	imports: [TypeOrmModule.forFeature([Wish]), forwardRef(() => OffersModule)],
	controllers: [WishesController],
	providers: [WishesService],
	exports: [WishesService],
})
export class WishesModule {}
