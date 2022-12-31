import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/shared/auth/user.service';
import { TrainersComponent } from './trainers.component';

describe('TrainersComponent', () => {
  let component: TrainersComponent;
  let fixture: ComponentFixture<TrainersComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainersComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainersComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create TrainersComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial empty trainers array', () => {
    expect(component.trainers).toEqual([]);
  });

  it('should have initial empty trainees array', () => {
    expect(component.trainees).toEqual([]);
  });

  it('should display trainer details', () => {
    component.trainers = [{ uname: 'tom' }];
    fixture.detectChanges();
    expect(compiled.querySelector('h4').textContent).toBe(
      component.trainers[0].uname
    );
  });

  it('should have logged user id', () => {
    sessionStorage.setItem('user-token', '11111');
    component.loggedUserId = sessionStorage.getItem('user-token');
    fixture.detectChanges();
    expect(component.loggedUserId).toBe('11111');
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
