import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../post.service';
import { CommonModule } from '@angular/common';

// GenericSuggestion interface
interface GenericSuggestion {
  id: number;
  genericName: string;
}

// VendorSuggestion interface
interface VendorSuggestion {
  id: number;
  vendorName: string;
}

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule
  ]
})
export class SearchFormComponent implements OnInit {
  @Output() closeModalEmitter = new EventEmitter<void>();
  @Output() searchParamEmitter = new EventEmitter<any>();
  public searchForm!: FormGroup;

  // vendor and generic suggestions property
  public suggestions: GenericSuggestion[] = [];
  public vendorSuggestions: VendorSuggestion[] = [];
  showSuggestion: boolean = false;
  showVendorSuggestion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.initializeSearchForm();

    // generic suggestions logic
    this.searchForm.get('brand_name')?.valueChanges.subscribe((input) => {
      if (input && input.length > 0) {
        this.getSuggestions(input);
      } else {
        this.suggestions = [];
        this.showSuggestion = false;
      }
    });

    // vendor suggestions logic
    this.searchForm.get('vendor_name')?.valueChanges.subscribe((input) => {
      if (input && input.length > 0) {
        this.getVendorSuggestions(input);
      } else {
        this.vendorSuggestions = [];
        this.showVendorSuggestion = false;
      }
    });
  }

  initializeSearchForm() {
    this.searchForm = this.formBuilder.group({
      brand_name: [''],
      vendor_name: [''],
      start_date: [''],
      end_date: [''],
    });
  }

  // get generic suggestions method
  getSuggestions(query: string) {
    this.postService.getGenericSuggestions(query).subscribe((response: GenericSuggestion[]) => {
      this.suggestions = response;
      this.showSuggestion = true;
    });
  }

  // get vendor suggestions method
  getVendorSuggestions(query: string) {
    this.postService.getVendorSuggestions(query).subscribe((response: VendorSuggestion[]) => {
      this.vendorSuggestions = response;
      this.showVendorSuggestion = true;
    });
  }

  // generic suggestion selection method
  selectSuggestion(suggestion: GenericSuggestion) {
    this.searchForm.get('brand_name')?.setValue(suggestion.genericName);
    this.suggestions = [];
    this.showSuggestion = false;
  }

  // vendor suggestion selection method
  selectVendorSuggestion(suggestion: VendorSuggestion) {
    this.searchForm.get('vendor_name')?.setValue(suggestion.vendorName);
    this.vendorSuggestions = [];
    this.showVendorSuggestion = false;
  }

  onBlur(type: 'generic' | 'vendor') {
    setTimeout(() => {
      if (type === 'generic') {
        this.showSuggestion = false;
      } else {
        this.showVendorSuggestion = false;
      }
    }, 200);
  }



  searchHandler() {
    if (this.searchForm.valid) {
      this.searchParamEmitter.emit(this.searchForm.value);
    }
  }


  closeModal(): void {
    this.closeModalEmitter.emit();
  }
}
