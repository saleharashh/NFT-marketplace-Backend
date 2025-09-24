import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/entities/Artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist) private artistsRepo: Repository<Artist>,
  ) {}

  async getById(id: number) {
    const artist = await this.artistsRepo.findOne({ where: { id } });
    // return await this.artistsRepo.findOne({ where: { id } });
    return artist;
  }

  async createArtist(data: Artist) {
    const artist = await this.artistsRepo.save(data);
    return artist;
  }
}
