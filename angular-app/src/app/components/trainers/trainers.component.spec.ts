 import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

 import { TrainersComponent } from './trainers.component';

 describe('TrainersComponent', () => {
   let component: TrainersComponent;
   let fixture: ComponentFixture<TrainersComponent>;

   beforeEach(async () => {
     await TestBed.configureTestingModule({
       declarations: [ TrainersComponent ],
       imports:[HttpClientTestingModule,RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
     })
     .compileComponents();

     fixture = TestBed.createComponent(TrainersComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
   });

   it('should create TrainersComponent', () => {
     expect(component).toBeTruthy();
   });
 });
