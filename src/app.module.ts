import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WishCardModule } from './wish-card/wish-card.module';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { WishCardController } from './wish-card/wish-card.controller';
import { ActivityModule } from './activity/activity.module';
import { UserActivityModule } from './user-activity/user-activity.module';
import { UserActivityController } from './user-activity/user-activity.controller';
import { ActivityController } from './activity/activity.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [join(process.cwd(), 'dist/**/entity/*.entity.js')],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    WishCardModule,
    UserModule,
    TokenModule,
    AuthModule,
    RoleModule,
    ActivityModule,
    UserActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(WishCardController, UserActivityController, ActivityController);
  }
}
