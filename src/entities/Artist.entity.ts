import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Artist' })
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

  @Column({ nullable: true })
  profileImage: string;

  @Column({ nullable: true })
  backgroundImage: string;
}
