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
import { HashModule } from "./modules/hash/hash.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				host: configService.get<string>("DATABASE_HOST"),
				port: configService.get<number>("DATABASE_PORT"),
				database: configService.get<string>("DATABASE_NAME"),
				username: configService.get<string>("DATABASE_USERNAME"),
				password: configService.get("DATABASE_PASSWORD"),
				entities: [User, Offer, Wish, Wishlist],
				synchronize: true,
			}),
		}),
		UsersModule,
		WishesModule,
		OffersModule,
		WishlistsModule,
		HashModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
