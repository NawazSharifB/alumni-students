import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullInfoComponent } from './full-info.component';

describe('FullInfoComponent', () => {
  let component: FullInfoComponent;
  let fixture: ComponentFixture<FullInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
