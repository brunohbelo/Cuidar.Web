import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FamilyMemberFamilySearchResponse, FamilySearchResponse } from 'src/app/models/dtos/FamilySearchResponse';
import { FamilyStatus } from 'src/app/models/enums/FamilyStatus';
import { FamilyService } from 'src/app/services/Family.service';

@Component({
  selector: 'app-family-search',
  templateUrl: './family-search.component.html',
  styleUrls: ['./family-search.component.scss']
})
export class FamilySearchComponent implements OnInit {

  public dataSource = new FamilyDataSource(this.familyService);

  constructor(private familyService: FamilyService) { }

  ngOnInit(): void {
  }

  getFamilyStatus(status: string): FamilyStatus{
    const statusEnum =  FamilyStatus[status as keyof typeof FamilyStatus];
    return statusEnum;
  }


}

class FamilyDataSource extends DataSource<FamilyMemberFamilySearchResponse | undefined> {
  private length = 1;
  private pageSize = 10;
  private cachedData = Array.from<FamilyMemberFamilySearchResponse>({ length: this.length });
  private fetchedPages = new Set<number>();
  private readonly dataStream = new BehaviorSubject<(FamilyMemberFamilySearchResponse | undefined)[]>(this.cachedData);
  private readonly subscription = new Subscription();

  constructor(private familyService: FamilyService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<(FamilyMemberFamilySearchResponse | undefined)[]> {

    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      const startPage = this._getPageForIndex(range.start);
      const endPage = this._getPageForIndex(range.end - 1);
      for (let i = startPage; i <= endPage; i++) {
        this._fetchPage(i);
      }
    }));

    return this.dataStream;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private _fetchPage(page: number): void {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);

    this.familyService.getAllFamilies(page).subscribe({
      next: response => {
        this.length = response.totalItems;
        this.cachedData = response.families;
        this.dataStream.next(this.cachedData);
      }
    });

  }

}
