import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'NFT' })
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

  @Column({ nullable: true })
  image: string;

  @Column()
  price: string;

  @Column()
  highestBid: string;

  @Column('text', { array: true })
  tagIds: string[];
}
