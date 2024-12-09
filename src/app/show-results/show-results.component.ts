import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.css'],
  imports: [
    DecimalPipe
  ],
  standalone: true
})
export class ShowResultsComponent implements OnInit {
  divisionsDataList: any[] = [];
  totalAmount: number = 0;
  constructor(private postService: PostService) {}
  ngOnInit() {
    this.fetchDemographicData();
  }

  fetchDemographicData() {
    this.postService
      .getDemographicData(1, 1, '2020-01-01', '2025-06-30')
      // Makes an API call with predefined parameters (e.g., page number, filters).

      .subscribe(
        (data) => {
          this.totalAmount = data.totalBDSales;
          this.divisionsDataList = data.divisionSales;
        },
        (error) => {
          console.error('Error fetching demographic data', error);
        }
      );
  }
}
