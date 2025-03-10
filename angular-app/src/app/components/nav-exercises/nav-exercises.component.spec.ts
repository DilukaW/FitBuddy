import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavExercisesComponent } from './nav-exercises.component';

describe('NavExercisesComponent', () => {
  let component: NavExercisesComponent;
  let fixture: ComponentFixture<NavExercisesComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavExercisesComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(NavExercisesComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create NavExercisesComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial empty backExercises array', () => {
    expect(component.backExercises).toEqual([]);
  });

  it('should have initial empty cardioExercises array', () => {
    expect(component.cardioExercises).toEqual([]);
  });

  it('should have initial empty chestExercises array', () => {
    expect(component.chestExercises).toEqual([]);
  });

  it('should have initial empty lowerExercises array', () => {
    expect(component.lowerArmsExercises).toEqual([]);
  });

  it('should have the appropriate titles for each exercise card', () => {
    expect(compiled.querySelector('#heading').textContent).toBe(
      'Back Exercisers'
    );
  });

  it('should display appropriate error messages', () => {
    component.errorMsg = 'api error';
    component.showErrorsMsg = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.alert').textContent).toBe(' api error ');
  });
});
