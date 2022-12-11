import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { AdminProfileComponent } from './admin-profile.component';

describe('AdminProfileComponent', () => {
  let component: AdminProfileComponent;
  let fixture: ComponentFixture<AdminProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProfileComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create AdminProfileComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial empty trainers array', () => {
    expect(component.trainers).toEqual([]);
  });

  it('should disable the Add trainer button when text fields are empty', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should display correct admin name', () => {
    component.adminName = 'tom';
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('span'));
    expect(
      fixture.debugElement.query(By.css('span')).nativeElement.textContent
    ).toContain('tom');
  });

  it('should clear session storage when click on logout', () => {
    sessionStorage.setItem('admin', 'tom');
    component.logOut();
    fixture.detectChanges();
    expect(sessionStorage.getItem('admin')).toBe(null);
  });

  it('should work navigate appropriately when tab clicked', () => {
    const tab = 'Trainers';
    component.onTabClick(tab);
    fixture.detectChanges();
    expect(component.activeTab).toBe(tab);
  });

  it('should give relevant data of selected trainer', () => {
    const item = 0;
    component.isActive(item);
    fixture.detectChanges();
    expect(component.selected).toBe(item);
  });
});
