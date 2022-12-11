 import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';

 import { FooterComponent } from './footer.component';

 describe('FooterComponent', () => {
   let component: FooterComponent;
   let fixture: ComponentFixture<FooterComponent>;

   beforeEach(async () => {
     await TestBed.configureTestingModule({
       declarations: [ FooterComponent ],
       imports:[AppRoutingModule]

     })
     .compileComponents();

     fixture = TestBed.createComponent(FooterComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
   });

   it('should create FooterComponent', () => {
     expect(component).toBeTruthy();
   });
 });
