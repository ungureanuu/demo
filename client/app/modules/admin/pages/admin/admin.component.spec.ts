import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { MatFormFieldModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AdminService } from './admin.service';



describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [ MatFormFieldModule, HttpClientModule ],
      providers: [
        AdminService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
