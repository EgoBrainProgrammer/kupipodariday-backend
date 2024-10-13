import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from "@nestjs/common";
import { Like } from "typeorm";
import { AuthGuard } from "@nestjs/passport";
import { QueryDto } from "src/core/dto/query.dto";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Post("find")
	findByQuery(@Body() queryDto: QueryDto) {
		return this.usersService.findMany({
			where: [{ username: Like(`%${queryDto.query}%`) }, { email: Like(`%${queryDto.query}%`) }],
		});
	}

	@Get("me")
	me(@Req() request) {
		return this.usersService.findOne({ where: { id: request.user.id } });
	}

	@Get(":username")
	findByUsername(@Param("username") username: string) {
		return this.usersService.findOne({ where: { username } });
	}

	@Get("me/wishes")
	mewishes(@Req() request) {
		return this.usersService.findWishes(request.user.username);
	}

	@Get("/:username/wishes")
	wishes(@Param("username") username: string) {
		return this.usersService.findWishes(username);
	}

	@Patch("me")
	update(@Req() request, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.updateOne(request.user.id, updateUserDto);
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.usersService.removeOne(id);
	}
}
