import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fattura } from 'src/app/models/fattura';
import { FatturaService } from 'src/app/services/fattura.service';

@Component({
  selector: 'app-dettaglio-fatture',
  templateUrl: './dettaglio-fatture.component.html',
  styleUrls: ['./dettaglio-fatture.component.scss'],
})
export class DettaglioFattureComponent implements OnInit {
  form!: FormGroup;
  sub!: Subscription;
  fattID!: number;
  check!: boolean;
  statiFatt!: any;
  fattura!: Fattura;
  constructor(
    private formBuilder: FormBuilder,
    private currentRoute: ActivatedRoute,
    private fatturaSrv: FatturaService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      data: new FormControl('', [Validators.required]),
      numero: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      anno: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{4}$'),
      ]),
      importo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9.]*$'),
      ]),
      stato: new FormControl('', [Validators.required]),
    });
    //presa stati fattura
    this.fatturaSrv.getStatiFattura().subscribe((res) => {
      this.statiFatt = res.content;
      console.log(this.statiFatt);
    });

    //inizializzazione ID fattura
    this.fattID = 0;

    //presa dell'id della fattura
    this.GetFatturaId();

    //controllo dell'id fattura
    this.checkId(this.fattID);

    //controllo campi da id
    if (this.check) {
      this.form.disable();
      this.form.controls['stato'].enable();
    } else {
      this.form.enable();
    }

    //riempimento form
    this.fillForm()
  }

  submit(form: {
    value: {
      data: string;
      numero: number;
      anno: number;
      importo: number;
      stato: number;
    };
  }) {
    console.log(form.value);
    if (this.fattID == 0) {
      this.fattura = {
        id: 0,
        anno: 0,
        numero: 0,
        data: '',
        importo: 0,
        stato: { id: 0, nome: '' },
        cliente: {},
      };
    }
    this.fattura.id=this.fattID;
    this.fattura.data=form.value.data;
    this.fattura.numero=form.value.numero;
    this.fattura.anno=form.value.anno;
    this.fattura.importo=form.value.importo;
    this.fattura.stato.id=form.value.stato;

  }
  GetFatturaId() {
    this.sub = this.currentRoute.params.subscribe((res) => {
      this.fattID = +res['idCliente'];
      console.log(res);
      console.log(this.fattID);
    });
    return this.fattID;
  }
  checkId(id: number) {
    if (id != 0) {
      this.check = true;
    } else {
      this.check = false;
    }
  }
  restoreData(fatturaId:number){
    this.fatturaSrv.getFattureById(fatturaId).subscribe(res=>{
   console.log(res);
   this.fattura=res;
   this.form.patchValue({
     data:this.fattura.data,
     numero:this.fattura.numero,
     anno:this.fattura.anno,
     importo:this.fattura.importo,
     stato:this.fattura.stato
   })
    })
  }


  fillForm() {
    if (this.fattID != 0) {
      console.log(this.fattID)
      this.restoreData(this.fattID);
    }
  }
}
