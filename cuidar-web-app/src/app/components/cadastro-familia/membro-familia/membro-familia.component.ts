import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FamilyMemberCivilStatus } from 'src/app/models/enums/FamilyMemberCivilStatus';
import { FamilyMemberGender } from 'src/app/models/enums/FamilyMemberGender';
import { FamilyMemberHousingType } from 'src/app/models/enums/FamilyMemberHousingType';
import { FamilyMemberLinkType } from 'src/app/models/enums/FamilyMemberLinkType';
import { FamilyMemberSchooling } from 'src/app/models/enums/FamilyMemberSchooling';
import { FamilyMember } from 'src/app/models/FamilyMember';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainFamilyMember } from 'src/app/models/MainFamilyMember';

@Component({
  selector: 'app-membro-familia',
  templateUrl: './membro-familia.component.html',
  styleUrls: ['./membro-familia.component.scss']
})
export class MembroFamiliaComponent<T extends FamilyMember> implements OnInit {

  @Input() model!: T;
  @Output() saveMember = new EventEmitter<T>();

  public formMembroFamilia!: FormGroup;
  public familyMemberTypeDescription = '';
  schoolingOptions = FamilyMemberSchooling;
  civilStatusOptions = FamilyMemberCivilStatus;
  generoOptions = FamilyMemberGender;
  housingOptions = FamilyMemberHousingType;
  familyLinkTypeOptions = FamilyMemberLinkType;
  ufOptions = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'DF'];

  constructor(private snackBar: MatSnackBar) {
    this.createFormFamilyMember();
  }

  ngOnInit(): void {
    if (this.model instanceof MainFamilyMember) {
      this.addMainMemberFormControls();
    } else {
      this.addDependentMemberFormControls();
    }

  }

  private createFormFamilyMember(): void{
    this.formMembroFamilia = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      birthDate: new FormControl(''),
      gender: new FormControl('', [Validators.required]),
      occupation: new FormControl('', [Validators.required])
    });
  }

  private addMainMemberFormControls(): void {
    this.familyMemberTypeDescription = 'principal';
    this.formMembroFamilia.addControl('addressStreetName', new FormControl('', [Validators.required]));
    this.formMembroFamilia.addControl('addressCity', new FormControl('', [Validators.required]));
    this.formMembroFamilia.addControl('addressState', new FormControl('', [Validators.required]));
    this.formMembroFamilia.addControl('addressStreetNumber', new FormControl('', [Validators.required]));
    this.formMembroFamilia.addControl('addressStreetComplement', new FormControl('', [Validators.required]));
    this.formMembroFamilia.addControl('addressPostalCode', new FormControl('', [Validators.required]));
    this.formMembroFamilia.addControl('housingType', new FormControl('', [Validators.required]));
    this.formMembroFamilia.addControl('civilStatus', new FormControl('', [Validators.required]));
    this.formMembroFamilia.addControl('schooling', new FormControl('', [Validators.required]));
    this.formMembroFamilia.addControl('contactEmail', new FormControl('', [Validators.email]));
    this.formMembroFamilia.addControl('documentId', new FormControl('', [Validators.required]));
    this.formMembroFamilia.addControl('economicSituationNotes', new FormControl(0, [Validators.required]));
    this.formMembroFamilia.addControl('contactPhoneNumber', new FormControl(''));
  }

  private addDependentMemberFormControls(): void {
    this.familyMemberTypeDescription = 'dependente';
    this.formMembroFamilia.addControl('linkTypeToMainMember', new FormControl('', [Validators.required]));
  }

  public adicionarMembro_click(): void {
    if (this.formMembroFamilia.invalid) {
      this.snackBar.open('Informe todos os campos corretamente para continuar');
      return;
    }

    const values = this.formMembroFamilia.getRawValue();
    console.log(values);
    this.snackBar.open('Sucesso');

  }

}
