import { Request, Response, Router } from 'express';
import {
  Connection, createConnection, getConnection, Repository,
} from 'typeorm/index';
import { veiculo } from '@models/Vehicle';
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
      this.rotas.post('/listar/modificar/:id', this.modificar);
      createConnection().then((value: Connection) => {
        this.connection = value;
        this.vehicleRepository = getConnection().getRepository(Vehicle);
      });
    }

    listar = async (req: Request, res: Response) => {
      const veiculos: Vehicle[] = await this.connection.manager.find(Vehicle, { relations: ['tipo', 'combustivel'] });
      const json: veiculo[] = veiculos.map((value) => ({
        Marca: value.marca,
        Modelo: value.modelo,
        Versao: value.versao,
        AnoModelo: value.anoModelo,
        AnoFabricacao: value.anoFabricacao,
        Eixos: value.eixos,
        ValorFipe: value.valorFipe,
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
          AnoModelo: veiculos.anoModelo,
          AnoFabricacao: veiculos.anoFabricacao,
          Eixos: veiculos.eixos,
          ValorFipe: veiculos.valorFipe,
          Tipo: veiculos.tipo.nome,
          Combustivel: veiculos.combustivel.nome,
        };
        return res.json(model);
      }

      adicionar = async (req: Request, res: Response) => {
        const add = new Vehicle();
        const models: veiculo = {
          Marca: add.marca,
          Modelo: add.modelo,
          Versao: add.versao,
          AnoModelo: add.anoModelo,
          AnoFabricacao: add.anoFabricacao,
          Eixos: add.eixos,
          ValorFipe: add.valorFipe,
          Tipo: add.tipo.nome,
          Combustivel: add.combustivel.nome,
        } = req.body;
        const criar = await this.vehicleRepository.create(req.body);
        const salvar = await this.vehicleRepository.save(criar);
        return res.json(salvar);
      }

      modificar = async (req: Request, res: Response) => {
        const modify: Vehicle = await this.vehicleRepository.findOne(req.params.id);
        this.vehicleRepository.merge(modify, req.body);
        const result = await this.vehicleRepository.save(modify);
        return res.send(result);
      }
}
