import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture,TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UserService } from 'src/app/shared/auth/user.service';
import { Location } from '@angular/common';
import { BannerComponent } from './banner.component';
import { Router, Routes } from '@angular/router';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: DummyComponent },
        ]),
      ],
      declarations: [BannerComponent],
      providers: [{ provide: UserService, uesClass: UserServiceStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;

   
  });

  it('should create BannerComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set image path as expected', () => {
    const ele = fixture.debugElement.nativeElement.querySelectorAll('img');
    expect(ele[0]['src']).toContain('image-removebg-preview.png');
  });

  it('should have the title THE BEST FITNESS PLATFORM', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#title').textContent).toContain(
      'THE BEST FITNESS PLATFORM'
    );
  });

  it('should be in / before click Get started button',()=>{
    const location=TestBed.inject(Location);
    expect(location.path()).toEqual('');
  })

  it('should be navigate to /login after clicking Get started button',()=>{
    const location=TestBed.inject(Location);
    const button=fixture.debugElement.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Get Started')
    button.click()
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      expect(location.path()).toBe('/login');
    })
   
  })
  
  
});
@Component({template:''})
class DummyComponent{}
class UserServiceStub {}
