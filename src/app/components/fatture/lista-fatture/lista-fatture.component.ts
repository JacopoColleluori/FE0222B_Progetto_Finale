import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Fattura } from 'src/app/models/fattura';
import { FatturaService } from 'src/app/services/fattura.service';

@Component({
  selector: 'app-lista-fatture',
  templateUrl: './lista-fatture.component.html',
  styleUrls: ['./lista-fatture.component.scss']
})
export class ListaFattureComponent implements OnInit {
  fatture!:any;
  constructor(private fatturaSrv:FatturaService) { }

  ngOnInit(): void {
    //presa fatture
    this.fatturaSrv.getAllFatture(0,20).subscribe(
      res=>{
        this.fatture=res;
        console.log(this.fatture.content,this.fatture)
      }
    )
  }
 onPageEvent(event:PageEvent){
   console.log(event.pageIndex,event.pageSize)
this.fatturaSrv.getAllFatture(event.pageIndex,event.pageSize).subscribe(res=>{
  this.fatture=res
  console.log(this.fatture,this.fatture.content)
})
 }
}
