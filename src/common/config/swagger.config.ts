import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const SwaggerConfig = (app: INestApplication<any>): void => {
    const versionApp = "1.0"
    const config = new DocumentBuilder()
        .setTitle('Artemisa Vet Solutions')
        .setDescription(`Users api software`)
        .setVersion(versionApp)   
        .addServer('/api')   
        .addBearerAuth(
            {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
            'access-token'
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`api/v1/docs`, app, document);
}   