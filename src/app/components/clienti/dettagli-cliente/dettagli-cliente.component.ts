import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { Comune } from 'src/app/models/comune';
import { Provincia } from 'src/app/models/provincia';
import { ClientiService } from 'src/app/services/clienti.service';
import { ComuneService } from 'src/app/services/comune.service';
import { ProvinciaService } from 'src/app/services/provincia.service';

@Component({
  selector: 'app-dettagli-cliente',
  templateUrl: './dettagli-cliente.component.html',
  styleUrls: ['./dettagli-cliente.component.scss'],
})
export class DettagliClienteComponent implements OnInit {
  form!: FormGroup;
  comuni!: Comune[];
  province!: Provincia[];
  tipiCliente!: any;
  clientId!: number;
  cliente!: Cliente;
  sub!: Subscription;
  check!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private clientSrv: ClientiService,
    private comuneSrv: ComuneService,
    private provinciaSrv: ProvinciaService,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //CREAZIONE FORM
    this.form = this.formBuilder.group({
      nomeContatto: new FormControl(''), //
      cognomeContatto: new FormControl(''), //
      telefonoContatto: new FormControl(''), //
      telefono: new FormControl(''), //
      pec: new FormControl(''), //

      tipoCliente: new FormControl('', [Validators.required]), //
      emailContatto: new FormControl('', [Validators.required]), //
      email: new FormControl('', [Validators.required]), //
      partitaIva: new FormControl('', [Validators.required]), //
      ragioneSociale: new FormControl('', [Validators.required]), //

      indirizzoSedeOperativa: this.formBuilder.group({
        via: new FormControl(''), //
        cap: new FormControl(''), //
        civico: new FormControl(''), //
        localita: new FormControl(''), //
        comune: this.formBuilder.group({
          id: new FormControl('', Validators.required), //
          nome: '',
          provincia: {},
        }),
      }),
    });
    //FINE CREAZIONE FORM

    //Presa dei Comuni
    this.comuneSrv.getComuni().subscribe((res) => {
      this.comuni = res.content;
    });

    //Presa delle province
    this.provinciaSrv.getProvince().subscribe((res) => {
      this.province = res.content;
    });

    //Presa tipi cliente
    this.clientSrv.getTipoCliente().subscribe((res) => {
      this.tipiCliente = res;
    });
    //inizializzaione id cliente
    this.clientId = 0;

    //Presa cliente Id
    this.GetClientId();

    //controlloIdCliente
    this.checkId(this.clientId);

    //Riempimento del form
    this.fillForm();
  }

  GetClientId() {
    this.sub = this.currentRoute.params.subscribe((res) => {
      this.clientId = +res['id'];
      console.log('Id del cliente corrente: ' + this.clientId);
    });
    return this.clientId;
  }

  submit(form: { value: { indirizzoSedeOperativa: { comune: Comune } } }) {
    console.log(form.value);

    this.comuni.forEach((comune) => {
      if (comune.id == form.value.indirizzoSedeOperativa.comune.id) {
        form.value.indirizzoSedeOperativa.comune = comune;
      }
    });

    console.log(form.value);
    this.clientSrv.setCliente(form.value, this.clientId).subscribe((res) => {
      console.log(res);
    });
    console.log(this.form.value);
    this.router.navigate(['/clienti']);
  }

  restoreData(clientId: number) {
    this.clientSrv.getClientById(clientId).subscribe((res) => {
      console.log(res);
      this.cliente = res;
      this.form.patchValue({
        nomeContatto: this.cliente.nomeContatto,
        cognomeContatto: this.cliente.cognomeContatto,
        telefonoContatto: this.cliente.telefonoContatto,
        telefono: this.cliente.telefono,
        pec: this.cliente.pec,

        tipoCliente: this.cliente.tipoCliente,
        emailContatto: this.cliente.emailContatto,
        email: this.cliente.email,
        partitaIva: this.cliente.partitaIva,
        ragioneSociale: this.cliente.ragioneSociale,

        indirizzoSedeOperativa: {
          via: this.cliente.indirizzoSedeOperativa.via,
          cap: this.cliente.indirizzoSedeOperativa.cap,
          civico: this.cliente.indirizzoSedeOperativa.civico,
          localita: this.cliente.indirizzoSedeOperativa.localita,
          comune:this.cliente.indirizzoSedeLegale.comune
        },
      });
    });
  }

  fillForm() {
    if (this.clientId != 0) {
      this.restoreData(this.GetClientId());
     }
  }
  checkId(id: number) {
    if (id != 0) {
      this.check = true;
    } else {
      this.check = false;
    }
  }
}
