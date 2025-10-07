import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from 'src/entities/Collections.entity';
import { NFT } from 'src/entities/NFT.entity';
import { Artist } from 'src/entities/Artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collection,NFT,Artist])],
  providers: [CollectionsService],
  controllers: [CollectionsController],
  exports: [CollectionsService],
})
export class CollectionsModule {}
