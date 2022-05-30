import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  user = {
    username: '',
    password: '',
    email: '',
    roles: [''],
    nome: '',
    cognome: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private authSrv: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
        Validators.minLength(4),
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9 ]*'),
        Validators.minLength(6),
      ]),

      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
      ]),

      roles: new FormControl(['']),
      nome: new FormControl(''),
      cognome: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  submit(DatiForm: {
    roles: any;
    username: string;
    password: string;
    email: string;
    nome: string;
    cognome: string;
  })

  {
    console.log(DatiForm);



    this.user.username = DatiForm.username;
    this.user.nome = DatiForm.nome;
    this.user.cognome = DatiForm.cognome;
    this.user.email = DatiForm.email;
    this.user.roles.splice(0,1);
    this.user.roles.push(DatiForm.roles);
    this.user.password = DatiForm.password;

    this.authSrv.SignUp(this.user).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/login']);
    });


  }
}
