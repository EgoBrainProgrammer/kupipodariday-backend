import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class HashService {
	hash(data: string) {
		return bcrypt.hashSync(data, 10);
	}

	compare(ldata: string, rdata: string) {
		return bcrypt.compareSync(ldata, rdata);
	}
}
