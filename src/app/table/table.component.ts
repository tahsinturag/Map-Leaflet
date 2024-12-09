import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DivisionListView } from '../leaflet-map/models/division.models';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() tableTabType: string = '';
  @Input() divisionsDataList: DivisionListView[] = [];

  // @Input() brandsList: BrandListView[] = [];
  // @Input() marketSharesList: DivisionListView[] = [];

  @Output() showDistrictsEvent = new EventEmitter();
  @Output() showBrandDetailsEvent = new EventEmitter();

  public data: any[] = [];
  public divisionName: string = '';

  constructor() {}

  ngOnInit(): void {
    console.log('this.divisionsDataList', this.divisionsDataList);

    // if (this.tableTabType === 'brands') {
    //   this.data = this.brandsList;
    // } else if (this.tableTabType === 'demographic') {
    //   this.data = this.divisionsDataList;
    // } else {
    //   this.data = this.marketSharesList;
    // }
    console.log('tableTabType table', this.tableTabType);
  }

  showDistrictsHandler(division: DivisionListView) {
    this.showDistrictsEvent.emit(division);
    // Emits/Passing the selected division data to the parent component.
    // Passing data from Child to Parent Component
  }

  showBrandDetails(brandId: string) {
    console.log('brandId: ' + brandId);
    this.showBrandDetailsEvent.emit(Number(brandId));
    // Emits/Passing the selected brand ID as a number to the parent component.
  }

  formatNumber(value: number): string {
    const formatter = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    return formatter.format(value);
  }
}
