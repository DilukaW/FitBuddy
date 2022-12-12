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

  it('should enable the Add trainer button when text fields are not empty', () => {
    component.trainerUpdateForm.get('email')!.setValue('tom@gmail.com');
    component.trainerUpdateForm.get('password')!.setValue('12345678');
    component.trainerUpdateForm.get('uname')!.setValue('tom');
    component.trainerUpdateForm.get('area')!.setValue('yoga');
    component.trainerUpdateForm.get('description')!.setValue('new');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should display correct admin name', () => {
    component.adminName = 'tom';
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('span'));
    expect(
      fixture.debugElement.query(By.css('span')).nativeElement.textContent
    ).toContain('tom');
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

  it('should clear text fields after submitting the form', () => {
    
    component.updateForm.get('email')!.setValue('tom@gmail.com');
    component.restForm(component.updateForm)
    fixture.detectChanges()
    const email=component.updateForm.get('email')?.value
    expect(email).toEqual(null)
  });
});
