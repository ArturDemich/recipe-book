import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const PORT = process.env.PORT || 3001;

    try {
        await app.listen(PORT);
        console.log(`Backend running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}
bootstrap();