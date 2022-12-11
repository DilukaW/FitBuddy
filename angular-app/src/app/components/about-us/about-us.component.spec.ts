import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from 'src/app/sharedcomponents/footer/footer.component';
import { AboutUsComponent } from './about-us.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgModel } from '@angular/forms';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule],
      declarations: [AboutUsComponent, FooterComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the about us component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the footer component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-footer')).not.toBe(null);
  });

  it('should have the title WE ARE GYM BUDDY', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'WE ARE GYM BUDDY'
    );
  });

  it('should have the title OUR VALUES', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#values').textContent).toContain(
      'OUR VALUES'
    );
  });

  it('should have the title OUR STORY', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#story').textContent).toContain('OUR STORY');
  });

  it('should have the title OUR CULTURE', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#culture').textContent).toContain(
      'OUR CULTURE'
    );
  });
});
