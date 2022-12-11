 import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

 import { UserSignupComponent } from './user-signup.component';

 describe('UserSignupComponent', () => {
   let component: UserSignupComponent;
   let fixture: ComponentFixture<UserSignupComponent>;

   beforeEach(async () => {
     await TestBed.configureTestingModule({
       declarations: [ UserSignupComponent ],
       imports:[HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
     })
     .compileComponents();

     fixture = TestBed.createComponent(UserSignupComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
   });

   it('should create UserSignupComponent', () => {
     expect(component).toBeTruthy();
   });
 });
