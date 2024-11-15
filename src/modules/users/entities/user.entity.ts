import { Column, Entity, OneToMany } from "typeorm";
import { IsEmail, IsUrl, Length } from "class-validator";
import { Wish } from "src/modules/wishes/entities/wish.entity";
import { Offer } from "src/modules/offers/entities/offer.entity";
import { Wishlist } from "src/modules/wishlists/entities/wishlist.entity";
import { BaseEntity } from "src/core/entities/base.entity";

@Entity()
export class User extends BaseEntity {
	@Column({
		length: 30,
		unique: true,
		nullable: false,
	})
	@Length(2, 30)
	username: string;

	@Column({
		default: "Пока ничего не рассказал о себе",
	})
	@Length(2, 200)
	about: string;

	@Column({
		default: "https://i.pravatar.cc/300",
	})
	@IsUrl()
	avatar: string;

	@Column({
		unique: true,
	})
	@IsEmail()
	email: string;

	@Column({
		select: false,
	})
	password: string;

	@OneToMany(() => Wish, wish => wish.owner)
	wishes: Wish[];

	@OneToMany(() => Offer, offer => offer.user)
	offers: Offer[];

	@OneToMany(() => Wishlist, wishlist => wishlist.owner)
	wishlists: Wishlist[];
}
