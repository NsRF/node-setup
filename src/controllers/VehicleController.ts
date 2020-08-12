import { Request, Response, Router } from 'express';
import {
  Connection, createConnection, getConnection, Repository,
} from 'typeorm/index';
import {convertToVehicle, veiculo} from '@models/Vehicle';
import { Vehicle } from '../databases/db/entity/Vehicle';
import { FuelType } from '../databases/db/entity/FuelType';

export class VehicleController {
    rotas: Router = Router();

    connection : Connection;

    vehicleRepository: Repository<Vehicle>;

    constructor() {
      this.rotas.get('/listar', this.listar);
      this.rotas.get('/listar/:id', this.procurar);
      this.rotas.post('/criar', this.adicionar);
      //this.rotas.post('/listar/modificar/:id', this.modificar);
      createConnection().then((value: Connection) => {
        this.connection = value;
        this.vehicleRepository = this.connection.getRepository(Vehicle);
      });
    }

    listar = async (req: Request, res: Response) => {
      const veiculos: Vehicle[] = await this.connection.manager.find(Vehicle, { relations: ['tipo', 'combustivel'] });
      const json: veiculo[] = veiculos.map((value) => ({
        Marca: value.marca,
        Modelo: value.modelo,
        Versao: value.versao,
        AnoModelo: value.anoModelo.getFullYear().toString(),
        AnoFabricacao: value.anoFabricacao.getFullYear().toString(),
        Eixos: value.eixos,
        ValorFipe: value.valorFipe.toString(),
        Tipo: value.tipo.nome,
        Combustivel: value.combustivel.nome,
      }));
      return res.json(json);
    }

      procurar = async (req: Request, res: Response) => {
        const veiculos: Vehicle = await this.vehicleRepository.findOne(req.params.id, { relations: ['tipo', 'combustivel'] });
        const model: veiculo = {
          Marca: veiculos.marca,
          Modelo: veiculos.modelo,
          Versao: veiculos.versao,
          AnoModelo: veiculos.anoModelo.getFullYear().toString(),
          AnoFabricacao: veiculos.anoFabricacao.getFullYear().toString(),
          Eixos: veiculos.eixos,
          ValorFipe: veiculos.valorFipe.toString(),
          Tipo: veiculos.tipo.nome,
          Combustivel: veiculos.combustivel.nome,
        };
        return res.json(model);
      }

      adicionar = async (req: Request, res: Response) => {
        const veiculo = req.body as veiculo;
        const vehicle = await convertToVehicle(veiculo);
        const salvar = await this.vehicleRepository.insert(vehicle);
        return res.json(salvar);
      }

     /* modificar = async (req: Request, res: Response) => {
        const modify: Vehicle = await this.vehicleRepository.findOne(req.params.id);
        this.vehicleRepository.id = merge(modify, req.body);
        const result = await this.vehicleRepository.save(modify);
        return res.send(result);
      }*/
}
