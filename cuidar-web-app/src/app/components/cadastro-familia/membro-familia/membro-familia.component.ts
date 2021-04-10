import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-membro-familia',
  templateUrl: './membro-familia.component.html',
  styleUrls: ['./membro-familia.component.scss']
})
export class MembroFamiliaComponent implements OnInit {

  constructor() { }

  nomeCompleto = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  cpf = new FormControl('', [Validators.required]);
  escolaridade = new FormControl('', [Validators.required]);
  rendaTotalFamilia = new FormControl(0, [Validators.required]);
  cep = new FormControl(null, [Validators.required]);
  endereco = new FormControl('', [Validators.required]);
  cidade = new FormControl('', [Validators.required]);
  uf = new FormControl('', [Validators.required]);
  enderecoNumero = new FormControl('', [Validators.required]);
  telefoneCelular = new FormControl('', [Validators.required]);
  dataNascimento = new FormControl('', [Validators.required]);
  sexo = new FormControl('', [Validators.required]);

  ngOnInit(): void {
  }

}
