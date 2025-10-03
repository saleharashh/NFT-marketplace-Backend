import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NFT } from 'src/entities/NFT.entity';
import { BaseResponse } from 'src/models/BaseResponse';
import { Repository } from 'typeorm';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { instanceToPlain } from 'class-transformer';

import { join } from 'path';
import { NftDto } from 'src/DTOs/NftDto';
import { Artist } from 'src/entities/Artist.entity';

@Injectable()
export class NftService {
  constructor(
    @InjectRepository(NFT) private nftRepo: Repository<NFT>,
    @InjectRepository(Artist) private artistRepo: Repository<Artist>,
  ) {}

  async getById(id: number) {
    const nft = await this.nftRepo.findOne({ where: { id } });
    console.log(nft);
    const artist = await this.artistRepo
      .createQueryBuilder('Artist')
      .where(`Artist.id= ${nft?.creatorId}`)
      .getOne();
    // console.log(...nft);
    const response: NftDto = {
      artistName: artist?.name!,
      artistProfile: artist?.profileImage!,
      ...nft!,
    };
    return BaseResponse.ok(response);
  }

  async insert(newNft: NFT, image: Express.Multer.File) {
    const uploadPath = join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

    if (image) {
      const nftFileName = `nftImage-${Date.now()}${extname(image.originalname)}`;
      fs.writeFileSync(join(uploadPath, nftFileName), image.buffer);
      newNft.image = nftFileName;
    }
    const nft = await this.nftRepo.save(newNft);
    return BaseResponse.ok(nft);
  }

  async getByCreatorId(creatorId: string) {
    const nft = await this.nftRepo.find({ where: { creatorId } });
    const artist = await this.artistRepo
      .createQueryBuilder('Artist')
      .where(`Artist.id= ${nft[0].creatorId}`)
      .getOne();
    const response: NftDto[] = [];
    nft.map((item) => {
      response.push({
        ...item,
        artistName: artist?.name!,
        artistProfile: artist?.profileImage!,
      });
    });
    response.push({
      ...nft[0],
      artistName: artist?.name!,
      artistProfile: artist?.profileImage!,
    });
    response.push({
      ...nft[0],
      artistName: artist?.name!,
      artistProfile: artist?.profileImage!,
    });
    //  {
    //   artistName: artist?.name!,
    //   artistProfile: artist?.profileImage!,
    //   ...nft[0],
    // };
    return BaseResponse.ok(response);
  }

  async getByOwnerId(ownerId: string) {
    const nft = await this.nftRepo.find({ where: { ownerId } });
    console.log(nft);
    const artist = await this.artistRepo
      .createQueryBuilder('Artist')
      .where(`Artist.id= ${ownerId}`)
      .getOne();
    // console.log(...nft);
    const response: NftDto = {
      artistName: artist?.name!,
      artistProfile: artist?.profileImage!,
      ...nft[0],
    };
    return BaseResponse.ok([response]);
  }

  async getAllNfts() {
    const nfts = await this.nftRepo.find();
    const artist = await this.artistRepo
      .createQueryBuilder('Artist')
      .where(`Artist.id= ${nfts[0].creatorId}`)
      .getOne();
    console.log(artist);
    const response: NftDto[] = [];
    for (let index = 0; index < 50; index++) {
      response.push({
        ...nfts[0],
        artistName: artist?.name!,
        artistProfile: artist?.profileImage!,
      });
    }
    return BaseResponse.ok(response);
  }
}
