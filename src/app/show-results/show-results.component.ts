import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { DecimalPipe } from '@angular/common';

interface TopBrand {
  drugName: string;
  strengthName: string;
  formationName: string;
  totalAmount: number;
}

interface MarketShare {
  districtName: string;
  totalSales: number;
  salesPercentage: number;
}

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
  topBrandsList: TopBrand[] = [];
  marketShareList: MarketShare[] = [];
  totalAmount: number = 0;
  activeTab: 'demographic' | 'topBrands' | 'marketShare' = 'demographic';


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
  fetchTopBrands() {
    this.postService
      .getTopBrands(1, 1, '2020-01-01', '2025-06-30', 2)
      .subscribe(
        (data) => {
          this.topBrandsList = data;
        },
        (error) => {
          console.error('Error fetching top brands', error);
        }
      );
  }
  fetchMarketShare() {
    this.postService
      .getMarketShare(1, 1, '2020-01-01', '2025-06-30', 1)
      .subscribe(
        (data) => {
          this.marketShareList = data;
        },
        (error) => {
          console.error('Error fetching market share', error);
        }
      );
  }

  // tab change
  onTabChange(tab: 'demographic' | 'topBrands' | 'marketShare') {
    this.activeTab = tab;

    if (tab === 'topBrands') {
      this.fetchTopBrands();
    } else if (tab === 'marketShare') {
      this.fetchMarketShare();
    }
  }
}

