import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhakaComponent } from './dhaka.component';

describe('DhakaComponent', () => {
  let component: DhakaComponent;
  let fixture: ComponentFixture<DhakaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DhakaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DhakaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
