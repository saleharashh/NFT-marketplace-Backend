import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Artists' })
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  volume: string;

  @Column()
  nftSolds: string;

  @Column()
  followers: string;

  @Column()
  walletAddres: string;

  @Column()
  bio: string;
}
