import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ExerciseSectionComponent } from './exercise-section.component';

describe('ExerciseSectionComponent', () => {
  let component: ExerciseSectionComponent;
  let fixture: ComponentFixture<ExerciseSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExerciseSectionComponent],
      imports:[HttpClientTestingModule,RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ExerciseSectionComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial empty bodyParts array', () => {
    expect(component.bodyParts).toEqual([]);
  });

  it('should have initial empty allExercises array', () => {
    expect(component.allExercises).toEqual([]);
  });

  it('should give relevant exercises on selected body part', () => {
    const item = 0;
    component.isActive(item);
    fixture.detectChanges();
    expect(component.selectedBodyPart).toBe(item);
  });
});
