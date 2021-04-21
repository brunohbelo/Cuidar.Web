import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DependentFamilyMember } from 'src/app/models/DependentFamilyMember';
import { FamilyMemberCivilStatus } from 'src/app/models/enums/FamilyMemberCivilStatus';
import { FamilyMemberGender } from 'src/app/models/enums/FamilyMemberGender';
import { FamilyMemberHousingType } from 'src/app/models/enums/FamilyMemberHousingType';
import { FamilyMemberSchooling } from 'src/app/models/enums/FamilyMemberSchooling';
import { FamilyMemberType } from 'src/app/models/enums/FamilyMemberType';
import { FamilyMember } from 'src/app/models/FamilyMember';
import { MainFamilyMember } from 'src/app/models/MainFamilyMember';
import { MainFamilyMemberSerivce } from 'src/app/services/mainFamilyMember.service';

@Component({
  selector: 'app-cadastro-familia',
  templateUrl: './cadastro-familia.component.html',
  styleUrls: ['./cadastro-familia.component.scss']
})
export class CadastroFamiliaComponent implements OnInit {

  membros = new Array<FamilyMember>();
  public activeEditingMember: FamilyMember;

  ngOnInit(): void {

  }

  constructor(private mainFamilyMemberService: MainFamilyMemberSerivce, private snackBar: MatSnackBar) {
    this.activeEditingMember = new MainFamilyMember();
    this.initMemberTest();
  }

  incluirMembro(familyMember: FamilyMember): void {
    this.membros.push(Object.assign({}, familyMember));

    if (this.membros.length > 0) {
      this.activeEditingMember = new DependentFamilyMember(familyMember as MainFamilyMember);
    }

  }

  editMember(familyMember: FamilyMember): void {
    const currentIndex = this.membros.findIndex(x => x === familyMember);
    this.membros.splice(currentIndex, 1);
    this.activeEditingMember = Object.assign({}, familyMember);
  }

  public saveFamily(): void {
    const mainMember = this.membros.find(x => x.familyMemberType === FamilyMemberType.Main) as MainFamilyMember;
    if (!mainMember) {
      this.snackBar.open('Para salvar o cadastro de família é necessário informar um membro principal', '', { duration: 5000 });
      return;
    }

    this.mainFamilyMemberService.postMainFamilyMember(mainMember).subscribe(
      data => {
        console.log(data);
        this.snackBar.open('Família Salva com sucesso', '', { duration: 5000 });
      },
      error => {
        console.log(error);
        this.snackBar.open('Erro ao salvar família', '', { duration: 5000 });
      }
    );

  }

  initMemberTest(): void {
    const mainMember = new MainFamilyMember();
    mainMember.addressCity = 'Jundiaí';
    mainMember.addressPostalCode = '13219230';
    mainMember.addressState = 'SP';
    mainMember.addressStreetComplement = 'Complemento';
    mainMember.addressStreetName = 'R Adamantina';
    mainMember.addressStreetNumber = '67';
    mainMember.birthDate = new Date(1996, 7, 25);
    mainMember.civilStatus = FamilyMemberCivilStatus.Married;
    mainMember.contactEmail = 'brunohbelo@hotmail.com';
    mainMember.documentId = '25963809002';
    mainMember.economicSituationNotes = 'sem muita grana';
    mainMember.fullName = 'Bruno Belo Principal';
    mainMember.gender = FamilyMemberGender.Male;
    mainMember.housingType = FamilyMemberHousingType.Rent;
    mainMember.occupation = 'programador bruxão';
    mainMember.schooling = FamilyMemberSchooling.University;

    this.membros.push(mainMember);
  }

}
