import { IsUrl } from "class-validator";
import { User } from "src/modules/users/entities/user.entity";
import { Wish } from "src/modules/wishes/entities/wish.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Offer {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, user => user.offers)
	user: User;

	@ManyToOne(() => Wish, wish => wish.offers)
	wish: Wish;

	@Column()
	@IsUrl()
	item: string;
}
