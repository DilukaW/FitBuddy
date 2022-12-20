import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from 'src/app/sharedcomponents/footer/footer.component';
import { AboutUsComponent } from './about-us.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule],
      declarations: [AboutUsComponent, FooterComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create the about us component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the footer component', () => {
    expect(compiled.querySelector('app-footer')).not.toBe(null);
  });

  it('should have the title WE ARE GYM BUDDY', () => {
    expect(compiled.querySelector('h1').textContent).toBe(
      'WE ARE FIT BUDDY'
    );
  });

  it('should have the title OUR VALUES', () => {
    expect(compiled.querySelector('#values').textContent).toBe(
      'OUR VALUES'
    );
  });

  it('should have the title OUR STORY', () => {
    expect(compiled.querySelector('#story').textContent).toBe('OUR STORY');
  });

  it('should have the title OUR CULTURE', () => {
    expect(compiled.querySelector('#culture').textContent).toBe(
      'OUR CULTURE'
    );
  });
});
