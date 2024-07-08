import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjudicacionesDialogComponent } from './adjudicaciones-dialog.component';

describe('AdjudicacionesDialogComponent', () => {
  let component: AdjudicacionesDialogComponent;
  let fixture: ComponentFixture<AdjudicacionesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdjudicacionesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjudicacionesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
