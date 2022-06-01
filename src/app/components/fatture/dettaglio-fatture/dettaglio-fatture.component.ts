import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  checkFatt!: boolean;
  statiFatt!: any;
  fattura!: Fattura;
  clienteId!: number;
  constructor(
    private formBuilder: FormBuilder,
    private currentRoute: ActivatedRoute,
    private fatturaSrv: FatturaService,
    private router: Router
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

    //presa id cliente se ci sta
    this.getClienteId();

    //controllo dell'id fattura
    this.checkFattId(this.fattID);

    //controllo campi da id
    if (this.checkFatt) {
      this.form.disable();
      this.form.controls['stato'].enable();
    } else {
      this.form.enable();
    }

    //riempimento form
    this.fillForm();
  }

  submit(form: any) {
    console.log(form);
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
    this.fattura.id = this.fattID;
    this.fattura.data = form.data;
    this.fattura.numero = +form.numero;
    this.fattura.anno = form.anno;
    this.fattura.importo = +form.importo;
    this.fattura.stato.id = form.stato;
    console.log(this.fattura);
    if (this.clienteId) {
      this.fattura.cliente.id = this.clienteId;
    }
    this.fatturaSrv.setFattura(this.fattID, this.fattura).subscribe((res) => {
      console.log(res);
      if (this.clienteId) {
        this.router.navigate(['/clienti/fatture', this.clienteId]);
      } else {
        this.router.navigate(['/fatture']);
      }
    });
  }
  GetFatturaId() {
    this.sub = this.currentRoute.params.subscribe((res) => {
      this.fattID = +res['id'];
      console.log(res);
      console.log(this.fattID);
    });
    return this.fattID;
  }
  getClienteId() {
    this.sub = this.currentRoute.params.subscribe((res) => {
      this.clienteId = +res['idCliente'];
    });
  }
  checkFattId(id: number) {
    if (id != 0) {
      this.checkFatt = true;
    } else {
      this.checkFatt = false;
    }
  }
  restoreData(fatturaId: number) {
    this.fatturaSrv.getFattureById(fatturaId).subscribe((res) => {
      console.log(res);
      this.fattura = res;
      this.form.patchValue({
        data: this.fattura.data,
        numero: this.fattura.numero,
        anno: this.fattura.anno,
        importo: this.fattura.importo,
        stato: this.fattura.stato.id,
      });
      // this.statiFatt.forEach((stato: { id: number }) => {
      //   if (stato.id == this.fattura.stato.id) {
      //     console.log(stato);
      //     this.form.value.stato=stato;
      //     console.log(this.form.value.stato)
      //   }
      // });
    });
  }

  fillForm() {
    if (this.fattID != 0) {
      console.log(this.fattID);
      this.restoreData(this.fattID);
    }
  }
}
