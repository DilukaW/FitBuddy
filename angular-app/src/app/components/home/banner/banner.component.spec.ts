import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/shared/auth/user.service';
import { Location } from '@angular/common';
import { BannerComponent } from './banner.component';
import { By } from '@angular/platform-browser';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let compiled: any;

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
    compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
  });

  it('should create BannerComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set image path as expected', () => {
    const ele = compiled.querySelectorAll('img');
    expect(ele[0]['src']).toContain('image-removebg-preview.png');
  });

  it('should have the title THE BEST FITNESS PLATFORM', () => {
    expect(compiled.querySelector('#title').textContent).toContain(
      'THE BEST FITNESS PLATFORM'
    );
  });

  it('should be in / before click Get started button', () => {
    const location = TestBed.inject(Location);
    expect(location.path()).toEqual('');
  });

  it('should be navigate to /login after clicking Get started button', () => {
    const location = TestBed.inject(Location);
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.textContent).toContain('Get Started');
    button.nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/login');
    });
  });

  it('should display counter values correctly', () => {
    expect(compiled.querySelector('h4').textContent).toContain('1000');
  });
});
@Component({ template: '' })
class DummyComponent {}
class UserServiceStub {}
