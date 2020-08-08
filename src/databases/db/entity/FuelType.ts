import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity('FuelTypes')
export class FuelType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;
}
