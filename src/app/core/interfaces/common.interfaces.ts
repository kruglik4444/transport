import { CargoStatus } from "../enums/cargo-types.enum";

export interface ProfileInterface {
  companyATI: string;
  companyCity: string;
  companyCountry: string;
  companyEmail: string;
  companyINN: string;
  companyKPP: string;
  companyName: string;
  companyORGN: string;
  companyOrganisationType: string;
  companyPhone: string;
  companyTaxType: string;
  companyVAT: string;
  userId: string;
  userType: string;
  trucks: TruckDTO;
}

export interface TruckDTO {
  [key: string]: TruckInterface;
}

export interface TruckInterface {
  model: string;
  modelImage: string;
  truckType: string;
  trailerType: string;
  trailerLift: number;
  trailerSize: number;
  truckDescription: string;
}


export interface CargoInterface {
  name: string;
  trailerType: string;
  weight: number;
  size: number;
  bet: number;
  date: Date;
  description: string;
  logistName: string;
  logistPhone: string;
  uploadingCity: string;
  uploadingAddress: string;
  unloading: Unloading[];
  shipperId: string;
  status: CargoStatus;  
}

export interface Unloading {
  unloadingAddress: string;
  unloadingCity: string;
}