import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityNotFoundError, FindOneOptions, QueryFailedError, Repository } from "typeorm";
import { DatabaseError } from "pg-protocol";

export async function crudCreate(repository: Repository<any>, dto: any | any[]) {
	try {
		return await repository.save(dto);
	} catch (ex) {
		if (ex instanceof QueryFailedError) {
			const err = ex.driverError as DatabaseError;

			if (err.code === "23505") {
				throw new ConflictException(err.message);
			}
		}

		throw ex;
	}
}

export async function crudUpdate(repository: Repository<any>, id: number, dto: any | any[]) {
	try {
		return await repository.update(id, dto);
	} catch (ex) {
		if (ex instanceof EntityNotFoundError) throw new NotFoundException();
		if (ex instanceof QueryFailedError) {
			const err = ex.driverError as DatabaseError;
			throw new InternalServerErrorException(err.message);
		}

		throw ex;
	}
}

export async function crudFindOne(repository: Repository<any>, criteria: FindOneOptions) {
	try {
		return await repository.findOneOrFail(criteria);
	} catch (ex) {
		if (ex instanceof EntityNotFoundError) throw new NotFoundException();

		throw ex;
	}
}

export async function crudDelete(repository: Repository<any>, criteria: FindOneOptions | number) {
	try {
		return await repository.delete(criteria);
	} catch (ex) {
		if (ex instanceof EntityNotFoundError) throw new NotFoundException();
		if (ex instanceof QueryFailedError) {
			const err = ex.driverError as DatabaseError;
			throw new InternalServerErrorException(err.message);
		}

		throw ex;
	}
}
