import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { ExercisesComponent } from './exercises.component';

describe('ExercisesComponent', () => {
  let component: ExercisesComponent;
  let fixture: ComponentFixture<ExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExercisesComponent],
      imports:[HttpClientTestingModule,RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ExercisesComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial empty allExercise array', () => {
    expect(component.allExercises).toEqual([]);
  });

  it('should equal total results to length of allExercise array', () => {
    component.allExercises=['situp','pushup']
    const count=component.allExercises.length
    fixture.detectChanges()
    expect(fixture.debugElement.query(By.css('h6')).nativeElement.textContent).toContain('Total Results:'+count);
  });
 
});
