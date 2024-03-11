import {
  ClassSerializerInterceptor,
  ConsoleLogger,
  Module,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioModule } from './modulos/usuario/usuario.module';
import { PostgresConfigService } from './config/postgres.config.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FiltroDeExcecaoGlobal } from './recursos/filtros/filtro-de-excecao-global';

import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AutenticacaoModule } from './modulos/autenticacao/autenticacao.module';
import { LoggerGlobalInterceptor } from './recursos/interceptores/logger-global.interceptor';
import { AppController } from './app.controller';
import { AvaliacaoModule } from './modulos/avaliacao/avaliacao.module';
import { ReceitasModule } from './modulos/receitas/receitas.module';
import { FavoritosModule } from './modulos/favoritos/favoritos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
          ttl: 10 * 1000,
          socket: {
            host: process.env.SERVER_REDIS_HOST,
            port: Number(process.env.SERVER_REDIS_PORT),
          },
        }),
      }),
      isGlobal: true,
    }),
    UsuarioModule,
    AutenticacaoModule,
    AvaliacaoModule,
    ReceitasModule,
    FavoritosModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroDeExcecaoGlobal,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerGlobalInterceptor,
    },
    ConsoleLogger,
  ],
  controllers: [AppController],
})
export class AppModule {}
