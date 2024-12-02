import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HelperService } from '../core/services/helper.service';
import { ClearInputDirective } from '../shared/directive/clear-input.directive';


@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ClearInputDirective],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
})
export class SearchFormComponent {
  @Output() closeModalEmitter = new EventEmitter();
  @Output() searchParamEmitter = new EventEmitter();
  public searchForm!: FormGroup;
  public tabType: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.tabType = this.helperService.getTabItem();
    this.initializeSearchForm();
  }

  initializeSearchForm() {
    this.searchForm = this.formBuilder.group({
      brand_name: [''],
      vendor_name: [''],
      start_date: [''],
      end_date: [''],
    });
  }
  searchHandler() {
    console.log('searchHandler', this.searchForm.value);
    if (this.searchForm.valid) {
      console.log(this.searchForm.value);
      this.searchParamEmitter.emit(this.searchForm.value);

      this.helperService.setTabItem(this.tabType || 'demographic');


    }
  }

  openModal(modalId: string) {
    console.log('object');
    const modalElement = document.getElementById(modalId);
    if (modalElement) {

    }
  }
  closeModal(): void {
    console.log('object');
    this.closeModalEmitter.emit();
  }
}
