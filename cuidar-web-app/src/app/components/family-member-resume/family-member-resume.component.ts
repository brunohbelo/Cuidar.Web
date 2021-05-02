import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMember } from 'src/app/models/FamilyMember';
import { DependentFamilyMember } from 'src/app/models/DependentFamilyMember';
import { FamilyMemberType } from 'src/app/models/enums/FamilyMemberType';
import { FamilyMemberLinkType } from 'src/app/models/enums/FamilyMemberLinkType';

@Component({
  selector: 'app-family-member-resume',
  templateUrl: './family-member-resume.component.html',
  styleUrls: ['./family-member-resume.component.scss']
})
export class FamilyMemberResumeComponent implements OnInit {

  @Input() model!: FamilyMember;
  @Output() familyMemberClick = new EventEmitter<FamilyMember>();

  FamilyMemberType = FamilyMemberType;

  constructor() { }

  ngOnInit(): void {
  }

  public familyMemberResumeClicked(): void {
    this.familyMemberClick.emit(this.model);
  }

  public getLinkType(): FamilyMemberLinkType {
    return (this.model as DependentFamilyMember).linkTypeToMainMember;
  }

}
