import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NftService } from './nft.service';
import { NFT } from 'src/entities/NFT.entity';
import { isString } from 'util';
import { isStringObject } from 'util/types';

@Controller('nft')
export class NftController {
  constructor(private nftService: NftService) {}
  @Get('getNftById')
  getNftById() {
    return this.nftService.getById(1);
  }

  @Post('insert')
  insert(@Body() body: NFT) {
    return this.nftService.insert(body);
  }

  @Post('getByCreatorId')
  getByCreatorId(@Body() body: { creatorId: string }) {
    return this.nftService.getByCreatorId(body.creatorId);
  }

  @Get('getByOwnerId')
  getByOwnerId(@Query('ownerId') ownerId: string) {
    return this.nftService.getByOwnerId(ownerId);
  }
}
