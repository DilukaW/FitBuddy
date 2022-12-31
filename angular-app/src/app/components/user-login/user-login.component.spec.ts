import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserLoginComponent } from './user-login.component';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserLoginComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create UserLoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the login button when text fields are empty', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should enable the login button when text fields are not empty', () => {
    component.loginForm.get('email')!.setValue('tom@gmail.com');
    component.loginForm.get('password')!.setValue('12345678');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should disable the login button when password length is less than 8', () => {
    component.loginForm.get('email')!.setValue('tom@gmail.com');
    component.loginForm.get('password')!.setValue('1234567');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should disable the login button when email is invalid', () => {
    component.loginForm.get('email')!.setValue('tom@.com');
    component.loginForm.get('password')!.setValue('1234567');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should clear text fields after submitting the form', () => {
    component.loginForm.get('email')!.setValue('tom@gmail.com');
    component.restForm(component.loginForm);
    fixture.detectChanges();
    const email = component.loginForm.get('email')?.value;
    expect(email).toEqual(null);
  });

  it('should display appropriate error messages', () => {
    component.errorMsg = 'error';
    component.showErrorsMsg = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.alert').textContent).toBe(' error ');
  });

  it('should display appropriate success messages', () => {
    component.showSuccessMsg = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.alert-success').textContent).toBe(
      ' Login successfully! '
    );
  });
});
