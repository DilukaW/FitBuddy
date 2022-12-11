import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UserService } from 'src/app/shared/auth/user.service';
import { FooterComponent } from 'src/app/sharedcomponents/footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { ExerciseSectionComponent } from './exercise-section/exercise-section.component';

import { HomeComponent } from './home.component';
import { WhyUsComponent } from './why-us/why-us.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule, HttpClientTestingModule],
      declarations: [
        HomeComponent,
        FooterComponent,
        BannerComponent,
        ExerciseSectionComponent,
        WhyUsComponent,
      ],
      providers: [UserService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have the banner component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-banner')).not.toBe(null);
  });

  it('should have the why us component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-why-us')).not.toBe(null);
  });

  it('should have the footer component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-footer')).not.toBe(null);
  });
});
