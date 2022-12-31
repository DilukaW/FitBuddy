import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { regUser, User } from './user.model';
import { UserService } from './user.service';

describe('AuthService', () => {
  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;

  let fakeUser: User = {
    _id: '01',
    uname: 'tom',
    email: 'tom@gmial.com',
    password: '1234',
  };
  let fakeRegUser: regUser = {
    _id: '01',
    uname: 'tom',
    email: 'tom@gmial.com',
    password: '1234',
    gender: 'male',
    age: 24,
    trainersId: '',
    image: '',
  };
  let fakeUsers: User[] = [
    {
      _id: '01',
      uname: 'tom',
      email: 'tom@gmial.com',
      password: '1234',
    },
    {
      _id: '02',
      uname: 'sam',
      email: 'sam@gmial.com',
      password: '81234',
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created authService', () => {
    expect(service).toBeTruthy();
  });

  describe('#registerUser', () => {
    it('should return an Observable<regUser>', (done: DoneFn) => {
      service.registerUser(fakeRegUser).subscribe({
        next: (user) => {
          expect(user).toEqual(fakeRegUser);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('users/register');
      expect(req.request.method).toBe('POST');
      req.flush(fakeRegUser);
    });
  });

  describe('#loginUser', () => {
    it('should return an Observable for loginUser', () => {
      service
        .loginUser({ email: 'tom@gmial.com', password: '1234' })
        .subscribe((admin) => {
          expect(admin).toEqual({ email: 'tom@gmial.com', password: '1234' });
        });

      const req = httpMock.expectOne('users/login');
      expect(req.request.method).toBe('POST');
      req.flush({ email: 'tom@gmial.com', password: '1234' });
    });
  });

  describe('#getUserProfile', () => {
    it('should return Observable for getUserProfile', (done: DoneFn) => {
      service.getUserProfile().subscribe({
        next: (user) => {
          expect(user).toEqual(fakeUser);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('users/profile');
      expect(req.request.method).toBe('GET');
      req.flush(fakeUser);
    });
  });

  describe('#getAllUsers', () => {
    it('should return Observable for getAllUsers', (done: DoneFn) => {
      service.getAllUsers().subscribe({
        next: (users) => {
          expect(users).toEqual(fakeUsers);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('users/all');
      expect(req.request.method).toBe('GET');
      req.flush(fakeUsers);
    });
  });

  describe('#getUserById', () => {
    it('should return Observable for getUserById', (done: DoneFn) => {
      service.getUserById('01').subscribe({
        next: (user) => {
          expect(user).toEqual(fakeUser);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('users/01');
      expect(req.request.method).toBe('GET');
      req.flush(fakeUser);
    });
  });

  describe('#updateUserById', () => {
    it('should return Observable for updateUserById', (done: DoneFn) => {
      service.updateUserById('01', 'img', fakeUser).subscribe({
        next: (user) => {
          expect(user).toEqual(fakeUser);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('users/01');
      expect(req.request.method).toBe('PUT');
      req.flush(fakeUser);
    });
  });

  describe('#addTrainers', () => {
    it('should return Observable for addTrainers', (done: DoneFn) => {
      service.addTrainers('01', { id: '04', uname: 'sam' }).subscribe({
        next: (user) => {
          expect(user).toEqual(fakeUser);
          done();
        },
        error: done.fail,
      });

      const req = httpMock.expectOne('users/trainers/01');
      expect(req.request.method).toBe('PUT');
      req.flush(fakeUser);
    });
  });
});
