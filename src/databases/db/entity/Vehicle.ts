import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm/index';
import { VehicleType } from './VehicleType';
import { FuelType } from './FuelType';

@Entity('Vehicles')
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    marca: string;

    @Column()
    modelo: string;

    @Column()
    versao: string;

    @Column()
    anoModelo: Date;

    @Column()
    anoFabricacao: Date;

    @Column()
    eixos: number;

    @Column('decimal')
    valorFipe: number;

    @ManyToOne(((type) => VehicleType))
    tipo: VehicleType;

    @ManyToOne(((type) => FuelType))
    combustivel: FuelType;
}
