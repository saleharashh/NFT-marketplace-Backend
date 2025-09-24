import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NFT } from 'src/entities/NFT.entity';
import { BaseResponse } from 'src/models/BaseResponse';
import { Repository } from 'typeorm';

@Injectable()
export class NftService {
  constructor(@InjectRepository(NFT) private nftRepo: Repository<NFT>) {}

  async getById(id: number) {
    return this.nftRepo.findOne({ where: { id } });
  }

  async insert(newNft: NFT) {
    const nft = await this.nftRepo.save(newNft);
    return BaseResponse.ok(nft);
  }

  async getByCreatorId(creatorId: string) {
    const nft = await this.nftRepo.findOne({ where: { creatorId } });
    return BaseResponse.ok(nft);
  }

  async getByOwnerId(ownerId: string) {
    // console.log('id: ' + ownerId);
    const nft = await this.nftRepo.findOne({ where: { ownerId } });
  
    return BaseResponse.ok(nft);
  }
}
