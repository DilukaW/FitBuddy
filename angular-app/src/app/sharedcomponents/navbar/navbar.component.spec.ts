import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/shared/auth/user.service';
import { Location } from '@angular/common';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let location:Location

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
    fixture.detectChanges();
  });

  it('should create NavbarComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should be navigate to /login after clicking Get login button',()=>{
    const location=TestBed.inject(Location);
    const btn=fixture.debugElement.nativeElement.querySelector('#log');
    expect(btn.textContent).toContain('Log In')
    btn.click();
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      expect(location.path()).toEqual('/login');
    })
   
  })

  it('should be navigate to home after clicking home',()=>{
    const location=TestBed.inject(Location);
    const btn=fixture.debugElement.nativeElement.querySelector('#home');
    expect(btn.textContent).toContain('Home')
    btn.click();
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      expect(location.path()).toEqual('');
    })
   
  })

  
});

@Component({ template: '' })
class DummyComponent {}
class UserServiceStub {}
