import { Column, ColumnType, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { IsUrl, Length } from "class-validator";
import { User } from "src/modules/users/entities/user.entity";
import { Offer } from "src/modules/offers/entities/offer.entity";
import { Wishlist } from "src/modules/wishlists/entities/wishlist.entity";
import { BaseEntity } from "src/core/entities/base.entity";

@Entity()
export class Wish extends BaseEntity {
	@Column({
		length: 250,
		nullable: false,
	})
	@Length(1, 250)
	name: string;

	@Column()
	@IsUrl()
	link: string;

	@Column()
	@IsUrl()
	image: string;

	@Column({
		type: <ColumnType>"double precision",
		nullable: false,
	})
	price: number;

	@Column({
		type: <ColumnType>"double precision",
		default: 0,
	})
	raised: number;

	@ManyToOne(() => User, user => user.wishes)
	owner: User;

	@Column({
		length: 1024,
		nullable: false,
	})
	@Length(1, 1024)
	description: string;

	@OneToMany(() => Offer, offer => offer.item)
	offers: Offer[];

	@Column({
		type: <ColumnType>"int",
		default: 0,
	})
	copied: number;

	@ManyToMany(() => Wishlist, wishlist => wishlist.items)
	wishlists: Wishlist[];
}
