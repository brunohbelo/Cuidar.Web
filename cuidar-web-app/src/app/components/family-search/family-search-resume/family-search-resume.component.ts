import { Component, Input, OnInit } from '@angular/core';
import { FamilyStatusHelper } from 'src/app/helpers/familyStatusHelper';
import { FamilyStatus } from 'src/app/models/enums/FamilyStatus';

@Component({
  selector: 'app-family-search-resume',
  templateUrl: './family-search-resume.component.html',
  styleUrls: ['./family-search-resume.component.scss']
})
export class FamilySearchResumeComponent implements OnInit {

  @Input()
  fullName!: string;
  @Input()
  documentId!: string;
  @Input()
  status!: FamilyStatus;

  familyStatusHelper = FamilyStatusHelper;

  constructor() { }

  ngOnInit(): void {
  }
}
