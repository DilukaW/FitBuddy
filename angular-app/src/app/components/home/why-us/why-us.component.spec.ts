import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhyUsComponent } from './why-us.component';

describe('WhyUsComponent', () => {
  let component: WhyUsComponent;
  let fixture: ComponentFixture<WhyUsComponent>;
  let compiled:any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhyUsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WhyUsComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create WhyUsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set image path as expected', () => {
    const ele = fixture.debugElement.nativeElement.querySelectorAll('img');
    expect(ele[0]['src']).toContain('whyus1.jpg');
  });

  it('should have the title WHY CHOOSE US ?', () => {
    expect(compiled.querySelector('h1').textContent).toBe(
      'WHY CHOOSE US ?'
    );
  });
});
