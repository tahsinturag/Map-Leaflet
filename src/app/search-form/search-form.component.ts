import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../post.service';
import { CommonModule } from '@angular/common';

interface GenericSuggestion {
  id: number;
  genericName: string;
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
  public suggestions: GenericSuggestion[] = [];
  showSuggestion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.initializeSearchForm();

    // Handle input changes for fetching suggestions
    this.searchForm.get('brand_name')?.valueChanges.subscribe((input) => {
      if (input && input.length > 0) {
        this.getSuggestions(input);
      } else {
        this.suggestions = [];
        this.showSuggestion = false;
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

  getSuggestions(query: string) {
    this.postService.getGenericSuggestions(query).subscribe((response: GenericSuggestion[]) => {
      this.suggestions = response;
      this.showSuggestion = true;
    });
  }

  selectSuggestion(suggestion: GenericSuggestion) {
    this.searchForm.get('brand_name')?.setValue(suggestion.genericName);
    this.suggestions = [];
    this.showSuggestion = false; // Hide dropdown
  }

  onBlur() {
    setTimeout(() => {
      this.showSuggestion = false; // Hide dropdown after a short delay
    }, 200); // Delay to ensure clicks are processed
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
