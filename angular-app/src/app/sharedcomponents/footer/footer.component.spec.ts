 import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';

 import { FooterComponent } from './footer.component';

 describe('FooterComponent', () => {
   let component: FooterComponent;
   let fixture: ComponentFixture<FooterComponent>;
   let compiled:any;

   beforeEach(async () => {
     await TestBed.configureTestingModule({
       declarations: [ FooterComponent ],
       imports:[AppRoutingModule]

     })
     .compileComponents();

     fixture = TestBed.createComponent(FooterComponent);
     component = fixture.componentInstance;
     compiled = fixture.debugElement.nativeElement;
     fixture.detectChanges();
   });

   it('should create FooterComponent', () => {
     expect(component).toBeTruthy();
   });

   it('should have copyright', () => {
    expect(compiled.querySelector('#copy').textContent).toContain(
      '© 2022 Gym Buddy. All rights reserved'
    );
  });
 });
