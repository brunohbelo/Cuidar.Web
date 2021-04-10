import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-familia',
  templateUrl: './cadastro-familia.component.html',
  styleUrls: ['./cadastro-familia.component.scss']
})
export class CadastroFamiliaComponent implements OnInit {

  constructor() { }

  membros = new Array<any>();
  membroAdicionando: any;

  ngOnInit(): void {
    this.membroAdicionando = {};
  }

  incluirMembro(): void {
    this.membros.push(Object.assign({}, this.membroAdicionando));
    this.membroAdicionando = {};
  }

}
