 import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      imports:[HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create UserProfileComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the update user button when text fields are empty', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should enable the update user button when text fields are not empty', () => {
    component.userUpdateForm.get('email')!.setValue('tom@gmail.com');
    component.userUpdateForm.get('age')!.setValue('40');
    component.userUpdateForm.get('uname')!.setValue('tom');
    component.userUpdateForm.get('gender')!.setValue('Male');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should disable the update user button when email is invalid ', () => {
    component.userUpdateForm.get('email')!.setValue('tom@.com');
    component.userUpdateForm.get('age')!.setValue('40');
    component.userUpdateForm.get('uname')!.setValue('tom');
    component.userUpdateForm.get('gender')!.setValue('Male');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should work navigate appropriately when tab clicked', () => {
    const tab = 'Users';
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

  it('should return customized date on chat', () => {
    
   const date= component.stringAsDate("12 12 2022 07:38:40.757")
    fixture.detectChanges();
    expect(date).toBe('12 Dec 7:38 am');
  });

  it('should clear text fields after submitting the form', () => {
    
    component.userUpdateForm.get('email')!.setValue('tom@gmail.com');
    component.restForm(component.userUpdateForm)
    fixture.detectChanges()
    const email=component.userUpdateForm.get('email')?.value
    expect(email).toEqual(null)
  });

});
