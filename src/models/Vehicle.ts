import { getConnection } from 'typeorm/index';
import { Vehicle } from '../databases/db/entity/Vehicle';
import { VehicleType } from '../databases/db/entity/VehicleType';
import { FuelType } from '../databases/db/entity/FuelType';

export type veiculo = {
    Marca : string;
    Modelo: string;
    Versao: string;
    AnoModelo: string;
    AnoFabricacao: string;
    Eixos: number;
    ValorFipe: string;
    Tipo: string;
    Combustivel: string;
}

export async function convertToVehicle(veiculo: veiculo): Promise<Vehicle> {
  const vehicle = new Vehicle();
  vehicle.marca = veiculo.Marca;
  vehicle.modelo = veiculo.Modelo;
  vehicle.versao = veiculo.Versao;
  vehicle.anoModelo = new Date(parseInt(veiculo.AnoModelo, 10));
  vehicle.anoFabricacao = new Date(parseInt(veiculo.AnoFabricacao, 10));
  vehicle.eixos = veiculo.Eixos;
  vehicle.valorFipe = parseFloat(veiculo.ValorFipe);

  const connection = getConnection();

  const tipo = await connection.manager.findOne(VehicleType, { where: { nome: veiculo.Tipo } });
  if (!tipo) {
    throw new Error('Tipo de veiculo nao encontrado');
  }
  vehicle.tipo = tipo;

  const combustivel = await connection.manager.findOne(FuelType, { where: { nome: veiculo.Combustivel } });
  if (!combustivel) {
    throw new Error('Tipo de combustivel nao encontrado');
  }
  vehicle.combustivel = combustivel;

  return vehicle;
}

export async function convertToVeiculo(vehicle: Vehicle): Promise<veiculo> {
  const veiculo = <veiculo>{};
  veiculo.Marca = vehicle.marca;
  veiculo.Modelo = vehicle.modelo;
  veiculo.Versao = vehicle.versao;
  veiculo.AnoModelo = vehicle.anoModelo.getFullYear().toString();
  veiculo.AnoFabricacao = vehicle.anoFabricacao.getFullYear().toString();
  veiculo.Eixos = vehicle.eixos;
  veiculo.ValorFipe = vehicle.valorFipe.toString();

  return veiculo;
}
