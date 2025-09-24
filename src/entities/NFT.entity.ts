import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'NFTs' })
export class NFT {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  creatorId: string;

  @Column()
  ownerId: string;

  @Column()
  description: string;

  @Column()
  etherScanLink: string;

  @Column()
  orginalLink: string;

  @Column('text', { array: true })
  tagIds: string[];
}
