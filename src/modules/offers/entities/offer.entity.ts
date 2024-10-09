import { User } from "src/modules/users/entities/user.entity";
import { Wish } from "src/modules/wishes/entities/wish.entity";
import { Column, ColumnType, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "src/core/entities/base.entity";

@Entity()
export class Offer extends BaseEntity {
	@ManyToOne(() => User, user => user.offers)
	user: User;

	@ManyToOne(() => Wish, wish => wish.offers)
	item: Wish;

	@Column({
		type: <ColumnType>"double precision",
	})
	amount: number;

	@Column({
		type: <ColumnType>"boolean",
		default: false,
	})
	hidden: boolean;
}
