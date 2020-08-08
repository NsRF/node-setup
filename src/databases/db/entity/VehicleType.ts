import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity('VehicleTypes')
export class VehicleType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;
}
