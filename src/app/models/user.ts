export class User {
  accessToken!:string;
  email!:string;
  id!:number;
  roles!:[{
    roleName:string;
    id:number
  }]
  tokenType!:string;
  username!:string;
  nome!:string;
  cognome!:string
}
