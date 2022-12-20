import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/shared/auth/user.service';
import { Location } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let location:Location
  let compiled:any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: DummyComponent },
          {path:'trainerDetails',component:DummyComponent}
        ]),
      ],
      providers: [{ provide: UserService, uesClass: UserServiceStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create NavbarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display user name on top', () => {
    component.userSession=true
    component.uname="tom"
    fixture.detectChanges()
    expect(compiled.querySelector('#dropdownMenuButton1').textContent).toContain(
      'tom'
    );
  });


  it('should be navigate to home after clicking home',()=>{
    const location=TestBed.inject(Location);
    const btn=fixture.debugElement.nativeElement.querySelector('#home');
    expect(btn.textContent).toContain('Home')
    btn.click();
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      expect(location.path()).toEqual('');
    });
   
  });
  
});

@Component({ template: '' })
class DummyComponent {}
class UserServiceStub {}
