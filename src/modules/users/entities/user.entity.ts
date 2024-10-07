import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsEmail, IsUrl, Length } from "class-validator";
import { Wish } from "src/modules/wishes/entities/wish.entity";
import { Offer } from "src/modules/offers/entities/offer.entity";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

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

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
