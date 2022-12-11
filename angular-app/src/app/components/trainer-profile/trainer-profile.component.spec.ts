 import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

 import { TrainerProfileComponent } from './trainer-profile.component';

 describe('TrainerProfileComponent', () => {
   let component: TrainerProfileComponent;
   let fixture: ComponentFixture<TrainerProfileComponent>;

   beforeEach(async () => {
     await TestBed.configureTestingModule({
    declarations: [ TrainerProfileComponent ],
    imports:[HttpClientTestingModule,RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
     })
     .compileComponents();

     fixture = TestBed.createComponent(TrainerProfileComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
   });

   it('should create TrainerProfileComponent', () => {
     expect(component).toBeTruthy();
   });
   

   it('should have initial empty users array', () => {
    expect(component.users).toEqual([]);
  });

  it('should give relevant data of selected trainer', () => {
    const item = 0;
    component.isActive(item);
    fixture.detectChanges();
    expect(component.selected).toBe(item);
  });
  
 });
