import { Component, OnInit } from '@angular/core';
import { FamilyMember } from 'src/app/models/FamilyMember';
import { MainFamilyMember } from 'src/app/models/MainFamilyMember';

@Component({
  selector: 'app-cadastro-familia',
  templateUrl: './cadastro-familia.component.html',
  styleUrls: ['./cadastro-familia.component.scss']
})
export class CadastroFamiliaComponent implements OnInit {

  membros = new Array<any>();
  public membroAdicionando: FamilyMember;

  ngOnInit(): void {

  }

  constructor() {
    this.membroAdicionando = new MainFamilyMember();
  }

  incluirMembro(familyMember: FamilyMember): void {
    this.membros.push(Object.assign({}, familyMember));
  }

}
