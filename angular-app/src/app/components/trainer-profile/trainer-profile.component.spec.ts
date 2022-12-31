import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TrainerProfileComponent } from './trainer-profile.component';

describe('TrainerProfileComponent', () => {
  let component: TrainerProfileComponent;
  let fixture: ComponentFixture<TrainerProfileComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainerProfileComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainerProfileComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create TrainerProfileComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial empty users array', () => {
    expect(component.users).toEqual([]);
  });

  it('should give relevant data of selected trainee', () => {
    const item = 0;
    component.isActive(item);
    fixture.detectChanges();
    expect(component.selected).toBe(item);
  });

  it('should return customized date on chat', () => {
    const date = component.stringAsDate('10 12 2022 17:38:40.757');
    fixture.detectChanges();
    expect(date).toBe('12 Oct 17:38 pm');
  });

  it('should display appropriate error messages', () => {
    component.errorMsg = 'error';
    component.showErrorsMsg = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.alert').textContent).toBe(' error ');
  });

  it('should display appropriate success messages', () => {
    component.successMsg = 'success';
    component.showSuccessMsg = true;
    fixture.detectChanges();
    expect(compiled.querySelector('.alert-success').textContent).toBe(
      ' success '
    );
  });
});
