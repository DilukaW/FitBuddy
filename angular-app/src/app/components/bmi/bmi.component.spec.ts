import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BmiComponent } from './bmi.component';

describe('BmiComponent', () => {
  let component: BmiComponent;
  let fixture: ComponentFixture<BmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BmiComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create BmiComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title CALCULATE YOUR BMI', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'CALCULATE YOUR BMI'
    );
  });

  it('should disable the Calculate button when text fields are empty', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should enable the Calculate button when text fields are not empty', () => {
    component.bmiForm.get('height')!.setValue('1.6');
    component.bmiForm.get('weight')!.setValue('65');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should return correct bmi value when height and weight provided', () => {
    const bmi = component.bmiCal(1.6, 65);
    expect(bmi).toBe('25.39');
  });

  it('should have empty message initially', () => {
    expect(component.msg).not.toBeDefined();
  });

  it('should give appropriate messages for calculated bmi value', () => {
    const bmi = component.bmiCal(1.6, 65);
    let msg = '';
    if (parseInt(bmi) < 18.5) {
      msg = 'Underweight';
    } else if (parseInt(bmi) > 18.5 && parseInt(bmi) < 25) {
      msg = 'Normal';
    } else {
      msg = 'Overweight';
    }
    expect(msg).toBe('Overweight');
  });

  it('should clear text fields after submitting the form', () => {
    component.bmiForm.get('height')!.setValue('1.6');
    component.bmiForm.get('weight')!.setValue('65');
    component.onSubmit(component.bmiForm);
    fixture.detectChanges();
    const height = component.bmiForm.get('height')?.value;
    const weight = component.bmiForm.get('weight')?.value;
    expect(weight).toEqual(null);
    expect(height).toEqual(null);
  });
});
