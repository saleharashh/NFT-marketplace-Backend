import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('collection')
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creatorId: string;

  @Column()
  ownerId: string;

  @Column('text', { array: true })
  nftsId: string[];
}
