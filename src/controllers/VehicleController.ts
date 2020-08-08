import { Request, Response, Router } from 'express';
import { Connection, createConnection, getConnection } from 'typeorm/index';
import { veiculo } from '@models/Vehicle';
import { Vehicle } from '../databases/db/entity/Vehicle';

export class VehicleController {
    rotas: Router = Router();

    connection : Connection;

    constructor() {
      this.rotas.get('/listar', this.listar);
      createConnection().then((value: Connection) => {
        this.connection = value;
      });
    }

    listar = async (req: Request, res: Response) => {
      const veiculos: Vehicle[] = await this.connection.manager.find(Vehicle, { relations: ['tipo', 'combustivel'] });
      const json: veiculo[] = veiculos.map((value) => ({
        Marca: value.marca,
        Tipo: value.tipo.nome,
      }));
      return res.json(json);
    }
}
