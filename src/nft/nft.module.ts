import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NFT } from 'src/entities/NFT.entity';
import { Artist } from 'src/entities/Artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NFT, Artist])],
  providers: [NftService],
  controllers: [NftController],
  exports: [NftService],
})
export class NftModule {}
