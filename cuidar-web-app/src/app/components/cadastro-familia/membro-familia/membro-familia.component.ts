import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-membro-familia',
  templateUrl: './membro-familia.component.html',
  styleUrls: ['./membro-familia.component.scss']
})
export class MembroFamiliaComponent implements OnInit {

  constructor() { }

  @Input() model: any;

  escolaridadeOptions = ['Fundamental incompleto', 'Fundamental completo', 'Médio incompleto', 'Médio completo', 'Superior incompleto', 'Superior completo'];
  estadoCivilOptions = ['Solteiro(a)', 'Casado(a) Civil', 'Casado(a) Religioso', 'Amasiado(a)', 'Separado(a)', 'Viúvo(a)'];
  generoOptions = ['Masculino', 'Feminino'];
  ufOptions = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'DF'];

  nomeCompleto = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.email]);
  cpf = new FormControl('', [Validators.required]);
  profissao = new FormControl('', [Validators.required]);
  escolaridade = new FormControl('', [Validators.required]);
  rendaTotalFamilia = new FormControl(0, [Validators.required]);
  cep = new FormControl(null, [Validators.required]);
  endereco = new FormControl('', [Validators.required]);
  cidade = new FormControl('', [Validators.required]);
  uf = new FormControl('', [Validators.required]);
  enderecoNumero = new FormControl('', [Validators.required]);
  enderecoComplemento = new FormControl('', [Validators.required]);
  estadoCivil = new FormControl('', [Validators.required]);
  telefoneCelular = new FormControl('');
  dataNascimento = new FormControl('');
  genero = new FormControl('', [Validators.required]);

  ngOnInit(): void {
  }

}
