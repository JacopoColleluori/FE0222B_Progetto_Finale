import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClientiService } from 'src/app/services/clienti.service';

@Component({
  selector: 'app-lista-clienti',
  templateUrl: './lista-clienti.component.html',
  styleUrls: ['./lista-clienti.component.scss'],
})
export class ListaClientiComponent implements OnInit {
  dataClients: any;
  displayedColumns: string[] = [
    'ragioneSociale',
    'email',
    'partitaIva',
    'tipoClienti',
    'emailContatto',
    'comuneSedeOperativa',
    'azioni',
  ];

  constructor(private clientSrv: ClientiService) {}

  ngOnInit(): void {
    //chiamata iniziale per chiamare la lista di utenti
    this.clientSrv.getClients(0, 20).subscribe((res) => {
      console.log(res, res.content);
      this.dataClients = res;
      console.log(this.dataClients, this.dataClients.content);
    });
  }
  onPageEvent(event: PageEvent) {
    this.clientSrv
      .getClients(event.pageIndex, event.pageSize)
      .subscribe((res) => {
        console.log(res);
        this.dataClients = res;
        console.log(this.dataClients);
      });
  }
  delete(id: number) {
    console.log(id);
    for(let i=0;i<this.dataClients.content.length;i++){
      if(this.dataClients.content[i].id==id){
      this.dataClients.content.splice(i,1)
      // this.dataClients.content=[...this.dataClients.content]
      console.log(this.dataClients.content)
      }
    }
  this.clientSrv.deleteClients(id).subscribe((res) => {
    console.log(res);
  this.dataClients.content=[...this.dataClients.content]
  });
  };




  dettagliCliente(id:number){}
}
