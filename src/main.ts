import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
		}),
	);

	try {
		if (JSON.parse(app.get(ConfigService).get("ENABLECORS")) === true)
			app.enableCors({
				exposedHeaders: "Content-Disposition",
			});
	} catch {}

	await app.listen(3001);
}
bootstrap();
