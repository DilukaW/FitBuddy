import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { ExerciseDetailsComponent } from './exercise-details.component';

describe('ExerciseDetailsComponent', () => {
  let component: ExerciseDetailsComponent;
  let fixture: ComponentFixture<ExerciseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExerciseDetailsComponent],
      imports:[HttpClientTestingModule,RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseDetailsComponent);
    component = fixture.componentInstance;
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
});
