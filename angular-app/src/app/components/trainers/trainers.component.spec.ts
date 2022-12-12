import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/shared/auth/user.service';

import { TrainersComponent } from './trainers.component';

describe('TrainersComponent', () => {
  let component: TrainersComponent;
  let fixture: ComponentFixture<TrainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainersComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers:[UserService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainersComponent);
    component = fixture.componentInstance;
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

  it('should have logged user id', () => {
    sessionStorage.setItem('user-token','11111')
    component.loggedUserId=sessionStorage.getItem('user-token')
    fixture.detectChanges()
    expect(component.loggedUserId).toBe('11111')
  });
});
