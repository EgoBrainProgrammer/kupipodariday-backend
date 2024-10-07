import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { IsUrl, Length } from "class-validator";
import { User } from "src/modules/users/entities/user.entity";
import { Offer } from "src/modules/offers/entities/offer.entity";

@Entity()
export class Wish {
	@PrimaryGeneratedColumn()
	id: number;

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
		type: "double precision",
	})
	price: number;

	@Column({
		type: "double precision",
	})
	raised: number;

	@ManyToOne(() => User, user => user.wishes)
	owner: User;

	@Column({
		length: 1024,
	})
	@Length(1, 1024)
	description: string;

	@OneToMany(() => Offer, offer => offer.wish)
	offers: Offer[];

	@Column({
		type: "decimal",
	})
	copied: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
