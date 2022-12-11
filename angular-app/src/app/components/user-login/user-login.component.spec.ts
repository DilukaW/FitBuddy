 import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';

 import { UserLoginComponent } from './user-login.component';

 describe('UserLoginComponent', () => {
   let component: UserLoginComponent;
   let fixture: ComponentFixture<UserLoginComponent>;

   beforeEach(async () => {
     await TestBed.configureTestingModule({
       declarations: [ UserLoginComponent ],
       imports:[HttpClientTestingModule],
       schemas: [NO_ERRORS_SCHEMA],
     })
     .compileComponents();

     fixture = TestBed.createComponent(UserLoginComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
   });

   it('should create UserLoginComponent', () => {
     expect(component).toBeTruthy();
   });
 });
