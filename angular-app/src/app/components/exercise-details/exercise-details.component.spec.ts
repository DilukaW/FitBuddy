import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { ExerciseDetailsComponent } from './exercise-details.component';

describe('ExerciseDetailsComponent', () => {
  let component: ExerciseDetailsComponent;
  let fixture: ComponentFixture<ExerciseDetailsComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExerciseDetailsComponent],
      imports:[HttpClientTestingModule,RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseDetailsComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create ExerciseDetailsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title Exercise Details', () => {
    expect(fixture.debugElement.query(By.css('h5')).nativeElement.textContent).toContain('Exercise Details');
  });

  it('should have initial empty exerciseByEquipment array', () => {
    expect(component.exerciseByEquipment).toEqual([]);
  });

  it('should have initial empty exerciseByMussel array', () => {
    expect(component.exerciseByMussel).toEqual([]);
  });

  it('should display correct exercise name', () => {
    component.exerciseName="push up"
    fixture.detectChanges()
    expect(compiled.querySelector('#heading').textContent).toBe(
      'push up'
    );
  });

  it('should display correct exercise name, target mussel, equipment and description ', () => {
    component.exerciseName="push up"
    component.exerciseTarget="shoulders"
    component.exerciseEquipment="body"
    fixture.detectChanges()
    expect(compiled.querySelector('#des').textContent).toBe(
      'push up is one of the best exercise to target your shoulders mussel using body. '
    );
  });

  it('should display appropriate error messages', () => {
    component.errorMsg="api error"
    component.showErrorsMsg=true
    fixture.detectChanges()
    expect(compiled.querySelector('.alert').textContent).toBe(' api error ')
  });

 
});
