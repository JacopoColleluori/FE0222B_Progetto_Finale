import { Comune } from "./comune";

export class Cliente {
  email!:string;
  id!:number;
  partitaIva!:string;
  ragioneSociale!:string;
  tipoCliente!:string;
  pec!:string;
  telefono!:string;
  nomeContatto!:string;
  cognomeContatto!:string;
  telefonoContatto!:string;
  emailContatto!:String;
  indirizzoSedeOperativa!:{
    id:number;
    via:string;
    civico:string;
    cap:string;
    localita:string;
    comune:Comune
  };
  indirizzoSedeLegale!:{
    id:number;
    via:string;
    civico:string;
    cap:string;
    localita:string;
    comune:Comune
  };
}
