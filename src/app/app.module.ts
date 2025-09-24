import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { User } from '../entities/User.entity';
import { ArtistsModule } from '../artists/artists.module';
import { Artist } from '../entities/Artist.entity';
import { NftModule } from '../nft/nft.module';
import { NFT } from 'src/entities/NFT.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '83858385',
      database: 'NFTMarketplace',
      entities: [User, Artist, NFT],
      synchronize: true,
    }),
    AuthModule,
    ArtistsModule,
    NftModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
