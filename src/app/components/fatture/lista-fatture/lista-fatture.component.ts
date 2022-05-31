import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fattura } from 'src/app/models/fattura';
import { FatturaService } from 'src/app/services/fattura.service';

@Component({
  selector: 'app-lista-fatture',
  templateUrl: './lista-fatture.component.html',
  styleUrls: ['./lista-fatture.component.scss'],
})
export class ListaFattureComponent implements OnInit {
  fatture!: any;
  sub!: Subscription;
  clientId!: number;
  check!: boolean;
  constructor(
    private fatturaSrv: FatturaService,
    private currentRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //presa idCliente se ci sta
    this.GetClientId();
    //presa fatture
    if (this.clientId) {
      this.fatturaSrv
        .getFattureByCliente(this.clientId, 0, 20)
        .subscribe((res) => {
          console.log(res);
          this.fatture = res;
        });
    } else {
      this.fatturaSrv.getAllFatture(0, 20).subscribe((res) => {
        this.fatture = res;
        console.log(this.fatture.content, this.fatture);
      });
    }
  }
  onPageEvent(event: PageEvent) {
    console.log(event.pageIndex, event.pageSize);
    if (this.clientId) {
      this.fatturaSrv.getFattureByCliente(this.clientId,event.pageIndex,event.pageSize).subscribe(
        res=>{
          this.fatture = res
        })
      }
     else {
      this.fatturaSrv
        .getAllFatture(event.pageIndex, event.pageSize)
        .subscribe((res) => {
          this.fatture = res;
          console.log(this.fatture, this.fatture.content);
        });
    }
  }
  delete(id: number) {
    this.fatturaSrv.deleteFattura(id).subscribe((res) => {
      console.log(res);
    });
  }
  GetClientId() {
    this.sub = this.currentRoute.params.subscribe((res) => {
      console.log(res);
      this.clientId = +res['id'];
      console.log(this.clientId);
    });
    if (this.clientId) {
      this.check = true;
    } else {
      this.check = false;
    }
  }
}
