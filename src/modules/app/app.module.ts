import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from '../tasks/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env/${process.env.NODE_ENV || 'development'}.env`,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      // 실제 데이터베이스와 연결을 하기 위한 설정을 수행하는 팩토리 함수
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),

        autoLoadEntities: true,

        // 데이터베이스 스키마 동기화 (개발 시 편리, 운영 시 절대 금지)
        synchronize: configService.get('NODE_ENV') == 'development',
      }),
    }),

    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
