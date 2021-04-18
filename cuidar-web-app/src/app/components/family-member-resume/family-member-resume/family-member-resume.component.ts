import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FamilyMember } from 'src/app/models/FamilyMember';

@Component({
  selector: 'app-family-member-resume',
  templateUrl: './family-member-resume.component.html',
  styleUrls: ['./family-member-resume.component.scss']
})
export class FamilyMemberResumeComponent implements OnInit {

  @Input() model!: FamilyMember;
  @Output() familyMemberClick = new EventEmitter<FamilyMember>();

  constructor() { }

  ngOnInit(): void {
  }

  public familyMemberResumeClicked(): void {
    this.familyMemberClick.emit(this.model);
  }

}
