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
import { FamilyMemberType } from 'src/app/models/enums/FamilyMemberType';
import { DependentFamilyMember } from 'src/app/models/DependentFamilyMember';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-membro-familia',
  templateUrl: './membro-familia.component.html',
  styleUrls: ['./membro-familia.component.scss']
})
export class MembroFamiliaComponent implements OnInit {

  private model!: FamilyMember;
  @Input() set Model(value: FamilyMember) {
    this.model = value;
    if (value) {
      this.initializeForm();
    }
  }
  get Model(): FamilyMember {
    return this.model;
  }

  @Output() saveMember = new EventEmitter<FamilyMember>();

  public formMembroFamilia!: FormGroup;
  public familyMemberTypeDescription = '';
  schoolingOptions = FamilyMemberSchooling;
  civilStatusOptions = FamilyMemberCivilStatus;
  generoOptions = FamilyMemberGender;
  housingOptions = FamilyMemberHousingType;
  familyLinkTypeOptions = FamilyMemberLinkType;
  familyMemberType = FamilyMemberType;
  ufOptions = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'DF'];

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  private initializeForm(): void {

    this.createFormFamilyMember();
    if (this.model.familyMemberType === FamilyMemberType.Main) {
      this.addMainMemberFormControls();
    } else {
      this.addDependentMemberFormControls();
    }

  }

  private createFormFamilyMember(): void {
    this.formMembroFamilia = new FormGroup({
      fullName: new FormControl(this.model.fullName, [Validators.required]),
      birthDate: new FormControl(this.model.birthDate),
      gender: new FormControl(this.model.gender, [Validators.required]),
      occupation: new FormControl(this.Model.occupation, [Validators.required]),
      documentId: new FormControl(this.model.documentId, [Validators.required])
    });
  }

  private addMainMemberFormControls(): void {
    const mainModel = this.model as MainFamilyMember;
    this.familyMemberTypeDescription = 'principal';
    this.formMembroFamilia.addControl('addressStreetName', new FormControl(mainModel.addressStreetName, [Validators.required]));
    this.formMembroFamilia.addControl('addressCity', new FormControl(mainModel.addressCity, [Validators.required]));
    this.formMembroFamilia.addControl('addressState', new FormControl(mainModel.addressState, [Validators.required]));
    this.formMembroFamilia.addControl('addressStreetNumber', new FormControl(mainModel.addressStreetNumber, [Validators.required]));
    this.formMembroFamilia.addControl('addressStreetComplement', new FormControl(mainModel.addressStreetComplement, [Validators.required]));
    this.formMembroFamilia.addControl('addressPostalCode', new FormControl(mainModel.addressPostalCode, [Validators.required]));
    this.formMembroFamilia.addControl('housingType', new FormControl(mainModel.housingType, [Validators.required]));
    this.formMembroFamilia.addControl('civilStatus', new FormControl(mainModel.civilStatus, [Validators.required]));
    this.formMembroFamilia.addControl('schooling', new FormControl(mainModel.schooling, [Validators.required]));
    this.formMembroFamilia.addControl('contactEmail', new FormControl(mainModel.contactEmail, [Validators.email]));
    this.formMembroFamilia.addControl('economicSituationNotes', new FormControl(mainModel.economicSituationNotes, [Validators.required]));
    this.formMembroFamilia.addControl('contactPhoneNumber', new FormControl(mainModel.contactPhoneNumber));
  }

  private addDependentMemberFormControls(): void {
    const dependentModel = this.model as DependentFamilyMember;
    this.familyMemberTypeDescription = 'dependente';
    this.formMembroFamilia.addControl('linkTypeToMainMember', new FormControl(dependentModel.linkTypeToMainMember, [Validators.required]));
  }

  public adicionarMembro_click(): void {

    if (this.formMembroFamilia.invalid) {
      this.snackBar.open('', 'Informe os dados obrigatórios para continuar', { duration: 2000 });
      return;
    }

    Object.entries(this.formMembroFamilia.getRawValue()).forEach(([key, value]) => {
      (this.model as any)[key] = value;
    });

    this.snackBar.open('Sucesso', '', { duration: 2000 });
    this.saveMember.emit(this.Model);
    this.scrollToForm();

    return;
  }

  scrollToForm(): void {
    const element = document.querySelector('form') || window;
    element.scrollTo(0, 0);
  }

}
