import { Body, Controller, Get, Post } from '@nestjs/common';
import { Collection } from 'src/entities/Collections.entity';
import { CollectionsService } from './collections.service';
import { BaseResponse } from 'src/models/BaseResponse';

@Controller('collection')
export class CollectionsController {
  constructor(private collectionsServices: CollectionsService) {}
  @Post('insertCollection')
  async insertCollection(@Body() body: Collection) {
    const collection = await this.collectionsServices.insert(body);

    return BaseResponse.ok(collection);
  }

  @Get('getAll')
  async getAllCollections() {
    const collections = await this.collectionsServices.getAllCollections();
    return BaseResponse.ok(collections);
  }
}
