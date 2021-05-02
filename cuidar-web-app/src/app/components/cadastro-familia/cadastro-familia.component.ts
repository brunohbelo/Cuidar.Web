import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DependentFamilyMember } from 'src/app/models/DependentFamilyMember';
import { FamilyMemberCivilStatus } from 'src/app/models/enums/FamilyMemberCivilStatus';
import { FamilyMemberGender } from 'src/app/models/enums/FamilyMemberGender';
import { FamilyMemberHousingType } from 'src/app/models/enums/FamilyMemberHousingType';
import { FamilyMemberSchooling } from 'src/app/models/enums/FamilyMemberSchooling';
import { FamilyMemberType } from 'src/app/models/enums/FamilyMemberType';
import { FamilyMember } from 'src/app/models/FamilyMember';
import { MainFamilyMember } from 'src/app/models/MainFamilyMember';
import { FamilyService } from 'src/app/services/Family.service';

@Component({
  selector: 'app-cadastro-familia',
  templateUrl: './cadastro-familia.component.html',
  styleUrls: ['./cadastro-familia.component.scss']
})
export class CadastroFamiliaComponent implements OnInit {

  membros = new Array<FamilyMember>();
  public activeEditingMember: FamilyMember;
  public familyCompleted = false;
  public socialAssistenceNeedsNotes = '';

  ngOnInit(): void {

  }

  constructor(private mainFamilyMemberService: FamilyService, private snackBar: MatSnackBar, private router: Router) {
    this.activeEditingMember = new MainFamilyMember();
    // this.initMemberTest();
  }

  editMember(familyMember: FamilyMember): void {
    this.familyCompleted = false;

    this.saveCurrentEditingFailyMember();

    const currentIndex = this.membros.findIndex(x => x === familyMember);
    this.membros.splice(currentIndex, 1);

    this.activeEditingMember = Object.assign({}, familyMember);
  }

  saveCurrentEditingFailyMember(): void {

    if (this.activeEditingMember && this.activeEditingMember.fullName !== '') {
      this.saveFamilyMember(this.activeEditingMember);
    }

  }

  saveFamilyMember(familyMember: FamilyMember): void {

    if (familyMember.familyMemberType === FamilyMemberType.Main) {
      this.membros.unshift(Object.assign({}, familyMember));
    } else {
      this.membros.push(Object.assign({}, familyMember));
    }

    if (this.membros.length > 0) {
      this.activeEditingMember = new DependentFamilyMember(familyMember as MainFamilyMember);
    }

  }

  saveMemberAndSubmitFamily(familyMember: FamilyMember | null): void {
    if (familyMember) {
      this.saveFamilyMember(familyMember);
    }

    const mainMember = this.membros.find(x => x.familyMemberType === FamilyMemberType.Main) as MainFamilyMember;
    if (!mainMember) {
      this.snackBar.open('Para salvar o cadastro de família é necessário informar um membro principal', '', { duration: 5000 });
      return;
    }

    this.familyCompleted = true;
  }

  public postFamily(): void {

    const dependentMembers = this.membros.filter(x => x.familyMemberType === FamilyMemberType.Dependent) as Array<DependentFamilyMember>;
    const mainMember = this.membros.find(x => x.familyMemberType === FamilyMemberType.Main) as MainFamilyMember;
    mainMember.socialAssistenceNeedsNotes = this.socialAssistenceNeedsNotes;

    this.mainFamilyMemberService.postMainFamilyMember(mainMember, dependentMembers).subscribe(
      data => {
        console.log('familia salva com sucesso');
        console.log(data);
        this.snackBar.open('Família Salva com sucesso', '', { duration: 5000 });
        this.router.navigate(['']);
      },
      error => {
        console.log('Erro ao salvar família');
        console.log(error);
        this.snackBar.open(`Erro ao salvar família... \r\n ${error.error.errorList.map(((x: { message: string; }) => x.message)).join()}`,
          '', { duration: 5000 });
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
