import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProduction = config.get('NODE_ENV') === 'production';

        if (isProduction) {
          return {
            type: 'postgres',
            url: config.get('DATABASE_URL'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            ssl: { rejectUnauthorized: false },
          };
        }

        return {
          type: 'better-sqlite3',
          database: 'db.sqlite',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
    NotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
