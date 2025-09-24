import { Module } from '@nestjs/common';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NFT } from 'src/entities/NFT.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NFT])],
  providers: [NftService],
  controllers: [NftController],
  exports: [NftService],
})
export class NftModule {}
