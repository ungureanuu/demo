import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressWidgetComponent } from './progress-widget.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProgressWidgetComponent', () => {
  let component: ProgressWidgetComponent;
  let fixture: ComponentFixture<ProgressWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressWidgetComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
