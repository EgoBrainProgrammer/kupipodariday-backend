import { IsUrl, Length, MaxLength } from "class-validator";
import { User } from "src/modules/users/entities/user.entity";
import { Wish } from "src/modules/wishes/entities/wish.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "src/core/entities/base.entity";

@Entity()
export class Wishlist extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 250,
	})
	@Length(1, 250)
	name: string;

	@Column({
		length: 1500,
	})
	@MaxLength(1500)
	description: string;

	@Column()
	@IsUrl()
	image: string;

	@ManyToMany(() => Wish, wish => wish.wishlists)
	@JoinTable()
	items: Wish[];

	@ManyToOne(() => User, user => user.offers)
	user: User;
}
