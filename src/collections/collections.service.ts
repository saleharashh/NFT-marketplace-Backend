import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { privateDecrypt } from 'crypto';
import { Artist } from 'src/entities/Artist.entity';
import { Collection } from 'src/entities/Collections.entity';
import { NFT } from 'src/entities/NFT.entity';
import { BaseResponse } from 'src/models/BaseResponse';
import { In, Repository } from 'typeorm';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private collectionsRepo: Repository<Collection>,
    @InjectRepository(NFT)
    private nftRepo: Repository<NFT>,
    @InjectRepository(Artist)
    private artistRepo: Repository<Artist>,
  ) {}

  async getAllCollections() {
    const collections = await this.collectionsRepo.find();
    console.log(collections);
    return collections;
  }

  async insert(collection: Collection) {
    const insertedCollection = await this.collectionsRepo.insert(collection);
    console.log(insertedCollection);
    return insertedCollection;
  }

  async getByCreatorId(creatorId: string) {
    const collection = await this.collectionsRepo.findOne({
      where: { creatorId: creatorId },
    });
    const nfts = await this.nftRepo.find({
      where: { id: In(collection!.nftsId) },
    });
    const artist = await this.artistRepo.findOne({
      where: { id: Number(collection!.creatorId) },
    });
  }
}
