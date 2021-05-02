import { Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
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
import { take } from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-membro-familia',
  templateUrl: './membro-familia.component.html',
  styleUrls: ['./membro-familia.component.scss']
})
export class MembroFamiliaComponent implements OnInit {

  // Declaração de imputs, outputs
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
  @Output() saveMemberAndSubmitFamily = new EventEmitter<FamilyMember | null>();

  formMembroFamilia!: FormGroup;
  familyMemberTypeDescription = '';
  schoolingOptions = FamilyMemberSchooling;
  civilStatusOptions = FamilyMemberCivilStatus;
  generoOptions = FamilyMemberGender;
  housingOptions = FamilyMemberHousingType;
  familyLinkTypeOptions = FamilyMemberLinkType;
  familyMemberType = FamilyMemberType;
  ufOptions = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'DF'];

  @ViewChildren('autosize') autosize!: CdkTextareaAutosize;
  triggerResize(): void {
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }


  constructor(private snackBar: MatSnackBar, private ngZone: NgZone) {
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
    this.formMembroFamilia.addControl('addressStreetComplement', new FormControl(mainModel.addressStreetComplement));
    this.formMembroFamilia.addControl('addressPostalCode', new FormControl(mainModel.addressPostalCode, [Validators.required]));
    this.formMembroFamilia.addControl('housingType', new FormControl(mainModel.housingType, [Validators.required]));
    this.formMembroFamilia.addControl('housingTypeNotes', new FormControl(mainModel.housingType, [
      RxwebValidators.required({
        conditionalExpression: () => {
          return (this.formMembroFamilia.controls.housingType.value === this.housingOptions.Other);
        }
      })
    ]));
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

  public submitForm($event: any): void {

    const showSnackError = () => {
      this.snackBar.open('', 'Informe os dados obrigatórios para continuar', { duration: 2000 });
      this.formMembroFamilia.markAsDirty();
    };

    this.fillModelWithForm();
    switch ($event.submitter.id) {
      case 'btn-adicionar-membro':
        if (this.formMembroFamilia.invalid) {
          showSnackError();
          return;
        }
        this.saveMember.emit(this.Model);
        break;
      case 'btn-familia-completa':
        if (!this.formIsValidSubmitFamily()) {
          showSnackError();
          return;
        }
        this.saveMemberAndSubmitFamily.emit(this.Model.fullName !== '' ? this.model : null);
    }

    this.scrollToForm();
    this.resetForm($event);
  }

  private formIsValidSubmitFamily(): boolean {
    if (this.Model.familyMemberType === FamilyMemberType.Main && this.formMembroFamilia.invalid) {
      return false;
    } else if (this.Model.familyMemberType === this.familyMemberType.Dependent && this.formMembroFamilia.controls.fullName.value !== ''
      && this.formMembroFamilia.invalid) {
      return false;
    } else {
      return true;
    }
  }

  private resetForm($event: any): void {
    $event.currentTarget.reset();
    this.formMembroFamilia.reset();
  }

  private fillModelWithForm(): void {
    Object.entries(this.formMembroFamilia.getRawValue()).forEach(([key, value]) => {
      (this.model as any)[key] = value;
    });
  }

  private scrollToForm(): void {
    const element = document.querySelector('form') || window;
    element.scrollTo(0, 0);
  }

}
