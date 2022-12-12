 import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';

 import { UserSignupComponent } from './user-signup.component';

 describe('UserSignupComponent', () => {
   let component: UserSignupComponent;
   let fixture: ComponentFixture<UserSignupComponent>;

   beforeEach(async () => {
     await TestBed.configureTestingModule({
       declarations: [ UserSignupComponent ],
       imports:[HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
     })
     .compileComponents();

     fixture = TestBed.createComponent(UserSignupComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
   });

   it('should create UserSignupComponent', () => {
     expect(component).toBeTruthy();
   });

   it('should disable the signup button when text fields are empty', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should enable the signup button when text fields are not empty', () => {
    component.signupForm.get('email')!.setValue('tom@gmail.com');
    component.signupForm.get('age')!.setValue('40');
    component.signupForm.get('uname')!.setValue('tom');
    component.signupForm.get('gender')!.setValue('Male');
    component.signupForm.get('password')!.setValue('12345678');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should disable the signup button when password length is less than 8', () => {
    component.signupForm.get('email')!.setValue('tom@gmail.com');
    component.signupForm.get('age')!.setValue('40');
    component.signupForm.get('uname')!.setValue('tom');
    component.signupForm.get('gender')!.setValue('Male');
    component.signupForm.get('password')!.setValue('1234567');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should disable the signup button when email is invalid', () => {
    component.signupForm.get('email')!.setValue('tomGmail.com');
    component.signupForm.get('age')!.setValue('40');
    component.signupForm.get('uname')!.setValue('tom');
    component.signupForm.get('gender')!.setValue('Male');
    component.signupForm.get('password')!.setValue('12345678');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should clear text fields after submitting the form', () => {
    
    component.signupForm.get('email')!.setValue('tom@gmail.com');
    component.restForm(component.signupForm)
    fixture.detectChanges()
    const email=component.signupForm.get('email')?.value
    expect(email).toEqual(null)
  });
 
  it('should clear text fields after submitting the form', () => {
    component.signupForm.get('email')!.setValue('tom@gmail.com');
    component.restForm(component.signupForm)
    fixture.detectChanges()
    const email=component.signupForm.get('email')?.value
    expect(email).toEqual(null)
  });
 });
