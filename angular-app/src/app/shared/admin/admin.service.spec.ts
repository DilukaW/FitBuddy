import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AdminService } from './admin.service';
import { Admin } from './admin.model';

describe('AdminService', () => {
  let injector: TestBed;
  let service: AdminService;
  let httpMock: HttpTestingController;

  let fakeAdmin: Admin = {
    _id: '01',
    uname: 'tom',
    email: 'tom@gmial.com',
    password: '1234',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService],
    });

    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created AdminService', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAdminProfile', () => {
    it('should return expected admin details', (done: DoneFn) => {
      service.getAdminProfile().subscribe({
        next: (admin) => {
          expect(admin).toEqual(fakeAdmin);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('admins/profile');
      expect(req.request.method).toBe('GET');
      req.flush(fakeAdmin);
    });
  });

  describe('#loginAdmin', () => {
    it('should return an Observable for loginAdmin', () => {
      service
        .loginAdmin({ email: 'tom@gmial.com', password: '1234' })
        .subscribe((admin) => {
          expect(admin).toEqual({ email: 'tom@gmial.com', password: '1234' });
        });

      const req = httpMock.expectOne('admins/login');
      expect(req.request.method).toBe('POST');
      req.flush({ email: 'tom@gmial.com', password: '1234' });
    });
  });
});
