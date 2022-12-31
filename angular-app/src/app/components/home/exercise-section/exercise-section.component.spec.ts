import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExerciseSectionComponent } from './exercise-section.component';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('ExerciseSectionComponent', () => {
  let component: ExerciseSectionComponent;
  let fixture: ComponentFixture<ExerciseSectionComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExerciseSectionComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'allExercises', component: DummyComponent },
        ]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseSectionComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
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

  it('should display appropriate error messages', () => {
    component.errorMsg = 'api error';
    component.showErrorsMsg = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.alert').textContent).toBe(' api error ');
  });

  it('should display appropriate exercises based on selected target mussel', () => {
    component.type = 'Back Exercises';
    fixture.detectChanges();
    expect(compiled.querySelector('h5').textContent).toBe('Back Exercises');
  });

  it('should be in / before click View more button', () => {
    const location = TestBed.inject(Location);
    expect(location.path()).toEqual('');
  });

  it('should be navigate to /allExercises after clicking View more button', () => {
    const location = TestBed.inject(Location);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.textContent).toContain('View more');
    button.nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('allExercises');
    });
  });

  it('should display appropriate error messages', () => {
    component.errorMsg = 'api error';
    component.showErrorsMsg = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.alert').textContent).toBe(' api error ');
  });
});
@Component({ template: '' })
class DummyComponent {}
