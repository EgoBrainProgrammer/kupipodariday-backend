import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./modules/users/users.module";
import { WishesModule } from "./modules/wishes/wishes.module";
import { OffersModule } from "./modules/offers/offers.module";
import { WishlistsModule } from "./modules/wishlists/wishlists.module";
import { User } from "./modules/users/entities/user.entity";
import { Offer } from "./modules/offers/entities/offer.entity";
import { Wish } from "./modules/wishes/entities/wish.entity";
import { Wishlist } from "./modules/wishlists/entities/wishlist.entity";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			host: "localhost",
			port: 5432,
			username: "student",
			password: "student",
			database: "kupipodariday",
			entities: [User, Offer, Wish, Wishlist],
			synchronize: true,
		}),
		UsersModule,
		WishesModule,
		OffersModule,
		WishlistsModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule { }
