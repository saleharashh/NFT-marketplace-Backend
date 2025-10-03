import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/entities/Artist.entity';
import { Repository } from 'typeorm';

import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist) private artistsRepo: Repository<Artist>,
  ) {}

  async getAllArtists() {
    const artists = await this.artistsRepo.find();
    for (let index = 0; index < 50; index++) {
      artists.push(artists[0]);
    }
    return artists;
  }

  async getById(id: number) {
    const artist = await this.artistsRepo.findOne({ where: { id } });
    // return await this.artistsRepo.findOne({ where: { id } });
    return artist;
  }

  async createArtist(data: Artist, files: Express.Multer.File[]) {
    const uploadPath = join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

    if (files[0]) {
      const profileFileName = `profile-${Date.now()}${extname(files[0].originalname)}`;
      fs.writeFileSync(join(uploadPath, profileFileName), files[0].buffer);
      data.profileImage = profileFileName;
    }

    if (files[1]) {
      const bgFileName = `backgroundImage-${Date.now()}${extname(files[1].originalname)}`;
      fs.writeFileSync(join(uploadPath, bgFileName), files[1].buffer);
      data.backgroundImage = bgFileName;
    }
    const artist = await this.artistsRepo.save(data);
    return artist;
  }
}
