import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators';
import { FamilyMemberFamilySearchResponse, FamilySearchDTO } from 'src/app/models/dtos/FamilySearchDTO';
import { FamilyStatus } from 'src/app/models/enums/FamilyStatus';
import { FamilyService } from 'src/app/services/Family.service';

@Component({
  selector: 'app-family-search',
  templateUrl: './family-search.component.html',
  styleUrls: ['./family-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FamilySearchComponent implements OnInit, OnDestroy {

  public dataSource = new FamilyDataSource(this.familyService);
  public searchingName!: string;
  public nameSearchChanged: Subject<string> = new Subject<string>();
  private nameSearchChangeSubscription!: Subscription;

  constructor(private familyService: FamilyService, private changeDetectorRefs: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.nameSearchChangeSubscription = this.nameSearchChanged.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(newName => {
        this.searchingName = newName;
        this.dataSource.searchByName(this.searchingName);
      });
  }


  ngOnDestroy(): void {
    this.nameSearchChangeSubscription.unsubscribe();
  }

  getFamilyStatus(status: string): FamilyStatus {
    const statusEnum = FamilyStatus[status as keyof typeof FamilyStatus];
    return statusEnum;
  }


}

class FamilyDataSource extends DataSource<FamilyMemberFamilySearchResponse | undefined> {
  private length = 1;
  private pageSize = 10;
  private cachedData = Array.from<FamilyMemberFamilySearchResponse>({ length: this.length });
  private fetchedPages = new Set<number>();
  private searchingName = '';
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

  searchByName(name: string): void {
    this.length = 1;
    this.fetchedPages = new Set<number>();
    this.searchingName = name;
    this._fetchPage(0);
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private _fetchPage(page: number): void {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);

    if (this.searchingName.length <= 1) {
      this.familyService.getAllFamilies(page).subscribe({
        next: response => {
          this.length = response.totalItems;
          this.cachedData = response.families;
          this.dataStream.next(this.cachedData);
        }
      });
    } else {
      this.familyService.getFamilyByName(this.searchingName, page).subscribe({
        next: response => {
          this.length = response.totalItems;
          this.cachedData = response.families;
          this.dataStream.next(this.cachedData);
        }
      });
    }

  }

}
