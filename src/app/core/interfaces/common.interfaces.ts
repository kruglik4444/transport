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
